export default function (ctx) {
  const { $APP, html, T, getIDE } = ctx;
  const Router = $APP.Router;

  return {
  tag: "bsp-notes-sidebar",
  properties: {
    allNotes: T.array({ defaultValue: [] }),
    searchQuery: T.string({ defaultValue: "" }),
    expandedSections: T.object({
      defaultValue: { favorites: true, types: true, tags: false, notes: false },
    }),
  },
  async connected() {
    await this.loadData();
  },
  async loadData() {
    this.allNotes = (await $APP.Model.notes.getAll()) || [];
  },
  _toggleSection(section) {
    this.expandedSections = {
      ...this.expandedSections,
      [section]: !this.expandedSections[section],
    };
  },
  _pinnedNotes() {
    return this.allNotes.filter((n) => n.pinned);
  },
  _notesByType() {
    const groups = {};
    for (const note of this.allNotes) {
      const type = note.type || "note";
      if (!groups[type]) groups[type] = [];
      groups[type].push(note);
    }
    return groups;
  },
  _filteredNotes() {
    if (!this.searchQuery) return this.allNotes;
    const q = this.searchQuery.toLowerCase();
    return this.allNotes.filter((n) =>
      n.title?.toLowerCase().includes(q) ||
      n.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  },
  _usedTags() {
    const tagNames = new Set();
    for (const note of this.allNotes) {
      if (note.tags) note.tags.forEach((t) => tagNames.add(t));
    }
    return [...tagNames];
  },
  render() {
    const ide = getIDE();
    const pinnedNotes = this._pinnedNotes();
    const notesByType = this._notesByType();
    const usedTags = this._usedTags();

    return html`
      <div class="p-3 flex flex-col h-full text-sm">
        <!-- Search -->
        <uix-input
          size="sm"
          placeholder="Search notes..."
          icon="search"
          .value=${this.searchQuery}
          @input=${(e) => {
            this.searchQuery = e.target.value;
          }}
          class="mb-3"
        ></uix-input>

        <!-- New Note Button -->
        <uix-button size="sm" primary class="mb-3 w-full" @click=${() => this._newNote()}>
          <uix-icon name="plus" size="14" class="mr-1"></uix-icon>
          New Note
        </uix-button>

        <div class="flex-1 overflow-y-auto">
          ${
            this.searchQuery
              ? this._renderSearchResults()
              : html`
                ${this._renderFavorites(pinnedNotes, ide)}
                ${this._renderTypes(notesByType, ide)}
                ${this._renderTags(usedTags, ide)}
                ${this._renderAllNotes(ide)}
              `
          }
        </div>
      </div>
    `;
  },

  _renderSectionHeader(label, section, count) {
    const expanded = this.expandedSections[section];
    return html`
      <div
        class="flex items-center gap-1 px-2 py-1.5 cursor-pointer select-none hover:bg-surface-light rounded mt-2 mb-1"
        @click=${() => this._toggleSection(section)}
      >
        <uix-icon name=${expanded ? "chevron-down" : "chevron-right"} size="12" class="opacity-40 flex-shrink-0"></uix-icon>
        <span class="uppercase tracking-wide text-xs font-medium opacity-50 flex-1">${label}</span>
        ${count !== undefined ? html`<span class="text-xs opacity-30">${count}</span>` : ""}
      </div>
    `;
  },

  _renderNoteItem(note, ide) {
    return html`
      <div
        class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-surface-light"
        @click=${() => ide.openResource(`notes://note/${note.id}`)}
      >
        <uix-icon name=${note.pinned ? "pin" : "file-text"} size="13" class="opacity-30 flex-shrink-0"></uix-icon>
        <span class="truncate flex-1">${note.title || "Untitled"}</span>
        <uix-badge size="xs">${note.type || "note"}</uix-badge>
      </div>
    `;
  },

  _renderSearchResults() {
    const results = this._filteredNotes();
    const ide = getIDE();
    return html`
      <div class="px-2 py-1 opacity-50 text-xs">${results.length} results</div>
      ${results.map((note) => this._renderNoteItem(note, ide))}
    `;
  },

  _renderFavorites(pinnedNotes, ide) {
    if (pinnedNotes.length === 0) return "";
    return html`
      ${this._renderSectionHeader("Favorites", "favorites", pinnedNotes.length)}
      ${
        this.expandedSections.favorites
          ? pinnedNotes.map(
              (note) => html`
            <div
              class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-surface-light ml-2"
              @click=${() => ide.openResource(`notes://note/${note.id}`)}
            >
              <uix-icon name="pin" size="13" class="opacity-40 flex-shrink-0" style="color: var(--color-primary)"></uix-icon>
              <span class="truncate flex-1">${note.title || "Untitled"}</span>
            </div>
          `,
            )
          : ""
      }
    `;
  },

  _renderTypes(notesByType, ide) {
    const typeEntries = Object.entries(notesByType);
    if (typeEntries.length <= 1) return "";
    return html`
      ${this._renderSectionHeader("Types", "types", typeEntries.length)}
      ${
        this.expandedSections.types
          ? typeEntries.map(
              ([type, notes]) => html`
              <div class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-surface-light ml-2">
                <uix-icon name=${type === "meeting" ? "users" : "file-text"} size="13" class="opacity-40 flex-shrink-0"></uix-icon>
                <span class="flex-1">${type}</span>
                <span class="text-xs opacity-30">${notes.length}</span>
              </div>
            `,
            )
          : ""
      }
    `;
  },

  _renderTags(usedTags, ide) {
    if (usedTags.length === 0) return "";
    return html`
      ${this._renderSectionHeader("Tags", "tags", usedTags.length)}
      ${
        this.expandedSections.tags
          ? html`
            <div class="flex flex-wrap gap-1.5 px-2 ml-2">
              ${usedTags.map(
                (tagName) => html`
                  <span
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full cursor-pointer text-xs hover:opacity-80"
                    style="background: var(--color-surface-dark)"
                    @click=${() => {
                      Router.go("/search");
                      ide.emit("search:setQuery", `#${tagName}`);
                      ide.executeCommand("search.doSearch", { term: `#${tagName}`, options: {} });
                    }}
                  >
                    <uix-icon name="tag" size="10"></uix-icon>
                    ${tagName}
                  </span>
                `,
              )}
            </div>
          `
          : ""
      }
    `;
  },

  _renderAllNotes(ide) {
    const notes = this.allNotes;
    return html`
      ${this._renderSectionHeader("All Notes", "notes", notes.length)}
      ${
        this.expandedSections.notes
          ? html`
            <div
              class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-surface-light ml-2 mb-1"
              @click=${() => ide.openResource("notes://all")}
            >
              <uix-icon name="layout-list" size="13" class="opacity-40 flex-shrink-0"></uix-icon>
              <span class="opacity-70">View All Notes</span>
            </div>
            ${notes.slice(0, 15).map(
              (note) => html`
              <div class="ml-2">${this._renderNoteItem(note, ide)}</div>
            `,
            )}
            ${notes.length > 15 ? html`<div class="px-2 ml-2 text-xs opacity-30 py-1">+${notes.length - 15} more</div>` : ""}
          `
          : ""
      }
    `;
  },

  async _newNote() {
    const note = await $APP.Model.notes.add({
      title: "Untitled",
      type: "note",
      body: "",
    });
    if (note) {
      const id = Array.isArray(note) ? note[1]?.id : note.id;
      if (id) {
        getIDE().openResource(`notes://note/${id}`);
        await this.loadData();
      }
    }
  },
  };
}
