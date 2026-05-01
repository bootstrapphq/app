import uixPageDefaultTheme from "/node_modules/@bootstrapp/uix/page/theme.js";
import { collectThemeTokens } from "/node_modules/@bootstrapp/uix/theme/collect.js";
import { createOAuthManager } from "/node_modules/@bootstrapp/github/oauth.js";
import { fetchUser } from "/node_modules/@bootstrapp/github/user.js";

const TABS = [
  { id: "pages", label: "Pages", icon: "layers" },
  { id: "header", label: "Header", icon: "panel-top" },
  { id: "footer", label: "Footer", icon: "panel-bottom" },
  { id: "theme", label: "Theme", icon: "palette" },
  { id: "deploy", label: "Deploy", icon: "upload" },
];

const oauth = createOAuthManager();

const THEME_EDITOR_SECTIONS = ["typography", "colors", "edges"];

const normalizePath = (path) => {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  if (!trimmed) return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const slugFromPath = (path) => {
  const normalized = normalizePath(path);
  if (normalized === "/") return "home";
  return normalized.slice(1).replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
};

export default function (ctx) {
  const { $APP, html, T, getIDE } = ctx;

  return {
    tag: "bsp-website-manager",
    properties: {
      uri: T.string({ defaultValue: "" }),
      website: T.object({ attribute: false, defaultValue: null }),
      pages: T.array({ attribute: false, defaultValue: [] }),
      loading: T.boolean({ defaultValue: true }),
      activeTab: T.number({ defaultValue: 0 }),
      themeTokens: T.object({ attribute: false, defaultValue: null }),
      previewTheme: T.object({
        attribute: false,
        defaultValue: null,
        sync: "local",
        scope: "uri",
      }),
      publishing: T.boolean({ defaultValue: false }),
      githubUser: T.string({ defaultValue: "" }),
    },

    async connected() {
      await this._load();
      this._unsub = $APP.events.on("content:change", () => this._load());
    },

    disconnected() {
      this._unsub?.();
    },

    _getSlug() {
      return this.uri.replace("pages://website/", "");
    },

    async _load() {
      this.loading = true;
      try {
        const slug = this._getSlug();
        this.website = await $APP.Model.collections.get(slug);
        const all = await $APP.Model.collections.getAll();
        this.pages = all
          .filter((c) => c.type === "page" && c._parent === slug)
          .sort((a, b) => {
            const pa = a.metadata?.path || "";
            const pb = b.metadata?.path || "";
            if (pa === "/") return -1;
            if (pb === "/") return 1;
            return pa.localeCompare(pb);
          });
        const meta = this.website?.metadata || {};
        const descriptors = [
          meta.header,
          meta.footer,
          ...this.pages.flatMap((p) => p.metadata?.sections || []),
        ].filter(Boolean);
        this.themeTokens = await collectThemeTokens(descriptors);
      } catch (e) {
        console.warn("[website-manager] Failed to load:", e);
      }
      this.loading = false;
    },

    _metadata() {
      return this.website?.metadata || {};
    },

    async _patchMetadata(patch) {
      const slug = this._getSlug();
      const current = await $APP.Model.collections.get(slug);
      if (!current) return;
      const metadata = { ...(current.metadata || {}), ...patch };
      await $APP.Model.collections.edit({ id: current.id, metadata });
      this.website = { ...current, metadata };
    },

    async _setHeader(props) {
      const current = this._metadata().header || {};
      await this._patchMetadata({
        header: { type: current.type || "uix-site-header", props },
      });
    },

    async _setFooter(props) {
      const current = this._metadata().footer || {};
      await this._patchMetadata({
        footer: { type: current.type || "uix-footer", props },
      });
    },

    _onThemeChange(sparse) {
      const current = this._metadata().theme || {};
      const merged = { ...current };
      for (const [cat, keys] of Object.entries(sparse || {})) {
        merged[cat] = { ...(current[cat] || {}), ...keys };
      }
      this.previewTheme = merged;
      clearTimeout(this._themeDebounce);
      this._themeDebounce = setTimeout(() => {
        this._patchMetadata({ theme: merged });
      }, 200);
    },

    _openPreview(path = "/") {
      const suffix = path === "/" ? "" : path;
      getIDE().openResource(`pages://preview/${this._getSlug()}${suffix}`);
    },

    _openPage(pageSlug) {
      getIDE().openResource(`pages://page/${this._getSlug()}/${pageSlug}`);
    },

    async _addPage() {
      const path = prompt(
        'Path for the new page (e.g. "/features"):',
        "/new-page",
      );
      if (!path) return;
      const normalized = normalizePath(path);
      const pageSlug = slugFromPath(normalized);
      const siteSlug = this._getSlug();
      const id = `${siteSlug}-${pageSlug}`;
      if (await $APP.Model.collections.get(id)) {
        alert(`A page with slug "${pageSlug}" already exists.`);
        return;
      }
      const displayName = pageSlug
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
      await $APP.Model.collections.add({
        id,
        slug: id,
        name: displayName,
        type: "page",
        icon: "file",
        _parent: siteSlug,
        metadata: { path: normalized, sections: [] },
      });
      await this._load();
      this._openPage(pageSlug);
    },

    async _removePage(pageSlug) {
      if (!confirm(`Delete page "${pageSlug}"?`)) return;
      const siteSlug = this._getSlug();
      await $APP.Model.collections.remove(`${siteSlug}-${pageSlug}`);
      await this._load();
    },

    async _publish() {
      await getIDE().executeCommand("pages.publish", { slug: this._getSlug() });
    },

    _renderTabs() {
      return html`<uix-tabs
        variant="underline"
        .activeTab=${this.activeTab}
        @tab-change=${(e) => (this.activeTab = e.detail)}
      >
        ${TABS.map(
          (tab) => html`<button slot="tab" class="inline-flex items-center gap-1.5">
            <uix-icon name=${tab.icon} size="14"></uix-icon>
            <span>${tab.label}</span>
          </button>`,
        )}
        <div slot="panel">${this._renderActiveTab()}</div>
      </uix-tabs>`;
    },

    _renderPagesTab() {
      return html`<div class="flex flex-col gap-3">
        <div class="flex items-center justify-between gap-3">
          <uix-text size="sm" muted>
            ${this.pages.length} page${this.pages.length === 1 ? "" : "s"}
          </uix-text>
          <uix-button border size="sm" @click=${() => this._addPage()}>
            <uix-icon name="plus" size="14"></uix-icon>
            Add page
          </uix-button>
        </div>
        ${this.pages.length === 0
          ? html`<div class="py-8 px-4 text-center border border-dashed border-dim rounded-lg">
              <uix-text size="sm" muted>
                No pages yet. Add one to get started.
              </uix-text>
            </div>`
          : html`<div class="flex flex-col gap-1.5">
              ${this.pages.map((page) => {
                const siteSlug = this._getSlug();
                const pageSlug = page.id.startsWith(`${siteSlug}-`)
                  ? page.id.slice(siteSlug.length + 1)
                  : page.id;
                const path = page.metadata?.path || "/";
                const sectionCount = (page.metadata?.sections || []).length;
                return html`<div class="flex items-center gap-1 pl-2.5 pr-1.5 py-1.5 rounded-lg border border-dim bg-surface transition-all duration-150 hover:border-muted">
                  <button
                    class="flex items-center gap-2.5 flex-1 min-w-0 bg-transparent border-none cursor-pointer text-left py-1 text-default"
                    @click=${() => this._openPage(pageSlug)}
                  >
                    <uix-icon name="file" size="16"></uix-icon>
                    <div class="flex flex-col gap-0.5 min-w-0">
                      <uix-text size="sm" weight="medium" class="overflow-hidden text-ellipsis whitespace-nowrap">
                        ${page.name || pageSlug}
                      </uix-text>
                      <uix-text size="xs" muted class="overflow-hidden text-ellipsis whitespace-nowrap">
                        ${path} · ${sectionCount} section${sectionCount === 1 ? "" : "s"}
                      </uix-text>
                    </div>
                  </button>
                  <div class="flex gap-0.5 shrink-0">
                    <uix-button
                      ghost
                      flat
                      size="xs"
                      title="Preview"
                      @click=${() => this._openPreview(path)}
                    >
                      <uix-icon name="eye" size="12"></uix-icon>
                    </uix-button>
                    <uix-button
                      ghost
                      flat
                      size="xs"
                      title="Delete"
                      @click=${() => this._removePage(pageSlug)}
                    >
                      <uix-icon name="trash-2" size="12"></uix-icon>
                    </uix-button>
                  </div>
                </div>`;
              })}
            </div>`}
      </div>`;
    },

    _renderHeaderTab() {
      const header = this._metadata().header || {
        type: "uix-site-header",
        props: {},
      };
      return html`<div class="flex flex-col gap-3">
        <bsp-props-editor
          .tag=${header.type}
          .props=${header.props || {}}
          @change=${(e) => this._setHeader(e.detail.props)}
        ></bsp-props-editor>
      </div>`;
    },

    _renderFooterTab() {
      const footer = this._metadata().footer || {
        type: "uix-footer",
        props: {},
      };
      return html`<div class="flex flex-col gap-3">
        <bsp-props-editor
          .tag=${footer.type}
          .props=${footer.props || {}}
          @change=${(e) => this._setFooter(e.detail.props)}
        ></bsp-props-editor>
      </div>`;
    },

    _renderThemeTab() {
      const theme = this._metadata().theme || null;
      return html`<div class="flex flex-col gap-3">
        <div class="text-[13px] text-muted">
          Theme is shared by every page in this website.
        </div>
        <uix-theme-editor
          class="border border-dim rounded-lg overflow-hidden bg-surface"
          .theme=${theme}
          .baseTheme=${uixPageDefaultTheme}
          .themeTokens=${this.themeTokens}
          .showSections=${THEME_EDITOR_SECTIONS}
          @change=${(e) => this._onThemeChange(e.detail.theme)}
        ></uix-theme-editor>
      </div>`;
    },

    async _loadGithubUser() {
      const token = oauth.getToken();
      if (!token || this.githubUser) return;
      try {
        const user = await fetchUser(token);
        this.githubUser = user.login;
        const meta = this._metadata();
        if (!meta.githubOwner) {
          await this._patchMetadata({ githubOwner: user.login });
        }
      } catch {}
    },

    _renderDeployTab() {
      const token = oauth.getToken();
      const meta = this._metadata();
      const owner = meta.githubOwner || "";
      const repo = meta.githubRepo || "";
      const branch = meta.githubBranch || "main";
      const domain = meta.githubDomain || "";
      const publishedUrl = meta.publishedUrl || "";

      if (!token) {
        return html`<div class="flex flex-col items-center gap-4 py-10 px-4 text-center">
          <uix-icon name="github" size="40" class="opacity-30"></uix-icon>
          <uix-text size="sm" muted>Log in with GitHub to deploy your website.</uix-text>
          <uix-button primary size="sm" @click=${() => getIDE().executeCommand("github.login")}>
            <uix-icon name="github" size="14" class="mr-1.5"></uix-icon>
            Login with GitHub
          </uix-button>
        </div>`;
      }

      if (!this.githubUser) this._loadGithubUser();

      const labelCls = "text-xs text-muted font-medium";
      const inputCls = "bg-surface border border-dim rounded-md px-2.5 py-1.5 text-sm text-default outline-none w-full focus:border-primary";
      const computedUrl = domain
        ? `https://${domain}/`
        : owner && repo ? `https://${owner}.github.io/${repo}/` : "";

      return html`<div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label class=${labelCls}>Repository Owner</label>
          <input
            class=${inputCls}
            .value=${owner}
            placeholder=${this.githubUser || "username"}
            @change=${(e) => this._patchMetadata({ githubOwner: e.target.value.trim() })}
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class=${labelCls}>Repository Name</label>
          <input
            class=${inputCls}
            .value=${repo}
            placeholder="my-website"
            @change=${(e) => this._patchMetadata({ githubRepo: e.target.value.trim() })}
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class=${labelCls}>Branch</label>
          <input
            class=${inputCls}
            .value=${branch}
            placeholder="main"
            @change=${(e) => this._patchMetadata({ githubBranch: e.target.value.trim() || "main" })}
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class=${labelCls}>Custom Domain</label>
          <input
            class=${inputCls}
            .value=${domain}
            placeholder="mysite.com (optional)"
            @change=${(e) => this._patchMetadata({ githubDomain: e.target.value.trim() })}
          />
        </div>

        ${computedUrl ? html`
          <div class="flex items-center gap-2 px-3 py-2 bg-surface-dark rounded-md">
            <uix-icon name="globe" size="14" class="text-muted shrink-0"></uix-icon>
            <a href=${computedUrl} target="_blank" rel="noopener" class="text-sm text-primary truncate hover:underline">${computedUrl}</a>
          </div>
        ` : ""}

        <div class="flex items-center gap-3 pt-2">
          <uix-button
            primary
            size="sm"
            ?disabled=${!owner || !repo || this.publishing}
            @click=${async () => {
              this.publishing = true;
              try {
                await getIDE().executeCommand("pages.publish", { slug: this._getSlug() });
                await this._load();
              } catch (e) {
                console.error("Publish failed:", e);
              }
              this.publishing = false;
            }}
          >
            ${this.publishing
              ? html`<uix-spinner size="xs" class="mr-1.5"></uix-spinner> Publishing…`
              : html`<uix-icon name="upload" size="14" class="mr-1.5"></uix-icon> Publish`}
          </uix-button>
          ${meta.lastPublished ? html`
            <uix-text size="xs" muted>Last published: ${new Date(meta.lastPublished).toLocaleString()}</uix-text>
          ` : ""}
        </div>

        ${!owner || !repo ? html`
          <uix-text size="xs" muted>Configure the repository owner and name to enable publishing.</uix-text>
        ` : ""}
      </div>`;
    },

    _renderActiveTab() {
      const id = TABS[this.activeTab]?.id || "pages";
      switch (id) {
        case "header":
          return this._renderHeaderTab();
        case "footer":
          return this._renderFooterTab();
        case "theme":
          return this._renderThemeTab();
        case "deploy":
          return this._renderDeployTab();
        case "pages":
        default:
          return this._renderPagesTab();
      }
    },

    render() {
      if (this.loading) {
        return html`<div class="flex items-center justify-center min-h-[300px]">
          <uix-text muted>Loading…</uix-text>
        </div>`;
      }
      if (!this.website) {
        return html`<div class="flex items-center justify-center min-h-[300px]">
          <uix-text muted>Website not found.</uix-text>
        </div>`;
      }

      const metadata = this._metadata();

      return html`<div class="w-full h-full overflow-y-auto">
        <div class="max-w-[860px] mx-auto px-6 pt-7 pb-14 flex flex-col gap-5">
        <div class="flex items-start justify-between gap-4 pb-4 border-b border-dim">
          <div class="flex items-center gap-3">
            <uix-icon
              name="globe"
              size="22"
              class="text-primary opacity-85"
            ></uix-icon>
            <div>
              <uix-heading level="2" size="xl"
                >${this.website.name || this._getSlug()}</uix-heading
              >
              ${metadata.tagline
                ? html`<uix-text size="sm" muted>${metadata.tagline}</uix-text>`
                : ""}
            </div>
          </div>
          <div class="flex gap-2 shrink-0">
            <uix-button
              border
              size="sm"
              @click=${() => this._openPreview()}
            >
              <uix-icon name="eye" size="14"></uix-icon>
              Preview
            </uix-button>
            <uix-button primary size="sm" @click=${() => this._publish()}>
              <uix-icon name="upload" size="14"></uix-icon>
              Publish
            </uix-button>
          </div>
        </div>

        ${this._renderTabs()}

        ${metadata.lastPublished
          ? html`<div class="pt-4 border-t border-dim">
              <uix-text size="xs" muted
                >Last published:
                ${new Date(metadata.lastPublished).toLocaleString()}</uix-text
              >
            </div>`
          : ""}
      </div></div>`;
    },
  };
}
