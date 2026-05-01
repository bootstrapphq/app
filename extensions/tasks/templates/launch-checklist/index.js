export default function (ctx) {
  const { $APP, slugify } = ctx;
  return {
  id: "launch-checklist",
  name: "Launch Checklist",
  description: "Pre-launch, launch day, and post-launch items for shipping your thing",
  icon: "rocket",
  category: "tasks",
  plugin: "tasks",

  variables: [
    { id: "launchName", label: "Launch Name", type: "text", placeholder: "e.g. v1 Public Launch", required: true },
  ],

  getCreates(vars) {
    const name = vars.launchName || "Launch";
    return [{ type: "task-list", name, icon: "rocket" }];
  },

  async execute(vars) {
    const name = (vars.launchName || "").trim();
    const slug = slugify(name);
    if (!slug) throw new Error("Launch name is required.");
    if (await $APP.Model.collections.get(slug)) {
      throw new Error(`A task list with slug "${slug}" already exists. Use a different launch name.`);
    }

    await $APP.Model.collections.add({
      id: slug, slug, name, type: "task-list",
      icon: "rocket", sortOrder: 0,
      body: `## Pre-launch
- [ ] Landing page live
- [ ] Analytics wired up
- [ ] Email capture working
- [ ] Support inbox set up
- [ ] Pricing decided
- [ ] Terms & privacy pages published

## Launch day
- [ ] Post on X / Twitter
- [ ] Post on Hacker News (Show HN)
- [ ] Post on LinkedIn
- [ ] Product Hunt scheduled
- [ ] Tell 10 warm contacts directly
- [ ] Send newsletter / email list

## Post-launch
- [ ] Reply to every comment in the first 24h
- [ ] Collect testimonials
- [ ] Write a launch retro
- [ ] Queue up v1.1 items
`,
    });
    return { slug, plugin: "tasks" };
  },
  };
}
