import $APP from "bootstrapp";
import { slugify } from "/node_modules/@bootstrapp/model-file/index.js";
import buildStarter from "./starter.js";

export default {
  id: "landing-page",
  name: "Landing Page",
  description:
    "Full marketing page with hero, steps, features, testimonials, FAQ, and CTA",
  icon: "columns-3",
  category: "website",
  plugin: "pages",
  viewComponent: "bsp-page-landing",

  variables: [
    {
      id: "siteName",
      label: "Site Name",
      type: "text",
      placeholder: "e.g. Bootstrapp",
      required: true,
    },
    {
      id: "tagline",
      label: "Tagline",
      type: "text",
      placeholder: "e.g. The lightweight frontend framework",
      required: false,
    },
  ],

  getCreates(vars) {
    const name = vars.siteName || "My Landing Page";
    return [
      { type: "website", name, icon: "columns-3" },
      { type: "page", name: "Home", icon: "file", parent: name },
    ];
  },

  async execute(vars) {
    const siteName = vars.siteName || "My Landing Page";
    const tagline = vars.tagline || "";
    const slug = slugify(siteName);
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
      icon: "columns-3",
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
