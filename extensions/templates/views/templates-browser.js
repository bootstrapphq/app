const SORT_OPTIONS = [
  { label: "Name (A → Z)", value: "name" },
  { label: "Category", value: "category" },
];

const CATEGORY_ORDER = ["notes", "tasks", "website"];
const CATEGORY_LABEL = {
  notes: "Notes",
  tasks: "Tasks",
  website: "Website",
};

export default function (ctx) {
  const { html, T, getIDE } = ctx;

  return {
  tag: "bsp-templates-browser",
  properties: {
    uri: T.string({ defaultValue: "" }),
    search: T.string({ defaultValue: "" }),
    sortBy: T.string({ defaultValue: "name" }),
    categoryFilters: T.object({ attribute: false, defaultValue: {} }),
    templates: T.array({ defaultValue: [] }),
  },

  connected() {
    this._refresh();
    this._unsub = getIDE().subscribe("templatesChanged", () => this._refresh());
  },

  disconnected() {
    this._unsub?.();
  },

  _refresh() {
    this.templates = [...getIDE().templates.getAllTemplates()];
  },

  _toggleCategory(category) {
    this.categoryFilters = {
      ...this.categoryFilters,
      [category]: !this.categoryFilters[category],
    };
  },

  _clearFilters() {
    this.search = "";
    this.categoryFilters = {};
  },

  _hasActiveFilters() {
    const anyCat = Object.values(this.categoryFilters).some(Boolean);
    return !!(this.search || anyCat);
  },

  _matches(t) {
    const query = this.search.trim().toLowerCase();
    if (query) {
      const hit =
        (t.name || "").toLowerCase().includes(query) ||
        (t.description || "").toLowerCase().includes(query) ||
        (t.category || "").toLowerCase().includes(query);
      if (!hit) return false;
    }

    const activeCats = Object.entries(this.categoryFilters)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (activeCats.length && !activeCats.includes(t.category)) return false;

    return true;
  },

  _sort(list) {
    const arr = [...list];
    if (this.sortBy === "name") {
      arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (this.sortBy === "category") {
      arr.sort((a, b) => {
        const ai = CATEGORY_ORDER.indexOf(a.category);
        const bi = CATEGORY_ORDER.indexOf(b.category);
        const aRank = ai === -1 ? 99 : ai;
        const bRank = bi === -1 ? 99 : bi;
        if (aRank !== bRank) return aRank - bRank;
        return (a.name || "").localeCompare(b.name || "");
      });
    }
    return arr;
  },

  _getCategories() {
    const counts = new Map();
    for (const t of this.templates) {
      const c = t.category || "other";
      counts.set(c, (counts.get(c) || 0) + 1);
    }
    const entries = [...counts.entries()];
    entries.sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a[0]);
      const bi = CATEGORY_ORDER.indexOf(b[0]);
      const aRank = ai === -1 ? 99 : ai;
      const bRank = bi === -1 ? 99 : bi;
      if (aRank !== bRank) return aRank - bRank;
      return a[0].localeCompare(b[0]);
    });
    return entries;
  },

  render() {
    const ide = getIDE();
    const filtered = this._sort(this.templates.filter((t) => this._matches(t)));
    const categories = this._getCategories();

    return html`
      <div class="block w-full h-full overflow-y-auto">
        <div class="max-w-[1200px] mx-auto px-8 pt-6 pb-16">
          <header class="mb-5">
            <div class="flex flex-col gap-0.5">
              <h1 class="m-0 text-2xl font-semibold text-default tracking-tight">Templates</h1>
              <p class="m-0 text-[13px] text-muted">Scaffold notes, task lists, and sites with one click.</p>
            </div>
          </header>

          <div class="grid grid-cols-[220px_minmax(0,1fr)] gap-6 items-start max-md:grid-cols-1">
            <aside class="sticky top-0">
              <uix-card gap="md">
                ${categories.length
                  ? html`
                    <div class="flex flex-col gap-2">
                      <div class="text-[10px] font-semibold tracking-wider uppercase text-muted">Categories</div>
                      <div class="flex flex-col gap-1">
                        ${categories.map(
                          ([cat, count]) => html`
                            <div class="flex items-center justify-between gap-2">
                              <uix-checkbox
                                size="sm"
                                label=${CATEGORY_LABEL[cat] || cat}
                                .checked=${!!this.categoryFilters[cat]}
                                @change=${() => this._toggleCategory(cat)}
                              ></uix-checkbox>
                              <span class="text-[10px] text-muted px-1.5 bg-surface-light rounded-full">${count}</span>
                            </div>
                          `,
                        )}
                      </div>
                    </div>
                  `
                  : ""
                }

                ${this._hasActiveFilters()
                  ? html`
                    <uix-button size="sm" variant="ghost" @click=${() => this._clearFilters()}>
                      <uix-icon name="x" size="12"></uix-icon> Clear filters
                    </uix-button>
                  `
                  : ""
                }
              </uix-card>
            </aside>

            <div class="min-w-0 flex flex-col gap-5">
              <div class="flex items-center gap-3 flex-wrap">
                <div class="flex-1 min-w-[220px]">
                  <uix-input
                    type="search"
                    size="sm"
                    fullWidth
                    placeholder="Search by name, description, category…"
                    .value=${this.search}
                    @input=${(e) => { this.search = e.detail.value; }}
                  ></uix-input>
                </div>
                <div class="flex items-center gap-3.5">
                  <span class="text-xs text-muted">
                    ${filtered.length} ${filtered.length === 1 ? "result" : "results"}
                  </span>
                  <uix-select
                    size="sm"
                    .value=${this.sortBy}
                    .options=${SORT_OPTIONS}
                    @change=${(e) => { this.sortBy = e.detail.value; }}
                  ></uix-select>
                </div>
              </div>

              ${filtered.length
                ? html`
                  <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5">
                    ${filtered.map((t) => this._renderCard(t, ide))}
                  </div>
                `
                : html`
                  <div class="flex flex-col items-center gap-2.5 py-16 text-center">
                    <uix-icon name="search-x" size="36" class="text-muted opacity-40"></uix-icon>
                    <p class="m-0 text-sm text-muted">No templates match your filters</p>
                    <uix-button size="sm" variant="ghost" @click=${() => this._clearFilters()}>Clear filters</uix-button>
                  </div>
                `
              }
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _renderCard(t, ide) {
    return html`
      <uix-card
        class="cursor-pointer"
        hover
        gap="sm"
        @click=${() => ide.openResource(`templates://detail/${t.id}`)}
      >
        <div slot="header" class="flex items-center gap-2.5 w-full">
          <div class="w-10 h-10 rounded-lg bg-primary/14 text-primary flex items-center justify-center flex-shrink-0">
            <uix-icon name=${t.icon || "sparkles"} size="22"></uix-icon>
          </div>
          <div class="flex-1 min-w-0 flex flex-col gap-0.5">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="text-sm font-semibold text-default truncate flex-1 min-w-0">${t.name}</span>
            </div>
          </div>
          ${t.category ? html`<uix-tag size="sm" outlined>${CATEGORY_LABEL[t.category] || t.category}</uix-tag>` : ""}
        </div>

        <p class="m-0 text-xs leading-relaxed text-muted line-clamp-2">${t.description || ""}</p>

        <div slot="footer" class="flex items-center justify-between gap-2 w-full" style="--uix-card-footer-justify: space-between">
          <uix-button
            variant="primary"
            size="sm"
            @click=${(e) => {
              e.stopPropagation();
              ide.openResource(`templates://detail/${t.id}`);
            }}
          >Use Template</uix-button>
          <a
            class="text-xs text-primary cursor-pointer hover:underline"
            @click=${(e) => {
              e.stopPropagation();
              ide.openResource(`templates://detail/${t.id}`);
            }}
          >Details →</a>
        </div>
      </uix-card>
    `;
  },
  };
}
