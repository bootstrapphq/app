import { formatCurrency } from "./views/format.js";
import financeSidebarView from "./views/finance-sidebar.js";
import financeOverviewView from "./views/finance-overview.js";
import financeTransactionsView from "./views/finance-transactions.js";

export default function (ctx) {
  const { $APP, html, createPlugin, createCollectionManager, slugify, registerTemplate, registerView } = ctx;

  registerView(financeSidebarView);
  registerView(financeOverviewView);
  registerView(financeTransactionsView);

  const ACCOUNT_ICONS = { checking: "credit-card", savings: "piggy-bank", cash: "banknote", credit: "credit-card" };
  const ACCOUNT_COLORS = { checking: "#8b5cf6", savings: "#3b82f6", cash: "#22c55e", credit: "#f59e0b" };

  registerTemplate?.({
    id: "account",
    name: "Account",
    description: "Create a new financial account to track income and expenses",
    icon: "wallet",
    category: "finance",
    plugin: "finance",
    variables: [
      { id: "name", label: "Account Name", type: "text", placeholder: "e.g. Checking, Savings, Cash", required: true },
      { id: "accountType", label: "Account Type", type: "select", required: true, options: [
        { value: "checking", label: "Checking" },
        { value: "savings", label: "Savings" },
        { value: "cash", label: "Cash" },
        { value: "credit", label: "Credit Card" },
      ]},
    ],
    getCreates(vars) {
      const name = vars.name || "Account";
      const type = vars.accountType || "checking";
      return [{ type: "account", name, icon: ACCOUNT_ICONS[type] || "wallet" }];
    },
    async execute(vars) {
      const name = vars.name || "Account";
      const type = vars.accountType || "checking";
      const slug = slugify(name);
      await $APP.Model.collections.add({
        id: slug, slug, name, type: "account",
        icon: ACCOUNT_ICONS[type] || "wallet",
        color: ACCOUNT_COLORS[type] || "#8b5cf6",
        metadata: { currency: "BRL", accountType: type },
        body: "## Transactions\n",
      });
      return { slug, plugin: "finance" };
    },
  });

  return createPlugin({
    id: "finance",
    name: "Finance",
    icon: "wallet",
    title: "Finance",
    order: 40,
    route: "/finance",
    sidebarComponent: "bsp-finance-sidebar",
    scheme: "finance",

    types: {
      collections: {
        account: {
          name: "Account",
          icon: "wallet",
          sections: [],
          itemType: "list",
          itemFields: {
            amount: { type: "number", required: true },
            type: { type: "enum", values: ["income", "expense", "transfer"], default: "expense" },
            category: { type: "string" },
            date: { type: "date", required: true },
            note: { type: "string" },
          },
          widgets: ["table", "chart", "summary"],
          defaultWidget: "table",
          metadataFields: {
            currency: { type: "string", default: "BRL" },
            accountType: { type: "enum", values: ["checking", "savings", "credit", "cash", "investment"] },
          },
          computed: {
            balance: (items) => items.reduce((sum, item) => {
              const amount = parseFloat(item.amount) || 0;
              return sum + (item.type === "income" ? amount : -amount);
            }, 0),
          },
        },
      },
    },

    data: { collections: { types: ["account"] } },

    resources: {
      getContent(uri) {
        const path = uri.replace("finance://", "");
        return { type: "finance", path, uri };
      },
      getTabMetadata(uri) {
        const path = uri.replace("finance://", "");
        if (path === "overview") return { label: "Overview", icon: "bar-chart-3", component: "bsp-finance-overview" };
        if (path.startsWith("account/")) return { label: "Account", icon: "wallet", component: "bsp-finance-transactions", props: { accountId: path.replace("account/", "") } };
        return { label: "Transactions", icon: "receipt", component: "bsp-finance-transactions" };
      },
      getTabActions(uri) {
        const path = uri.replace("finance://", "");
        if (path.startsWith("account/") || path === "transactions") return [{ icon: "plus", label: "Add Transaction", command: "finance.newTransaction" }];
        return [];
      },
      async search(term, options) {
        const all = await $APP.Model.collections.getAll();
        const lowerTerm = options?.matchCase ? term : term.toLowerCase();
        const results = {};
        const accounts = all.filter((c) => c.type === "account");
        const childMap = {};
        all.forEach((c) => { if (c._parent) (childMap[c._parent] ||= []).push(c); });
        for (const acct of accounts) {
          const matches = [];
          const hay = options?.matchCase ? acct.name : (acct.name || "").toLowerCase();
          if (hay.includes(lowerTerm)) matches.push({ line: 1, content: acct.name });
          const children = childMap[acct.slug || acct.id] || [];
          children.forEach((child) => {
            const h = options?.matchCase ? child.name : (child.name || "").toLowerCase();
            if (h.includes(lowerTerm)) matches.push({ line: 1, content: child.name });
          });
          if (matches.length > 0) results[`finance://account/${acct.slug || acct.id}`] = matches;
        }
        return results;
      },
    },

    menus: {
      "Finance": [
        { label: "New Transaction", command: "finance.newTransaction" },
        { label: "New Account", command: "finance.newAccount" },
        { separator: true },
        { label: "Overview", command: "finance.showOverview", keybinding: "Ctrl+4" },
      ],
    },

    async onSetup(api, ide) {
      (ide.quickAccessItems ||= []).push(
        { label: "Finance", icon: "wallet", uri: "finance://overview", order: 40 },
        { label: "New Account", icon: "plus", command: "finance.newAccount", section: "create", order: 40 },
      );

      const accountsCM = createCollectionManager({ model: $APP.Model.collections, types: ["account"] });
      const updateBalance = async () => {
        const accounts = await accountsCM.getAllCollections();
        const balance = accounts.reduce((sum, acct) => {
          return sum + acct.items.reduce((s, item) => {
            const amount = parseFloat(item.amount) || 0;
            return s + (item.type === "income" ? amount : -amount);
          }, 0);
        }, 0);
        const balanceStr = formatCurrency(balance);
        api.ui.setStatusBarItem("balance", {
          position: "right",
          order: 10,
          render: () => html`
            <span class="cursor-pointer hover:bg-surface/20 px-1 rounded"
              @click=${() => ide.openResource("finance://overview")}>${balanceStr}</span>
          `,
        });
      };
      await updateBalance();
      $APP.events.on("MODEL:CHANGED", () => updateBalance());
    },

    commands: {
      newTransaction: {
        label: "New Transaction",
        category: "Finance",
        async execute(api, ide) {
          ide.openResource("finance://transactions");
          api.ui.showMessage("Add a transaction in the table", "info");
        },
      },
      newAccount: {
        label: "New Account",
        category: "Finance",
        async execute(api, ide) {
          const name = await api.ui.showInputBox({ prompt: "Account name", placeholder: "e.g., Checking, Savings, Cash" });
          if (!name) return;
          const accountType = await api.ui.showQuickPick(
            [
              { label: "Checking", value: "checking" },
              { label: "Savings", value: "savings" },
              { label: "Cash", value: "cash" },
              { label: "Credit Card", value: "credit" },
              { label: "Investment", value: "investment" },
            ],
            { placeholder: "Account type" },
          );
          if (!accountType) return;
          const ICONS = { checking: "credit-card", savings: "piggy-bank", cash: "banknote", credit: "credit-card", investment: "trending-up" };
          const COLORS = { checking: "#8b5cf6", savings: "#3b82f6", cash: "#22c55e", credit: "#f59e0b", investment: "#06b6d4" };
          const slug = slugify(name);
          const cm = createCollectionManager({ model: $APP.Model.collections, types: ["account"] });
          await cm.createCollection({
            name, type: "account",
            icon: ICONS[accountType] || "wallet",
            color: COLORS[accountType] || "#8b5cf6",
            metadata: { currency: "BRL", accountType },
          });
          ide.openResource(`finance://account/${slug}`);
        },
      },
      showOverview: {
        label: "Financial Overview",
        category: "Finance",
        keybinding: "Ctrl+4",
        execute(api, ide) { ide.openResource("finance://overview"); },
      },
    },
  });
}
