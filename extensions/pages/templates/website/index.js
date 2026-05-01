import $APP from "bootstrapp";
import { slugify } from "/node_modules/@bootstrapp/model-file/index.js";
import buildStarter from "./starter.js";

export default {
  id: "website",
  name: "Website",
  description: "Multi-page site with home, about, pricing, and contact pages",
  icon: "panels-top-left",
  category: "website",
  plugin: "pages",
  viewComponent: "bsp-page-landing",

  variables: [
    {
      id: "siteName",
      label: "Site Name",
      type: "text",
      placeholder: "e.g. My Project",
      required: true,
    },
    {
      id: "tagline",
      label: "Tagline",
      type: "text",
      placeholder: "e.g. The best way to build apps",
      required: true,
    },
  ],

  getCreates(vars) {
    const name = vars.siteName || "My Website";
    return [
      { type: "website", name, icon: "globe" },
      { type: "page", name: "Home", icon: "file", parent: name },
      { type: "page", name: "About", icon: "file", parent: name },
      { type: "page", name: "Pricing", icon: "file", parent: name },
      { type: "page", name: "Contact", icon: "file", parent: name },
    ];
  },

  async execute(vars) {
    const siteName = vars.siteName || "My Website";
    const tagline = vars.tagline || "";
    const slug = slugify(vars.siteName || "");
    if (!slug) throw new Error("Site name is required.");
    if (await $APP.Model.collections.get(slug)) {
      throw new Error(
        `A collection with slug "${slug}" already exists. Use a different site name.`,
      );
    }

    const { website, pages } = buildStarter({ siteName, tagline });

    await $APP.Model.collections.add({
      id: slug,
      slug,
      name: siteName,
      type: "website",
      icon: "globe",
      metadata: website,
    });

    for (const page of pages) {
      const pageId = `${slug}-${page.slug}`;
      await $APP.Model.collections.add({
        id: pageId,
        slug: pageId,
        name: page.name,
        type: "page",
        icon: "file",
        _parent: slug,
        metadata: {
          path: page.path,
          sections: page.sections,
        },
      });
    }

    return { slug, plugin: "pages" };
  },
};
