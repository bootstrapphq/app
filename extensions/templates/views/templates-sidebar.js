const CATEGORY_ORDER = ["notes", "tasks", "website"];
const CATEGORY_LABEL = {
  notes: "Notes",
  tasks: "Tasks",
  website: "Website",
};

export default function (ctx) {
  const { html, T, getIDE } = ctx;

  return {
  tag: "bsp-templates-sidebar",
  properties: {
    templates: T.array([]),
    searchQuery: T.string(""),
  },

  connected() {
    this._refresh();
    this.unsub = getIDE().subscribe("templatesChanged", () => this._refresh());
  },

  disconnected() {
    this.unsub?.();
  },

  _refresh() {
    this.templates = getIDE().templates.getAllTemplates();
  },

  _matches(t) {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (t.name || "").toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      (t.category || "").toLowerCase().includes(q)
    );
  },

  render() {
    const ide = getIDE();
    const filtered = this.templates.filter((t) => this._matches(t));

    const groupsInData = [...new Set(filtered.map((t) => t.category).filter(Boolean))];
    const orderedCats = [
      ...CATEGORY_ORDER.filter((c) => groupsInData.includes(c)),
      ...groupsInData.filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
    ];

    const renderTemplate = (t) => html`
      <div
        class="group p-2 flex gap-3 hover:bg-surface-light rounded-md cursor-pointer"
        @click=${() => ide.openResource(`templates://detail/${t.id}`)}
      >
        <div class="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-surface">
          <uix-icon name=${t.icon || "sparkles"} class="w-4 h-4 text-primary"></uix-icon>
        </div>
        <div class="flex-grow overflow-hidden min-w-0">
          <div class="font-semibold text-sm truncate text-default">${t.name}</div>
          <div class="text-xs truncate text-default/50">${t.description || ""}</div>
        </div>
        <uix-button
          variant="primary"
          size="sm"
          class="self-start opacity-0 group-hover:opacity-100 transition-opacity"
          @click=${(e) => {
            e.stopPropagation();
            ide.openResource(`templates://detail/${t.id}`);
          }}
        >
          Use
        </uix-button>
      </div>
    `;

    return html`
      <div class="flex flex-col h-full text-sm bg-surface-dark text-default">
        <div class="p-2">
          <div class="p-2 flex items-center gap-2">
            <div class="font-semibold uppercase text-xs tracking-wider text-default/50 flex-1">Templates</div>
            <button
              class="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
              @click=${() => ide.openResource("templates://browse")}
              title="Browse all templates"
            >
              <uix-icon name="layout-grid" class="w-3 h-3"></uix-icon>
              Browse
            </button>
          </div>
          <div class="px-2">
            <uix-input
              w-full
              type="search"
              size="sm"
              placeholder="Search Templates"
              .value=${this.searchQuery}
              @input=${(e) => { this.searchQuery = e.target.value; }}
            ></uix-input>
          </div>
        </div>

        <div class="overflow-y-auto px-2 flex-1 space-y-3 py-2">
          ${orderedCats.length > 0
            ? orderedCats.map((cat) => {
                const items = filtered.filter((t) => t.category === cat);
                if (!items.length) return "";
                const label = CATEGORY_LABEL[cat] || cat;
                return html`
                  <div>
                    <div class="text-xs font-semibold text-default/50 uppercase my-2 px-2">
                      ${label} · ${items.length}
                    </div>
                    <div class="space-y-1">${items.map(renderTemplate)}</div>
                  </div>
                `;
              })
            : html`<div class="space-y-1">${filtered.map(renderTemplate)}</div>`
          }

          ${filtered.length === 0
            ? html`<div class="text-center text-xs text-default/50 pt-4">No templates found.</div>`
            : ""
          }
        </div>
      </div>
    `;
  },
  };
}
