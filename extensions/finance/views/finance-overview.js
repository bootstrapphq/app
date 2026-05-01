import { formatCurrency } from "./format.js";

export default function (ctx) {
  const { $APP, html, T, events, getIDE, createCollectionManager } = ctx;

  let _cm;
  const getCM = () => {
    if (!_cm) _cm = createCollectionManager({ model: $APP.Model.collections, types: ["account"] });
    return _cm;
  };

  return {
    tag: "bsp-finance-overview",
    properties: {
      accounts: T.array({ defaultValue: [] }),
      recentTransactions: T.array({ defaultValue: [] }),
      totalBalance: T.number({ defaultValue: 0 }),
      monthlyIncome: T.number({ defaultValue: 0 }),
      monthlyExpenses: T.number({ defaultValue: 0 }),
      filterMonth: T.string({ defaultValue: "" }),
    },
    async connected() {
      const now = new Date();
      this.filterMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      await this.loadData();
      this._unsub = events.on("collection:changed", () => this.loadData());
    },
    disconnected() {
      this._unsub?.();
    },
    async loadData() {
      const cm = getCM();
      const collections = await cm.getAllCollections();

      this.accounts = collections.map((col) => {
        const balance = col.items.reduce((sum, item) => {
          const amount = parseFloat(item.amount) || 0;
          return sum + (item.type === "income" ? amount : -amount);
        }, 0);
        return { ...col, balance };
      });
      this.totalBalance = this.accounts.reduce((sum, a) => sum + a.balance, 0);

      const allItems = collections.flatMap((col) =>
        col.items.map((item) => ({ ...item, accountId: col.id, accountName: col.name })),
      );

      const monthStart = `${this.filterMonth}-01`;
      const [yearStr, monStr] = this.filterMonth.split("-");
      const nextMonth = parseInt(monStr) === 12
        ? `${parseInt(yearStr) + 1}-01`
        : `${yearStr}-${String(parseInt(monStr) + 1).padStart(2, "0")}`;
      const monthEnd = `${nextMonth}-01`;
      const monthItems = allItems.filter((item) => item.date && item.date >= monthStart && item.date < monthEnd);

      this.monthlyIncome = monthItems.filter((t) => t.type === "income").reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
      this.monthlyExpenses = monthItems.filter((t) => t.type === "expense").reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
      this.recentTransactions = allItems.sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 10);
    },
    _monthLabel() {
      const [y, m] = this.filterMonth.split("-");
      const d = new Date(parseInt(y), parseInt(m) - 1, 1);
      return d.toLocaleDateString("en", { month: "long", year: "numeric" });
    },
    _prevMonth() {
      const [y, m] = this.filterMonth.split("-").map(Number);
      this.filterMonth = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
      this.loadData();
    },
    _nextMonth() {
      const [y, m] = this.filterMonth.split("-").map(Number);
      this.filterMonth = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, "0")}`;
      this.loadData();
    },
    render() {
      const ide = getIDE();
      const net = this.monthlyIncome - this.monthlyExpenses;
      return html`
        <div class="w-full h-full overflow-y-auto p-4 md:p-6 max-w-5xl mx-auto">
          <uix-flex align="center" justify="between" class="mb-6">
            <uix-heading level="2">Financial Overview</uix-heading>
            <uix-flex align="center" gap="sm">
              <uix-button size="xs" ghost @click=${() => this._prevMonth()}>
                <uix-icon name="chevron-left" size="14"></uix-icon>
              </uix-button>
              <uix-text size="sm" weight="medium">${this._monthLabel()}</uix-text>
              <uix-button size="xs" ghost @click=${() => this._nextMonth()}>
                <uix-icon name="chevron-right" size="14"></uix-icon>
              </uix-button>
            </uix-flex>
          </uix-flex>

          <uix-grid columns="1" columns-sm="2" columns-md="4" gap="md" class="mb-6">
            <uix-card>
              <div class="p-4">
                <uix-flex align="center" gap="sm" class="mb-2">
                  <uix-icon name="wallet" size="16" class="text-primary"></uix-icon>
                  <uix-text size="sm" muted>Total Balance</uix-text>
                </uix-flex>
                <uix-text size="2xl" weight="semibold">${formatCurrency(this.totalBalance)}</uix-text>
                <uix-text size="xs" muted>${this.accounts.length} accounts</uix-text>
              </div>
            </uix-card>
            <uix-card>
              <div class="p-4">
                <uix-flex align="center" gap="sm" class="mb-2">
                  <uix-icon name="trending-up" size="16" class="text-green-400"></uix-icon>
                  <uix-text size="sm" muted>Income</uix-text>
                </uix-flex>
                <uix-text size="2xl" weight="semibold" class="text-green-400">${formatCurrency(this.monthlyIncome)}</uix-text>
              </div>
            </uix-card>
            <uix-card>
              <div class="p-4">
                <uix-flex align="center" gap="sm" class="mb-2">
                  <uix-icon name="trending-down" size="16" class="text-red-400"></uix-icon>
                  <uix-text size="sm" muted>Expenses</uix-text>
                </uix-flex>
                <uix-text size="2xl" weight="semibold" class="text-red-400">${formatCurrency(this.monthlyExpenses)}</uix-text>
              </div>
            </uix-card>
            <uix-card>
              <div class="p-4">
                <uix-flex align="center" gap="sm" class="mb-2">
                  <uix-icon name=${net >= 0 ? "piggy-bank" : "alert-triangle"} size="16" class="${net >= 0 ? "text-green-400" : "text-red-400"}"></uix-icon>
                  <uix-text size="sm" muted>Net</uix-text>
                </uix-flex>
                <uix-text size="2xl" weight="semibold" class="${net >= 0 ? "text-green-400" : "text-red-400"}">${net >= 0 ? "+" : ""}${formatCurrency(net)}</uix-text>
              </div>
            </uix-card>
          </uix-grid>

          <uix-card class="mb-6">
            <div slot="header"><uix-text weight="medium">Accounts</uix-text></div>
            <div class="p-3">
              ${this.accounts.length === 0
                ? html`<uix-text muted class="text-center block py-4">No accounts. Add one in the sidebar.</uix-text>`
                : this.accounts.map((acc) => html`
                  <uix-flex align="center" gap="sm" class="py-2 px-2 rounded cursor-pointer hover:bg-surface-light"
                    @click=${() => ide.openResource(`finance://account/${acc.id}`)}>
                    <uix-icon name=${acc.icon || "wallet"} size="16" class="opacity-50"></uix-icon>
                    <uix-text size="sm" class="flex-1">${acc.name}</uix-text>
                    <uix-badge size="xs">${acc.metadata?.accountType || "account"}</uix-badge>
                    <uix-text size="sm" weight="medium" class="${acc.balance >= 0 ? "text-green-400" : "text-red-400"}">${formatCurrency(acc.balance)}</uix-text>
                  </uix-flex>
                `)}
            </div>
          </uix-card>

          <uix-card>
            <div slot="header"><uix-text weight="medium">Recent Transactions</uix-text></div>
            <div class="p-3">
              ${this.recentTransactions.length === 0
                ? html`<uix-text muted class="text-center block py-4">No transactions yet.</uix-text>`
                : this.recentTransactions.map((tx) => html`
                  <uix-flex align="center" gap="sm" class="py-2 px-2 rounded cursor-pointer hover:bg-surface-light"
                    @click=${() => ide.openResource(`finance://account/${tx.accountId}`)}>
                    <uix-icon
                      name=${tx.type === "income" ? "arrow-down-left" : tx.type === "transfer" ? "arrow-right-left" : "arrow-up-right"}
                      size="14"
                      class="${tx.type === "income" ? "text-green-400" : tx.type === "transfer" ? "text-blue-400" : "text-red-400"}"></uix-icon>
                    <uix-text size="sm" class="flex-1">${tx.title}</uix-text>
                    <uix-text size="xs" muted>${tx.accountName}</uix-text>
                    <uix-text size="xs" muted>${tx.date}</uix-text>
                    <uix-text size="sm" weight="medium" class="${tx.type === "income" ? "text-green-400" : "text-red-400"}">
                      ${tx.type === "income" ? "+" : "-"}${formatCurrency(parseFloat(tx.amount) || 0)}
                    </uix-text>
                  </uix-flex>
                `)}
            </div>
          </uix-card>
        </div>
      `;
    },
  };
}
