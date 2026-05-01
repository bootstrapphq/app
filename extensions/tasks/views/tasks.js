const DEFAULT_SECTIONS = [
  { name: "Active", icon: "circle", color: "var(--color-primary)" },
  { name: "Waiting", icon: "clock", color: "var(--color-warning)" },
  { name: "Done", icon: "circle-check", color: "var(--color-success)" },
];

const KNOWN_ICONS = { Active: "circle", Waiting: "clock", Done: "circle-check", "In Review": "eye", Backlog: "archive", Scheduled: "calendar-clock" };
const KNOWN_COLORS = { Active: "var(--color-primary)", Waiting: "var(--color-warning)", Done: "var(--color-success)", "In Review": "#8b5cf6", Backlog: "#64748b", Scheduled: "#f97316" };
const FALLBACK_COLORS = ["#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#64748b"];

const PRIORITY_ORDER = { urgent: 0, high: 1, normal: 2, low: 3 };
const PRIORITY_COLORS = { urgent: "#ef4444", high: "#f59e0b", low: "#60a5fa" };
const PRIORITY_BADGE = { urgent: "danger", high: "warning", normal: "default", low: "info" };
const PRIORITY_BORDER = { urgent: "priority-urgent", high: "priority-high", normal: "", low: "priority-low" };

const TASK_LIST_TYPE = "task-list";

const INBOX_KEY = "__inbox__";
const INBOX_SECTION = {
  key: INBOX_KEY,
  name: "",
  label: "Inbox",
  icon: "inbox",
  color: "var(--color-text-muted)",
};

const withKey = (s) => (s.key ? s : { ...s, key: s.name });

const normalizeSections = (raw) => {
  if (!raw || !Array.isArray(raw) || raw.length === 0) return DEFAULT_SECTIONS.map(withKey);
  if (typeof raw[0] === "string") {
    return raw.map((name, i) => ({
      key: name,
      name,
      icon: KNOWN_ICONS[name] || "circle-dot",
      color: KNOWN_COLORS[name] || FALLBACK_COLORS[i % FALLBACK_COLORS.length],
    }));
  }
  return raw.map(withKey);
};

const basename = (path) => (path || "").split("/").pop() || path || "";

const getChildrenRange = (sectionItems, parentIdx) => {
  const out = [];
  for (let i = parentIdx + 1; i < sectionItems.length; i++) {
    if (sectionItems[i].indent && sectionItems[i].indent > 0) out.push(i);
    else break;
  }
  return out;
};

const findSectionContaining = (sections, item) => {
  for (const sec of sections) {
    const idx = sec.items.indexOf(item);
    if (idx !== -1) return { sec, idx };
  }
  return null;
};

const moveItemBlockToSection = (sections, item, targetSectionName) => {
  const found = findSectionContaining(sections, item);
  if (!found) return;
  const { sec, idx } = found;
  const childRange = getChildrenRange(sec.items, idx);
  const removed = sec.items.splice(idx, 1 + childRange.length);
  const targetName = targetSectionName || "";
  let target = sections.find((s) => s.name === targetName);
  if (!target) {
    target = { name: targetName, items: [] };
    if (targetName === "") sections.unshift(target);
    else sections.push(target);
  }
  for (const m of removed) m.section = targetName;
  target.items.push(...removed);
};

const flattenSections = (sections) => sections.flatMap((s) => s.items);

const itemAtIndex = (sections, itemIndex) => flattenSections(sections)[itemIndex];

