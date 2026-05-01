export default function (ctx) {
  const { $APP, html, T, getIDE } = ctx;

  return {
    tag: "bsp-pages-sidebar",
    properties: {
      websites: T.array({ defaultValue: [] }),
      pagesBySite: T.object({ attribute: false, defaultValue: {} }),
      expanded: T.object({ attribute: false, defaultValue: {} }),
      loading: T.boolean({ defaultValue: true }),
      publishingSlug: T.string({ defaultValue: "" }),
    },

    async connected() {
      await this._load();
      this._unsub = $APP.events.on("content:change", () => this._load());
    },

    disconnected() {
      this._unsub?.();
    },

    async _load() {
      this.loading = true;
      try {
        const all = await $APP.Model.collections.getAll();
        this.websites = all
          .filter((c) => c.type === "website")
          .map((c) => ({ ...c, ...(c.metadata || {}) }));
        const byParent = {};
        for (const c of all) {
          if (c.type === "page" && c._parent) {
            (byParent[c._parent] ||= []).push(c);
          }
        }
        for (const parent of Object.keys(byParent)) {
          byParent[parent].sort((a, b) => {
            const pa = a.metadata?.path || "";
            const pb = b.metadata?.path || "";
            if (pa === "/") return -1;
            if (pb === "/") return 1;
            return pa.localeCompare(pb);
          });
        }
        this.pagesBySite = byParent;
      } catch (e) {
        console.error("[pages-sidebar] Failed to load:", e);
      }
      this.loading = false;
    },

    _toggle(slug) {
      this.expanded = {
        ...this.expanded,
        [slug]: !this.expanded[slug],
      };
    },

    _openWebsite(slug) {
      getIDE().openResource(`pages://website/${slug}`);
    },

    _openPage(slug, pageSlug) {
      getIDE().openResource(`pages://page/${slug}/${pageSlug}`);
    },

    _openPreview(slug, path = "/") {
      const suffix = path === "/" ? "" : path;
      getIDE().openResource(`pages://preview/${slug}${suffix}`);
    },

    async _publish(slug) {
      this.publishingSlug = slug;
      try {
        await getIDE().executeCommand("pages.publish", { slug });
      } catch (e) {
        console.error("[pages-sidebar] Publish failed:", e);
      }
      this.publishingSlug = "";
    },

    _newWebsite() {
      getIDE().executeCommand("pages.newWebsite");
    },

    _formatTime(iso) {
      if (!iso) return "";
      const d = new Date(iso);
      const now = new Date();
      const diff = now - d;
      if (diff < 60000) return "just now";
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
      return d.toLocaleDateString();
    },

    render() {
      return html`
        <div class="flex flex-col w-full h-full">
          <div class="flex items-center gap-2 px-3.5 pt-3 pb-2">
            <uix-icon name="globe" size="16" class="opacity-60"></uix-icon>
            <uix-text weight="medium" size="sm">Pages</uix-text>
          </div>
          <div class="flex-1 overflow-y-auto px-3 pb-4 pt-2 flex flex-col gap-3">
            <uix-button border size="sm" wFull @click=${() => this._newWebsite()}>
              <uix-icon name="plus" size="14"></uix-icon>
              New Website
            </uix-button>

            ${this.loading
              ? html`<div class="flex items-center justify-center p-6">
                  <uix-text size="xs" muted>Loading…</uix-text>
                </div>`
              : this.websites.length === 0
                ? html`<div class="flex flex-col items-center gap-3 py-6 px-2 text-center">
                    <uix-icon
                      name="globe"
                      size="32"
                      class="opacity-20"
                    ></uix-icon>
                    <uix-text size="xs" muted class="text-center">
                      No websites yet. Create one from a template to get
                      started.
                    </uix-text>
                  </div>`
                : html`<div class="flex flex-col gap-1.5">
                    ${this.websites.map((w) => {
                      const slug = w.slug || w.id;
                      const pages = this.pagesBySite[slug] || [];
                      const isOpen = !!this.expanded[slug];
                      return html`<div class="flex flex-col gap-0.5">
                        <div class="flex items-center gap-1 pl-2.5 pr-1.5 py-1.5 rounded-lg border border-dim bg-surface transition-all duration-150 hover:border-muted">
                          <button
                            class="flex items-center justify-center w-5 h-5 p-0 bg-transparent border-none cursor-pointer text-muted shrink-0 hover:text-default"
                            title=${isOpen ? "Collapse" : "Expand"}
                            @click=${(e) => {
                              e.stopPropagation();
                              this._toggle(slug);
                            }}
                          >
                            <uix-icon
                              name=${isOpen ? "chevron-down" : "chevron-right"}
                              size="12"
                            ></uix-icon>
                          </button>
                          <button
                            class="flex items-center gap-2.5 flex-1 min-w-0 bg-transparent border-none cursor-pointer text-left py-1 text-default"
                            @click=${() => this._openWebsite(slug)}
                          >
                            <uix-icon
                              name=${w.icon || "globe"}
                              size="16"
                            ></uix-icon>
                            <div class="flex flex-col gap-0.5 min-w-0">
                              <uix-text size="sm" weight="medium" class="overflow-hidden text-ellipsis whitespace-nowrap"
                                >${w.name || slug}</uix-text
                              >
                              ${w.lastPublished
                                ? html`<div class="flex items-center gap-1 min-w-0">
                                    <uix-text size="xs" muted class="overflow-hidden text-ellipsis whitespace-nowrap"
                                      >Published ${this._formatTime(w.lastPublished)}</uix-text
                                    >${w.publishedUrl ? html`<a
                                      href=${w.publishedUrl}
                                      target="_blank"
                                      rel="noopener"
                                      class="shrink-0 text-primary"
                                      title=${w.publishedUrl}
                                      @click=${(e) => e.stopPropagation()}
                                    ><uix-icon name="external-link" size="10"></uix-icon></a>` : ""}
                                  </div>`
                                : html`<uix-text size="xs" muted class="overflow-hidden text-ellipsis whitespace-nowrap"
                                    >${pages.length} page${pages.length === 1
                                      ? ""
                                      : "s"}</uix-text
                                  >`}
                            </div>
                          </button>
                          <div class="flex gap-0.5 shrink-0">
                            <uix-button
                              ghost
                              flat
                              size="xs"
                              title="Preview"
                              @click=${(e) => {
                                e.stopPropagation();
                                this._openPreview(slug);
                              }}
                            >
                              <uix-icon name="eye" size="12"></uix-icon>
                            </uix-button>
                            <uix-button
                              ghost
                              flat
                              size="xs"
                              title="Publish"
                              ?disabled=${this.publishingSlug === slug}
                              @click=${(e) => {
                                e.stopPropagation();
                                this._publish(slug);
                              }}
                            >
                              ${this.publishingSlug === slug
                                ? html`<uix-spinner size="xs"></uix-spinner>`
                                : html`<uix-icon
                                    name="upload"
                                    size="12"
                                  ></uix-icon>`}
                            </uix-button>
                          </div>
                        </div>
                        ${isOpen
                          ? html`<div class="flex flex-col gap-0.5 pl-5">
                              ${pages.length === 0
                                ? html`<div class="py-1 px-2.5">
                                    <uix-text size="xs" muted
                                      >No pages yet.</uix-text
                                    >
                                  </div>`
                                : pages.map((p) => {
                                    const pageSlug = p.id.startsWith(`${slug}-`)
                                      ? p.id.slice(slug.length + 1)
                                      : p.id;
                                    const path = p.metadata?.path || "/";
                                    return html`<button
                                      class="flex items-center gap-1.5 px-2.5 py-1 bg-transparent border-none rounded-md cursor-pointer text-left text-default hover:bg-surface-light"
                                      @click=${() =>
                                        this._openPage(slug, pageSlug)}
                                    >
                                      <uix-icon
                                        name="file"
                                        size="12"
                                      ></uix-icon>
                                      <uix-text size="xs"
                                        >${p.name || pageSlug}</uix-text
                                      >
                                      <uix-text size="xs" muted class="ml-auto font-mono"
                                        >${path}</uix-text
                                      >
                                    </button>`;
                                  })}
                            </div>`
                          : ""}
                      </div>`;
                    })}
                  </div>`}
          </div>
        </div>
      `;
    },
  };
}
