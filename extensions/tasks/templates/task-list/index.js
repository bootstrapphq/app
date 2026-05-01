export default function (ctx) {
  const { $APP, slugify } = ctx;
  return {
  id: "task-list",
  name: "Task List",
  description: "Create a new task list with sections for active, waiting, and completed tasks",
  icon: "square-check",
  category: "tasks",
  plugin: "tasks",

  variables: [
    { id: "name", label: "List Name", type: "text", placeholder: "e.g. Work, Personal, Project X", required: true },
  ],

  getCreates(vars) {
    const name = vars.name || "Task List";
    return [{ type: "task-list", name, icon: "square-check" }];
  },

  async execute(vars) {
    const name = vars.name || "Task List";
    const slug = slugify(name);
    if (!slug) throw new Error("List name is required.");
    if (await $APP.Model.collections.get(slug)) {
      throw new Error(`A task list with slug "${slug}" already exists. Use a different name.`);
    }

    await $APP.Model.collections.add({
      id: slug, slug, name, type: "task-list",
      icon: "square-check", sortOrder: 0,
      body: `## Active
- [ ]

## Waiting

## Done
`,
    });
    return { slug, plugin: "tasks" };
  },
  };
}
