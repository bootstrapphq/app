import $APP from "bootstrapp";
import { slugify } from "/node_modules/@bootstrapp/model-file/index.js";
import buildStarter from "./starter.js";

export default {
  id: "changelog",
  name: "Changelog",
  description: "Public changelog for continuous shippers — versioned release notes",
  icon: "list-ordered",
  category: "website",
  plugin: "pages",
  viewComponent: "bsp-page-landing",

  variables: [
    {
      id: "siteName",
      label: "Changelog Name",
      type: "text",
      placeholder: "e.g. Acme Changelog",
      required: true,
    },
  ],

  getCreates(vars) {
    const name = vars.siteName || "Changelog";
    return [
      { type: "website", name, icon: "list-ordered" },
      { type: "page", name: "Home", icon: "file", parent: name },
    ];
  },

  async execute(vars) {
    const siteName = vars.siteName || "Changelog";
    const slug = slugify(vars.siteName || "");
    if (!slug) throw new Error("Changelog name is required.");
    if (await $APP.Model.collections.get(slug)) {
      throw new Error(
        `A collection with slug "${slug}" already exists. Use a different changelog name.`,
      );
    }

    const { website, pages } = buildStarter({ siteName });

    await $APP.Model.collections.add({
      id: slug,
      slug,
      name: siteName,
      type: "website",
      icon: "list-ordered",
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
