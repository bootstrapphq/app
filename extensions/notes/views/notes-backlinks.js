export default function (ctx) {
  const { $APP, html, T, getIDE } = ctx;

  return {
    tag: "bsp-notes-backlinks",
    properties: {
      noteSlug: T.string({ defaultValue: "" }),
      backlinks: T.array({ defaultValue: [] }),
      loading: T.boolean({ defaultValue: true }),
    },

    async connected() {
      await this._load();
    },

    async updated({ changedProps }) {
      if (changedProps?.has("noteSlug")) await this._load();
    },

    async _load() {
      if (!this.noteSlug || this.noteSlug.startsWith("new-")) {
        this.backlinks = [];
        this.loading = false;
        return;
      }
      this.loading = true;
      const all = (await $APP.Model.notes.getAll()) || [];
      this.backlinks = all.filter(
        (n) =>
          Array.isArray(n.links) &&
          n.links.includes(this.noteSlug) &&
          (n.slug || n.id) !== this.noteSlug,
      );
      this.loading = false;
    },

    _open(slug) {
      getIDE().openResource(`notes://note/${slug}`);
    },

    render() {
      return html`
        <div class="w-full h-full overflow-y-auto p-3">
          <div class="text-xs uppercase tracking-wide opacity-60 mb-2 flex items-center gap-1">
            <uix-icon name="link" size="12"></uix-icon>
            Linked from
            ${this.backlinks.length > 0
              ? html`<span class="opacity-50">(${this.backlinks.length})</span>`
              : ""}
          </div>
          ${this.loading
            ? html`<div class="text-xs opacity-40">Loading…</div>`
            : this.backlinks.length === 0
              ? html`<div class="text-xs opacity-40">No other notes link here.</div>`
              : html`
                  <ul class="flex flex-col gap-px">
                    ${this.backlinks.map(
                      (n) => html`
                        <li>
                          <button
                            class="w-full text-left px-2 py-1 rounded hover:bg-surface/40 text-sm flex items-center gap-2"
                            @click=${() => this._open(n.slug || n.id)}
                          >
                            <uix-icon name="file-text" size="12" class="opacity-60 flex-shrink-0"></uix-icon>
                            <span class="truncate">${n.title || n.slug || n.id}</span>
                          </button>
                        </li>
                      `,
                    )}
                  </ul>
                `}
        </div>
      `;
    },
  };
}
