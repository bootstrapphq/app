export default function (ctx) {
  const { $APP, slugify } = ctx;
  return {
  id: "weekly-setup",
  name: "Weekly Setup",
  description: "Spin up Today + This Week task lists and a weekly review note",
  icon: "calendar-days",
  category: "tasks",
  plugin: "notes",

  variables: [
    { id: "weekLabel", label: "Week label", type: "text", placeholder: "e.g. Week of Apr 28", required: true },
  ],

  getCreates(vars) {
    const label = (vars.weekLabel || "This Week").trim();
    return [
      { type: "task-list", name: "Today", icon: "sun" },
      { type: "task-list", name: "This Week", icon: "calendar-days" },
      { type: "note", name: `${label} — Review`, icon: "notebook-pen" },
    ];
  },

  async execute(vars) {
    const label = (vars.weekLabel || "").trim();
    if (!label) throw new Error("Week label is required.");

    const tag = `weekly-setup-${slugify(label)}`;
    const noteSlug = slugify(`${label} review`);
    const todaySlug = "today";
    const weekSlug = "this-week";

    if (await $APP.Model.notes.get(noteSlug)) {
      throw new Error(`A review note with slug "${noteSlug}" already exists. Use a different week label.`);
    }

    if (!(await $APP.Model.collections.get(todaySlug))) {
      await $APP.Model.collections.add({
        id: todaySlug, slug: todaySlug, name: "Today", type: "task-list",
        icon: "sun", sortOrder: 0,
        metadata: { tag },
        body: `## Active\n- [ ]\n\n## Waiting\n\n## Done\n`,
      });
    }

    if (!(await $APP.Model.collections.get(weekSlug))) {
      await $APP.Model.collections.add({
        id: weekSlug, slug: weekSlug, name: "This Week", type: "task-list",
        icon: "calendar-days", sortOrder: 1,
        metadata: { tag },
        body: `## Active\n- [ ]\n\n## Waiting\n\n## Done\n`,
      });
    }

    await $APP.Model.notes.add({
      id: noteSlug, slug: noteSlug,
      title: `${label} — Review`,
      type: "note",
      tags: [tag],
      body: `# ${label} — Review\n\n## Focus\n\n## Wins\n\n## Blockers\n\n## Next week\n\nRelated: [[Today]] · [[This Week]]\n`,
    });

    return { slug: noteSlug, plugin: "notes" };
  },
  };
}
