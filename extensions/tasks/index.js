import taskListFactory from "./templates/task-list/index.js";
import launchChecklistFactory from "./templates/launch-checklist/index.js";
import weeklySetupFactory from "./templates/weekly-setup/index.js";
import tasksView from "./views/tasks.js";
import tasksSidebarView from "./views/tasks-sidebar.js";

export default function (ctx) {
  const { $APP, html, createPlugin, getIDE, registerTemplate, registerView, readContentRecord, writeContentRecord, slugify, parseCollectionBody, serializeToMarkdown } = ctx;

  const isPathUri = (uri) => uri.replace("tasks://", "").startsWith("/");
  const pathFromUri = (uri) => uri.replace("tasks://", "").slice(1);

  const taskListPathsFromIndex = (ide) => {
    const out = [];
    if (!ide?.typeIndex) return out;
    for (const [fsPath, entry] of ide.typeIndex) {
      if (entry?.frontmatter?.type !== "task-list") continue;
      const contentPath = fsPath.replace(/^\/content\//, "").replace(/^\//, "").replace(/\.md$/, "");
      out.push({ fsPath, contentPath, frontmatter: entry.frontmatter });
    }
    return out;
  };

  const countOpenTasks = async (ide) => {
    let count = 0;
    for (const { contentPath } of taskListPathsFromIndex(ide)) {
      const record = await readContentRecord(contentPath);
      if (!record) continue;
      const { allItems } = parseCollectionBody(record.body || "", {});
      for (const item of allItems) if (item.checked === false) count++;
    }
    return count;
  };

  registerView(tasksView);
  registerView(tasksSidebarView);

  const ownedTemplates = [taskListFactory(ctx), launchChecklistFactory(ctx), weeklySetupFactory(ctx)];

  return createPlugin({
    id: "tasks",
    name: "Tasks",
    icon: "square-check",
    title: "Tasks",
    order: 30,
    route: "/tasks",
    sidebarComponent: "bsp-tasks-sidebar",
    scheme: "tasks",

    types: {
      collections: {
        "task-list": {
          name: "Task List",
          icon: "square-check",
          component: "bsp-tasks",
          scheme: "tasks",
          buildUri: ({ path }) => `tasks:///${path}`,
          sections: ["Active", "Waiting", "Done"],
          defaultSection: "Active",
          doneSection: "Done",
          itemType: "checkbox",
          itemFields: {
            priority: { type: "enum", values: ["low", "normal", "high", "urgent"], default: "normal" },
            due: { type: "date" },
            done: { type: "date" },
            note: { type: "string" },
          },
          widgets: ["list", "board"],
          defaultWidget: "board",
        },
      },
    },

    data: {
      collections: { types: ["task-list"] },
      notes: { types: ["note"] },
    },

    resources: {
      async getContent(uri) {
        if (isPathUri(uri)) {
          const path = pathFromUri(uri);
          const record = await readContentRecord(path);
          return { type: "tasks", path, uri, record };
        }
        const path = uri.replace("tasks://", "");
        return { type: "tasks", path, uri };
      },
      async getRawContent(uri) {
        if (isPathUri(uri)) {
          const path = pathFromUri(uri);
          const record = await readContentRecord(path);
          return record ? serializeToMarkdown(record, "body") : "";
        }
        return "";
      },
      getTabMetadata(uri) {
        if (isPathUri(uri)) {
          const path = pathFromUri(uri);
          const filename = path.split("/").pop() || "Tasks";
          const label = filename.charAt(0).toUpperCase() + filename.slice(1);
          return {
            label,
            icon: "kanban",
            component: "bsp-tasks",
            props: { contentPath: path },
          };
        }
        const rest = uri.replace("tasks://", "");
        if (rest === "board") {
          return {
            label: "All Task Lists",
            icon: "kanban",
            component: "bsp-tasks",
            props: { view: "board" },
          };
        }
        return {
          label: "All Tasks",
          icon: "square-check",
          component: "bsp-tasks",
          props: { view: "list" },
        };
      },
      getTabActions() {
        return [{ icon: "plus", label: "New Task", command: "tasks.newTask" }];
      },
      async search(term, options) {
        const ide = getIDE();
        const lowerTerm = options?.matchCase ? term : term.toLowerCase();
        const results = {};
        for (const { contentPath, frontmatter } of taskListPathsFromIndex(ide)) {
          const record = await readContentRecord(contentPath);
          if (!record) continue;
          const matches = [];
          const name = record.name || frontmatter?.name || contentPath;
          const hayName = options?.matchCase ? name : name.toLowerCase();
          if (hayName.includes(lowerTerm)) matches.push({ line: 1, content: name });
          const { allItems } = parseCollectionBody(record.body || "", {});
          allItems.forEach((item, idx) => {
            const h = options?.matchCase ? (item.title || "") : (item.title || "").toLowerCase();
            if (h.includes(lowerTerm)) matches.push({ line: idx + 1, content: item.title });
          });
          if (matches.length > 0) results[`tasks:///${contentPath}`] = matches;
        }
        return results;
      },
    },

    menus: {
      "Tasks": [
        { label: "New Task", command: "tasks.newTask" },
        { label: "New Task List", command: "tasks.newTaskList" },
        { separator: true },
        { label: "Task Board", command: "tasks.showBoard", keybinding: "Ctrl+3" },
        { label: "All Tasks", command: "tasks.allTasks" },
      ],
    },

    async onSetup(api, ide) {
      (ide.quickAccessItems ||= []).push(
        { label: "All Tasks", icon: "square-check", uri: "tasks://all", order: 30 },
        { label: "Task Board", icon: "kanban", uri: "tasks://board", order: 31 },
        { label: "New Task List", icon: "plus", command: "tasks.newTaskList", section: "create", order: 30 },
      );

      const updateCount = async () => {
        const count = await countOpenTasks(ide);
        api.ui.setStatusBarItem("count", {
          position: "left",
          order: 10,
          render: () => html`
            <div class="flex items-center gap-1 cursor-pointer hover:bg-surface/20 px-1 rounded"
                 @click=${() => ide.openResource("tasks://all")}>
              <uix-icon name="square-check" class="w-3 h-3"></uix-icon>
              <span>${count} tasks</span>
            </div>
          `,
        });
      };

      await updateCount();
      ide.on("typeIndex", () => updateCount());

      for (const t of ownedTemplates) registerTemplate?.(t);
    },

    onTeardown() {
      const ide = getIDE();
      for (const t of ownedTemplates) ide.templates?.unregister?.(t.id);
    },

    commands: {
      newTask: {
        label: "New Task",
        category: "Tasks",
        async execute(api, ide) {
          const lists = taskListPathsFromIndex(ide);
          if (lists.length === 0) {
            api.ui.showMessage("Create a task list first", "warn");
            return;
          }
          const title = await api.ui.showInputBox({
            prompt: "Task title",
            placeholder: "What needs to be done?",
          });
          if (!title?.trim()) return;

          const target = lists[0];
          const record = await readContentRecord(target.contentPath);
          if (!record) return;
          const newLine = `- [ ] ${title.trim()}`;
          const body = (record.body || "").trimEnd();
          const firstSection = body.match(/^##\s+.+$/m);
          let nextBody;
          if (firstSection) {
            const idx = body.indexOf(firstSection[0]) + firstSection[0].length;
            nextBody = body.slice(0, idx) + "\n" + newLine + body.slice(idx) + "\n";
          } else {
            nextBody = body + "\n" + newLine + "\n";
          }
          await writeContentRecord(target.contentPath, { ...record, body: nextBody, updatedAt: new Date().toISOString() });
          api.ui.showMessage("Task created", "info");
        },
      },
      newTaskList: {
        label: "New Task List",
        category: "Tasks",
        async execute(api, ide) {
          const name = await api.ui.showInputBox({
            prompt: "List name",
            placeholder: "e.g. Sprint 5",
          });
          if (!name?.trim()) return;
          const slug = slugify(name.trim());
          const record = {
            id: slug,
            slug,
            name: name.trim(),
            type: "task-list",
            icon: "square-check",
            createdAt: new Date().toISOString(),
            body: "## Active\n\n## Done\n",
          };
          await writeContentRecord(slug, record);
          ide.openResource(`tasks:///${slug}`);
        },
      },
      showBoard: {
        label: "Show Task Board",
        category: "Tasks",
        keybinding: "Ctrl+3",
        execute(api, ide) {
          ide.openResource("tasks://board");
        },
      },
      allTasks: {
        label: "Show All Tasks",
        category: "Tasks",
        execute(api, ide) {
          ide.openResource("tasks://all");
        },
      },
    },
  });
}
