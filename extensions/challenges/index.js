import challengesSidebarView from "./views/challenges-sidebar.js";
import challengesOverviewView from "./views/challenges-overview.js";
import challengesDetailView from "./views/challenges-detail.js";

export default function (ctx) {
  const { $APP, html, createPlugin, createCollectionManager, slugify, registerTemplate, registerView } = ctx;

  registerView(challengesSidebarView);
  registerView(challengesOverviewView);
  registerView(challengesDetailView);

  registerTemplate?.({
    id: "challenge",
    name: "Challenge",
    description: "Create a goal-tracking challenge with a target metric and timeline",
    icon: "trophy",
    category: "challenges",
    plugin: "challenges",
    variables: [
      { id: "name", label: "Challenge Name", type: "text", placeholder: "e.g. 60 Day Fitness", required: true },
      { id: "goal", label: "Goal", type: "text", placeholder: "e.g. Lose 8kg and build muscle", required: true },
      { id: "metricName", label: "Metric Name", type: "text", placeholder: "e.g. Weight, Books read, Songs learned", required: true },
      { id: "metricUnit", label: "Unit", type: "text", placeholder: "e.g. kg, books, songs" },
      { id: "targetValue", label: "Target Value", type: "number", placeholder: "e.g. 80", required: true },
      { id: "durationDays", label: "Duration (days)", type: "number", placeholder: "e.g. 60", required: true },
    ],
    getCreates(vars) {
      return [{ type: "challenge", name: vars.name || "Challenge", icon: "trophy" }];
    },
    async execute(vars) {
      const name = vars.name || "Challenge";
      const slug = slugify(name);
      const duration = parseInt(vars.durationDays) || 60;
      const now = new Date();
      const end = new Date(now);
      end.setDate(end.getDate() + duration);
      await $APP.Model.collections.add({
        id: slug, slug, name, type: "challenge",
        icon: "trophy", color: "#4ade80",
        metadata: {
          goal: vars.goal || "",
          category: "general",
          metricName: vars.metricName || "Progress",
          metricUnit: vars.metricUnit || "",
          startValue: "0",
          targetValue: String(vars.targetValue || 0),
          startDate: now.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        },
        body: "## Log\n",
      });
      return { slug, plugin: "challenges" };
    },
  });

  return createPlugin({
    id: "challenges",
    name: "Challenges",
    icon: "target",
    title: "Challenges",
    order: 50,
    route: "/challenges",
    sidebarComponent: "bsp-challenges-sidebar",
    scheme: "challenges",

    types: {
      collections: {
        challenge: {
          name: "Challenge",
          icon: "target",
          sections: [],
          itemType: "list",
          itemFields: {
            date: { type: "date", required: true },
            value: { type: "number" },
            notes: { type: "string" },
            photo: { type: "string" },
          },
          metadataFields: {
            startDate: { type: "date" },
            endDate: { type: "date" },
            goal: { type: "string" },
            category: { type: "enum", values: ["fitness", "learning", "habit", "creative", "other"] },
            metricName: { type: "string" },
            metricUnit: { type: "string" },
            targetValue: { type: "number" },
            startValue: { type: "number" },
          },
          computed: {
            daysElapsed: (items) => items.length,
            latestValue: (items) => {
              if (!items.length) return null;
              const sorted = [...items].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
              return parseFloat(sorted[sorted.length - 1].value) || null;
            },
          },
        },
      },
    },

    data: { collections: { types: ["challenge"] } },

    resources: {
      getContent(uri) {
        const path = uri.replace("challenges://", "");
        return { type: "challenges", path, uri };
      },
      getTabMetadata(uri) {
        const path = uri.replace("challenges://", "");
        if (path.startsWith("challenge/")) return { label: "Challenge", icon: "target", component: "bsp-challenges-detail", props: { challengeId: path.replace("challenge/", "") } };
        return { label: "Challenges", icon: "target", component: "bsp-challenges-overview" };
      },
      getTabActions(uri) {
        const path = uri.replace("challenges://", "");
        if (path === "overview") return [{ icon: "plus", label: "New Challenge", command: "challenges.newChallenge" }];
        return [];
      },
      async search(term, options) {
        const all = await $APP.Model.collections.getAll();
        const lowerTerm = options?.matchCase ? term : term.toLowerCase();
        const results = {};
        const challenges = all.filter((c) => c.type === "challenge");
        for (const ch of challenges) {
          const matches = [];
          const hay = options?.matchCase ? ch.name : (ch.name || "").toLowerCase();
          if (hay.includes(lowerTerm)) matches.push({ line: 1, content: ch.name });
          const goal = ch.metadata?.goal || "";
          const gh = options?.matchCase ? goal : goal.toLowerCase();
          if (goal && gh.includes(lowerTerm)) matches.push({ line: 1, content: goal });
          if (matches.length > 0) results[`challenges://challenge/${ch.slug || ch.id}`] = matches;
        }
        return results;
      },
    },

    menus: {
      "Challenges": [
        { label: "New Challenge", command: "challenges.newChallenge" },
        { separator: true },
        { label: "All Challenges", command: "challenges.showChallenges", keybinding: "Ctrl+5" },
      ],
    },

    async onSetup(api, ide) {
      (ide.quickAccessItems ||= []).push(
        { label: "All Challenges", icon: "target", uri: "challenges://overview", order: 50 },
        { label: "New Challenge", icon: "plus", command: "challenges.newChallenge", section: "create", order: 50 },
      );

      const challengesCM = createCollectionManager({ model: $APP.Model.collections, types: ["challenge"] });
      const updateStatus = async () => {
        const challenges = await challengesCM.getAllCollections();
        const today = new Date().toISOString().split("T")[0];
        const active = challenges.filter((ch) => !ch.endDate || ch.endDate >= today);
        api.ui.setStatusBarItem("challenges", {
          position: "left",
          order: 20,
          render: () => html`
            <span class="cursor-pointer hover:bg-surface/20 px-1 rounded"
              @click=${() => ide.openResource("challenges://overview")}>
              <uix-icon name="target" class="w-3 h-3"></uix-icon> ${active.length} active
            </span>
          `,
        });
      };
      await updateStatus();
      $APP.events.on("MODEL:CHANGED", () => updateStatus());
    },

    commands: {
      newChallenge: {
        label: "New Challenge",
        category: "Challenges",
        async execute(api, ide) {
          const name = await api.ui.showInputBox({ prompt: "Challenge name", placeholder: "e.g., 60 Day Fitness" });
          if (!name) return;
          const goal = await api.ui.showInputBox({ prompt: "What's your goal?", placeholder: "e.g., Lose 15kg, Read 30 books" });
          if (goal === undefined) return;
          const metricName = await api.ui.showInputBox({ prompt: "What metric are you tracking? (leave empty to skip)", placeholder: "e.g., Weight, Books read, Hours practiced" });
          if (metricName === undefined) return;
          let metricUnit = "", startValue = "", targetValue = "";
          if (metricName) {
            metricUnit = (await api.ui.showInputBox({ prompt: `Unit for ${metricName}`, placeholder: "e.g., kg, books, hours" })) || "";
            if (metricUnit === undefined) return;
            startValue = (await api.ui.showInputBox({ prompt: `Starting ${metricName}`, placeholder: "e.g., 95" })) || "";
            if (startValue === undefined) return;
            targetValue = (await api.ui.showInputBox({ prompt: `Target ${metricName}`, placeholder: "e.g., 80" })) || "";
            if (targetValue === undefined) return;
          }
          const endDateStr = await api.ui.showInputBox({ prompt: "End date (leave empty for ongoing)", placeholder: "e.g., 2026-06-05" });
          if (endDateStr === undefined) return;
          const today = new Date().toISOString().split("T")[0];
          await api.data.collections.createCollection({
            name, type: "challenge",
            startDate: today,
            endDate: endDateStr || "",
            goal: goal || "",
            category: "other",
            metricName: metricName || "",
            metricUnit,
            targetValue: targetValue ? parseFloat(targetValue) : "",
            startValue: startValue ? parseFloat(startValue) : "",
          });
          ide.openResource("challenges://overview");
        },
      },
      showChallenges: {
        label: "Show Challenges",
        category: "Challenges",
        keybinding: "Ctrl+5",
        execute(api, ide) { ide.openResource("challenges://overview"); },
      },
    },
  });
}
