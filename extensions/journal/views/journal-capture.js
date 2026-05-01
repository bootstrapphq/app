const CAPTURE_TYPES = [
  { value: "journal", label: "Journal" },
  { value: "capture", label: "Capture" },
  { value: "task", label: "Task" },
  { value: "note", label: "Note" },
];

export default function (ctx) {
  const { html, T, getIDE } = ctx;

  return {
    tag: "bsp-journal-capture",
    properties: {
      date: T.string({ defaultValue: "" }),
      captureType: T.string({ defaultValue: "journal" }),
      text: T.string({ defaultValue: "" }),
      busy: T.boolean({ defaultValue: false }),
    },

    firstUpdated() {
      this.querySelector("input")?.focus();
    },

    async _submit() {
      const text = this.text.trim();
      if (!text || this.busy) return;
      this.busy = true;
      const ide = getIDE();
      try {
        if (this.captureType === "journal") {
          await ide.executeCommand("journal.captureJournal", { text });
        } else if (this.captureType === "capture") {
          await ide.executeCommand("journal.captureCapture", { text });
        } else if (this.captureType === "task") {
          await this._createTask(text);
        } else if (this.captureType === "note") {
          await this._createNote(text);
        }
        this.text = "";
      } finally {
        this.busy = false;
        this.querySelector("input")?.focus();
      }
    },

    async _createTask(title) {
      const ide = getIDE();
      const $APP = (await import("bootstrapp")).default;
      let target = await $APP.Model.collections.get("inbox");
      if (!target) {
        const plugin = ide.getPlugin?.("tasks");
        const api = plugin?.api;
        if (api?.data?.collections) {
          await api.data.collections.createCollection({ name: "Inbox", type: "task-list", icon: "inbox" });
        } else {
          await $APP.Model.collections.add({
            id: "inbox", slug: "inbox", name: "Inbox", type: "task-list",
            icon: "inbox", sortOrder: 0,
            body: "## Active\n\n## Waiting\n\n## Done\n",
          });
        }
      }
      const tasksPlugin = ide.getPlugin?.("tasks");
      if (tasksPlugin?.api?.data?.collections) {
        await tasksPlugin.api.data.collections.addItem("inbox", { title });
      }
    },

    async _createNote(title) {
      const ide = getIDE();
      const $APP = (await import("bootstrapp")).default;
      const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `note-${Date.now()}`;
      const slug = slugify(title);
      const now = new Date().toISOString();
      await $APP.Model.notes.add({
        id: slug, slug,
        title,
        body: "",
        tags: [],
        type: "note",
        createdAt: now,
        updatedAt: now,
      });
      ide.openResource(`notes://note/${slug}`);
    },

    _onKeydown(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this._submit();
      }
    },

    render() {
      const activeType = CAPTURE_TYPES.find((t) => t.value === this.captureType) || CAPTURE_TYPES[0];
      return html`
        <div class="flex flex-col gap-2 p-3 border border-dim rounded-lg bg-surface">
          <div class="flex gap-1 flex-wrap">
            ${CAPTURE_TYPES.map((t) => html`
              <button
                class="border rounded-full px-2.5 py-0.5 text-xs cursor-pointer transition-colors ${this.captureType === t.value ? "bg-primary border-primary text-white" : "border-dim bg-transparent text-muted hover:bg-surface-light"}"
                @click=${() => { this.captureType = t.value; }}
              >${t.label}</button>
            `)}
          </div>
          <div class="flex gap-2 items-center">
            <input
              type="text"
              class="flex-1 border border-dim rounded-md px-3 py-2 bg-surface-dark text-default text-sm outline-none focus:border-primary disabled:opacity-50 disabled:cursor-wait"
              .value=${this.text}
              placeholder=${`Quick ${activeType.label.toLowerCase()}…`}
              ?disabled=${this.busy}
              @input=${(e) => { this.text = e.target.value; }}
              @keydown=${(e) => this._onKeydown(e)}
            />
            <uix-button
              size="sm"
              primary
              ?disabled=${!this.text.trim() || this.busy}
              @click=${() => this._submit()}
            >Add</uix-button>
          </div>
        </div>
      `;
    },
  };
}
