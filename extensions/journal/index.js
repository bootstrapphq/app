import journalTodayView from "./views/journal-today.js";
import journalCaptureView from "./views/journal-capture.js";
import journalSidebarView from "./views/journal-sidebar.js";

const today = () => new Date().toISOString().split("T")[0];

export default function (ctx) {
  const { $APP, html, createPlugin, createCollectionManager, getIDE, registerView, serializeToMarkdown } = ctx;

  registerView(journalTodayView);
  registerView(journalCaptureView);
  registerView(journalSidebarView);

  const ensureDay = async (date) => {
    const cm = createCollectionManager({ model: $APP.Model.collections, types: ["daily"] });
    const existing = await cm.getCollection(date);
    if (existing) return existing;
    return await cm.createCollection({
      id: date,
      slug: date,
      name: date,
      type: "daily",
      icon: "sun",
      metadata: { date },
    });
  };

  return createPlugin({
    id: "journal",
    name: "Journal",
    icon: "sun",
    title: "Today",
    order: 5,
    route: "/today",
    sidebarComponent: "bsp-journal-sidebar",
    scheme: "journal",

    types: {
      collections: {
        daily: {
          name: "Daily",
          icon: "sun",
          sections: ["Journal", "Captures", "Habits"],
          defaultSection: "Journal",
          itemType: "list",
          itemFields: {
            time: { type: "string" },
            habit: { type: "string" },
            value: { type: "string" },
          },
          metadataFields: {
            date: { type: "date" },
          },
        },
      },
    },

    data: {
      collections: { types: ["daily"] },
    },

    resources: {
      getContent(uri) {
        const path = uri.replace("journal://", "");
        if (path === "today") return { type: "journal", date: today(), uri };
        if (path.startsWith("day/")) return { type: "journal", date: path.replace("day/", ""), uri };
        return { type: "journal", uri };
      },
      async getRawContent(uri) {
        const path = uri.replace("journal://", "");
        const date = path === "today" ? today() : path.startsWith("day/") ? path.replace("day/", "") : "";
        if (!date) return "";
        const record = await $APP.Model.collections.get(date);
        if (!record) return "";
        return serializeToMarkdown(record, "body");
      },
      getTabMetadata(uri) {
        const path = uri.replace("journal://", "");
        if (path === "today") {
          return { label: "Today", icon: "sun", component: "bsp-journal-today" };
        }
        if (path.startsWith("day/")) {
          const date = path.replace("day/", "");
          return { label: date, icon: "calendar", component: "bsp-journal-today", props: { date } };
        }
        return { label: "Today", icon: "sun", component: "bsp-journal-today" };
      },
    },

    menus: {
      Today: [
        { label: "Go to Today", command: "journal.today", keybinding: "Ctrl+1" },
        { separator: true },
        { label: "Capture Journal Entry", command: "journal.captureJournal" },
        { label: "Capture Quick Note", command: "journal.captureCapture" },
      ],
    },

    async onSetup(api, ide) {
      (ide.quickAccessItems ||= []).push(
        { label: "Today", icon: "sun", uri: "journal://today", order: 5 },
      );
    },

    commands: {
      today: {
        label: "Go to Today",
        category: "Journal",
        keybinding: "Ctrl+1",
        execute(api, ide) {
          ide.openResource("journal://today");
        },
      },
      captureJournal: {
        label: "Capture Journal Entry",
        category: "Journal",
        async execute(api, ide, { text } = {}) {
          const body = text ?? await api.ui.showInputBox({ prompt: "Journal entry", placeholder: "What's on your mind?" });
          if (!body?.trim()) return;
          const date = today();
          await ensureDay(date);
          await api.data.collections.addItem(date, {
            title: body.trim(),
            section: "Journal",
            time: new Date().toTimeString().slice(0, 5),
          });
        },
      },
      captureCapture: {
        label: "Capture Quick Note",
        category: "Journal",
        async execute(api, ide, { text } = {}) {
          const body = text ?? await api.ui.showInputBox({ prompt: "Quick capture", placeholder: "Remember this…" });
          if (!body?.trim()) return;
          const date = today();
          await ensureDay(date);
          await api.data.collections.addItem(date, {
            title: body.trim(),
            section: "Captures",
            time: new Date().toTimeString().slice(0, 5),
          });
        },
      },
      logHabit: {
        label: "Log Habit",
        category: "Journal",
        async execute(api, ide, { habit, value } = {}) {
          if (!habit) return;
          const date = today();
          await ensureDay(date);
          await api.data.collections.addItem(date, {
            title: habit,
            section: "Habits",
            time: new Date().toTimeString().slice(0, 5),
            habit,
            ...(value ? { value: String(value) } : {}),
          });
        },
      },
    },
  });
}
