import { slugify } from "/node_modules/@bootstrapp/model/slug.js";

const extractLinks = (body) => {
  if (!body || typeof body !== "string") return [];
  const re = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const out = new Set();
  for (const m of body.matchAll(re)) {
    const slug = slugify(m[1].trim());
    if (slug) out.add(slug);
  }
  return Array.from(out);
};

export const linksHooks = () => ({
  beforeAdd: async (data) => {
    if (typeof data.body === "string") data.links = extractLinks(data.body);
    return data;
  },
  beforeEdit: async (data) => {
    if (typeof data.body === "string") data.links = extractLinks(data.body);
    return data;
  },
});

export { extractLinks };
