import $APP from "bootstrapp";
import { slugify } from "/node_modules/@bootstrapp/model-file/index.js";
import buildStarter from "./starter.js";

export default {
  id: "blog",
  name: "Blog",
  description: "Blog site with a welcome hero and post index",
  icon: "newspaper",
  category: "website",
  plugin: "pages",
  viewComponent: "bsp-page-landing",

  variables: [
    {
      id: "blogName",
      label: "Blog Name",
      type: "text",
      placeholder: "e.g. My Blog",
      required: true,
    },
  ],

  getCreates(vars) {
    const name = vars.blogName || "My Blog";
    return [
      { type: "website", name, icon: "newspaper" },
      { type: "page", name: "Home", icon: "file", parent: name },
    ];
  },

  async execute(vars) {
    const blogName = vars.blogName || "My Blog";
    const slug = slugify(vars.blogName || "");
    if (!slug) throw new Error("Blog name is required.");
    if (await $APP.Model.collections.get(slug)) {
      throw new Error(
        `A collection with slug "${slug}" already exists. Use a different blog name.`,
      );
    }

    const { website, pages } = buildStarter({ blogName });

    await $APP.Model.collections.add({
      id: slug,
      slug,
      name: blogName,
      type: "website",
      icon: "newspaper",
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
