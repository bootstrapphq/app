import { createOAuthManager, startOAuthLogin } from "/node_modules/@bootstrapp/github/oauth.js";
import { checkRepoExists } from "/node_modules/@bootstrapp/github/repo.js";
import { pushContent, pullContent } from "/node_modules/@bootstrapp/github/sync.js";
import { initGitHubFrontend } from "/node_modules/@bootstrapp/github/frontend.js";
import Controller from "/node_modules/@bootstrapp/controller/index.js";
import githubSidebarView from "./views/github-sidebar.js";

const GITHUB_OWNER_KEY = "github_owner";
const GITHUB_REPO_KEY = "github_repo";
const GITHUB_BRANCH_KEY = "github_branch";

export default function (ctx) {
  const { $APP, html, createPlugin, registerView } = ctx;

  registerView(githubSidebarView);

  const oauth = createOAuthManager();
  initGitHubFrontend($APP);

  $APP.routes.set("/github/callback", {
    name: "github-callback",
    component: () => html`<github-callback></github-callback>`,
  });

  const getConfig = () => ({
    owner: Controller.local.get(GITHUB_OWNER_KEY) || "",
    repo: Controller.local.get(GITHUB_REPO_KEY) || "",
    branch: Controller.local.get(GITHUB_BRANCH_KEY) || "main",
  });

  const setConfig = ({ owner, repo, branch }) => {
    if (owner !== undefined) Controller.local.set(GITHUB_OWNER_KEY, owner);
    if (repo !== undefined) Controller.local.set(GITHUB_REPO_KEY, repo);
    if (branch !== undefined) Controller.local.set(GITHUB_BRANCH_KEY, branch);
  };

  const plugin = createPlugin({
    id: "github",
    name: "GitHub",
    icon: "github",
    order: 60,
    route: "/github",
    sidebarComponent: "bsp-github-sidebar",
    scheme: "github",

    resources: {
      getContent(uri) {
        const path = uri.replace("github://", "");
        return { type: "github", path, uri };
      },
      getTabMetadata() {
        return {
          label: "GitHub",
          icon: "github",
          component: "bsp-github-sidebar",
        };
      },
    },

    menus: {
      "GitHub": [
        { label: "Sync", command: "github.push" },
        { separator: true },
        { label: "Login", command: "github.login" },
        { label: "Logout", command: "github.logout" },
      ],
    },

    commands: {
      login: {
        label: "Login with GitHub",
        category: "GitHub",
        async execute(api) {
          console.log("[github-ext.login] command invoked");
          const clientId = $APP.manifest?.github?.clientId;
          if (!clientId) {
            console.warn("[github-ext.login] no clientId in manifest");
            api?.ui?.showMessage("GitHub clientId not configured", "error");
            return;
          }
          try {
            const result = await startOAuthLogin({
              clientId,
              scope: "repo",
              context: "extension",
              returnTo: window.location.pathname,
            });
            console.log("[github-ext.login] startOAuthLogin resolved:", result);
            if (result?.user) {
              $APP.events?.emit?.("github:login", { user: result.user });
            }
          } catch (e) {
            console.error("[github-ext.login] failed:", e);
            api?.ui?.showMessage(`GitHub login failed: ${e.message}`, "error");
          }
        },
      },

      logout: {
        label: "Logout from GitHub",
        category: "GitHub",
        execute(api) {
          oauth.removeToken();
          Controller.local.remove(GITHUB_OWNER_KEY);
          Controller.local.remove(GITHUB_REPO_KEY);
          Controller.local.remove(GITHUB_BRANCH_KEY);
          Controller.local.remove("github_last_sync");
          $APP.events.emit("github:logout");
          api.ui.showMessage("Logged out from GitHub", "info");
        },
      },

      setup: {
        label: "Setup GitHub Repository",
        category: "GitHub",
        async execute(api) {
          const token = oauth.getToken();
          if (!token) return;

          const { owner, repo, branch } = getConfig();
          if (!owner || !repo) return;

          try {
            const { exists } = await checkRepoExists({ owner, repo, token });

            $APP.events.emit("github:sync-start", { direction: exists ? "pull" : "push" });

            if (exists) {
              const result = await pullContent({ token, owner, repo, branch });
              Controller.local.set("github_last_sync", new Date().toISOString());
              $APP.events.emit("github:sync-end", { direction: "pull", ...result });
            } else {
              const result = await pushContent({ token, owner, repo, branch });
              Controller.local.set("github_last_sync", new Date().toISOString());
              $APP.events.emit("github:sync-end", { direction: "push", ...result });
            }
          } catch (e) {
            $APP.events.emit("github:sync-end", { error: e.message });
          }
        },
      },

      push: {
        label: "Sync to GitHub",
        category: "GitHub",
        async execute(api) {
          const token = oauth.getToken();
          if (!token) {
            api.ui.showMessage("Please login to GitHub first", "error");
            return;
          }

          const { owner, repo, branch } = getConfig();
          if (!owner || !repo) {
            api.ui.showMessage("Please configure repository in the GitHub sidebar", "error");
            return;
          }

          try {
            $APP.events.emit("github:sync-start", { direction: "push" });
            const result = await pushContent({ token, owner, repo, branch });
            Controller.local.set("github_last_sync", new Date().toISOString());
            $APP.events.emit("github:sync-end", { direction: "push", ...result });
          } catch (e) {
            $APP.events.emit("github:sync-end", { direction: "push", error: e.message });
            api.ui.showMessage(`Sync failed: ${e.message}`, "error");
          }
        },
      },

      pull: {
        label: "Pull from GitHub",
        category: "GitHub",
        async execute(api) {
          const token = oauth.getToken();
          if (!token) {
            api.ui.showMessage("Please login to GitHub first", "error");
            return;
          }

          const { owner, repo, branch } = getConfig();
          if (!owner || !repo) {
            api.ui.showMessage("Please configure repository in the GitHub sidebar", "error");
            return;
          }

          try {
            $APP.events.emit("github:sync-start", { direction: "pull" });
            const result = await pullContent({ token, owner, repo, branch });
            Controller.local.set("github_last_sync", new Date().toISOString());
            $APP.events.emit("github:sync-end", { direction: "pull", ...result });
          } catch (e) {
            $APP.events.emit("github:sync-end", { direction: "pull", error: e.message });
            api.ui.showMessage(`Pull failed: ${e.message}`, "error");
          }
        },
      },
    },
  });

  plugin._oauth = oauth;
  plugin._getConfig = getConfig;
  plugin._setConfig = setConfig;

  return plugin;
}
