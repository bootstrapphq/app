import uixPageDefaultTheme from "/node_modules/@bootstrapp/uix/page/theme.js";
import { collectThemeTokens } from "/node_modules/@bootstrapp/uix/theme/collect.js";

const DEVICES = [
  { id: "desktop", icon: "monitor", label: "Desktop", width: "100%" },
  { id: "tablet", icon: "tablet", label: "Tablet", width: "768px" },
  { id: "mobile", icon: "smartphone", label: "Mobile", width: "375px" },
];

const THEME_EDITOR_SECTIONS = ["typography", "colors", "edges"];

const normalizePath = (path) => {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  if (!trimmed) return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

export default function (ctx) {
  const { $APP, html, T } = ctx;

  return {
    tag: "bsp-website-preview",
    properties: {
      uri: T.string({ defaultValue: "" }),
      slug: T.string({ defaultValue: "" }),
      pagePath: T.string({ defaultValue: "/" }),
      device: T.string({ defaultValue: "desktop" }),
      showTheme: T.boolean({ defaultValue: false }),
      showSections: T.boolean({ defaultValue: false }),
      website: T.object({ attribute: false, defaultValue: null }),
      page: T.object({ attribute: false, defaultValue: null }),
      themeTokens: T.object({ attribute: false, defaultValue: null }),
    },

    async connected() {
      if ((!this.slug || !this.pagePath) && this.uri) {
        const path = this.uri.replace("pages://", "");
        if (path.startsWith("preview/")) {
          const rest = path.replace("preview/", "");
          const firstSlash = rest.indexOf("/");
          if (firstSlash === -1) {
            this.slug = rest;
            this.pagePath = "/";
          } else {
            this.slug = rest.slice(0, firstSlash);
            this.pagePath = rest.slice(firstSlash);
          }
        }
      }
      await this._loadData();
      this._unsub = $APP.events.on("content:change", () => this._loadData());
    },

    disconnected() {
      this._unsub?.();
      clearTimeout(this._themeDebounce);
      clearTimeout(this._sectionsDebounce);
    },

    async _loadData() {
      if (!this.slug) return;
      try {
        this.website = await $APP.Model.collections.get(this.slug);
        const all = await $APP.Model.collections.getAll();
        const pages = all.filter(
          (c) => c.type === "page" && c._parent === this.slug,
        );
        const target = normalizePath(this.pagePath);
        this.page =
          pages.find((p) => normalizePath(p.metadata?.path) === target) ||
          pages.find((p) => normalizePath(p.metadata?.path) === "/") ||
          null;
        const meta = this.website?.metadata || {};
        const descriptors = [
          meta.header,
          meta.footer,
          ...pages.flatMap((p) => p.metadata?.sections || []),
        ].filter(Boolean);
        this.themeTokens = await collectThemeTokens(descriptors);
      } catch (e) {
        console.warn("[website-preview] Failed to load data:", e);
      }
    },

    _onThemeChange(sparse) {
      const current = this.website?.metadata?.theme || {};
      const merged = { ...current };
      for (const [cat, keys] of Object.entries(sparse || {})) {
        merged[cat] = { ...(current[cat] || {}), ...keys };
      }
      const key = `pages://website/${this.slug}:previewTheme`;
      localStorage.setItem(key, JSON.stringify(merged));
      clearTimeout(this._themeDebounce);
      this._themeDebounce = setTimeout(async () => {
        if (!this.website) return;
        const metadata = { ...(this.website.metadata || {}), theme: merged };
        await $APP.Model.collections.edit({ id: this.website.id, metadata });
        this.website = { ...this.website, metadata };
      }, 200);
    },

    _onSectionsChange(sections) {
      if (!this.page) return;
      const normalized = normalizePath(this.pagePath);
      const key = `pages://website/${this.slug}:previewSections:${normalized}`;
      localStorage.setItem(key, JSON.stringify(sections));
      const metadata = { ...(this.page.metadata || {}), sections };
      this.page = { ...this.page, metadata };
      clearTimeout(this._sectionsDebounce);
      this._sectionsDebounce = setTimeout(async () => {
        await $APP.Model.collections.edit({ id: this.page.id, metadata });
      }, 200);
    },

    _getIframeSrc() {
      const suffix =
        !this.pagePath || this.pagePath === "/" ? "" : this.pagePath;
      return `/_website/${this.slug}${suffix}/`;
    },

    _refresh() {
      const iframe = this.querySelector("iframe");
      if (iframe) iframe.src = iframe.src;
    },

    _openExternal() {
      window.open(this._getIframeSrc(), "_blank");
    },

    render() {
      if (!this.slug) {
        return html`<div class="flex items-center justify-center h-full"><uix-text muted>No website selected.</uix-text></div>`;
      }

      const currentDevice = DEVICES.find((d) => d.id === this.device) || DEVICES[0];
      const deviceStyle = this.device !== "desktop" ? `width: ${currentDevice.width}; border-left: 1px solid var(--border-color); border-right: 1px solid var(--border-color); box-shadow: 0 0 40px rgba(0,0,0,0.3);` : `width: ${currentDevice.width}`;

      return html`
        <div class="flex flex-col h-full overflow-hidden">
        <div class="flex items-center gap-3 px-3 py-1.5 bg-surface border-b border-dim shrink-0">
          <div class="flex gap-0.5">
            ${DEVICES.map((d) => html`
              <uix-button ghost flat size="sm"
                style=${d.id === this.device ? "--uix-button-background: color-mix(in srgb, var(--color-primary) 15%, transparent); --uix-button-color: var(--color-primary); --uix-button-border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);" : ""}
                title=${d.label}
                @click=${() => { this.device = d.id; }}
              >
                <uix-icon name=${d.icon} size="16"></uix-icon>
              </uix-button>
            `)}
          </div>
          <div class="flex-1 text-center text-[0.7rem] text-muted font-mono overflow-hidden text-ellipsis whitespace-nowrap opacity-70">${this._getIframeSrc()}</div>
          <div class="flex gap-0.5">
            <uix-button ghost flat size="xs" title="Refresh" @click=${() => this._refresh()}>
              <uix-icon name="refresh-cw" size="14"></uix-icon>
            </uix-button>
            <uix-button ghost flat size="xs" title="Open in new tab" @click=${() => this._openExternal()}>
              <uix-icon name="external-link" size="14"></uix-icon>
            </uix-button>
            <uix-button
              ghost
              flat
              size="xs"
              style=${this.showSections ? "--uix-button-background: color-mix(in srgb, var(--color-primary) 15%, transparent); --uix-button-color: var(--color-primary); --uix-button-border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);" : ""}
              title="Sections"
              @click=${() => {
                this.showSections = !this.showSections;
              }}
            >
              <uix-icon name="layers" size="14"></uix-icon>
            </uix-button>
            <uix-button
              ghost
              flat
              size="xs"
              style=${this.showTheme ? "--uix-button-background: color-mix(in srgb, var(--color-primary) 15%, transparent); --uix-button-color: var(--color-primary); --uix-button-border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);" : ""}
              title="Theme"
              @click=${() => {
                this.showTheme = !this.showTheme;
              }}
            >
              <uix-icon name="palette" size="14"></uix-icon>
            </uix-button>
          </div>
        </div>
        <div class="flex-1 flex justify-center overflow-auto bg-[#1a1a1a] relative">
          <div class="h-full relative transition-[width] duration-300 ease-in-out" style="${deviceStyle}">
            <iframe src=${this._getIframeSrc()} class="w-full h-full border-none block"></iframe>
          </div>
          ${this.showTheme
            ? html`<aside class="absolute top-0 right-0 bottom-0 w-[340px] bg-surface border-l border-dim shadow-[-8px_0_24px_rgba(0,0,0,0.35)] flex flex-col z-10 overflow-hidden">
                <div class="flex items-center justify-between px-3.5 py-2.5 border-b border-dim shrink-0">
                  <uix-heading level="3" size="md">Theme</uix-heading>
                  <uix-button
                    ghost
                    flat
                    size="xs"
                    title="Close"
                    @click=${() => {
                      this.showTheme = false;
                    }}
                  >
                    <uix-icon name="x" size="14"></uix-icon>
                  </uix-button>
                </div>
                <div class="flex-1 overflow-y-auto px-3.5 py-3">
                  <uix-theme-editor
                    .theme=${this.website?.metadata?.theme || null}
                    .baseTheme=${uixPageDefaultTheme}
                    .themeTokens=${this.themeTokens}
                    .showSections=${THEME_EDITOR_SECTIONS}
                    @change=${(e) => this._onThemeChange(e.detail.theme)}
                  ></uix-theme-editor>
                </div>
              </aside>`
            : ""}
          ${this.showSections
            ? html`<aside
                class="absolute top-0 bottom-0 w-[340px] bg-surface border-l border-dim shadow-[-8px_0_24px_rgba(0,0,0,0.35)] flex flex-col z-10 overflow-hidden ${this.showTheme ? "right-[340px] border-r" : "right-0"}"
              >
                <div class="flex items-center justify-between px-3.5 py-2.5 border-b border-dim shrink-0">
                  <uix-heading level="3" size="md">Sections</uix-heading>
                  <uix-button
                    ghost
                    flat
                    size="xs"
                    title="Close"
                    @click=${() => {
                      this.showSections = false;
                    }}
                  >
                    <uix-icon name="x" size="14"></uix-icon>
                  </uix-button>
                </div>
                <div class="flex-1 overflow-y-auto px-3.5 py-3">
                  ${this.page
                    ? html`<bsp-sections-editor
                        .sections=${this.page?.metadata?.sections || []}
                        @change=${(e) => this._onSectionsChange(e.detail.sections)}
                      ></bsp-sections-editor>`
                    : html`<uix-text muted>No page loaded.</uix-text>`}
                </div>
              </aside>`
            : ""}
        </div>
        </div>
      `;
    },
  };
}
