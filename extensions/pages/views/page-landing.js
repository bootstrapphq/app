const normalizePath = (path) => {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  if (!trimmed) return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

export default function (ctx) {
  const { $APP, html, T } = ctx;

  return {
    tag: "bsp-page-landing",
    properties: {
      uri: T.string({ defaultValue: "" }),
      slug: T.string({ defaultValue: "" }),
      pagePath: T.string({ defaultValue: "/" }),
      website: T.object({ attribute: false, defaultValue: null }),
      page: T.object({ attribute: false, defaultValue: null }),
      loading: T.boolean({ defaultValue: true }),
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
            this.pagePath = normalizePath(rest.slice(firstSlash));
          }
        }
      }
      if (!this.pagePath) this.pagePath = "/";
      if (this.slug) await this._loadWebsite();
      this._unsub = $APP.events.on("content:change", () => {
        if (this.slug) this._loadWebsite();
      });
    },

    disconnected() {
      this._unsub?.();
    },

    async _loadWebsite() {
      this.loading = true;
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
      } catch (e) {
        console.warn("[page-landing] Failed to load website:", e);
        this.website = null;
        this.page = null;
      }
      this.loading = false;
    },

    render() {
      if (this.loading) {
        return html`<div class="w-full min-h-screen block py-12 px-6 text-center text-muted text-sm">
          <p>Loading…</p>
        </div>`;
      }
      if (!this.website) {
        return html`<div class="w-full min-h-screen block py-12 px-6 text-center text-muted text-sm">
          <p>Website not found.</p>
        </div>`;
      }
      if (!this.page) {
        return html`<div class="w-full min-h-screen block py-12 px-6 text-center text-muted text-sm">
          <p>Page not found at ${this.pagePath}.</p>
        </div>`;
      }

      const siteMeta = this.website.metadata || {};
      const pageMeta = this.page.metadata || {};
      return html`<uix-page
        .theme=${siteMeta.theme || null}
        .header=${siteMeta.header || null}
        .footer=${siteMeta.footer || null}
        .sections=${pageMeta.sections || []}
      ></uix-page>`;
    },
  };
}
