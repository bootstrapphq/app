const todayStr = () => new Date().toISOString().split("T")[0];

export default function (ctx) {
  const { $APP, html, T, events, getIDE, createCollectionManager } = ctx;

  let _dailyCM, _tasksCM, _challengesCM;
  const dailyCM = () => (_dailyCM ||= createCollectionManager({ model: $APP.Model.collections, types: ["daily"] }));
  const tasksCM = () => (_tasksCM ||= createCollectionManager({ model: $APP.Model.collections, types: ["task-list"] }));
  const challengesCM = () => (_challengesCM ||= createCollectionManager({ model: $APP.Model.collections, types: ["challenge"] }));

  return {
    tag: "bsp-journal-today",
    properties: {
      date: T.string({ defaultValue: "" }),
      journalItems: T.array({ defaultValue: [] }),
      captureItems: T.array({ defaultValue: [] }),
      habitItems: T.array({ defaultValue: [] }),
      tasksDue: T.array({ defaultValue: [] }),
      challenges: T.array({ defaultValue: [] }),
      loading: T.boolean({ defaultValue: true }),
    },

    async connected() {
      if (!this.date) this.date = todayStr();
      await this._loadAll();
      this.loading = false;
      this._unsub = events.on("collection:changed", () => this._loadAll());
    },

    disconnected() {
      this._unsub?.();
    },

    async _loadAll() {
      await Promise.all([this._loadDay(), this._loadTasksDue(), this._loadChallenges()]);
    },

    async _loadDay() {
      const day = await dailyCM().getCollection(this.date);
      const items = day?.items || [];
      this.journalItems = items.filter((i) => i.section === "Journal");
      this.captureItems = items.filter((i) => i.section === "Captures");
      this.habitItems = items.filter((i) => i.section === "Habits");
    },

    async _loadTasksDue() {
      const all = await tasksCM().getAllItems({ checked: false });
      this.tasksDue = all.filter((t) => t.due && t.due <= this.date);
    },

    async _loadChallenges() {
      const cols = await challengesCM().getAllCollections();
      const active = cols.filter((ch) => !ch.endDate || ch.endDate >= this.date);
      this.challenges = active.map((ch) => {
        const loggedToday = (ch.items || []).some((i) => i.date === this.date);
        return { ...ch, loggedToday };
      });
    },

    _prettyDate() {
      const d = new Date(this.date + "T00:00:00");
      return d.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" });
    },

    async _toggleTask(task) {
      const cm = tasksCM();
      const col = await cm.getCollection(task.collectionId);
      if (!col) return;
      const idx = col.items.findIndex((i) =>
        i.title === task.title && i.due === task.due && i.checked === task.checked,
      );
      if (idx !== -1) await cm.toggleItem(task.collectionId, idx);
    },

    async _logHabit(ch) {
      const ide = getIDE();
      const value = ch.metricName
        ? await ide.showInputBox({
            prompt: `Log ${ch.metricName}${ch.metricUnit ? ` (${ch.metricUnit})` : ""}`,
            placeholder: "Enter value",
          })
        : "";
      if (ch.metricName && value === undefined) return;
      await challengesCM().addItem(ch.slug || ch.id, {
        date: this.date,
        value: value || "",
      });
      await ide.executeCommand("journal.logHabit", { habit: ch.name, value });
    },

    render() {
      if (this.loading) {
        return html`<div class="flex items-center justify-center h-full"><uix-text muted>Loading…</uix-text></div>`;
      }

      return html`
        <div class="flex flex-col gap-6 py-8 px-10 max-w-3xl mx-auto">
          <header class="flex items-baseline justify-between gap-4 pb-2 border-b border-dim">
            <uix-heading level="2" class="m-0">Today</uix-heading>
            <uix-text size="sm" muted>${this._prettyDate()}</uix-text>
          </header>

          <bsp-journal-capture .date=${this.date}></bsp-journal-capture>

          ${this._renderTasksDue()}
          ${this._renderHabits()}
          ${this._renderJournal()}
          ${this._renderCaptures()}
        </div>
      `;
    },

    _renderTasksDue() {
      if (!this.tasksDue.length) return "";
      return html`
        <section class="flex flex-col gap-2">
          <header class="flex items-center gap-2">
            <uix-text size="sm" weight="medium" class="uppercase tracking-wide opacity-70">Tasks due today</uix-text>
            <uix-badge size="xs">${this.tasksDue.length}</uix-badge>
          </header>
          <ul class="list-none m-0 p-0 flex flex-col gap-1">
            ${this.tasksDue.map((t) => html`
              <li class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-light">
                <uix-checkbox
                  ?checked=${t.checked}
                  @change=${() => this._toggleTask(t)}
                ></uix-checkbox>
                <div class="flex-1 flex flex-col gap-0.5 min-w-0">
                  <span class="text-sm">${t.title}</span>
                  <uix-text size="xs" muted>${t.collectionName || ""}${t.due && t.due < this.date ? ` · overdue ${t.due}` : ""}</uix-text>
                </div>
              </li>
            `)}
          </ul>
        </section>
      `;
    },

    _renderHabits() {
      if (!this.challenges.length) return "";
      return html`
        <section class="flex flex-col gap-2">
          <header class="flex items-center gap-2">
            <uix-text size="sm" weight="medium" class="uppercase tracking-wide opacity-70">Habits & check-ins</uix-text>
          </header>
          <ul class="list-none m-0 p-0 flex flex-col gap-1">
            ${this.challenges.map((ch) => html`
              <li class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-surface-light">
                <uix-icon
                  name=${ch.loggedToday ? "circle-check" : "circle"}
                  size="16"
                  class=${ch.loggedToday ? "text-success" : "opacity-40"}
                ></uix-icon>
                <div class="flex-1 flex flex-col gap-0.5 min-w-0">
                  <span class="text-sm">${ch.name}</span>
                  <uix-text size="xs" muted>${ch.metricName || ""}${ch.metricName && ch.metricUnit ? ` · ${ch.metricUnit}` : ""}</uix-text>
                </div>
                <uix-button size="xs" ?disabled=${ch.loggedToday} @click=${() => this._logHabit(ch)}>
                  ${ch.loggedToday ? "Logged" : "Log"}
                </uix-button>
              </li>
            `)}
          </ul>
        </section>
      `;
    },

    _renderJournal() {
      return html`
        <section class="flex flex-col gap-2">
          <header class="flex items-center gap-2">
            <uix-text size="sm" weight="medium" class="uppercase tracking-wide opacity-70">Journal</uix-text>
          </header>
          ${this.journalItems.length ? html`
            <ul class="list-none m-0 p-0 flex flex-col gap-1.5">
              ${this.journalItems.map((i) => html`
                <li class="flex gap-3 items-baseline px-3 py-1 rounded hover:bg-surface-light text-sm">
                  <uix-text size="xs" muted class="flex-shrink-0 tabular-nums min-w-12">${i.time || ""}</uix-text>
                  <span>${i.title}</span>
                </li>
              `)}
            </ul>
          ` : html`<uix-text size="sm" muted>No journal entries yet.</uix-text>`}
        </section>
      `;
    },

    _renderCaptures() {
      if (!this.captureItems.length) return "";
      return html`
        <section class="flex flex-col gap-2">
          <header class="flex items-center gap-2">
            <uix-text size="sm" weight="medium" class="uppercase tracking-wide opacity-70">Captures</uix-text>
            <uix-badge size="xs">${this.captureItems.length}</uix-badge>
          </header>
          <ul class="list-none m-0 p-0 flex flex-col gap-1.5">
            ${this.captureItems.map((i) => html`
              <li class="flex gap-3 items-baseline px-3 py-1 rounded hover:bg-surface-light text-sm">
                <uix-text size="xs" muted class="flex-shrink-0 tabular-nums min-w-12">${i.time || ""}</uix-text>
                <span>${i.title}</span>
              </li>
            `)}
          </ul>
        </section>
      `;
    },
  };
}
