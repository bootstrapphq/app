export default function (ctx) {
  const { $APP, slugify } = ctx;
  return {
  id: "customer-interview",
  name: "Customer Interview",
  description: "Capture discovery interviews — who, problem, current solution, quotes, signals",
  icon: "message-circle",
  category: "notes",
  plugin: "notes",

  variables: [
    { id: "intervieweeName", label: "Interviewee", type: "text", placeholder: "e.g. Ana — Head of Ops at Acme", required: true },
  ],

  getCreates(vars) {
    const name = vars.intervieweeName || "Interview";
    return [{ type: "note", name: `Interview: ${name}`, icon: "message-circle" }];
  },

  async execute(vars) {
    const name = (vars.intervieweeName || "").trim();
    const slug = slugify(`interview-${name}`);
    if (!slug || slug === "interview-") throw new Error("Interviewee name is required.");
    if (await $APP.Model.notes.get(slug)) {
      throw new Error(`A note with slug "${slug}" already exists. Use a different interviewee name.`);
    }

    const today = new Date().toISOString().slice(0, 10);

    await $APP.Model.notes.add({
      id: slug, slug,
      title: `Interview: ${name}`,
      type: "note",
      tags: ["Discovery"],
      body: `# Interview: ${name}

## Context
- **Role / Company:**
- **Date:** ${today}
- **Channel:** (call / in-person / async)

## Problem
-

## Current solution / workarounds
-

## Key quotes
> ""

> ""

## Signals & takeaways
- [ ]
`,
    });
    return { slug, plugin: "notes" };
  },
  };
}
