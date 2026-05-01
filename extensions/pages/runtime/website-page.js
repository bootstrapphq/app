import $APP from "bootstrapp";
import { html } from "lit-html";
import T from "/node_modules/@bootstrapp/types/index.js";
import { applyTheme } from "/node_modules/@bootstrapp/theme/index.js";
import { waitForBackend } from "/node_modules/@bootstrapp/base/preview-utils.js";

const normalizePath = (path) => {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  if (!trimmed) return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

$APP.define("bsp-website-page", {
  tag: "bsp-website-page",
  properties: {
    slug: T.string(),
    pagePath: T.string({ defaultValue: "/" }),
    website: T.object({ attribute: false }),
    page: T.object({ attribute: false }),
    loading: T.boolean({ defaultValue: true }),
    error: T.string({ defaultValue: "" }),
  },

  async connected() {
    await this._load();
    this._setupLiveReload();
  },

  async _load() {
    this.loading = true;
    this.error = "";

    try {
      await waitForBackend("collections");

      const website = await $APP.Model.collections.get(this.slug);
      if (!website) {
        this.error = `Website not found: ${this.slug}`;
        this.loading = false;
        return;
      }

      this.website = website;
      const metadata = website.metadata || {};

      document.title = website.name || this.slug;

      if (website.icon) {
        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.type = "image/svg+xml";
        link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${website.icon}</text></svg>`;
      }

      if (metadata.theme) {
        applyTheme(metadata.theme);
      }

      const all = await $APP.Model.collections.getAll();
      const pages = all.filter((c) => c.type === "page" && c._parent === this.slug);
      const target = normalizePath(this.pagePath);

      this.page =
        pages.find((p) => normalizePath(p.metadata?.path) === target) ||
        pages.find((p) => normalizePath(p.metadata?.path) === "/") ||
        null;

      if (!this.page) {
        this.error = `No page at ${target} for ${this.slug}`;
      }
    } catch (e) {
      this.error = e.message;
    }

    this.loading = false;
  },

  _setupLiveReload() {
    const previewThemeKey = `pages://website/${this.slug}:previewTheme`;
    const target = normalizePath(this.pagePath);
    const previewSectionsKey = `pages://website/${this.slug}:previewSections:${target}`;

    this._storageHandler = (e) => {
      if (e.key === previewThemeKey && e.newValue) {
        try {
          const theme = JSON.parse(e.newValue);
          const meta = { ...(this.website?.metadata || {}), theme };
          this.website = { ...this.website, metadata: meta };
          applyTheme(theme);
        } catch {}
        return;
      }
      if (e.key === previewSectionsKey && e.newValue && e.newValue !== "undefined") {
        try {
          const sections = JSON.parse(e.newValue);
          const pageMeta = { ...(this.page?.metadata || {}), sections };
          this.page = { ...this.page, metadata: pageMeta };
        } catch {}
      }
    };
    window.addEventListener("storage", this._storageHandler);
  },

  disconnected() {
    if (this._storageHandler) {
      window.removeEventListener("storage", this._storageHandler);
    }
  },

  render() {
    if (this.loading) return html``;

    if (this.error) {
      return html`<div style="padding:40px;font-family:system-ui;text-align:center">
        <h1>Error</h1><p>${this.error}</p>
      </div>`;
    }

    const metadata = this.website?.metadata || {};
    const pageMeta = this.page?.metadata || {};

    return html`<uix-page
      .theme=${metadata.theme || null}
      .header=${metadata.header || null}
      .footer=${metadata.footer || null}
      .sections=${pageMeta.sections || []}
    ></uix-page>`;
  },
});
