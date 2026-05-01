import { CATEGORY_ICONS } from "../constants.js";

export default function (ctx) {
  const { $APP, html, T, events, getIDE, createCollectionManager } = ctx;

  let _cm;
  const getCM = () => {
    if (!_cm) _cm = createCollectionManager({ model: $APP.Model.collections, types: ["challenge"] });
    return _cm;
  };

  return {
    tag: "bsp-challenges-sidebar",
    properties: {
      challenges: T.array({ defaultValue: [] }),
      showCompleted: T.boolean({ defaultValue: false }),
    },
    async connected() {
      await this.loadChallenges();
      this._unsub = events.on("collection:changed", () => this.loadChallenges());
    },
    disconnected() {
      this._unsub?.();
    },
    async loadChallenges() {
      const cm = getCM();
      const cols = await cm.getAllCollections();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.challenges = cols.map((col) => {
        const items = col.items || [];
        const sorted = [...items].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
        const latest = sorted.length ? parseFloat(sorted[sorted.length - 1].value) : null;
        const startDate = col.startDate ? new Date(col.startDate + "T00:00:00") : null;
        const endDate = col.endDate ? new Date(col.endDate + "T00:00:00") : null;
        const totalDays = startDate && endDate ? Math.ceil((endDate - startDate) / 86400000) : 0;
        const elapsed = startDate ? Math.max(0, Math.ceil((today - startDate) / 86400000)) : 0;
        const progress = totalDays > 0 ? Math.min(100, Math.round((elapsed / totalDays) * 100)) : 0;
        const completed = endDate && today > endDate;
        return { ...col, entryCount: items.length, latestValue: latest, totalDays, elapsed, progress, completed };
      });
    },
    render() {
      const active = this.challenges.filter((ch) => !ch.completed);
      const completed = this.challenges.filter((ch) => ch.completed);
      return html`
        <div class="flex flex-col w-full h-full">
          <div class="flex items-center justify-between px-3.5 pt-3 pb-2">
            <uix-text weight="medium" size="sm">Challenges</uix-text>
            <div class="flex items-center gap-1">
              <uix-badge size="xs">${active.length} active</uix-badge>
              <uix-button size="xs" ghost @click=${() => this._newChallenge()}>
                <uix-icon name="plus" size="14"></uix-icon>
              </uix-button>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto px-2 py-1">
            ${active.length === 0 && completed.length === 0
              ? html`<div class="py-6 px-3.5 text-center"><uix-text size="xs" muted>No challenges yet</uix-text></div>`
              : html`
                ${active.map((ch) => this._renderItem(ch))}
                ${completed.length > 0 ? html`
                  <div class="flex items-center gap-1 px-2 py-1.5 cursor-pointer select-none mt-3 mb-1"
                    @click=${() => { this.showCompleted = !this.showCompleted; }}>
                    <uix-icon name=${this.showCompleted ? "chevron-down" : "chevron-right"} size="12" class="opacity-40"></uix-icon>
                    <uix-text size="xs" muted weight="medium" class="uppercase tracking-wide">Completed</uix-text>
                    <uix-badge size="xs">${completed.length}</uix-badge>
                  </div>
                  ${this.showCompleted ? completed.map((ch) => this._renderItem(ch)) : ""}
                ` : ""}
              `}
          </div>
          <div class="p-2 border-t border-dim">
            <uix-button size="xs" ghost class="w-full" @click=${() => getIDE().openResource("challenges://overview")}>
              <uix-icon name="layout-grid" size="12" class="mr-1"></uix-icon> Overview
            </uix-button>
          </div>
        </div>
      `;
    },
    _renderItem(ch) {
      const icon = CATEGORY_ICONS[ch.category] || "target";
      return html`
        <div class="px-2.5 py-2 rounded-md cursor-pointer mb-0.5 transition-colors duration-100 hover:bg-surface-light ${ch.completed ? "opacity-50" : ""}"
          @click=${() => getIDE().openResource(`challenges://challenge/${ch.slug || ch.id}`)}>
          <div class="flex items-center gap-2 mb-1">
            <uix-icon name=${icon} size="14" class="opacity-60"></uix-icon>
            <uix-text size="sm" weight="medium" class="flex-1 truncate">${ch.name}</uix-text>
          </div>
          ${ch.totalDays > 0 ? html`
            <uix-progress-bar .value=${ch.progress} size="sm" class="my-1"></uix-progress-bar>
            <div class="flex justify-between text-[0.65rem] text-muted">
              <span>${ch.completed ? "Completed" : `Day ${ch.elapsed}/${ch.totalDays}`}</span>
              ${ch.latestValue !== null && ch.metricUnit ? html`<span>${ch.latestValue} ${ch.metricUnit}</span>` : ""}
            </div>
          ` : html`<div class="flex justify-between text-[0.65rem] text-muted"><span>${ch.entryCount} entries</span></div>`}
        </div>
      `;
    },
    async _newChallenge() {
      getIDE().executeCommand("challenges.newChallenge");
    },
  };
}
