import Controller from "/node_modules/@bootstrapp/controller/index.js";
import { createOAuthManager } from "/node_modules/@bootstrapp/github/oauth.js";
import { commitFiles, enableGitHubPages } from "/node_modules/@bootstrapp/github/repo.js";
import websiteTemplate from "./templates/website/index.js";
import blogTemplate from "./templates/blog/index.js";
import changelogTemplate from "./templates/changelog/index.js";
import landingPageTemplate from "./templates/bootstrapp-showcase/index.js";
import pagesSidebarView from "./views/pages-sidebar.js";
import pageLandingView from "./views/page-landing.js";
import pageEditorView from "./views/page-editor.js";
import websiteManagerView from "./views/website-manager.js";
import websitePreviewView from "./views/website-preview.js";
import propsEditorView from "./views/props-editor.js";
import sectionsEditorView from "./views/sections-editor.js";

export default function (ctx) {
  const { $APP, html, createPlugin, getIDE, registerTemplate, registerView } = ctx;

  registerView(pagesSidebarView);
  registerView(pageLandingView);
  registerView(pageEditorView);
  registerView(websiteManagerView);
  registerView(websitePreviewView);
  registerView(propsEditorView);
  registerView(sectionsEditorView);

  const oauth = createOAuthManager();
  const titleCache = new Map();

  const ownedTemplates = [
    landingPageTemplate,
    websiteTemplate,
    blogTemplate,
    changelogTemplate,
  ];

  return createPlugin({
    id: "pages",
    name: "Pages",
    icon: "globe",
    title: "Pages",
    order: 50,
    route: "/pages",
    sidebarComponent: "bsp-pages-sidebar",
    scheme: "pages",

    resources: {
      async getContent(uri) {
        const path = uri.replace("pages://", "");

        if (path.startsWith("website/")) {
          const slug = path.replace("website/", "");
          const website = await $APP.Model.collections.get(slug);
          if (website) {
            titleCache.set(uri, website.name || slug);
          }
          return { type: "pages", path, uri };
        }

        if (path.startsWith("page/")) {
          const rest = path.replace("page/", "");
          const firstSlash = rest.indexOf("/");
          if (firstSlash !== -1) {
            const recordId = `${rest.slice(0, firstSlash)}-${rest.slice(firstSlash + 1)}`;
            const page = await $APP.Model.collections.get(recordId);
            if (page) titleCache.set(uri, page.name || recordId);
          }
          return { type: "pages", path, uri };
        }

        return { type: "pages", path, uri };
      },

      async saveContent() {},

      async rename() {},

      async search(term, options) {
        const all = await $APP.Model.collections.getAll();
        const lowerTerm = options?.matchCase ? term : term.toLowerCase();
        const results = {};
        for (const record of all) {
          if (record.type !== "website" && record.type !== "page") continue;
          const hay = options?.matchCase
            ? record.name || ""
            : (record.name || "").toLowerCase();
          if (!hay.includes(lowerTerm)) continue;
          const matches = [{ line: 1, content: record.name }];
          if (record.type === "website") {
            results[`pages://website/${record.slug || record.id}`] = matches;
          } else if (record._parent) {
            const leaf = record.id.startsWith(`${record._parent}-`)
              ? record.id.slice(record._parent.length + 1)
              : record.id;
            results[`pages://page/${record._parent}/${leaf}`] = matches;
          }
        }
        return results;
      },

      getTabMetadata(uri) {
        const path = uri.replace("pages://", "");

        if (path.startsWith("website/")) {
          const slug = path.replace("website/", "");
          const label = titleCache.get(uri) || slug;
          return { label, icon: "globe", component: "bsp-website-manager" };
        }

        if (path.startsWith("page/")) {
          const pageId = path.replace("page/", "");
          const label = titleCache.get(uri) || pageId;
          return { label, icon: "file", component: "bsp-page-editor" };
        }

        if (path.startsWith("preview/")) {
          const rest = path.replace("preview/", "");
          const firstSlash = rest.indexOf("/");
          const slug = firstSlash === -1 ? rest : rest.slice(0, firstSlash);
          const pagePath = firstSlash === -1 ? "/" : rest.slice(firstSlash);
          const label =
            pagePath === "/"
              ? `Preview: ${slug}`
              : `Preview: ${slug}${pagePath}`;
          return { label, icon: "eye", component: "bsp-website-preview" };
        }

        return { label: "Pages", icon: "globe", component: "bsp-pages-sidebar" };
      },

      getTabActions(uri) {
        const path = uri.replace("pages://", "");

        if (path.startsWith("website/")) {
          const slug = path.replace("website/", "");
          return [
            {
              icon: "eye",
              label: "Preview",
              command: "pages.openPreview",
              args: { slug },
            },
          ];
        }

        if (path.startsWith("page/")) {
          const pageId = path.replace("page/", "");
          const firstSlash = pageId.indexOf("/");
          const siteSlug = firstSlash === -1 ? pageId : pageId.slice(0, firstSlash);
          return [
            {
              icon: "globe",
              label: "Open website",
              command: "pages.openWebsite",
              args: { slug: siteSlug },
            },
          ];
        }

        return [];
      },
    },

    menus: {
      Pages: [
        { label: "New Website", command: "pages.newWebsite" },
        { separator: true },
        { label: "Publish", command: "pages.publish" },
      ],
    },

    onSetup(api, ide) {
      (ide.quickAccessItems ||= []).push({
        label: "New Website",
        icon: "globe",
        command: "pages.newWebsite",
        section: "create",
        order: 50,
      });
      for (const t of ownedTemplates) registerTemplate?.(t);
    },

    onTeardown() {
      const ide = getIDE();
      for (const t of ownedTemplates) ide.templates?.unregister?.(t.id);
    },

    commands: {
      newWebsite: {
        label: "New Website",
        category: "Pages",
        execute(api, ide) {
          ide.openResource("pages://new");
        },
      },

      openWebsite: {
        label: "Open Website",
        category: "Pages",
        execute(api, ide, { slug } = {}) {
          if (!slug) return;
          ide.openResource(`pages://website/${slug}`);
        },
      },

      openPreview: {
        label: "Preview Website",
        category: "Pages",
        execute(api, ide, { slug, path } = {}) {
          if (!slug) return;
          const suffix = !path || path === "/" ? "" : path;
          ide.openResource(`pages://preview/${slug}${suffix}`);
        },
      },

      openPage: {
        label: "Open Page",
        category: "Pages",
        execute(api, ide, { slug, pageSlug } = {}) {
          if (!slug || !pageSlug) return;
          ide.openResource(`pages://page/${slug}/${pageSlug}`);
        },
      },

      publish: {
        label: "Publish Website",
        category: "Pages",
        async execute(api, ide, { slug } = {}) {
          if (!slug) {
            api.ui.showMessage("No website selected", "error");
            return;
          }

          const token = oauth.getToken();
          if (!token) {
            api.ui.showMessage(
              "Install the GitHub extension and log in to publish pages",
              "error",
            );
            return;
          }

          const website = await $APP.Model.collections.get(slug);
          if (!website) {
            api.ui.showMessage("Website configuration not found", "error");
            return;
          }

          const config = { ...website, ...(website.metadata || {}) };
          const owner =
            config.githubOwner || Controller.local.get("github_owner");
          const repo = config.githubRepo;
          const branch = config.githubBranch || "main";

          if (!owner || !repo) {
            api.ui.showMessage(
              "Please configure GitHub repository in website settings",
              "error",
            );
            return;
          }

          try {
            $APP.events.emit("pages:publish-start", { slug });

            const all = await $APP.Model.collections.getAll();
            const pages = all.filter((c) => c.type === "page" && c._parent === slug);

            const capturePageHtml = (pagePath) =>
              new Promise((resolve, reject) => {
                const suffix = !pagePath || pagePath === "/" ? "/" : pagePath + "/";
                const iframe = document.createElement("iframe");
                iframe.style.cssText = "position:fixed;left:-9999px;top:0;width:1280px;height:800px;border:none;opacity:0;pointer-events:none";
                iframe.src = `/_website/${slug}${suffix}`;
                const timeout = setTimeout(() => {
                  iframe.remove();
                  reject(new Error(`Timeout rendering ${pagePath}`));
                }, 30000);
                iframe.addEventListener("load", async () => {
                  try {
                    const win = iframe.contentWindow;
                    const doc = iframe.contentDocument;
                    await new Promise((r) => {
                      const check = () => {
                        if (doc.querySelector("uix-page")) return r();
                        setTimeout(check, 200);
                      };
                      check();
                    });
                    await new Promise((r) => setTimeout(r, 2000));
                    const pageHtml = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
                    clearTimeout(timeout);
                    iframe.remove();
                    resolve(pageHtml);
                  } catch (e) {
                    clearTimeout(timeout);
                    iframe.remove();
                    reject(e);
                  }
                });
                document.body.appendChild(iframe);
              });

            const files = [];
            for (let i = 0; i < pages.length; i++) {
              const page = pages[i];
              const pagePath = page.metadata?.path || "/";
              $APP.events.emit("pages:publish-progress", {
                slug,
                status: `Rendering ${pagePath} (${i + 1}/${pages.length})`,
              });
              const pageHtml = await capturePageHtml(pagePath);
              const filePath = pagePath === "/"
                ? "index.html"
                : `${pagePath.replace(/^\//, "")}/index.html`;
              files.push({ path: filePath, content: pageHtml });
            }

            const domain = config.githubDomain;
            if (domain) {
              files.push({ path: "CNAME", content: domain });
            }

            $APP.events.emit("pages:publish-progress", { slug, status: "Pushing to GitHub..." });
            await commitFiles({ owner, repo, branch, token, files, message: "Deploy website" });
            await enableGitHubPages({ owner, repo, branch, token });

            const publishedUrl = domain
              ? `https://${domain}/`
              : `https://${owner}.github.io/${repo}/`;

            await $APP.Model.collections.edit({
              id: slug,
              metadata: { ...config, lastPublished: new Date().toISOString(), publishedUrl },
            });

            $APP.events.emit("pages:publish-end", { slug, url: publishedUrl });
            api.ui.showMessage(`Published to ${publishedUrl}`, "info");
          } catch (e) {
            $APP.events.emit("pages:publish-end", { slug, error: e.message });
            api.ui.showMessage(`Publish failed: ${e.message}`, "error");
          }
        },
      },

    },
  });
}
