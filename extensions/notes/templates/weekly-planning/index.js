const defaultWeekLabel = () => {
  const today = new Date();
  return `Week of ${today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
};

export default function (ctx) {
  const { $APP, slugify } = ctx;
  return {
  id: "weekly-planning",
  name: "Weekly Planning",
  description: "Plan your week with goals, priorities, and blockers",
  icon: "calendar",
  category: "notes",
  plugin: "notes",

  variables: [
    { id: "name", label: "Note Name", type: "text", placeholder: defaultWeekLabel(), required: true },
    { id: "weekFocus", label: "Main Focus for the Week", type: "text", placeholder: "e.g. Ship v2 release, Finish onboarding flow", required: true },
  ],

  getCreates(vars) {
    const name = vars.name || defaultWeekLabel();
    return [{ type: "note", name, icon: "calendar" }];
  },

  async execute(vars) {
    const focus = vars.weekFocus || "";
    const name = vars.name || defaultWeekLabel();
    const slug = slugify(name);
    if (!slug) throw new Error("Note name is required.");
    if (await $APP.Model.notes.get(slug)) {
      throw new Error(`A note with slug "${slug}" already exists. Use a different name.`);
    }

    await $APP.Model.notes.add({
      id: slug, slug,
      title: name, type: "note",
      tags: ["Work"], pinned: true,
      body: `# ${name}

## Focus
${focus}

## Goals
- [ ]
- [ ]
- [ ]

## Notes


## Blockers
-`,
    });
    return { slug, plugin: "notes" };
  },
  };
}
