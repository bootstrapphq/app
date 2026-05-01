export default function (ctx) {
  const { $APP, html, T, events, getIDE, createCollectionManager } = ctx;

  let _cm;
  const getCM = () => {
    if (!_cm)
      _cm = createCollectionManager({
        model: $APP.Model.collections,
        types: ["task-list"],
      });
    return _cm;
  };

  return {
  tag: "bsp-tasks-sidebar",
  properties: {
    taskLists: T.array({ defaultValue: [] }),
    counts: T.object({ defaultValue: {} }),
  },
  async connected() {
    await this.loadData();
    this._unsub = events.on("collection:changed", () => this.loadData());
  },

  disconnected() {
    this._unsub?.();
  },
  async loadData() {
    const cm = getCM();
    this.taskLists = (await cm.getCollections()) || [];

    const allItems = await cm.getAllItems();
    const open = allItems.filter((i) => !i.checked);
    const done = allItems.filter((i) => i.checked);
    this.counts = {
      open: open.length,
      done: done.length,
      all: allItems.length,
    };
  },
  render() {
    const ide = getIDE();
    return html`
      <div class="p-3 flex flex-col h-full">
        <uix-button primary size="sm" class="mb-3 w-full" @click=${() => ide.executeCommand("tasks.newTask")}>
          <uix-icon name="plus" size="14" class="mr-1"></uix-icon>
          New Task
        </uix-button>

        <!-- Views -->
        <uix-text size="xs" muted weight="medium" class="mb-2 block px-2 uppercase tracking-wide">Views</uix-text>
        <div
          class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light text-sm"
          @click=${() => ide.openResource("tasks://all")}
        >
          <uix-icon name="list" size="14" class="opacity-50"></uix-icon>
          <span>All Tasks</span>
          <uix-badge size="xs" class="ml-auto">${this.counts.all || 0}</uix-badge>
        </div>
        <div
          class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light text-sm"
          @click=${() => ide.openResource("tasks://board")}
        >
          <uix-icon name="kanban" size="14" class="opacity-50"></uix-icon>
          <span>Board</span>
        </div>

        <!-- Status -->
        <uix-text size="xs" muted weight="medium" class="mt-4 mb-2 block px-2 uppercase tracking-wide">Status</uix-text>
        <div class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light text-sm">
          <uix-icon name="circle" size="14" class="opacity-50"></uix-icon>
          <span>Open</span>
          <uix-badge size="xs" class="ml-auto">${this.counts.open || 0}</uix-badge>
        </div>
        <div class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light text-sm">
          <uix-icon name="circle-check" size="14" class="opacity-50"></uix-icon>
          <span>Done</span>
          <uix-badge size="xs" class="ml-auto">${this.counts.done || 0}</uix-badge>
        </div>

        <!-- Lists -->
        <uix-text size="xs" muted weight="medium" class="mt-4 mb-2 block px-2 uppercase tracking-wide">Lists</uix-text>
        ${
          this.taskLists.length === 0
            ? html`<uix-text size="xs" muted class="px-2 block">No lists yet</uix-text>`
            : this.taskLists.map(
                (list) => html`
                <div
                  class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light text-sm"
                  @click=${() => ide.openResource(`tasks://list/${list.id}`)}
                >
                  <uix-icon name=${list.icon || "list-todo"} size="14" class="opacity-50"></uix-icon>
                  <span>${list.name}</span>
                </div>
              `,
              )
        }
        <uix-button size="xs" ghost class="mt-1 w-full" @click=${() => this._newList()}>
          <uix-icon name="plus" size="12" class="mr-1"></uix-icon>
          New List
        </uix-button>
      </div>
    `;
  },
  async _newList() {
    const ide = getIDE();
    const name = await ide.showInputBox({
      prompt: "List name",
      placeholder: "My List",
    });
    if (name) {
      const cm = getCM();
      await cm.createCollection({ name, type: "task-list" });
      await this.loadData();
    }
  },
  };
}
