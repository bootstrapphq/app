import { createLivePreview } from "../editor/live-preview.js";
import { createToolbar } from "../editor/toolbar.js";

export default function (ctx) {
  const { $APP, html, T, getIDE, slugify } = ctx;

  return {
    tag: "bsp-notes-editor",
    properties: {
      uri: T.string({ defaultValue: "" }),
      content: T.object({ defaultValue: {} }),
      backlinksOpen: T.boolean({ defaultValue: false }),
    },

    _initialBody: "",

    connected() {
      this._initialBody = this.content?.body || "";
      this._livePreviewExt = [
        ...createLivePreview({
          onWikiLinkClick: (name) => this._handleWikiLink(name),
          onTagClick: (tag) => this._handleTagClick(tag),
        }),
        ...createToolbar(),
      ];
    },

    _updateContent(changes) {
      const ide = getIDE();
      ide.handleResourceContentChange(this.uri, {
        ...this.content,
        ...changes,
      });
    },

    async _handleWikiLink(name) {
      const slug = slugify(name);
      const ide = getIDE();
      const existing = await $APP.Model.notes.get(slug);
      if (!existing) {
        await $APP.Model.notes.add({
          id: slug,
          slug,
          title: name,
          body: "",
          type: "note",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      ide.openResource(`notes://note/${slug}`);
    },

    _handleTagClick(tag) {
      const ide = getIDE();
      $APP.Router.go("/search");
      ide.emit("search:setQuery", `#${tag}`);
      ide.executeCommand("search.doSearch", {
        term: `#${tag}`,
        options: { matchCase: false, wholeWord: false },
      });
    },

    _noteSlug() {
      const uri = this.uri || "";
      if (uri.startsWith("notes:///")) return "";
      const path = uri.replace("notes://note/", "");
      return path.startsWith("new-") ? "" : path;
    },

    render() {
      const title = this.content?.title || "";
      const noteType = this.content?.type;
      const slug = this._noteSlug();

      return html`
      <div class="flex flex-col w-full h-full">
        <div class="flex items-center gap-2 px-4 py-2 border-b border-dim">
          <input
            type="text"
            class="flex-1 bg-transparent border-none outline-none text-lg font-medium text-default placeholder:text-muted/50"
            placeholder="Note title..."
            .value=${title}
            @input=${(e) => this._updateContent({ title: e.target.value })}
          />
          <uix-flex gap="xs" align="center">
            ${noteType ? html`<uix-badge size="xs">${noteType}</uix-badge>` : ""}
            ${
              slug
                ? html`<button
                  class="p-1 rounded hover:bg-surface/40 opacity-70 hover:opacity-100"
                  title=${this.backlinksOpen ? "Hide backlinks" : "Show backlinks"}
                  @click=${() => (this.backlinksOpen = !this.backlinksOpen)}
                >
                  <uix-icon name="link" size="14"></uix-icon>
                </button>`
                : ""
            }
          </uix-flex>
        </div>

        <div class="flex-1 overflow-hidden flex">
          <div class="flex-1 overflow-hidden">
            <uix-code
              class="flex-1 h-full"
              language="markdown"
              .path=${this.uri}
              .content=${this._initialBody}
              .onUpdate=${(newBody) => this._updateContent({ body: newBody })}
              .lineNumber=${false}
              .extraExtensions=${this._livePreviewExt}
            ></uix-code>
          </div>
          ${
            this.backlinksOpen && slug
              ? html`<div class="w-64 border-l border-dim overflow-y-auto">
                <bsp-notes-backlinks .noteSlug=${slug}></bsp-notes-backlinks>
              </div>`
              : ""
          }
        </div>
      </div>
    `;
    },
  };
}
