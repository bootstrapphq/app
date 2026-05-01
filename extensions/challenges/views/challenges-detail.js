import { CATEGORY_LABELS } from "../constants.js";

export default function (ctx) {
  const { $APP, html, repeat, T, events, getIDE, createCollectionManager, MediaResolver, resizeImage } = ctx;

  let _cm;
  const getCM = () => {
    if (!_cm) _cm = createCollectionManager({ model: $APP.Model.collections, types: ["challenge"] });
    return _cm;
  };

  return {
    tag: "bsp-challenges-detail",
    properties: {
      uri: T.string({ defaultValue: "" }),
      challengeId: T.string({ defaultValue: "" }),
      challenge: T.object({ defaultValue: null }),
      entries: T.array({ defaultValue: [] }),
      addDate: T.string({ defaultValue: "" }),
      addValue: T.string({ defaultValue: "" }),
      addNotes: T.string({ defaultValue: "" }),
      addPhotoFile: T.object({ defaultValue: null }),
      addPhotoPreview: T.string({ defaultValue: "" }),
      resolvedPhotos: T.object({ defaultValue: {} }),
      editIdx: T.number({ defaultValue: -1 }),
      editValue: T.string({ defaultValue: "" }),
      editNotes: T.string({ defaultValue: "" }),
      settingsOpen: T.boolean({ defaultValue: false }),
      editName: T.string({ defaultValue: "" }),
      editGoal: T.string({ defaultValue: "" }),
      editStartDate: T.string({ defaultValue: "" }),
      editEndDate: T.string({ defaultValue: "" }),
      editMetricName: T.string({ defaultValue: "" }),
      editMetricUnit: T.string({ defaultValue: "" }),
      editTargetValue: T.string({ defaultValue: "" }),
      editStartValue: T.string({ defaultValue: "" }),
      editCategory: T.string({ defaultValue: "other" }),
    },
    async connected() {
      if (!this.challengeId && this.uri) {
        const path = this.uri.replace("challenges://", "");
        if (path.startsWith("challenge/")) this.challengeId = path.replace("challenge/", "");
      }
      this.addDate = new Date().toISOString().split("T")[0];
      await this.loadChallenge();
      this._unsub = events.on("collection:changed", () => this.loadChallenge());
    },
    disconnected() {
      this._unsub?.();
    },
    async loadChallenge() {
      if (!this.challengeId) return;
      const cm = getCM();
      const col = await cm.getCollection(this.challengeId);
      if (!col) return;
      this.challenge = col;
      const items = (col.items || []).map((item, idx) => ({ ...item, _itemIndex: idx }));
      this.entries = [...items].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      await this._resolvePhotos();
    },
    async _resolvePhotos() {
      if (!MediaResolver) return;
      const photos = {};
      for (const entry of this.entries) {
        if (entry.photo && MediaResolver.isMediaUrl(entry.photo)) {
          photos[entry.photo] = await MediaResolver.resolve(entry.photo);
        }
      }
      this.resolvedPhotos = photos;
    },
    _getPhotoSrc(photoRef) {
      if (!photoRef) return "";
      return this.resolvedPhotos[photoRef] || photoRef;
    },
    _getStats() {
      if (!this.challenge || !this.entries.length) return null;
      const ch = this.challenge;
      const sorted = [...this.entries].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
      const first = sorted[0];
      const latest = sorted[sorted.length - 1];
      const startVal = parseFloat(ch.startValue) || parseFloat(first.value) || 0;
      const latestVal = parseFloat(latest.value) || 0;
      const targetVal = parseFloat(ch.targetValue) || 0;
      const change = latestVal - startVal;
      const startDate = ch.startDate ? new Date(ch.startDate + "T00:00:00") : null;
      const endDate = ch.endDate ? new Date(ch.endDate + "T00:00:00") : null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const totalDays = startDate && endDate ? Math.ceil((endDate - startDate) / 86400000) : 0;
      const elapsed = startDate ? Math.max(0, Math.ceil((today - startDate) / 86400000)) : 0;
      const dayProgress = totalDays > 0 ? Math.min(100, Math.round((elapsed / totalDays) * 100)) : 0;
      let metricProgress = 0;
      if (targetVal !== startVal) {
        metricProgress = Math.min(100, Math.max(0, Math.round((Math.abs(change) / Math.abs(targetVal - startVal)) * 100)));
      }
      return { startVal, latestVal, targetVal, change, totalDays, elapsed, dayProgress, metricProgress };
    },
    render() {
      const ch = this.challenge;
      if (!ch) return html`<div class="p-6"><uix-text muted>Loading...</uix-text></div>`;
      const stats = this._getStats();
      const unit = ch.metricUnit || "";
      const metricName = ch.metricName || "Value";

      return html`
        <div class="w-full h-full overflow-y-auto">
        <div class="max-w-[720px] mx-auto px-4 pb-10">
          <div class="pt-5 pb-4 border-b border-dim mb-5">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1 min-w-0">
                <uix-heading level="3">${ch.name}</uix-heading>
                ${ch.goal ? html`<uix-text size="sm" muted class="block mt-1">${ch.goal}</uix-text>` : ""}
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                ${ch.category ? html`<uix-badge variant="secondary">${CATEGORY_LABELS[ch.category] || ch.category}</uix-badge>` : ""}
                <uix-button size="xs" ghost @click=${() => this._openSettings()}>
                  <uix-icon name="settings" size="14"></uix-icon>
                </uix-button>
              </div>
            </div>

            ${stats ? html`
              <div class="flex gap-3 mb-4 flex-wrap">
                ${stats.totalDays > 0 ? html`
                  <div class="flex-1 min-w-[120px] bg-surface-dark border border-dim rounded-lg px-3 py-2.5">
                    <span class="block text-[0.65rem] uppercase tracking-tight text-muted mb-0.5">Timeline</span>
                    <span class="block text-[0.85rem] font-medium mb-1">Day ${stats.elapsed} / ${stats.totalDays}</span>
                    <uix-progress-bar .value=${stats.dayProgress} size="sm"></uix-progress-bar>
                  </div>
                ` : ""}
                ${ch.metricName ? html`
                  <div class="flex-1 min-w-[120px] bg-surface-dark border border-dim rounded-lg px-3 py-2.5">
                    <span class="block text-[0.65rem] uppercase tracking-tight text-muted mb-0.5">${metricName}</span>
                    <span class="block text-[0.85rem] font-medium mb-1">
                      ${stats.startVal} → ${stats.latestVal} ${unit}
                      <span class="text-xs font-normal ${stats.change > 0 ? "text-red-400" : stats.change < 0 ? "text-green-400" : ""}">(${stats.change > 0 ? "+" : ""}${stats.change.toFixed(1)} ${unit})</span>
                    </span>
                    ${stats.targetVal ? html`<uix-progress-bar .value=${stats.metricProgress} size="sm" variant="success"></uix-progress-bar>` : ""}
                  </div>
                ` : ""}
                <div class="flex-1 min-w-[120px] bg-surface-dark border border-dim rounded-lg px-3 py-2.5">
                  <span class="block text-[0.65rem] uppercase tracking-tight text-muted mb-0.5">Entries</span>
                  <span class="block text-[0.85rem] font-medium">${this.entries.length}</span>
                </div>
              </div>
            ` : ""}

            <div class="bg-surface-dark border border-dim rounded-lg p-3">
              <uix-text size="xs" weight="medium" muted class="block mb-2">New Entry</uix-text>
              <div class="flex gap-2 items-end flex-wrap">
                <div class="flex flex-col gap-0.5">
                  <label class="text-[0.65rem] text-muted uppercase tracking-tight">Date</label>
                  <input type="date" class="bg-surface border border-dim rounded-md px-2 py-1 text-[0.8rem] text-default outline-none font-[inherit] min-w-[80px] focus:border-primary" .value=${this.addDate} @input=${(e) => { this.addDate = e.target.value; }} />
                </div>
                <div class="flex flex-col gap-0.5">
                  <label class="text-[0.65rem] text-muted uppercase tracking-tight">${metricName} ${unit ? `(${unit})` : ""}</label>
                  <input type="number" step="any" class="bg-surface border border-dim rounded-md px-2 py-1 text-[0.8rem] text-default outline-none font-[inherit] min-w-[80px] focus:border-primary" placeholder="0" .value=${this.addValue} @input=${(e) => { this.addValue = e.target.value; }} />
                </div>
                <div class="flex flex-col gap-0.5 flex-1">
                  <label class="text-[0.65rem] text-muted uppercase tracking-tight">Notes</label>
                  <input type="text" class="bg-surface border border-dim rounded-md px-2 py-1 text-[0.8rem] text-default outline-none font-[inherit] min-w-[80px] focus:border-primary" placeholder="How did it go?" .value=${this.addNotes}
                    @input=${(e) => { this.addNotes = e.target.value; }}
                    @keydown=${(e) => { if (e.key === "Enter") this._addEntry(); }} />
                </div>
              </div>
              <div class="flex gap-2 items-end flex-wrap mt-2">
                <div class="flex-1">
                  ${this.addPhotoPreview ? html`
                    <div class="relative inline-block">
                      <img src=${this.addPhotoPreview} alt="Preview" class="h-12 rounded-md border border-dim object-cover" />
                      <uix-button size="xs" ghost class="absolute -top-1 -right-1 bg-surface-dark rounded-full p-0.5" @click=${() => this._clearPhoto()}>
                        <uix-icon name="x" size="12"></uix-icon>
                      </uix-button>
                    </div>
                  ` : html`
                    <label class="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface border border-dashed border-dim rounded-md cursor-pointer text-xs text-muted transition-colors duration-100 hover:border-primary hover:text-default">
                      <uix-icon name="camera" size="16" class="opacity-50"></uix-icon>
                      <span>Add photo</span>
                      <input type="file" accept="image/*" class="hidden" @change=${(e) => this._handlePhotoSelect(e.target.files)} />
                    </label>
                  `}
                </div>
                <uix-button size="sm" class="flex-shrink-0 self-end" @click=${() => this._addEntry()}>
                  <uix-icon name="plus" size="14" class="mr-1"></uix-icon> Add
                </uix-button>
              </div>
            </div>
          </div>

          <div>
            ${this.entries.length === 0
              ? html`<div class="text-center py-10 flex flex-col items-center">
                  <uix-icon name="calendar-plus" size="32" class="opacity-20 mb-2"></uix-icon>
                  <uix-text size="sm" muted>No entries yet. Add your first update above.</uix-text>
                </div>`
              : repeat(this.entries, (e) => `${e.date}:${e.value}:${e._itemIndex}`, (entry, idx) => this._renderEntry(entry, idx))}
          </div>
        </div>
        </div>

        <uix-drawer position="right" width="360px" ?open=${this.settingsOpen}
          @drawer-closed=${() => { this.settingsOpen = false; }}>
          <div slot="header"><uix-text weight="medium">Challenge Settings</uix-text></div>
          ${this.settingsOpen ? this._renderSettings() : ""}
        </uix-drawer>
      `;
    },
    _renderSettings() {
      const fieldCls = "flex flex-col gap-1";
      const labelCls = "text-[0.7rem] text-muted uppercase tracking-tight";
      const inputCls = "bg-surface border border-dim rounded-md px-2.5 py-1.5 text-[0.82rem] text-default outline-none font-[inherit] w-full box-border focus:border-primary";
      return html`
        <div class="p-4 flex flex-col gap-3">
          <div class="${fieldCls}">
            <label class="${labelCls}">Name</label>
            <input type="text" class="${inputCls}" .value=${this.editName} @input=${(e) => { this.editName = e.target.value; }} />
          </div>
          <div class="${fieldCls}">
            <label class="${labelCls}">Goal</label>
            <input type="text" class="${inputCls}" .value=${this.editGoal} @input=${(e) => { this.editGoal = e.target.value; }} />
          </div>
          <div class="flex gap-2.5">
            <div class="${fieldCls} flex-1">
              <label class="${labelCls}">Start Date</label>
              <input type="date" class="${inputCls}" .value=${this.editStartDate} @input=${(e) => { this.editStartDate = e.target.value; }} />
            </div>
            <div class="${fieldCls} flex-1">
              <label class="${labelCls}">End Date</label>
              <input type="date" class="${inputCls}" .value=${this.editEndDate} @input=${(e) => { this.editEndDate = e.target.value; }} />
            </div>
          </div>
          <div class="${fieldCls}">
            <label class="${labelCls}">Category</label>
            <select class="${inputCls} cursor-pointer" .value=${this.editCategory} @change=${(e) => { this.editCategory = e.target.value; }}>
              <option value="fitness">Fitness</option>
              <option value="learning">Learning</option>
              <option value="habit">Habit</option>
              <option value="creative">Creative</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="h-px bg-dim my-1"></div>
          <uix-text size="xs" weight="medium" muted class="block mb-2">Metric Tracking</uix-text>
          <div class="flex gap-2.5">
            <div class="${fieldCls} flex-1">
              <label class="${labelCls}">Metric Name</label>
              <input type="text" class="${inputCls}" placeholder="e.g., Weight" .value=${this.editMetricName} @input=${(e) => { this.editMetricName = e.target.value; }} />
            </div>
            <div class="${fieldCls} w-[100px]">
              <label class="${labelCls}">Unit</label>
              <input type="text" class="${inputCls}" placeholder="e.g., kg" .value=${this.editMetricUnit} @input=${(e) => { this.editMetricUnit = e.target.value; }} />
            </div>
          </div>
          <div class="flex gap-2.5">
            <div class="${fieldCls} flex-1">
              <label class="${labelCls}">Start Value</label>
              <input type="number" step="any" class="${inputCls}" .value=${this.editStartValue} @input=${(e) => { this.editStartValue = e.target.value; }} />
            </div>
            <div class="${fieldCls} flex-1">
              <label class="${labelCls}">Target Value</label>
              <input type="number" step="any" class="${inputCls}" .value=${this.editTargetValue} @input=${(e) => { this.editTargetValue = e.target.value; }} />
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <uix-button size="sm" @click=${() => this._saveSettings()}>Save Changes</uix-button>
            <uix-button size="sm" ghost @click=${() => { this.settingsOpen = false; }}>Cancel</uix-button>
          </div>
          <div class="h-px bg-dim my-1"></div>
          <uix-button size="sm" variant="danger" class="w-full" @click=${() => this._deleteChallenge()}>
            <uix-icon name="trash-2" size="14" class="mr-1"></uix-icon> Delete Challenge
          </uix-button>
        </div>
      `;
    },
    _renderEntry(entry, idx) {
      const ch = this.challenge;
      const unit = ch.metricUnit || "";
      const dayNum = this._getDayNumber(entry.date);
      const prev = idx < this.entries.length - 1 ? this.entries[idx + 1] : null;
      const prevVal = prev ? parseFloat(prev.value) : null;
      const curVal = parseFloat(entry.value);
      const diff = prevVal !== null && !isNaN(curVal) && !isNaN(prevVal) ? curVal - prevVal : null;
      const isEditing = this.editIdx === entry._itemIndex;
      const photoSrc = this._getPhotoSrc(entry.photo);

      const editInputCls = "bg-surface border border-dim rounded-md px-2 py-1 text-[0.8rem] text-default outline-none font-[inherit] min-w-[60px] focus:border-primary";
      return html`
        <div class="flex gap-3.5 relative pb-1 last:*:hidden">
          <div class="flex flex-col items-center w-4 flex-shrink-0 pt-1.5">
            <div class="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
            <div class="flex-1 w-px bg-dim mt-1"></div>
          </div>
          <div class="group flex-1 bg-surface-dark border border-dim rounded-lg px-3.5 py-2.5 mb-2 transition-colors duration-100 hover:border-primary/50 ${isEditing ? "border-primary" : ""}">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-xs font-semibold text-primary">Day ${dayNum}</span>
              <span class="text-[0.7rem] text-muted">${this._formatDate(entry.date)}</span>
              <div class="ml-auto flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                ${!isEditing ? html`
                  <uix-button size="xs" ghost @click=${() => this._startEdit(entry)}>
                    <uix-icon name="pencil" size="12"></uix-icon>
                  </uix-button>
                  <uix-button size="xs" ghost @click=${() => this._deleteEntry(entry)}>
                    <uix-icon name="trash-2" size="12"></uix-icon>
                  </uix-button>
                ` : ""}
              </div>
            </div>
            ${isEditing ? html`
              <div class="mt-1">
                <div class="flex gap-1.5 items-center">
                  <input type="number" step="any" class="${editInputCls}" placeholder="${ch.metricName || "Value"}"
                    .value=${this.editValue} @input=${(e) => { this.editValue = e.target.value; }} />
                  <input type="text" class="${editInputCls} flex-1" placeholder="Notes"
                    .value=${this.editNotes} @input=${(e) => { this.editNotes = e.target.value; }}
                    @keydown=${(e) => { if (e.key === "Enter") this._saveEdit(entry); if (e.key === "Escape") this.editIdx = -1; }} />
                  <uix-button size="xs" @click=${() => this._saveEdit(entry)}>Save</uix-button>
                  <uix-button size="xs" ghost @click=${() => { this.editIdx = -1; }}>Cancel</uix-button>
                </div>
              </div>
            ` : html`
              <div class="flex flex-wrap gap-2 items-baseline">
                ${!isNaN(curVal) ? html`
                  <span class="text-[0.9rem] font-medium">
                    ${curVal} ${unit}
                    ${diff !== null ? html`<span class="text-[0.7rem] font-normal ml-1 ${diff > 0 ? "text-red-400" : diff < 0 ? "text-green-400" : ""}">${diff > 0 ? "+" : ""}${diff.toFixed(1)}</span>` : ""}
                  </span>
                ` : ""}
                ${entry.notes ? html`<span class="text-[0.82rem] text-muted">${entry.notes}</span>` : ""}
              </div>
              ${photoSrc ? html`<img class="mt-2 max-w-[240px] rounded-md border border-dim" src=${photoSrc} alt="Update photo" />` : ""}
            `}
          </div>
        </div>
      `;
    },
    _getDayNumber(dateStr) {
      if (!dateStr || !this.challenge?.startDate) return "?";
      const start = new Date(this.challenge.startDate + "T00:00:00");
      const current = new Date(dateStr + "T00:00:00");
      return Math.max(1, Math.ceil((current - start) / 86400000) + 1);
    },
    _formatDate(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" });
    },
    _handlePhotoSelect(files) {
      if (!files || !files.length) return;
      const file = files[0];
      this.addPhotoFile = file;
      this.addPhotoPreview = URL.createObjectURL(file);
    },
    _clearPhoto() {
      if (this.addPhotoPreview) URL.revokeObjectURL(this.addPhotoPreview);
      this.addPhotoFile = null;
      this.addPhotoPreview = "";
    },
    async _addEntry() {
      if (!this.addDate) return;
      const cm = getCM();
      const item = { title: `Day ${this._getDayNumber(this.addDate)}`, date: this.addDate };
      if (this.addValue) item.value = parseFloat(this.addValue);
      if (this.addNotes) item.notes = this.addNotes;
      if (this.addPhotoFile && $APP.Storage) {
        try {
          const resized = resizeImage ? await resizeImage(this.addPhotoFile, { maxWidth: 1200, maxHeight: 1200, quality: 0.85 }) : this.addPhotoFile;
          const result = await $APP.Storage.upload(resized);
          item.photo = result.url;
        } catch (_) {}
      }
      await cm.addItem(this.challengeId, item);
      this._clearPhoto();
      this.addValue = "";
      this.addNotes = "";
      this.addDate = new Date().toISOString().split("T")[0];
      await this.loadChallenge();
    },
    _startEdit(entry) {
      this.editIdx = entry._itemIndex;
      this.editValue = entry.value !== undefined ? String(entry.value) : "";
      this.editNotes = entry.notes || "";
    },
    async _saveEdit(entry) {
      if (!this.challenge || entry._itemIndex === undefined) return;
      const cm = getCM();
      const updates = {};
      if (this.editValue !== "") updates.value = parseFloat(this.editValue);
      updates.notes = this.editNotes;
      await cm.editItem(this.challengeId, entry._itemIndex, updates);
      this.editIdx = -1;
      await this.loadChallenge();
    },
    async _deleteEntry(entry) {
      if (!this.challenge || entry._itemIndex === undefined) return;
      if (entry.photo && MediaResolver?.isMediaUrl(entry.photo) && $APP.Storage) {
        const key = entry.photo.replace("media://", "");
        await $APP.Storage.delete(key);
      }
      const cm = getCM();
      await cm.removeItem(this.challengeId, entry._itemIndex);
      await this.loadChallenge();
    },
    _openSettings() {
      const ch = this.challenge;
      this.editName = ch.name || "";
      this.editGoal = ch.goal || "";
      this.editStartDate = ch.startDate || "";
      this.editEndDate = ch.endDate || "";
      this.editMetricName = ch.metricName || "";
      this.editMetricUnit = ch.metricUnit || "";
      this.editTargetValue = ch.targetValue !== undefined ? String(ch.targetValue) : "";
      this.editStartValue = ch.startValue !== undefined ? String(ch.startValue) : "";
      this.editCategory = ch.category || "other";
      this.settingsOpen = true;
    },
    async _saveSettings() {
      const model = $APP.Model.collections;
      await model.edit({
        id: this.challengeId,
        name: this.editName,
        goal: this.editGoal,
        startDate: this.editStartDate,
        endDate: this.editEndDate,
        metricName: this.editMetricName,
        metricUnit: this.editMetricUnit,
        targetValue: this.editTargetValue ? parseFloat(this.editTargetValue) : "",
        startValue: this.editStartValue ? parseFloat(this.editStartValue) : "",
        category: this.editCategory,
      });
      this.settingsOpen = false;
      await this.loadChallenge();
    },
    async _deleteChallenge() {
      if (!this.challengeId) return;
      await $APP.Model.collections.remove(this.challengeId);
      this.settingsOpen = false;
      getIDE().openResource("challenges://overview");
    },
  };
}
