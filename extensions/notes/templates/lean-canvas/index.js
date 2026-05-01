export default function (ctx) {
  const { $APP, slugify } = ctx;
  return {
  id: "lean-canvas",
  name: "Lean Canvas",
  description: "Shape your idea before you build it — the 9 Lean Canvas boxes in one note",
  icon: "layout-grid",
  category: "notes",
  plugin: "notes",

  variables: [
    { id: "ideaName", label: "Idea Name", type: "text", placeholder: "e.g. Morning Brew for devs", required: true },
  ],

  getCreates(vars) {
    const name = vars.ideaName || "My Idea";
    return [{ type: "note", name: `Lean Canvas: ${name}`, icon: "layout-grid" }];
  },

  async execute(vars) {
    const name = (vars.ideaName || "").trim();
    const slug = slugify(`lean-canvas-${name}`);
    if (!slug || slug === "lean-canvas-") throw new Error("Idea name is required.");
    if (await $APP.Model.notes.get(slug)) {
      throw new Error(`A note with slug "${slug}" already exists. Use a different idea name.`);
    }

    await $APP.Model.notes.add({
      id: slug, slug,
      title: `Lean Canvas: ${name}`,
      type: "note",
      tags: ["Planning"],
      pinned: true,
      body: `# Lean Canvas: ${name}

## 1. Problem
Top 3 problems this idea solves.
-
-
-

## 2. Customer Segments
Who has this problem most acutely? Who is the early adopter?
-

## 3. Unique Value Proposition
A single, clear, compelling message that states why you're different and worth paying attention to.
-

## 4. Solution
The simplest thing that could address each problem.
-
-
-

## 5. Channels
How will you reach customers?
-

## 6. Revenue Streams
How will the idea make money?
-

## 7. Cost Structure
What will it cost to run?
-

## 8. Key Metrics
The few numbers that tell you it's working.
-

## 9. Unfair Advantage
What do you have that can't be easily copied or bought?
-
`,
    });
    return { slug, plugin: "notes" };
  },
  };
}
