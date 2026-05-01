import {
  SECTION_CATALOG,
  CATALOG_BY_TAG,
} from "/node_modules/@bootstrapp/uix/page/catalog.js";

export default function (ctx) {
  const { html, T } = ctx;

  return {
    tag: "bsp-sections-editor",
    properties: {
      sections: T.array({ attribute: false, defaultValue: [] }),
      openItems: T.array({ attribute: false, defaultValue: [] }),
      showAddMenu: T.boolean({ defaultValue: false }),
    },

    _emit(next) {
      this.sections = next;
      this.emit("change", { sections: next });
    },

    _addSection(tag) {
      this.showAddMenu = false;
      const next = [...this.sections, { type: tag, props: {} }];
      this.openItems = [next.length - 1];
      this._emit(next);
    },

    _removeSection(index) {
      const next = this.sections.filter((_, i) => i !== index);
      this.openItems = this.openItems
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i));
      this._emit(next);
    },

    _moveSection(index, dir) {
      const j = index + dir;
      if (j < 0 || j >= this.sections.length) return;
      const next = [...this.sections];
      [next[index], next[j]] = [next[j], next[index]];
      this.openItems = this.openItems.map((i) => {
        if (i === index) return j;
        if (i === j) return index;
        return i;
      });
      this._emit(next);
    },

    _updateProps(index, props) {
      const next = this.sections.map((s, i) =>
        i === index ? { ...s, props } : s,
      );
      this._emit(next);
    },

    _onAccordionToggle(e) {
      const { index, open } = e.detail;
      const current = this.openItems || [];
      this.openItems = open
        ? [...current, index]
        : current.filter((i) => i !== index);
    },

    _renderAddMenu() {
      if (!this.showAddMenu) {
        return html`<button
          class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-transparent border border-dashed border-dim rounded-lg cursor-pointer text-[13px] font-medium text-muted hover:border-primary hover:text-primary"
          @click=${() => (this.showAddMenu = true)}
        >
          <uix-icon name="plus" size="14"></uix-icon>
          Add Section
        </button>`;
      }
      return html`<div class="border border-dim rounded-lg bg-surface overflow-hidden">
        <div class="flex items-center justify-between px-3 py-2.5 bg-surface-light text-xs font-semibold text-muted uppercase tracking-wide border-b border-dim">
          <span>Add a section</span>
          <button
            class="inline-flex items-center justify-center w-6 h-6 p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-surface-light hover:text-default disabled:opacity-30 disabled:cursor-not-allowed"
            @click=${() => (this.showAddMenu = false)}
          >
            <uix-icon name="x" size="12"></uix-icon>
          </button>
        </div>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-1 p-2">
          ${SECTION_CATALOG.map(
            (entry) => html`<button
              class="flex flex-col items-center justify-center gap-1.5 py-3 px-1.5 border border-dim rounded-md bg-transparent cursor-pointer text-xs text-default hover:bg-primary/5 hover:border-primary hover:text-primary"
              @click=${() => this._addSection(entry.tag)}
            >
              <uix-icon name=${entry.icon} size="16"></uix-icon>
              <span>${entry.label}</span>
            </button>`,
          )}
        </div>
      </div>`;
    },

    render() {
      const sections = this.sections || [];
      return html`<div class="flex flex-col gap-2.5 text-[13px]">
        ${sections.length === 0
          ? html`<div class="py-6 px-4 text-center text-[13px] text-muted border border-dashed border-dim rounded-lg">
              No sections yet. Add one to get started.
            </div>`
          : html`<uix-accordion
              variant="separated"
              .openItems=${this.openItems}
              @accordion-toggle=${(e) => this._onAccordionToggle(e)}
            >
              ${sections.flatMap((section, i) => {
                const entry = CATALOG_BY_TAG[section.type] || {
                  label: section.type,
                  icon: "box",
                };
                return [
                  html`<div class="flex items-center gap-1 py-2 px-2.5 bg-surface-light cursor-pointer">
                    <div class="flex items-center gap-2 flex-1 text-[13px] text-default text-left overflow-hidden">
                      <uix-icon
                        name=${entry.icon}
                        size="14"
                        class="text-muted"
                      ></uix-icon>
                      <span class="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">${entry.label}</span>
                      <span class="text-[11px] text-muted font-mono ml-auto pr-2">${section.type}</span>
                    </div>
                    <div
                      class="flex gap-0.5"
                      @click=${(e) => e.stopPropagation()}
                    >
                      <button
                        class="inline-flex items-center justify-center w-6 h-6 p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-surface-light hover:text-default disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                        ?disabled=${i === 0}
                        @click=${() => this._moveSection(i, -1)}
                      >
                        <uix-icon name="chevron-up" size="12"></uix-icon>
                      </button>
                      <button
                        class="inline-flex items-center justify-center w-6 h-6 p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-surface-light hover:text-default disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                        ?disabled=${i === sections.length - 1}
                        @click=${() => this._moveSection(i, 1)}
                      >
                        <uix-icon name="chevron-down" size="12"></uix-icon>
                      </button>
                      <button
                        class="inline-flex items-center justify-center w-6 h-6 p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-danger/10 hover:text-danger disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Remove"
                        @click=${() => this._removeSection(i)}
                      >
                        <uix-icon name="trash-2" size="12"></uix-icon>
                      </button>
                    </div>
                  </div>`,
                  html`<div class="p-3 border-t border-dim">
                    <bsp-props-editor
                      .tag=${section.type}
                      .props=${section.props || {}}
                      @change=${(e) => this._updateProps(i, e.detail.props)}
                    ></bsp-props-editor>
                  </div>`,
                ];
              })}
            </uix-accordion>`}
        <div class="pt-1">${this._renderAddMenu()}</div>
      </div>`;
    },
  };
}
