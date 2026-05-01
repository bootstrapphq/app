const isEmoji = (s) => s && /[^\x00-\x7F]/.test(s);

export default function (ctx) {
  const { $APP, html, T, events, getIDE } = ctx;

  return {
    tag: "bsp-journal-sidebar",
    properties: {
      favorites: T.array({ defaultValue: [] }),
      recentResources: T.array({ defaultValue: [] }),
      collapsedFolders: T.object({ defaultValue: {} }),
      editingIconId: T.string({ defaultValue: "" }),
      quickAccessItems: T.array({ defaultValue: [], attribute: false }),
    },

    async connected() {
      const ide = getIDE();
      this.recentResources = [...(ide.recentResources || [])];
      this.quickAccessItems = [...(ide.quickAccessItems || [])];
      await this.loadData();
      this._unsubs = [];
      this._unsubs.push(events.on("favorites:changed", () => this.loadData()));
      this._unsubs.push(
        ide.subscribe("recentResources", (val) => {
          this.recentResources = [...(val || [])];
        }),
      );
      const refreshQuick = () => {
        this.quickAccessItems = [...(getIDE().quickAccessItems || [])];
      };
      this._unsubs.push(ide.subscribe("ide:ready", refreshQuick));
      this._unsubs.push(ide.subscribe("extensionsChanged", refreshQuick));
    },

    disconnected() {
      this._unsubs?.forEach((u) => u());
    },

    async loadData() {
      const ide = getIDE();
      const all = (await ide.configProvider?.read("favorites.json")) || [];
      this.favorites = (all || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    },

    _itemsInFolder(folderId) {
      return this.favorites
        .filter((f) => (f.folder || "") === folderId)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    },

    _toggleFolder(folderId) {
      this.collapsedFolders = {
        ...this.collapsedFolders,
        [folderId]: !this.collapsedFolders[folderId],
      };
    },

    _renderIcon(iconValue, size = "14") {
      if (isEmoji(iconValue)) {
        return html`<span class="inline-flex items-center justify-center" style="font-size: ${size}px; line-height: 1; width: ${size}px; text-align: center;">${iconValue}</span>`;
      }
      return html`<uix-icon name=${iconValue || "star"} size=${size}></uix-icon>`;
    },

    _onIconClick(e, id) {
      e.stopPropagation();
      this.editingIconId = id;
      const picker = this.querySelector("uix-icon-picker");
      if (picker) picker.toggle(e.currentTarget);
    },

    _onIconChange(e) {
      const ide = getIDE();
      const value = e.detail?.value;
      if (!value || !this.editingIconId) return;
      ide.executeCommand("home.updateFavorite", { id: this.editingIconId, icon: value });
      this.editingIconId = "";
    },

    _showCreateMenu(e) {
      const ide = getIDE();
      const items = (this.quickAccessItems || [])
        .filter((i) => i.section === "create")
        .sort((a, b) => (a.order || 99) - (b.order || 99))
        .map((i) => ({
          label: i.label,
          icon: i.icon,
          action: () => i.command ? ide.executeCommand(i.command) : i.uri ? ide.openResource(i.uri) : null,
        }));
      items.push({ label: "New Folder", icon: "folder", action: () => this._createFolder() });

      const menu = document.createElement("ide-context-menu");
      menu.items = items;
      const rect = e.currentTarget.getBoundingClientRect();
      menu.position = { x: rect.left, y: rect.bottom + 4 };
      document.body.appendChild(menu);
    },

    async _createFolder() {
      const ide = getIDE();
      const name = await ide.showInputBox({ prompt: "Folder name", placeholder: "My Folder" });
      if (name?.trim()) {
        ide.executeCommand("home.createFolder", { name: name.trim() });
      }
    },

    _isDescendant(folderId, potentialAncestorId) {
      let current = folderId;
      const visited = new Set();
      while (current) {
        if (current === potentialAncestorId) return true;
        if (visited.has(current)) return false;
        visited.add(current);
        const item = this.favorites.find((f) => f.id === current);
        current = item?.folder || "";
      }
      return false;
    },

    _isFav(uri) {
      return getIDE().favoriteUris?.has(uri) || false;
    },

    _toggleFav(e, r) {
      e.stopPropagation();
      getIDE().executeCommand("home.toggleFavorite", {
        uri: r.uri,
        label: r.label,
        icon: r.icon,
      });
    },

    _onDrop({ draggedId, targetId, index }) {
      if (!draggedId) return;
      const ide = getIDE();
      const id = draggedId.replace(/^fav:/, "");
      const item = this.favorites.find((f) => f.id === id);
      if (!item) return;

      let targetFolder = "";
      if (targetId === "root") {
        targetFolder = "";
      } else if (targetId.startsWith("folder:")) {
        targetFolder = targetId.slice(7);
      } else if (targetId.startsWith("folder-content:")) {
        targetFolder = targetId.slice(15);
      }

      if (item.isFolder && (targetFolder === id || this._isDescendant(targetFolder, id))) {
        return;
      }

      const siblings = this._itemsInFolder(targetFolder).filter((f) => f.id !== id);
      const insertAt = (index !== undefined && index >= 0) ? Math.min(index, siblings.length) : siblings.length;
      siblings.splice(insertAt, 0, item);

      const updates = siblings.map((f, i) => ({
        id: f.id,
        sortOrder: i,
        ...(f.id === id ? { folder: targetFolder } : {}),
      }));

      ide.executeCommand("home.reorderFavorites", { updates });
    },

    render() {
      const ide = getIDE();
      const rootItems = this._itemsInFolder("");
      const totalNonFolder = this.favorites.filter((f) => !f.isFolder).length;

      const allItems = this.quickAccessItems || [];
      const links = allItems.filter((i) => i.section !== "create").sort((a, b) => (a.order || 99) - (b.order || 99));
      const creates = allItems.filter((i) => i.section === "create").sort((a, b) => (a.order || 99) - (b.order || 99));

      const renderQuickItem = (item) => html`
        <div
          class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light"
          @click=${() => item.uri ? ide.openResource(item.uri) : item.command ? ide.executeCommand(item.command) : null}
        >
          <uix-icon name=${item.icon} size="14" class="opacity-50"></uix-icon>
          <span>${item.label}</span>
        </div>
      `;

      return html`
        <div class="p-3 flex flex-col h-full text-sm">
          <div class="flex items-center gap-1 px-2 mb-2">
            <uix-text size="xs" muted weight="medium" class="uppercase tracking-wide flex-1">Favorites</uix-text>
            <uix-badge size="xs">${totalNonFolder}</uix-badge>
            <div
              class="cursor-pointer opacity-40 hover:opacity-80 ml-1"
              title="New..."
              @click=${(e) => this._showCreateMenu(e)}
            >
              <uix-icon name="plus" size="14"></uix-icon>
            </div>
          </div>

          <uix-droparea
            droparea-id="root"
            orderable
            .onDropped=${(info) => this._onDrop(info)}
            style="min-height: 4px;"
          >
            ${rootItems.map((item) =>
              item.isFolder
                ? this._renderFolder(item, 0)
                : this._renderFavoriteItem(item, 0),
            )}
          </uix-droparea>

          ${this.favorites.length === 0 ? html`
            <uix-text size="xs" muted class="px-2 py-2 block">No favorites yet. Favorite items to add them here.</uix-text>
          ` : ""}

          ${this.recentResources.length ? html`
            <div class="mt-4"></div>
            <uix-text size="xs" muted weight="medium" class="mb-1 block px-2 uppercase tracking-wide">Recent</uix-text>
            ${this.recentResources.slice(0, 5).map((r) => html`
              <div
                class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light group"
                @click=${() => ide.openResource(r.uri)}
              >
                <uix-icon name=${r.icon || "file"} size="14" class="opacity-50 flex-shrink-0"></uix-icon>
                <span class="truncate flex-1">${r.label}</span>
                <uix-icon
                  name="heart"
                  size="12"
                  ?solid=${this._isFav(r.uri)}
                  class="${this._isFav(r.uri) ? "opacity-80 text-danger" : "opacity-0 group-hover:opacity-40 hover:opacity-80"} cursor-pointer flex-shrink-0"
                  @click=${(e) => this._toggleFav(e, r)}
                ></uix-icon>
              </div>
            `)}
            ${this.recentResources.length > 5 ? html`
              <div
                class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-xs opacity-60 hover:opacity-100"
                @click=${() => ide.executeCommand("home.showRecent")}
              >
                <span>See all recent...</span>
              </div>
            ` : ""}
          ` : ""}

          <div class="mt-4"></div>

          <uix-text size="xs" muted weight="medium" class="mb-1 block px-2 uppercase tracking-wide">Quick Access</uix-text>
          ${links.map(renderQuickItem)}
          ${creates.length ? html`
            <div class="h-px bg-surface-light mx-2 my-1"></div>
            ${creates.map(renderQuickItem)}
          ` : ""}

          <uix-icon-picker
            @change=${(e) => this._onIconChange(e)}
          ></uix-icon-picker>
        </div>
      `;
    },

    _renderFavoriteItem(fav, depth = 0) {
      const ide = getIDE();
      const indent = depth * 16;
      return html`
        <uix-draggable dragged-id="fav:${fav.id}">
          <div
            class="flex items-center gap-2 py-1.5 rounded cursor-pointer hover:bg-surface-light transition-colors group"
            style="padding-left: ${8 + indent}px; padding-right: 8px;"
            @click=${() => ide.openResource(fav.uri)}
          >
            <span
              class="flex-shrink-0 cursor-pointer hover:opacity-80 inline-flex items-center justify-center w-4.5 h-4.5 hover:scale-115"
              @click=${(e) => this._onIconClick(e, fav.id)}
              title="Change icon"
            >${this._renderIcon(fav.icon)}</span>
            <span class="truncate flex-1">${fav.label || fav.uri}</span>
            <uix-icon
              name="x"
              size="12"
              class="opacity-0 group-hover:opacity-40 hover:opacity-80 cursor-pointer flex-shrink-0 transition-opacity"
              @click=${(e) => { e.stopPropagation(); ide.executeCommand("home.toggleFavorite", { uri: fav.uri }); }}
            ></uix-icon>
          </div>
        </uix-draggable>
      `;
    },

    _renderFolder(folder, depth = 0) {
      const ide = getIDE();
      const collapsed = this.collapsedFolders[folder.id];
      const children = this._itemsInFolder(folder.id);
      const indent = depth * 16;
      const childDepth = depth + 1;

      return html`
        <uix-draggable dragged-id="fav:${folder.id}">
          <uix-droparea
            droparea-id="folder:${folder.id}"
            .onDropped=${(info) => this._onDrop(info)}
            style="min-height: 0;"
          >
            <div
              class="flex items-center gap-1.5 py-1.5 rounded cursor-pointer hover:bg-surface-light transition-colors group"
              style="padding-left: ${8 + indent}px; padding-right: 8px;"
              @click=${() => this._toggleFolder(folder.id)}
            >
              <uix-icon name=${collapsed ? "chevron-right" : "chevron-down"} size="10" class="opacity-40 flex-shrink-0"></uix-icon>
              <span
                class="flex-shrink-0 cursor-pointer hover:opacity-80"
                @click=${(e) => this._onIconClick(e, folder.id)}
                title="Change icon"
              >${this._renderIcon(folder.icon)}</span>
              <span class="flex-1 font-medium opacity-70">${folder.label}</span>
              <uix-badge size="xs" class="opacity-50">${children.length}</uix-badge>
              <uix-icon
                name="trash-2"
                size="11"
                class="opacity-0 group-hover:opacity-40 hover:opacity-80 cursor-pointer flex-shrink-0"
                @click=${(e) => { e.stopPropagation(); ide.executeCommand("home.deleteFolder", { id: folder.id }); }}
              ></uix-icon>
            </div>
          </uix-droparea>

          ${collapsed ? "" : html`
            <uix-droparea
              droparea-id="folder-content:${folder.id}"
              orderable
              .onDropped=${(info) => this._onDrop(info)}
              style="min-height: 4px;"
            >
              ${children.map((item) =>
                item.isFolder
                  ? this._renderFolder(item, childDepth)
                  : this._renderFavoriteItem(item, childDepth),
              )}
              ${children.length === 0 ? html`<div style="padding-left: ${8 + childDepth * 16}px;" class="py-1 text-xs opacity-30">Empty</div>` : ""}
            </uix-droparea>
          `}
        </uix-draggable>
      `;
    },
  };
}
