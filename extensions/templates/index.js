import { createTemplateManager } from "./manager.js";
import templateDetailView from "./views/template-detail.js";
import templatesBrowserView from "./views/templates-browser.js";
import templatesSidebarView from "./views/templates-sidebar.js";

export default function (ctx) {
  const { createPlugin, getIDE, registerView } = ctx;

  registerView(templateDetailView);
  registerView(templatesBrowserView);
  registerView(templatesSidebarView);

  const resources = {
    getContent(uri) {
      return { type: "template", uri };
    },
    getTabMetadata(uri) {
      const path = uri.replace("templates://", "");
      if (path.startsWith("detail/")) {
        const id = path.replace("detail/", "");
        const entry = getIDE().templates?.getTemplate?.(id);
        return {
          label: entry?.name || id,
          icon: entry?.icon || "sparkles",
          component: "bsp-template-detail",
        };
      }
      return {
        label: "Templates",
        icon: "sparkles",
        component: "bsp-templates-browser",
      };
    },
  };

  return createPlugin({
    id: "templates",
    name: "Templates",
    description: "Browse and install project templates",
    icon: "sparkles",
    title: "Templates",
    order: 4,
    route: "/templates",
    sidebarComponent: "bsp-templates-sidebar",
    scheme: "templates",
    resources,

    commands: {
      browse: {
        label: "Browse Templates",
        category: "Templates",
        execute(api, ide) {
          ide.openResource("templates://browse");
        },
      },
      install: {
        label: "Install Template",
        category: "Templates",
        async execute(api, ide, { templateId, variables } = {}) {
          if (!templateId) {
            return { ok: false, error: { message: "Missing templateId." } };
          }
          const template = await ide.templates.loadTemplate(templateId);
          if (!template) {
            return { ok: false, error: { message: `Template not found: ${templateId}.` } };
          }
          try {
            const result = await template.execute(variables || {});
            ide.emit("template:installed", { template, result, variables });
            return { ok: true, result };
          } catch (err) {
            return {
              ok: false,
              error: { message: err?.message || "Failed to create from template." },
            };
          }
        },
      },
    },

    onSetup(api, ide) {
      ide.templates = createTemplateManager(ide);

      ide.quickAccessItems = [
        ...(ide.quickAccessItems || []),
        {
          label: "Browse Templates",
          icon: "sparkles",
          uri: "templates://browse",
          order: 85,
        },
      ];
    },
  });
}
