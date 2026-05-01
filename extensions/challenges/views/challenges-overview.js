import { CATEGORY_COLORS } from "../constants.js";

export default function (ctx) {
  const { $APP, html, T, events, getIDE, createCollectionManager } = ctx;

  let _cm;
  const getCM = () => {
    if (!_cm) _cm = createCollectionManager({ model: $APP.Model.collections, types: ["challenge"] });
    return _cm;
  };

  return {
    tag: "bsp-challenges-overview",
    properties: {
      challenges: T.array({ defaultValue: [] }),
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
        const latestValue = sorted.length ? parseFloat(sorted[sorted.length - 1].value) : null;
        const startVal = parseFloat(col.startValue) || 0;
        const targetVal = parseFloat(col.targetValue) || 0;
        const startDate = col.startDate ? new Date(col.startDate + "T00:00:00") : null;
        const endDate = col.endDate ? new Date(col.endDate + "T00:00:00") : null;
        const totalDays = startDate && endDate ? Math.ceil((endDate - startDate) / 86400000) : 0;
        const elapsed = startDate ? Math.max(0, Math.ceil((today - startDate) / 86400000)) : 0;
        const dayProgress = totalDays > 0 ? Math.min(100, Math.round((elapsed / totalDays) * 100)) : 0;
        const completed = endDate && today > endDate;
        let metricProgress = 0;
        if (targetVal !== startVal && latestValue !== null) {
          metricProgress = Math.min(100, Math.max(0, Math.round(Math.abs(latestValue - startVal) / Math.abs(targetVal - startVal) * 100)));
        }
        return { ...col, entryCount: items.length, latestValue, startVal, targetVal, totalDays, elapsed, dayProgress, metricProgress, completed };
      });
    },
    render() {
      const active = this.challenges.filter((ch) => !ch.completed);
      const completed = this.challenges.filter((ch) => ch.completed);
      const totalEntries = this.challenges.reduce((sum, ch) => sum + ch.entryCount, 0);
      const tracked = this.challenges.filter((ch) => ch.metricName && ch.latestValue !== null);
      const avgProgress = tracked.length > 0
        ? Math.round(tracked.reduce((sum, ch) => sum + ch.metricProgress, 0) / tracked.length) : 0;

      return html`
        <div class="w-full h-full overflow-y-auto p-4 md:p-6 max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <uix-heading level="3">Challenges</uix-heading>
            <uix-button size="sm" @click=${() => getIDE().executeCommand("challenges.newChallenge")}>
              <uix-icon name="plus" size="14" class="mr-1"></uix-icon> New Challenge
            </uix-button>
          </div>

          <uix-grid columns="1" columns-sm="3" gap="md" class="mb-6">
            <uix-card><div class="p-3 text-center">
              <uix-text size="2xl" weight="semibold">${active.length}</uix-text>
              <uix-text size="xs" muted class="block">Active</uix-text>
            </div></uix-card>
            <uix-card><div class="p-3 text-center">
              <uix-text size="2xl" weight="semibold">${totalEntries}</uix-text>
              <uix-text size="xs" muted class="block">Total Entries</uix-text>
            </div></uix-card>
            <uix-card><div class="p-3 text-center">
              <uix-text size="2xl" weight="semibold">${avgProgress}%</uix-text>
              <uix-text size="xs" muted class="block">Avg Progress</uix-text>
            </div></uix-card>
          </uix-grid>

          ${this.challenges.length === 0 ? html`
            <div class="text-center py-15 px-5">
              <uix-icon name="target" size="48" class="opacity-20 mb-4"></uix-icon>
              <uix-text size="sm" muted class="mb-4 block">No challenges yet. Start your first one!</uix-text>
              <uix-button @click=${() => getIDE().executeCommand("challenges.newChallenge")}>
                <uix-icon name="plus" size="14" class="mr-1"></uix-icon> Create Challenge
              </uix-button>
            </div>
          ` : html`
            ${active.length > 0 ? html`<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">${active.map((ch) => this._renderCard(ch))}</div>` : ""}
            ${completed.length > 0 ? html`
              <uix-text size="sm" muted weight="medium" class="block mt-6 mb-3 uppercase tracking-wide">Completed</uix-text>
              <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">${completed.map((ch) => this._renderCard(ch))}</div>
            ` : ""}
          `}
        </div>
      `;
    },
    _renderCard(ch) {
      const catColor = CATEGORY_COLORS[ch.category] || "default";
      return html`
        <div class="group bg-surface-dark border border-dim rounded-xl p-4 cursor-pointer transition-all duration-150 hover:border-primary hover:-translate-y-px ${ch.completed ? "opacity-60" : ""}"
          @click=${() => getIDE().openResource(`challenges://challenge/${ch.slug || ch.id}`)}>
          <div class="flex items-center justify-between mb-1.5">
            <uix-text weight="medium" class="flex-1">${ch.name}</uix-text>
            <uix-badge size="xs" variant=${catColor}>${ch.category || "other"}</uix-badge>
            <uix-button size="xs" ghost class="opacity-0 group-hover:opacity-100 ml-1"
              @click=${(e) => { e.stopPropagation(); this._deleteChallenge(ch); }}>
              <uix-icon name="trash-2" size="12"></uix-icon>
            </uix-button>
          </div>
          ${ch.goal ? html`<uix-text size="xs" muted class="block mb-3">${ch.goal}</uix-text>` : ""}
          ${ch.totalDays > 0 ? html`
            <div class="mb-2.5">
              <div class="flex justify-between text-[0.7rem] text-muted mb-1">
                <span>${ch.completed ? "Completed" : `Day ${ch.elapsed} of ${ch.totalDays}`}</span>
                <span>${ch.dayProgress}%</span>
              </div>
              <uix-progress-bar .value=${ch.dayProgress} size="sm"></uix-progress-bar>
            </div>
          ` : ""}
          ${ch.metricName && ch.latestValue !== null ? html`
            <div class="mb-2.5 p-2 bg-surface rounded-md">
              <uix-text size="xs" muted>${ch.metricName}:</uix-text>
              <uix-text size="sm" weight="medium">${ch.startVal} → ${ch.latestValue} ${ch.metricUnit || ""}</uix-text>
              ${ch.targetVal ? html`<uix-progress-bar .value=${ch.metricProgress} size="sm" variant="success" class="mt-1"></uix-progress-bar>` : ""}
            </div>
          ` : ""}
          <div class="flex justify-between mt-2 pt-2 border-t border-dim">
            <uix-text size="xs" muted>${ch.entryCount} entries</uix-text>
            ${ch.startDate ? html`<uix-text size="xs" muted>${ch.startDate} → ${ch.endDate || "ongoing"}</uix-text>` : ""}
          </div>
        </div>
      `;
    },
    async _deleteChallenge(ch) {
      await $APP.Model.collections.remove(ch.id);
      await this.loadChallenges();
    },
  };
}
