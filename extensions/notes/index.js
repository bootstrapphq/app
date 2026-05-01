import leanCanvasFactory from "./templates/lean-canvas/index.js";
import customerInterviewFactory from "./templates/customer-interview/index.js";
import weeklyPlanningFactory from "./templates/weekly-planning/index.js";
import notesEditorView from "./views/notes-editor.js";
import notesListView from "./views/notes-list.js";
import notesSidebarView from "./views/notes-sidebar.js";
import notesBacklinksView from "./views/notes-backlinks.js";

export default function (ctx) {
  const { $APP, createPlugin, getIDE, slugify, registerTemplate, registerView, readContentRecord, writeContentRecord, serializeToMarkdown } = ctx;

  const isPathUri = (uri) => uri.replace("notes://", "").startsWith("/");
  const pathFromUri = (uri) => uri.replace("notes://", "").slice(1);
  const extractTags = (body) =>
    [...new Set([...(body || "").matchAll(/#([\w][\w-]*)/g)].map((m) => m[1]))];

  registerView(notesEditorView);
  registerView(notesListView);
  registerView(notesSidebarView);
  registerView(notesBacklinksView);

  const titleCache = new Map();

  const ownedTemplates = [leanCanvasFactory(ctx), customerInterviewFactory(ctx), weeklyPlanningFactory(ctx)];

  return createPlugin({
    id: "notes",
    name: "Notes",
    icon: "file-text",
    title: "Notes",
    order: 20,
    route: "/notes",
    sidebarComponent: "bsp-notes-sidebar",
    scheme: "notes",

    types: {
      notes: {
        note: {
          name: "Note",
          icon: "file-text",
          component: "bsp-notes-editor",
          scheme: "notes",
          buildUri: ({ path }) => `notes:///${path}`,
          default: true,
        },
        meeting: {
          name: "Meeting Notes",
          icon: "users",
          component: "bsp-notes-editor",
          scheme: "notes",
          buildUri: ({ path }) => `notes:///${path}`,
          metadataFields: {
            attendees: { type: "array" },
            date: { type: "date" },
          },
          template: "# {{title}}\n\n## Attendees\n\n## Discussion\n\n## Action Items\n",
        },
      },
    },

    data: {
      notes: { types: ["note", "meeting"] },
    },

    resources: {
      async getContent(uri) {
        if (isPathUri(uri)) {
          const path = pathFromUri(uri);
          const record = await readContentRecord(path);
          if (!record) return { title: "", body: "" };
          const title = record.title || record.name || "";
          titleCache.set(uri, title);
          return { title, body: record.body || "", type: record.type || "note" };
        }

        const path = uri.replace("notes://", "");
        if (path.startsWith("note/")) {
          const noteId = path.replace("note/", "");
          if (noteId.startsWith("new-")) {
            return { title: "", body: "", isDraft: true };
          }
          const note = await $APP.Model.notes.get(noteId);
          if (note) {
            titleCache.set(uri, note.title);
            return { title: note.title || "", body: note.body || "", type: note.type || "note" };
          }
          return { title: "", body: "" };
        }
        return { type: "notes", path, uri };
      },

      async saveContent(uri, content) {
        if (isPathUri(uri)) {
          const path = pathFromUri(uri);
          const body = content.body || "";
          const existing = (await readContentRecord(path)) || {};
          const next = {
            ...existing,
            title: content.title ?? existing.title ?? "",
            body,
            tags: extractTags(body),
            type: existing.type || "note",
            updatedAt: new Date().toISOString(),
          };
          if (!next.createdAt) next.createdAt = next.updatedAt;
          await writeContentRecord(path, next);
          titleCache.set(uri, next.title);
          return;
        }

        const path = uri.replace("notes://", "");
        if (!path.startsWith("note/")) return;
        const noteId = path.replace("note/", "");
        const body = content.body || "";
        const tags = extractTags(body);

        if (noteId.startsWith("new-")) {
          const trimmedTitle = (content.title || "").trim();
          if (!trimmedTitle) return;
          const slug = slugify(trimmedTitle);
          await $APP.Model.notes.add({
            id: slug, slug,
            title: trimmedTitle,
            body,
            tags,
            type: "note",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          const newUri = `notes://note/${slug}`;
          titleCache.set(newUri, trimmedTitle);
          return { uri: newUri };
        }

        await $APP.Model.notes.edit(noteId, {
          title: content.title,
          body,
          tags,
        });
        titleCache.set(uri, content.title);
      },

      async getRawContent(uri) {
        if (isPathUri(uri)) {
          const path = pathFromUri(uri);
          const record = await readContentRecord(path);
          return record ? serializeToMarkdown(record, "body") : "";
        }
        const path = uri.replace("notes://", "");
        if (!path.startsWith("note/")) return "";
        const noteId = path.replace("note/", "");
        const note = await $APP.Model.notes.get(noteId);
        if (!note) return "";
        return serializeToMarkdown(note, "body");
      },

      async rename() {},

      async search(term, options) {
        const notes = await $APP.Model.notes.getAll();
        const results = {};
        const lowerTerm = options?.matchCase ? term : term.toLowerCase();
        for (const note of notes) {
          if (!note.body) continue;
          const lines = note.body.split("\n");
          const matches = [];
          lines.forEach((line, i) => {
            const haystack = options?.matchCase ? line : line.toLowerCase();
            if (haystack.includes(lowerTerm)) {
              matches.push({ line: i + 1, content: line.trim() });
            }
          });
          if (matches.length > 0) {
            const uri = `notes://note/${note.id || note.slug}`;
            results[uri] = matches;
          }
        }
        return results;
      },

      getTabMetadata(uri) {
        if (isPathUri(uri)) {
          const path = pathFromUri(uri);
          const liveTitle = getIDE().resourceContents[uri]?.title;
          const filename = path.split("/").pop() || "Note";
          const label = liveTitle || titleCache.get(uri) || filename;
          return { label, icon: "file-text", component: "bsp-notes-editor" };
        }
        const path = uri.replace("notes://", "");
        if (path.startsWith("note/")) {
          const noteId = path.replace("note/", "");
          const liveTitle = getIDE().resourceContents[uri]?.title;
          const label = liveTitle || titleCache.get(uri) || (noteId.startsWith("new-") ? "New Note" : "Note");
          return { label, icon: "file-text", component: "bsp-notes-editor" };
        }
        if (path.startsWith("notebook/")) {
          return {
            label: titleCache.get(uri) || "Notebook",
            icon: "book",
            component: "bsp-notes-list",
          };
        }
        return {
          label: "All Notes",
          icon: "file-text",
          component: "bsp-notes-list",
        };
      },
      getTabActions(uri) {
        if (isPathUri(uri)) return [];
        const path = uri.replace("notes://", "");
        if (path.startsWith("note/")) {
          return [];
        }
        return [{ icon: "plus", label: "New Note", command: "notes.newNote" }];
      },
    },

    menus: {
      "Notes": [
        { label: "New Note", command: "notes.newNote" },
        { separator: true },
        { label: "All Notes", command: "notes.allNotes", keybinding: "Ctrl+2" },
      ],
    },

    onSetup(api, ide) {
      (ide.quickAccessItems ||= []).push(
        { label: "All Notes", icon: "file-text", uri: "notes://all", order: 20 },
        { label: "New Note", icon: "plus", command: "notes.newNote", section: "create", order: 20 },
      );
      for (const t of ownedTemplates) registerTemplate?.(t);
    },

    onTeardown() {
      const ide = getIDE();
      for (const t of ownedTemplates) ide.templates?.unregister?.(t.id);
    },

    commands: {
      newNote: {
        label: "New Note",
        category: "Notes",
        execute(api, ide) {
          const tempId = `new-${Date.now()}`;
          ide.openResource(`notes://note/${tempId}`);
        },
      },
      allNotes: {
        label: "Show All Notes",
        category: "Notes",
        keybinding: "Ctrl+2",
        execute(api, ide) {
          ide.openResource("notes://all");
        },
      },
      reindexBacklinks: {
        label: "Reindex Note Backlinks",
        category: "Notes",
        async execute() {
          const notes = await $APP.Model.notes.getAll();
          for (const n of notes) {
            const id = n.id || n.slug;
            if (!id) continue;
            await $APP.Model.notes.edit(id, { body: n.body || "" });
          }
        },
      },
    },
  });
}
