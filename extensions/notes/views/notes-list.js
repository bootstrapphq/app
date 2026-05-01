export default function (ctx) {
  const { $APP, html, T, getIDE } = ctx;

  return {
  tag: "bsp-notes-list",
  properties: {
    uri: T.string({ defaultValue: "" }),
    notes: T.array({ defaultValue: [] }),
    searchQuery: T.string({ defaultValue: "" }),
  },
  async connected() {
    await this.loadNotes();
  },
  async loadNotes() {
    this.notes = await $APP.Model.notes.getAll() || [];
  },
  render() {
    const filtered = this._filteredNotes();
    return html`
      <div class="w-full h-full p-4 overflow-y-auto">
        <uix-flex align="center" justify="between" class="mb-4">
          <uix-heading level="3">All Notes</uix-heading>
          <uix-flex gap="sm">
            <uix-input
              size="sm"
              placeholder="Filter..."
              icon="search"
              .value=${this.searchQuery}
              @input=${(e) => { this.searchQuery = e.target.value; }}
            ></uix-input>
            <uix-button size="sm" @click=${() => this._newNote()}>
              <uix-icon name="plus" size="14" class="mr-1"></uix-icon>
              New
            </uix-button>
          </uix-flex>
        </uix-flex>

        ${filtered.length === 0
          ? html`
              <div class="text-center py-12">
                <uix-icon name="file-text" size="48" class="opacity-20 mb-4"></uix-icon>
                <uix-text muted>No notes yet. Create your first note.</uix-text>
              </div>
            `
          : html`
              <div class="grid gap-2">
                ${filtered.map(
                  (note) => html`
                    <uix-card
                      class="cursor-pointer"
                      @click=${() => getIDE().openResource(`notes://note/${note.id}`)}
                    >
                      <div class="p-3">
                        <uix-flex align="center" gap="sm" class="mb-1">
                          ${note.pinned ? html`<uix-icon name="pin" size="12" class="text-primary"></uix-icon>` : ""}
                          <uix-text weight="medium">${note.title || "Untitled"}</uix-text>
                        </uix-flex>
                        <uix-flex gap="sm" class="mt-2">
                          <uix-badge size="xs">${note.type || "note"}</uix-badge>
                          ${(note.tags || []).map(
                            (tag) => html`<uix-badge size="xs" variant="secondary">${tag}</uix-badge>`
                          )}
                        </uix-flex>
                      </div>
                    </uix-card>
                  `
                )}
              </div>
            `}
      </div>
    `;
  },
  _filteredNotes() {
    if (!this.searchQuery) return this.notes;
    const q = this.searchQuery.toLowerCase();
    return this.notes.filter(
      (n) => n.title?.toLowerCase().includes(q),
    );
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
      }
    }
  },
  };
}