export default function (ctx) {
  const { $APP, html, repeat, T, getIDE, readContentRecord, writeContentRecord, parseCollectionBody, serializeCollectionBody, getCollectionType } = ctx;

  return {
  tag: "bsp-tasks",
  properties: {
    view: T.string({ defaultValue: "list" }),
    contentPath: T.string({ defaultValue: "" }),
    title: T.string({ defaultValue: "Tasks" }),
    mode: T.string({ defaultValue: "" }),
    tasks: T.array({ defaultValue: [] }),
    sections: T.array({ defaultValue: DEFAULT_SECTIONS }),
    loading: T.boolean({ defaultValue: true }),
    filter: T.string({ defaultValue: "active" }),
    sortBy: T.string({ defaultValue: "default" }),
    newTaskTitle: T.string({ defaultValue: "" }),
    newTaskTitles: T.object({ defaultValue: {} }),
    drawerOpen: T.boolean({ defaultValue: false }),
    editTask: T.object({ defaultValue: null }),
    editTitle: T.string({ defaultValue: "" }),
    editPriority: T.string({ defaultValue: "normal" }),
    editDue: T.string({ defaultValue: "" }),
    editSection: T.string({ defaultValue: "" }),
    editNote: T.string({ defaultValue: "" }),
    dropTarget: T.object({ defaultValue: null }),
  },

  async connected() {
    const ide = getIDE();
    if (this.uri) {
      const rest = this.uri.replace("tasks://", "");
      if (rest.startsWith("/")) {
        this.mode = "file";
        this.contentPath = rest.slice(1);
      } else if (rest === "board") {
        this.mode = "aggregate";
        this.view = "board";
      } else if (rest === "list" || rest === "all") {
        this.mode = "aggregate";
        this.view = "list";
      } else {
        this.mode = "empty";
      }
    } else if (this.contentPath) {
      this.mode = "file";
    } else {
      this.mode = "empty";
    }

    if (this.mode === "aggregate") {
      this._unsubIndex = ide.on("typeIndex", () => this._reload());
    }

    await this._reload();
    this.loading = false;
  },

  disconnected() {
    this._unsubIndex?.();
  },

  async _reload() {
    if (this.mode === "file") return this._loadFromFile();
    if (this.mode === "aggregate") return this._loadFromIndex();
    this.tasks = [];
    this.sections = DEFAULT_SECTIONS;
  },

  async _loadFromFile() {
    const record = await readContentRecord(this.contentPath);
    if (!record) {
      this.tasks = [];
      this.sections = DEFAULT_SECTIONS;
      this.title = basename(this.contentPath);
      return;
    }

    const typeConfig = getCollectionType(record.type || TASK_LIST_TYPE) || { itemFields: {}, sections: [] };
    const { allItems } = parseCollectionBody(record.body || "", typeConfig.itemFields || {});

    this.title = record.name || record.title || basename(this.contentPath);
    this.sections = normalizeSections(record.metadata?.sections || typeConfig.sections);
    this._hasInboxItems = allItems.some((i) => !i.section);

    if (!this._viewLocked) {
      this.view = typeConfig.defaultWidget || "board";
    }

    this.tasks = allItems.map((item, idx) => ({
      ...item,
      _itemIndex: idx,
      _sourceFile: this.contentPath,
    }));
  },

  async _loadFromIndex() {
    const ide = getIDE();
    const typeIndex = ide.typeIndex || new Map();
    const matches = [];
    for (const [path, entry] of typeIndex) {
      if (entry?.frontmatter?.type === TASK_LIST_TYPE) matches.push(path);
    }

    const allTasks = [];
    const sectionUnion = new Map();
    const seenSections = new Set();

    for (const fsPath of matches) {
      const contentPath = fsPath.replace(/^\/content\//, "").replace(/^\//, "").replace(/\.md$/, "");
      const record = await readContentRecord(contentPath);
      if (!record) continue;
      const typeConfig = getCollectionType(record.type || TASK_LIST_TYPE) || { itemFields: {} };
      const { allItems } = parseCollectionBody(record.body || "", typeConfig.itemFields || {});

      const fileSections = normalizeSections(record.metadata?.sections || typeConfig.sections);
      for (const s of fileSections) {
        if (!seenSections.has(s.name)) {
          seenSections.add(s.name);
          sectionUnion.set(s.name, s);
        }
      }

      for (let idx = 0; idx < allItems.length; idx++) {
        allTasks.push({
          ...allItems[idx],
          _itemIndex: idx,
          _sourceFile: contentPath,
          _sourceLabel: basename(contentPath),
          collectionId: contentPath,
          collectionName: record.name || record.title || basename(contentPath),
        });
      }
    }

    this.title = this.view === "board" ? "All Task Lists" : "All Tasks";
    this.sections = sectionUnion.size ? [...sectionUnion.values()].map(withKey) : DEFAULT_SECTIONS.map(withKey);
    this._hasInboxItems = allTasks.some((t) => !t.section);

    let tasks = allTasks;
    if (this.view === "list") {
      if (this.filter === "active") tasks = tasks.filter((t) => !t.checked);
      else if (this.filter === "done") tasks = tasks.filter((t) => t.checked);

      if (this.sortBy === "priority") {
        tasks.sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 2) - (PRIORITY_ORDER[b.priority] ?? 2));
      } else if (this.sortBy === "due") {
        tasks.sort((a, b) => {
          if (!a.due && !b.due) return 0;
          if (!a.due) return 1;
          if (!b.due) return -1;
          return a.due.localeCompare(b.due);
        });
      } else if (this.sortBy === "name") {
        tasks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === "collection") {
        tasks.sort((a, b) => (a.collectionName || "").localeCompare(b.collectionName || ""));
      }
    }
    this.tasks = tasks;
  },

  async _saveFile(path, mutator) {
    if (!path) return;
    const record = await readContentRecord(path);
    if (!record) return;
    const typeConfig = getCollectionType(record.type || TASK_LIST_TYPE) || { itemFields: {} };
    const itemFields = typeConfig.itemFields || {};
    const { sections } = parseCollectionBody(record.body || "", itemFields);

    const result = await mutator({ record, sections, typeConfig });

    record.body = serializeCollectionBody(sections, {
      itemType: typeConfig.itemType || "checkbox",
      knownFields: Object.keys(itemFields),
    });
    record.updatedAt = new Date().toISOString();
    await writeContentRecord(path, record);
    await this._reload();
    return result;
  },

  _switchView(newView) {
    if (this.view === newView) return;
    this._viewLocked = true;
    this.view = newView;
    this._reload();
  },

  _formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((d - today) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    if (diff > 0 && diff <= 7) return d.toLocaleDateString("en", { weekday: "short" });
    return d.toLocaleDateString("en", { month: "short", day: "numeric" });
  },

  _isDueUrgent(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d <= today;
  },

  _firstSectionName() {
    return this.sections[0]?.name || "Active";
  },

  _lastSectionName() {
    return this.sections[this.sections.length - 1]?.name || "Done";
  },

  _defaultTargetPath() {
    return this.mode === "file" ? this.contentPath : null;
  },

  // ── Render ──

  render() {
    if (this.loading) {
      return html`<div class="flex items-center justify-center h-full">
        <uix-text muted>Loading...</uix-text>
      </div>`;
    }

    if (this.mode === "empty") {
      return html`
        <div class="flex flex-col items-center justify-center h-full opacity-60 gap-2">
          <uix-icon name="square-check" size="40"></uix-icon>
          <uix-text size="sm">Open a task-list file from the explorer</uix-text>
        </div>
      `;
    }

    const sortOptions = [
      { value: "default", label: "Default" },
      { value: "priority", label: "Priority" },
      { value: "due", label: "Due date" },
      { value: "name", label: "Name" },
      { value: "collection", label: "List" },
    ];

    return html`
      <div class="p-4 w-full h-full flex flex-col overflow-hidden">
        <div class="flex items-center gap-2.5 pb-2.5 mb-1 border-b border-dim">
          <uix-heading level="4">${this.title}</uix-heading>

          ${this.view === "list" ? html`
            <div class="flex gap-1">
              ${["active", "done", "all"].map((f) => html`
                <button class="px-2.5 py-0.5 rounded-full text-[0.7rem] font-medium cursor-pointer border border-dim transition-all duration-150 ${this.filter === f ? "bg-primary text-white border-primary" : "bg-transparent text-muted hover:bg-surface-light hover:text-default"}"
                  @click=${() => { this.filter = f; this._reload(); }}>
                  ${f[0].toUpperCase() + f.slice(1)}
                </button>
              `)}
            </div>
          ` : ""}

          <div class="flex-1"></div>

          ${this.view === "list" ? html`
            <uix-select size="xs"
              .value=${this.sortBy}
              .options=${sortOptions}
              placeholder="Sort"
              @change=${(e) => {
                this.sortBy = e.detail?.value ?? e.target.value;
                this._reload();
              }}
            ></uix-select>
          ` : (this.mode === "file" ? html`
            <button class="flex items-center gap-1 bg-transparent border-none text-muted text-[0.75rem] cursor-pointer px-2 py-1 rounded transition-colors duration-150 hover:text-default hover:bg-surface-light" @click=${() => this._addSection()}>
              <uix-icon name="plus" size="12"></uix-icon>
              Add Column
            </button>
          ` : "")}

          <div class="flex border border-dim rounded-md overflow-hidden">
            <button class="flex items-center justify-center w-[30px] h-[26px] bg-transparent border-none cursor-pointer transition-all duration-150 ${this.view === "list" ? "bg-primary text-white" : "text-muted hover:bg-surface-light hover:text-default"}"
              title="List view" @click=${() => this._switchView("list")}>
              <uix-icon name="list" size="14"></uix-icon>
            </button>
            <button class="flex items-center justify-center w-[30px] h-[26px] bg-transparent border-none border-l border-dim cursor-pointer transition-all duration-150 ${this.view === "board" ? "bg-primary text-white" : "text-muted hover:bg-surface-light hover:text-default"}"
              title="Board view" @click=${() => this._switchView("board")}>
              <uix-icon name="kanban" size="14"></uix-icon>
            </button>
          </div>
        </div>

        ${this.view === "board" ? this._renderBoardView() : this._renderListView()}

        <uix-drawer position="right" width="380px"
          ?open=${this.drawerOpen}
          @drawer-closed=${() => this._closeDrawer()}>
          ${this.editTask ? this._renderDrawer() : ""}
        </uix-drawer>
      </div>
    `;
  },

  // ── List View ──

  _renderListView() {
    return html`
      ${this.mode === "file" ? html`
        <div class="px-0 py-2" style="border-bottom: 1px solid var(--border-color)">
          <uix-join>
            <uix-input size="sm" placeholder="What needs to be done?"
              .value=${this.newTaskTitle}
              @input=${(e) => { this.newTaskTitle = e.detail?.value ?? e.target.value; }}
              @keydown=${(e) => { if (e.key === "Enter") this._quickAdd(); }}
            ></uix-input>
            <uix-button size="sm" @click=${() => this._quickAdd()}>Add</uix-button>
          </uix-join>
        </div>
      ` : ""}

      <div class="flex-1 overflow-y-auto py-2">
        ${this.tasks.length === 0
          ? html`
            <div class="flex flex-col items-center justify-center py-16 opacity-40">
              <uix-icon name="square-check" size="40" class="mb-3"></uix-icon>
              <uix-text size="sm">${this.filter === "done" ? "No completed tasks" : "No tasks yet"}</uix-text>
            </div>
          `
          : html`
            <div class="flex flex-col gap-px">
              ${repeat(this.tasks, (task) => `${task._sourceFile}:${task._itemIndex}`, (task, idx) => this._renderTaskRow(task, idx))}
            </div>
          `}
      </div>
    `;
  },

  _renderTaskRow(task) {
    const isDone = task.checked;
    const prio = task.priority || "normal";
    const prioColor = PRIORITY_COLORS[prio] || "transparent";
    const showSourceBadge = this.mode === "aggregate";

    return html`
      <div class="group flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors duration-[120ms] relative border-l-2 ${isDone ? "opacity-50" : ""} hover:bg-surface-light"
        style="border-left-color: ${prioColor}"
        @click=${(e) => {
          if (!e.target.closest("uix-checkbox") && !e.target.closest("uix-button") && !e.target.closest("input"))
            this._openDrawer(task);
        }}>
        <uix-checkbox ?checked=${isDone}
          @change=${() => this._toggleTask(task)}></uix-checkbox>

        <div class="flex-1 min-w-0 flex flex-col gap-0.5">
          <span class="text-[0.85rem] text-default whitespace-nowrap overflow-hidden text-ellipsis ${isDone ? "line-through" : ""}">${task.title}</span>
          <div class="flex gap-2.5 flex-wrap empty:hidden">
            ${task.due ? html`<span class="text-[0.7rem] flex items-center gap-[3px] ${this._isDueUrgent(task.due) ? "text-danger" : "text-muted"}">
              <uix-icon name="calendar" size="10"></uix-icon> ${this._formatDate(task.due)}
            </span>` : ""}
            ${task.note ? html`<span class="text-[0.7rem] text-muted flex items-center gap-[3px]">
              <uix-icon name="message-square" size="10"></uix-icon> ${task.note.length > 30 ? task.note.slice(0, 30) + "\u2026" : task.note}
            </span>` : ""}
          </div>
        </div>

        <div class="flex gap-1 shrink-0">
          ${prio !== "normal" ? html`<uix-badge size="xs" variant=${PRIORITY_BADGE[prio]}>${prio}</uix-badge>` : ""}
          ${showSourceBadge ? html`<uix-badge size="xs" variant="secondary"
            @click=${(e) => { e.stopPropagation(); this._openSourceFile(task); }}
            style="cursor:pointer">${task._sourceLabel}</uix-badge>` : ""}
        </div>

        <div class="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-[120ms] shrink-0">
          <uix-button size="xs" ghost @click=${() => this._openDrawer(task)}>
            <uix-icon name="pencil" size="12"></uix-icon>
          </uix-button>
          <uix-button size="xs" ghost @click=${() => this._deleteTask(task)}>
            <uix-icon name="trash-2" size="12"></uix-icon>
          </uix-button>
        </div>
      </div>
    `;
  },

  _openSourceFile(task) {
    const ide = getIDE();
    if (task?._sourceFile) ide.openResource(`tasks:///${task._sourceFile}`);
  },

  async _quickAdd() {
    if (!this.newTaskTitle.trim() || this.mode !== "file") return;
    const title = this.newTaskTitle.trim();
    this.newTaskTitle = "";
    await this._saveFile(this.contentPath, ({ sections, typeConfig }) => {
      const target = typeConfig.defaultSection || sections[0]?.name || this._firstSectionName();
      let sec = sections.find((s) => s.name === target);
      if (!sec) {
        sec = { name: target, items: [] };
        sections.push(sec);
      }
      const newItem = { title, section: target };
      if ((typeConfig.itemType || "checkbox") === "checkbox") newItem.checked = false;
      sec.items.push(newItem);
    });
  },

  async _toggleTask(task) {
    if (!task?._sourceFile) return;
    await this._saveFile(task._sourceFile, ({ sections, typeConfig }) => {
      const item = itemAtIndex(sections, task._itemIndex);
      if (!item) return;
      this._applyToggle(sections, item, typeConfig);
    });
  },

  _applyToggle(sections, item, typeConfig) {
    item.checked = !item.checked;
    const doneDate = new Date().toISOString().split("T")[0];

    if (!item.indent || item.indent === 0) {
      const found = findSectionContaining(sections, item);
      if (found) {
        const childRange = getChildrenRange(found.sec.items, found.idx);
        for (const ci of childRange) {
          found.sec.items[ci].checked = item.checked;
          if (item.checked) found.sec.items[ci].done = doneDate;
          else delete found.sec.items[ci].done;
        }
      }
      if (item.checked && typeConfig.doneSection) {
        item.done = doneDate;
        moveItemBlockToSection(sections, item, typeConfig.doneSection);
      } else if (!item.checked) {
        delete item.done;
        const target = typeConfig.defaultSection || sections[0]?.name || "Active";
        moveItemBlockToSection(sections, item, target);
      }
    } else {
      if (item.checked) item.done = doneDate;
      else delete item.done;
    }
  },

  // ── Board View ──

  _buildTaskTree(tasks) {
    const roots = [];
    let currentParent = null;
    for (const task of tasks) {
      if (!task.indent || task.indent === 0) {
        currentParent = { ...task, subtasks: [] };
        roots.push(currentParent);
      } else if (currentParent) {
        currentParent.subtasks.push(task);
      } else {
        roots.push({ ...task, subtasks: [] });
      }
    }
    return roots;
  },

  _displaySections() {
    const base = this.sections.map(withKey);
    return this._hasInboxItems ? [INBOX_SECTION, ...base] : base;
  },

  _tasksForColumn(section) {
    const flat = section.key === INBOX_KEY
      ? this.tasks.filter((t) => !t.section)
      : this.tasks.filter((t) => t.section === section.name);
    return this._buildTaskTree(flat);
  },

  _renderBoardView() {
    return html`
      <div class="flex gap-4 flex-1 min-h-0 overflow-x-auto">
        ${this._displaySections().map((section) => this._renderColumn(section))}
      </div>
    `;
  },

  _renderColumn(section) {
    const tasks = this._tasksForColumn(section);
    const isInbox = section.key === INBOX_KEY;
    const label = section.label || section.name;

    return html`
      <div class="flex flex-col min-w-[280px] flex-1 rounded-lg overflow-hidden ${isInbox ? "bg-transparent border border-dashed border-dim" : "bg-surface-dark"}" style="--column-accent: ${section.color}">
        <div class="group flex items-center gap-1.5 px-3 py-2.5 border-b border-dim text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
          <uix-icon name=${section.icon} size="14" style="color: var(--column-accent, var(--color-text-muted))"></uix-icon>
          <span>${label}</span>
          <span class="ml-auto text-[0.65rem] bg-surface px-1.5 py-px rounded-lg font-medium">${tasks.length}</span>
          ${this.mode === "file" && !isInbox ? html`
            <button class="bg-transparent border-none text-muted cursor-pointer p-0.5 rounded flex items-center opacity-0 group-hover:opacity-50 transition-opacity duration-150 hover:opacity-100! hover:text-default hover:bg-surface" @click=${(e) => this._showColumnMenu(e, section)}>
              <uix-icon name="ellipsis-vertical" size="14"></uix-icon>
            </button>
          ` : ""}
        </div>

        <uix-droparea droparea-id=${section.key}
          .onDropped=${(info) => this._onColumnDrop(info)}
          class="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5">
          ${tasks.map((task) => this._renderTaskCard(task))}
        </uix-droparea>

        ${this.mode === "file" ? html`
          <div class="p-2 border-t border-dim">
            <div class="flex items-center gap-1.5">
              <uix-icon name="plus" size="12" class="opacity-40"></uix-icon>
              <input class="flex-1 bg-transparent border-none outline-none text-inherit text-[0.8rem] py-1 placeholder:text-muted placeholder:opacity-50" placeholder="Add task..."
                .value=${this.newTaskTitles[section.key] || ""}
                @input=${(e) => { this.newTaskTitles = { ...this.newTaskTitles, [section.key]: e.target.value }; }}
                @keydown=${(e) => { if (e.key === "Enter") this._addTaskToColumn(section); }} />
            </div>
          </div>
        ` : ""}
      </div>
    `;
  },

  _renderTaskCard(task) {
    const doneCount = task.subtasks.filter((s) => s.checked).length;
    const totalSubs = task.subtasks.length;
    const hasMeta = task.due || totalSubs > 0 || task.note;
    const prio = task.priority || "normal";
    const prioColor = PRIORITY_COLORS[prio] || "transparent";
    const prioVariant = PRIORITY_BADGE[prio] || "default";
    const showPriority = prio !== "normal";
    const showSourceBadge = this.mode === "aggregate";

    const dt = this.dropTarget;
    const isDropTarget = dt && dt.taskKey === `${task._sourceFile}:${task._itemIndex}`;
    const dropZone = isDropTarget ? dt.zone : null;

    const notePreview = task.note
      ? task.note.length > 60 ? task.note.slice(0, 60) + "..." : task.note
      : null;

    return html`
      <uix-draggable dragged-id="${task._sourceFile}:${task._itemIndex}">
        <div class="group relative bg-surface border border-dim border-l-[3px] rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-150 text-[0.85rem] shadow-sm hover:bg-surface-light hover:shadow-md ${dropZone === "above" ? "before:content-[''] before:absolute before:-top-1 before:left-1 before:right-1 before:h-0.5 before:bg-primary before:rounded-sm before:z-10" : ""} ${dropZone === "below" ? "after:content-[''] after:absolute after:-bottom-1 after:left-1 after:right-1 after:h-0.5 after:bg-primary after:rounded-sm after:z-10" : ""}"
          style="border-left-color: ${prioColor}${dropZone === "on" ? "; outline: 2px solid var(--color-primary); outline-offset: -1px; background: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface))" : ""}"
          @click=${(e) => {
            if (!e.target.closest("input") && !e.target.closest("[data-subtask]") && !e.target.closest("[data-card-menu]")) {
              e.stopPropagation();
              this._openDrawer(task);
            }
          }}
          @dragover=${(e) => this._onCardDragOver(e, task)}
          @dragleave=${(e) => this._onCardDragLeave(e, task)}
          @drop=${(e) => this._onCardDrop(e, task)}>

          <div data-card-menu class="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-50 cursor-pointer p-0.5 rounded text-muted transition-all duration-150 z-[2] hover:opacity-100! hover:bg-surface-dark" @click=${(e) => this._showCardMenu(e, task)}>
            <uix-icon name="ellipsis-vertical" size="14"></uix-icon>
          </div>
          ${showPriority ? html`<uix-badge variant=${prioVariant} size="xs" class="uppercase tracking-wide mb-1.5">${prio}</uix-badge>` : ""}
          <div class="text-[0.85rem] font-medium leading-[1.3] break-words">${task.title}</div>
          ${notePreview ? html`<div class="text-[0.75rem] text-muted mt-1 overflow-hidden text-ellipsis whitespace-nowrap leading-[1.3]">${notePreview}</div>` : ""}
          ${totalSubs > 0 ? html`
            <div class="flex flex-col gap-[3px] mt-2 pt-1.5 border-t border-dim">
              ${task.subtasks.map((sub) => html`
                <div data-subtask class="flex items-center gap-[5px] text-[0.75rem] text-default leading-[1.3] ${sub.checked ? "line-through opacity-45" : ""}"
                  @click=${(e) => { e.stopPropagation(); this._toggleSubtask(sub); }}>
                  <uix-icon name=${sub.checked ? "square-check" : "square"} size="12" class="shrink-0 ${sub.checked ? "text-success" : "text-muted"}"></uix-icon>
                  <span>${sub.title}</span>
                </div>
              `)}
            </div>
          ` : ""}
          ${hasMeta || showSourceBadge ? html`
            <div class="flex gap-2.5 flex-wrap items-center mt-2 text-[0.7rem] text-muted empty:hidden">
              ${totalSubs > 0 ? html`
                <span class="text-[0.7rem] text-muted flex items-center gap-[3px]">
                  <uix-icon name="list-checks" size="11"></uix-icon>
                  <span>${doneCount}/${totalSubs}</span>
                  <span class="inline-block w-8 h-[3px] bg-surface-dark rounded-sm overflow-hidden align-middle ml-0.5">
                    <span class="block h-full bg-success rounded-sm transition-[width] duration-200" style="width: ${Math.round((doneCount / totalSubs) * 100)}%"></span>
                  </span>
                </span>
              ` : ""}
              ${task.due ? html`<span class="text-[0.7rem] flex items-center gap-[3px] ${this._isDueUrgent(task.due) ? "text-danger" : "text-muted"}"><uix-icon name="calendar" size="11"></uix-icon> ${this._formatDate(task.due)}</span>` : ""}
              ${task.note ? html`<span class="text-[0.7rem] text-muted flex items-center gap-[3px]"><uix-icon name="file-text" size="11"></uix-icon></span>` : ""}
              ${showSourceBadge ? html`<span class="text-[0.7rem] text-muted flex items-center gap-[3px] cursor-pointer"
                @click=${(e) => { e.stopPropagation(); this._openSourceFile(task); }}>
                <uix-icon name="file" size="11"></uix-icon> ${task._sourceLabel}
              </span>` : ""}
            </div>
          ` : ""}
        </div>
      </uix-draggable>
    `;
  },

  // ── Board Drag & Drop ──

  _onCardDragOver(e, task) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ratio = y / rect.height;

    let zone;
    if (ratio < 0.25) zone = "above";
    else if (ratio > 0.75) zone = "below";
    else zone = "on";

    const key = `${task._sourceFile}:${task._itemIndex}`;
    const current = this.dropTarget;
    if (!current || current.taskKey !== key || current.zone !== zone) {
      this.dropTarget = { taskKey: key, zone };
    }
  },

  _onCardDragLeave(e, task) {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
    const key = `${task._sourceFile}:${task._itemIndex}`;
    if (this.dropTarget?.taskKey === key) this.dropTarget = null;
  },

  async _onCardDrop(e, task) {
    e.preventDefault();
    e.stopPropagation();

    const draggedId = e.dataTransfer.getData("text/plain");
    const zone = this.dropTarget?.zone || "on";
    this.dropTarget = null;

    if (!draggedId) return;
    const sepIdx = draggedId.lastIndexOf(":");
    if (sepIdx < 0) return;
    const sourceFile = draggedId.slice(0, sepIdx);
    const draggedIndex = parseInt(draggedId.slice(sepIdx + 1), 10);
    if (isNaN(draggedIndex)) return;
    if (sourceFile !== task._sourceFile) return;
    if (draggedIndex === task._itemIndex) return;

    await this._saveFile(sourceFile, ({ sections }) => {
      this._applyMove(sections, draggedIndex, task._itemIndex, zone);
    });
  },

  _applyMove(sections, sourceIndex, targetIndex, zone) {
    const flat = flattenSections(sections);
    const sourceItem = flat[sourceIndex];
    const targetItem = flat[targetIndex];
    if (!sourceItem || !targetItem) return;

    const sourceLoc = findSectionContaining(sections, sourceItem);
    if (!sourceLoc) return;
    const childRange = getChildrenRange(sourceLoc.sec.items, sourceLoc.idx);

    if (zone === "on") {
      if (childRange.length > 0) return;
      if (targetItem.indent && targetItem.indent > 0) return;
      const targetChildren = (() => {
        const tloc = findSectionContaining(sections, targetItem);
        return tloc ? getChildrenRange(tloc.sec.items, tloc.idx) : [];
      })();
      if (targetChildren.some((ci) => sourceLoc.sec.items[ci] === sourceItem)) return;
    }

    const block = sourceLoc.sec.items.splice(sourceLoc.idx, 1 + childRange.length);

    const targetLoc = findSectionContaining(sections, targetItem);
    if (!targetLoc) {
      sourceLoc.sec.items.splice(sourceLoc.idx, 0, ...block);
      return;
    }

    let insertAt;
    const tChildren = getChildrenRange(targetLoc.sec.items, targetLoc.idx);
    if (zone === "above") insertAt = targetLoc.idx;
    else if (zone === "after" || zone === "below") insertAt = tChildren.length ? tChildren[tChildren.length - 1] + 1 : targetLoc.idx + 1;
    else if (zone === "on") {
      block[0].indent = 2;
      insertAt = tChildren.length ? tChildren[tChildren.length - 1] + 1 : targetLoc.idx + 1;
    } else insertAt = targetLoc.idx + 1;

    for (const m of block) m.section = targetLoc.sec.name;
    targetLoc.sec.items.splice(insertAt, 0, ...block);
  },

  async _onColumnDrop({ draggedId, targetId }) {
    if (!draggedId || targetId === undefined || targetId === null) return;
    const sepIdx = draggedId.lastIndexOf(":");
    if (sepIdx < 0) return;
    const sourceFile = draggedId.slice(0, sepIdx);
    const idx = parseInt(draggedId.slice(sepIdx + 1), 10);
    if (isNaN(idx)) return;

    const targetName = targetId === INBOX_KEY ? "" : targetId;
    const doneSection = this._lastSectionName();

    await this._saveFile(sourceFile, ({ sections, typeConfig }) => {
      const item = itemAtIndex(sections, idx);
      if (!item) return;
      if (targetName !== "" && (targetName === doneSection || targetName === typeConfig.doneSection)) {
        if (!item.checked) this._applyToggle(sections, item, typeConfig);
        else moveItemBlockToSection(sections, item, targetName);
      } else {
        if (item.checked) {
          item.checked = false;
          delete item.done;
        }
        moveItemBlockToSection(sections, item, targetName);
      }
    });
  },

  // ── Board Column Management (file mode only) ──

  async _addSection() {
    if (this.mode !== "file") return;
    const ide = getIDE();
    const name = await ide.showInputBox({ prompt: "Column name", placeholder: "e.g. In Review" });
    if (!name?.trim()) return;
    const newName = name.trim();

    await this._saveFile(this.contentPath, ({ record }) => {
      const existing = normalizeSections(record.metadata?.sections || this.sections);
      const newCol = {
        name: newName,
        icon: KNOWN_ICONS[newName] || "circle-dot",
        color: KNOWN_COLORS[newName] || FALLBACK_COLORS[existing.length % FALLBACK_COLORS.length],
      };
      const next = [...existing];
      next.splice(next.length - 1, 0, newCol);
      record.metadata = { ...(record.metadata || {}), sections: next };
    });
  },

  async _addTaskToColumn(section) {
    if (this.mode !== "file") return;
    const key = typeof section === "string" ? section : section.key;
    const sectionName = typeof section === "string"
      ? section
      : (section.key === INBOX_KEY ? "" : section.name);
    const title = (this.newTaskTitles[key] || "").trim();
    if (!title) return;
    this.newTaskTitles = { ...this.newTaskTitles, [key]: "" };

    await this._saveFile(this.contentPath, ({ sections, typeConfig }) => {
      let sec = sections.find((s) => s.name === sectionName);
      if (!sec) {
        sec = { name: sectionName, items: [] };
        if (sectionName === "") sections.unshift(sec);
        else sections.push(sec);
      }
      const newItem = { title, section: sectionName };
      if ((typeConfig.itemType || "checkbox") === "checkbox") newItem.checked = false;
      sec.items.push(newItem);
    });
  },

  // ── Context Menus ──

  _showColumnMenu(e, section) {
    if (this.mode !== "file") return;
    e.stopPropagation();
    const existingMenu = document.querySelector("ide-context-menu");
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement("ide-context-menu");
    menu.items = [
      { label: "Rename Column", icon: "pencil", action: () => this._renameSection(section) },
      { label: "Delete Column", icon: "trash-2", group: "danger", action: () => this._deleteSection(section) },
    ];
    menu.position = { x: e.clientX, y: e.clientY };
    document.body.appendChild(menu);
  },

  _showCardMenu(e, task) {
    e.stopPropagation();
    const existingMenu = document.querySelector("ide-context-menu");
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement("ide-context-menu");
    menu.items = [
      { label: "Edit", icon: "pencil", action: () => this._openDrawer(task) },
      { label: "Add Subtask", icon: "list-plus", action: () => this._promptAddSubtask(task) },
      {
        label: task.checked ? "Mark Active" : "Mark Done",
        icon: task.checked ? "circle" : "circle-check",
        action: () => this._toggleTask(task),
      },
      { label: "Delete", icon: "trash-2", group: "danger", action: () => this._confirmDeleteTask(task) },
    ];
    menu.position = { x: e.clientX, y: e.clientY };
    document.body.appendChild(menu);
  },

  async _renameSection(section) {
    if (this.mode !== "file") return;
    const ide = getIDE();
    const name = await ide.showInputBox({ prompt: "Rename column", placeholder: section.name, value: section.name });
    if (!name?.trim() || name.trim() === section.name) return;
    const newName = name.trim();

    await this._saveFile(this.contentPath, ({ record, sections }) => {
      const existing = normalizeSections(record.metadata?.sections || this.sections);
      const next = existing.map((s) => s.name === section.name ? { ...s, name: newName } : s);
      record.metadata = { ...(record.metadata || {}), sections: next };
      for (const sec of sections) {
        if (sec.name === section.name) sec.name = newName;
        for (const it of sec.items) if (it.section === section.name) it.section = newName;
      }
    });
  },

  async _deleteSection(section) {
    if (this.mode !== "file") return;
    const ide = getIDE();
    const tasks = this._tasksForColumn(section);
    const confirmed = await ide.showConfirm({
      title: "Delete Column",
      prompt: `Delete "${section.name}"${tasks.length ? ` and move its ${tasks.length} task(s) to the first column` : ""}?`,
      confirmLabel: "Delete",
      isDestructive: true,
    });
    if (!confirmed) return;

    await this._saveFile(this.contentPath, ({ record, sections }) => {
      const existing = normalizeSections(record.metadata?.sections || this.sections);
      const next = existing.filter((s) => s.name !== section.name);
      if (next.length === 0) return;
      const target = next[0].name;
      record.metadata = { ...(record.metadata || {}), sections: next };
      for (const sec of sections) {
        if (sec.name === section.name) {
          for (const it of sec.items) it.section = target;
          let dest = sections.find((s) => s.name === target);
          if (!dest) {
            dest = { name: target, items: [] };
            sections.push(dest);
          }
          dest.items.push(...sec.items);
          sec.items = [];
        }
      }
      const idx = sections.findIndex((s) => s.name === section.name);
      if (idx !== -1) sections.splice(idx, 1);
    });
  },

  async _promptAddSubtask(task) {
    const ide = getIDE();
    const title = await ide.showInputBox({ prompt: "Subtask title", placeholder: "What needs to be done?" });
    if (title?.trim()) await this._addSubtask(task, title.trim());
  },

  async _confirmDeleteTask(task) {
    const ide = getIDE();
    const confirmed = await ide.showConfirm({
      title: "Delete Task",
      prompt: `Delete "${task.title}"${task.subtasks?.length ? ` and its ${task.subtasks.length} subtask(s)` : ""}?`,
      confirmLabel: "Delete",
      isDestructive: true,
    });
    if (confirmed) await this._deleteTask(task);
  },

  // ── Shared Drawer ──

  _openDrawer(task) {
    this.editTask = task;
    this.editTitle = task.title || "";
    this.editPriority = task.priority || "normal";
    this.editDue = task.due || "";
    this.editSection = task.section || this._firstSectionName();
    this.editNote = task.note || "";
    this.drawerOpen = true;
  },

  _closeDrawer() {
    this.drawerOpen = false;
    this.editTask = null;
  },

  _renderDrawer() {
    const task = this.editTask;
    const sectionOptions = this.view === "board" ? this.sections : DEFAULT_SECTIONS;

    return html`
      <div class="flex flex-col h-full bg-surface text-default">
        <div class="flex items-center justify-between px-4 py-3.5 border-b border-dim">
          <uix-text weight="medium" size="sm">Edit Task</uix-text>
          <uix-button size="xs" ghost @click=${() => this._closeDrawer()}>
            <uix-icon name="x" size="16"></uix-icon>
          </uix-button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5">
          <div class="flex flex-col gap-1">
            <label class="text-[0.7rem] font-medium text-muted uppercase tracking-wide">Title</label>
            <input class="bg-surface-dark border border-dim rounded-md px-2.5 py-1.5 text-[0.82rem] text-default outline-none transition-colors duration-150 font-[inherit] focus:border-primary" type="text" .value=${this.editTitle}
              @input=${(e) => { this.editTitle = e.target.value; }} />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[0.7rem] font-medium text-muted uppercase tracking-wide">Priority</label>
            <select class="bg-surface-dark border border-dim rounded-md px-2.5 py-1.5 text-[0.82rem] text-default outline-none transition-colors duration-150 font-[inherit] focus:border-primary" .value=${this.editPriority}
              @change=${(e) => { this.editPriority = e.target.value; }}>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[0.7rem] font-medium text-muted uppercase tracking-wide">Due date</label>
            <input class="bg-surface-dark border border-dim rounded-md px-2.5 py-1.5 text-[0.82rem] text-default outline-none transition-colors duration-150 font-[inherit] focus:border-primary" type="date" .value=${this.editDue}
              @input=${(e) => { this.editDue = e.target.value; }} />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[0.7rem] font-medium text-muted uppercase tracking-wide">Section</label>
            <select class="bg-surface-dark border border-dim rounded-md px-2.5 py-1.5 text-[0.82rem] text-default outline-none transition-colors duration-150 font-[inherit] focus:border-primary" .value=${this.editSection}
              @change=${(e) => { this.editSection = e.target.value; }}>
              ${sectionOptions.map((s) => html`<option value=${s.name}>${s.name}</option>`)}
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[0.7rem] font-medium text-muted uppercase tracking-wide">Note</label>
            <textarea class="bg-surface-dark border border-dim rounded-md px-2.5 py-1.5 text-[0.82rem] text-default outline-none transition-colors duration-150 font-[inherit] focus:border-primary resize-y min-h-[60px]" .value=${this.editNote}
              @input=${(e) => { this.editNote = e.target.value; }}
              placeholder="Add a note..." rows="3"></textarea>
          </div>

          ${task.subtasks?.length > 0 || this.view === "board" ? html`
            <div class="flex flex-col gap-1">
              <label class="text-[0.7rem] font-medium text-muted uppercase tracking-wide">Subtasks</label>
              <div class="flex flex-col gap-1">
                ${(task.subtasks || []).map((sub) => html`
                  <div class="group flex items-center gap-1.5 text-[0.82rem] py-[3px]">
                    <input type="checkbox" class="w-3.5 h-3.5 cursor-pointer shrink-0" style="accent-color: var(--color-primary)" .checked=${sub.checked}
                      @change=${() => this._toggleTask(sub)} />
                    <span class="${sub.checked ? "line-through opacity-45" : ""}">${sub.title}</span>
                    <span class="ml-auto opacity-0 cursor-pointer transition-opacity duration-150 group-hover:opacity-40 hover:opacity-100!" @click=${() => this._deleteSubtask(sub)}>
                      <uix-icon name="x" size="12"></uix-icon>
                    </span>
                  </div>
                `)}
                <div>
                  <input class="bg-transparent border-none outline-none text-inherit text-[0.8rem] py-1 w-full placeholder:text-muted placeholder:opacity-50" placeholder="Add subtask..."
                    @keydown=${(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        this._addSubtask(task, e.target.value.trim());
                        e.target.value = "";
                      }
                    }} />
                </div>
              </div>
            </div>
          ` : ""}

          ${task.collectionName || task.done ? html`
            <div class="mt-2 pt-3 border-t border-dim flex flex-col gap-1.5">
              ${task.collectionName ? html`<div class="flex items-center justify-between text-[0.75rem]"><span class="text-muted">List</span> <uix-badge size="xs" variant="secondary">${task.collectionName}</uix-badge></div>` : ""}
              ${task.done ? html`<div class="flex items-center justify-between text-[0.75rem]"><span class="text-muted">Completed</span> <span class="text-default">${task.done}</span></div>` : ""}
            </div>
          ` : ""}
        </div>

        <div class="px-4 py-3 border-t border-dim flex gap-2">
          <uix-button size="sm" @click=${() => this._saveEdit()}>Save</uix-button>
          <uix-button size="sm" ghost @click=${() => this._deleteTask(task).then(() => this._closeDrawer())}>
            <uix-icon name="trash-2" size="14" class="mr-1"></uix-icon> Delete
          </uix-button>
        </div>
      </div>
    `;
  },

  async _saveEdit() {
    const task = this.editTask;
    if (!task?._sourceFile || task._itemIndex === undefined) return;
    const updates = {
      title: this.editTitle,
      priority: this.editPriority,
      due: this.editDue,
      section: this.editSection,
      note: this.editNote,
    };
    this._closeDrawer();

    await this._saveFile(task._sourceFile, ({ sections }) => {
      const item = itemAtIndex(sections, task._itemIndex);
      if (!item) return;
      const oldSection = item.section;
      Object.assign(item, updates);
      if (updates.section && updates.section !== oldSection) {
        moveItemBlockToSection(sections, item, updates.section);
      }
    });
  },

  async _deleteTask(task) {
    if (!task?._sourceFile || task._itemIndex === undefined) return;
    await this._saveFile(task._sourceFile, ({ sections }) => {
      const item = itemAtIndex(sections, task._itemIndex);
      if (!item) return;
      const loc = findSectionContaining(sections, item);
      if (!loc) return;
      const childRange = getChildrenRange(loc.sec.items, loc.idx);
      loc.sec.items.splice(loc.idx, 1 + childRange.length);
    });
  },

  async _toggleSubtask(sub) {
    await this._toggleTask(sub);
    if (this.editTask) {
      const updated = this._findTaskWithSubtasks(this.editTask._sourceFile, this.editTask._itemIndex);
      if (updated) this.editTask = updated;
    }
  },

  async _addSubtask(parentTask, title) {
    if (!parentTask?._sourceFile) return;
    const section = parentTask.section || this._firstSectionName();
    await this._saveFile(parentTask._sourceFile, ({ sections, typeConfig }) => {
      const parent = itemAtIndex(sections, parentTask._itemIndex);
      if (!parent) return;
      const loc = findSectionContaining(sections, parent);
      if (!loc) return;
      const childRange = getChildrenRange(loc.sec.items, loc.idx);
      const insertAt = childRange.length ? childRange[childRange.length - 1] + 1 : loc.idx + 1;
      const newItem = { title, section: parent.section || section, indent: 2 };
      if ((typeConfig.itemType || "checkbox") === "checkbox") newItem.checked = false;
      loc.sec.items.splice(insertAt, 0, newItem);
    });
    if (this.editTask) {
      const updated = this._findTaskWithSubtasks(this.editTask._sourceFile, this.editTask._itemIndex);
      if (updated) this.editTask = updated;
    }
  },

  async _deleteSubtask(sub) {
    await this._deleteTask(sub);
    if (this.editTask) {
      const updated = this._findTaskWithSubtasks(this.editTask._sourceFile, this.editTask._itemIndex);
      if (updated) this.editTask = updated;
    }
  },

  _findTaskWithSubtasks(sourceFile, itemIndex) {
    for (const sec of this._displaySections()) {
      const trees = this._tasksForColumn(sec);
      const found = trees.find((t) => t._sourceFile === sourceFile && t._itemIndex === itemIndex);
      if (found) return found;
    }
    return null;
  },
  };
}
