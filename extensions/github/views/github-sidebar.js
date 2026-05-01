import { createOAuthManager } from "/node_modules/@bootstrapp/github/oauth.js";
import { checkRepoExists } from "/node_modules/@bootstrapp/github/repo.js";
import { fetchUser } from "/node_modules/@bootstrapp/github/user.js";
import Controller from "/node_modules/@bootstrapp/controller/index.js";

export default function (ctx) {
  const { $APP, html, T, getIDE } = ctx;

  const oauth = createOAuthManager();
  const DEFAULT_REPO = "bootstrapp";

  return {
    tag: "bsp-github-sidebar",
    properties: {
      user: T.object({ defaultValue: null }),
      owner: T.string({ defaultValue: "" }),
      repo: T.string({ defaultValue: "" }),
      syncing: T.boolean({ defaultValue: false }),
      syncDirection: T.string({ defaultValue: "" }),
      lastSync: T.string({ defaultValue: "" }),
      repoStatus: T.string({ defaultValue: "" }),
      error: T.string({ defaultValue: "" }),
      editing: T.boolean({ defaultValue: false }),
    },

    async connected() {
      this.owner = Controller.local.get("github_owner") || "";
      this.repo = Controller.local.get("github_repo") || "";
      this.lastSync = Controller.local.get("github_last_sync") || "";

      const token = oauth.getToken();
      if (token) {
        try {
          this.user = await fetchUser(token);
          this._prefillAndCheck();
        } catch {
          oauth.removeToken();
        }
      }

      this._unsubs = [
        $APP.events.on("github:login", ({ user }) => {
          this.user = user;
          this._prefillAndCheck();
        }),
        $APP.events.on("github:logout", () => {
          this.user = null;
          this.owner = "";
          this.repo = "";
          this.lastSync = "";
          this.repoStatus = "";
          this.editing = false;
        }),
        $APP.events.on("github:sync-start", ({ direction }) => {
          this.syncing = true;
          this.syncDirection = direction;
          this.error = "";
        }),
        $APP.events.on("github:sync-end", ({ error }) => {
          this.syncing = false;
          this.syncDirection = "";
          if (error) {
            this.error = error;
          } else {
            this.lastSync = Controller.local.get("github_last_sync") || "";
            this.error = "";
            this.repoStatus = "exists";
          }
        }),
      ];
    },

    disconnected() {
      this._unsubs?.forEach((fn) => fn());
    },

    _prefillAndCheck() {
      if (!this.owner && this.user?.login) {
        this.owner = this.user.login;
        Controller.local.set("github_owner", this.owner);
      }
      if (!this.repo) {
        this.repo = DEFAULT_REPO;
        Controller.local.set("github_repo", this.repo);
      }
      if (!this.lastSync) {
        this._checkRepo();
      }
    },

    async _checkRepo() {
      const token = oauth.getToken();
      if (!token || !this.owner || !this.repo) return;

      this.repoStatus = "checking";
      try {
        const { exists } = await checkRepoExists({ owner: this.owner, repo: this.repo, token });
        this.repoStatus = exists ? "exists" : "not-found";
      } catch {
        this.repoStatus = "";
      }
    },

    _saveConfig() {
      const ownerInput = this.querySelector(".repo-owner-input");
      const repoInput = this.querySelector(".repo-name-input");
      if (ownerInput) this.owner = ownerInput.value.trim();
      if (repoInput) this.repo = repoInput.value.trim();

      Controller.local.set("github_owner", this.owner);
      Controller.local.set("github_repo", this.repo);
      this.editing = false;
      this._checkRepo();
    },

    _formatTime(iso) {
      if (!iso) return "";
      const d = new Date(iso);
      const now = new Date();
      const diff = now - d;
      if (diff < 60000) return "just now";
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
      return d.toLocaleDateString();
    },

    render() {
      const token = oauth.getToken();

      return html`
        <div class="w-full h-full flex flex-col">
          <div class="flex items-center gap-2 px-3.5 pt-3 pb-2">
            <uix-icon name="github" size="16" class="opacity-60"></uix-icon>
            <uix-text weight="medium" size="sm">GitHub</uix-text>
          </div>

          <div class="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-3">
            ${!token ? this._renderLogin() : ""}
            ${token ? this._renderConnected() : ""}
            ${this.error ? html`<uix-alert variant="error">${this.error}</uix-alert>` : ""}
          </div>
        </div>
      `;
    },

    _renderLogin() {
      return html`
        <div class="flex flex-col items-center gap-3 py-6 px-2 text-center">
          <div class="p-2">
            <uix-icon name="github" size="32" class="opacity-30"></uix-icon>
          </div>
          <uix-text size="xs" muted class="text-center">
            Connect to GitHub to sync your content
          </uix-text>
          <uix-button border size="sm" @click=${() => getIDE().executeCommand("github.login")}>
            <uix-icon name="log-in" size="14"></uix-icon>
            Connect to GitHub
          </uix-button>
        </div>
      `;
    },

    _renderConnected() {
      const user = this.user;
      const hasSync = !!this.lastSync;

      return html`
        <div class="flex items-center gap-2 py-1.5">
          ${user?.avatar_url
            ? html`<img class="w-7 h-7 rounded-full" src="${user.avatar_url}" alt="" />`
            : html`<uix-icon name="user" size="20"></uix-icon>`
          }
          <div class="flex-1 min-w-0 flex flex-col">
            <uix-text size="sm" weight="medium">${user?.login || "Connected"}</uix-text>
            ${user?.name ? html`<uix-text size="xs" muted>${user.name}</uix-text>` : ""}
          </div>
          <uix-button ghost flat size="xs" title="Logout" @click=${() => getIDE().executeCommand("github.logout")}>
            <uix-icon name="log-out" size="14"></uix-icon>
          </uix-button>
        </div>

        ${this.editing ? this._renderRepoEdit() : this._renderRepoLabel()}

        ${!hasSync ? this._renderSetup() : this._renderSynced()}
      `;
    },

    _renderRepoLabel() {
      return html`
        <div class="flex flex-col gap-1">
          <uix-text size="xs" weight="medium" muted class="uppercase tracking-wide">Repository</uix-text>
          <div class="flex items-center gap-1.5">
            <uix-text size="sm">${this.owner}/${this.repo}</uix-text>
            <uix-button ghost flat size="xs" title="Edit" @click=${() => { this.editing = true; }}>
              <uix-icon name="pencil" size="12"></uix-icon>
            </uix-button>
          </div>
        </div>
      `;
    },

    _renderRepoEdit() {
      return html`
        <div class="flex flex-col gap-1.5">
          <uix-text size="xs" weight="medium" muted class="uppercase tracking-wide">Repository</uix-text>
          <div class="flex items-center gap-0.5">
            <input
              class="repo-owner-input flex-1 min-w-0 bg-surface-dark border border-dim rounded px-2 py-1 text-[0.78rem] text-default outline-none font-[inherit] focus:border-primary placeholder:text-muted/50"
              type="text"
              placeholder="owner"
              .value=${this.owner}
            />
            <span class="text-muted text-[0.8rem] px-0.5">/</span>
            <input
              class="repo-name-input flex-1 min-w-0 bg-surface-dark border border-dim rounded px-2 py-1 text-[0.78rem] text-default outline-none font-[inherit] focus:border-primary placeholder:text-muted/50"
              type="text"
              placeholder="repo"
              .value=${this.repo}
            />
            <uix-button ghost flat size="xs" title="Save" @click=${() => this._saveConfig()}>
              <uix-icon name="check" size="14"></uix-icon>
            </uix-button>
          </div>
        </div>
      `;
    },

    _renderSetup() {
      if (this.repoStatus === "checking" || this.syncing) {
        return html`
          <div class="flex flex-col items-center gap-2.5 py-3">
            <uix-spinner size="xs"></uix-spinner>
            <uix-text size="xs" muted>
              ${this.syncing ? "Syncing..." : "Checking repository..."}
            </uix-text>
          </div>
        `;
      }

      if (this.repoStatus === "exists") {
        return html`
          <div class="flex flex-col items-center gap-2.5 py-3">
            <uix-text size="xs" muted>Repository found on GitHub</uix-text>
            <uix-button primary size="sm" wFull @click=${() => getIDE().executeCommand("github.setup")}>
              <uix-icon name="download" size="14"></uix-icon>
              Sync Now
            </uix-button>
          </div>
        `;
      }

      if (this.repoStatus === "not-found") {
        return html`
          <div class="flex flex-col items-center gap-2.5 py-3">
            <uix-text size="xs" muted>Repository not found — it will be created</uix-text>
            <uix-button primary size="sm" wFull @click=${() => getIDE().executeCommand("github.setup")}>
              <uix-icon name="plus" size="14"></uix-icon>
              Create & Sync
            </uix-button>
          </div>
        `;
      }

      return "";
    },

    _renderSynced() {
      return html`
        <div class="flex flex-col items-center gap-2">
          <uix-button border size="sm" wFull ?disabled=${this.syncing} @click=${() => getIDE().executeCommand("github.push")}>
            ${this.syncing
              ? html`<uix-spinner size="xs"></uix-spinner>`
              : html`<uix-icon name="refresh-cw" size="14"></uix-icon>`
            }
            Sync
          </uix-button>
          ${this.lastSync ? html`
            <uix-text size="xs" muted class="text-center">
              Last synced ${this._formatTime(this.lastSync)}
            </uix-text>
          ` : ""}
        </div>
      `;
    },
  };
}
