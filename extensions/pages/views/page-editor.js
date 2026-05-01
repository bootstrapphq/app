const normalizePath = (path) => {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  if (!trimmed) return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

export default function (ctx) {
  const { $APP, html, T, getIDE } = ctx;

  return {
    tag: "bsp-page-editor",
    properties: {
      uri: T.string({ defaultValue: "" }),
      siteSlug: T.string({ defaultValue: "" }),
      pageSlug: T.string({ defaultValue: "" }),
      website: T.object({ attribute: false, defaultValue: null }),
      page: T.object({ attribute: false, defaultValue: null }),
      loading: T.boolean({ defaultValue: true }),
    },

    async connected() {
      if (!this.siteSlug || !this.pageSlug) {
        const path = this.uri.replace("pages://", "").replace("page/", "");
        const firstSlash = path.indexOf("/");
        if (firstSlash !== -1) {
          this.siteSlug = path.slice(0, firstSlash);
          this.pageSlug = path.slice(firstSlash + 1);
        }
      }
      await this._load();
      this._unsub = $APP.events.on("content:change", () => this._load());
    },

    disconnected() {
      this._unsub?.();
    },

    async _load() {
      this.loading = true;
      try {
        this.website = await $APP.Model.collections.get(this.siteSlug);
        this.page = await $APP.Model.collections.get(
          `${this.siteSlug}-${this.pageSlug}`,
        );
      } catch (e) {
        console.warn("[page-editor] Failed to load:", e);
      }
      this.loading = false;
    },

    async _patchPage(patch) {
      const id = `${this.siteSlug}-${this.pageSlug}`;
      const current = await $APP.Model.collections.get(id);
      if (!current) return;
      const updated = { ...current, ...patch };
      if (patch.metadata) {
        updated.metadata = { ...(current.metadata || {}), ...patch.metadata };
      }
      await $APP.Model.collections.edit({
        id: current.id,
        name: updated.name,
        metadata: updated.metadata,
      });
      this.page = updated;
    },

    async _setSections(sections) {
      await this._patchPage({ metadata: { sections } });
    },

    async _setPath(path) {
      const normalized = normalizePath(path);
      await this._patchPage({ metadata: { path: normalized } });
    },

    async _setName(name) {
      await this._patchPage({ name });
    },

    _openPreview() {
      const path = this.page?.metadata?.path || "/";
      const suffix = path === "/" ? "" : path;
      getIDE().openResource(`pages://preview/${this.siteSlug}${suffix}`);
    },

    _openWebsite() {
      getIDE().openResource(`pages://website/${this.siteSlug}`);
    },

    render() {
      if (this.loading) {
        return html`<div class="flex items-center justify-center min-h-[300px]">
          <uix-text muted>Loading…</uix-text>
        </div>`;
      }
      if (!this.page) {
        return html`<div class="flex items-center justify-center min-h-[300px]">
          <uix-text muted>Page not found.</uix-text>
        </div>`;
      }

      const meta = this.page.metadata || {};

      return html`<div class="w-full h-full overflow-y-auto">
        <div class="max-w-[860px] mx-auto px-6 pt-7 pb-14 flex flex-col gap-5">
        <div class="flex items-center justify-between gap-4 pb-4 border-b border-dim">
          <div class="flex items-center gap-2">
            <button class="border-none bg-transparent p-0 text-[13px] text-muted cursor-pointer hover:text-default hover:underline" @click=${() => this._openWebsite()}>
              ${this.website?.name || this.siteSlug}
            </button>
            <uix-icon name="chevron-right" size="14" class="opacity-40"></uix-icon>
            <uix-text weight="medium">${this.page.name || this.pageSlug}</uix-text>
          </div>
          <div class="flex gap-2">
            <uix-button border size="sm" @click=${() => this._openPreview()}>
              <uix-icon name="eye" size="14"></uix-icon>
              Preview
            </uix-button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <label class="flex flex-col gap-1.5">
            <span class="text-[11px] font-semibold uppercase tracking-wide text-muted">Name</span>
            <uix-input
              .value=${this.page.name || ""}
              @change=${(e) => this._setName(e.target.value)}
            ></uix-input>
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-[11px] font-semibold uppercase tracking-wide text-muted">Path</span>
            <uix-input
              .value=${meta.path || "/"}
              @change=${(e) => this._setPath(e.target.value)}
            ></uix-input>
          </label>
        </div>

        <div class="flex flex-col gap-3">
          <bsp-sections-editor
            .sections=${meta.sections || []}
            @change=${(e) => this._setSections(e.detail.sections)}
          ></bsp-sections-editor>
        </div>
      </div></div>`;
    },
  };
}
