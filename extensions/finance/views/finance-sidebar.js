import { formatCurrency } from "./format.js";

export default function (ctx) {
  const { $APP, html, T, events, getIDE, createCollectionManager } = ctx;

  let _cm;
  const getCM = () => {
    if (!_cm) _cm = createCollectionManager({ model: $APP.Model.collections, types: ["account"] });
    return _cm;
  };

  return {
    tag: "bsp-finance-sidebar",
    properties: {
      accounts: T.array({ defaultValue: [] }),
      totalBalance: T.number({ defaultValue: 0 }),
      monthIncome: T.number({ defaultValue: 0 }),
      monthExpenses: T.number({ defaultValue: 0 }),
    },
    async connected() {
      await this.loadData();
      this._unsub = events.on("collection:changed", () => this.loadData());
    },
    disconnected() {
      this._unsub?.();
    },
    async loadData() {
      const cm = getCM();
      const collections = await cm.getAllCollections();
      const now = new Date();
      const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      let monthIncome = 0;
      let monthExpenses = 0;

      this.accounts = collections.map((col) => {
        const balance = col.items.reduce((sum, item) => {
          const amount = parseFloat(item.amount) || 0;
          return sum + (item.type === "income" ? amount : -amount);
        }, 0);
        for (const item of col.items) {
          if (!item.date || item.date < monthStart) continue;
          const amount = parseFloat(item.amount) || 0;
          if (item.type === "income") monthIncome += amount;
          else if (item.type === "expense") monthExpenses += amount;
        }
        return { ...col, balance };
      });

      this.totalBalance = this.accounts.reduce((sum, a) => sum + a.balance, 0);
      this.monthIncome = monthIncome;
      this.monthExpenses = monthExpenses;
    },
    render() {
      const ide = getIDE();
      return html`
        <div class="p-3 flex flex-col h-full">
          <div class="px-2 py-3 mb-3 rounded bg-surface-dark">
            <uix-text size="xs" muted class="block">Total Balance</uix-text>
            <uix-text size="lg" weight="semibold" class="block">${formatCurrency(this.totalBalance)}</uix-text>
            <div class="flex gap-3 mt-2">
              <div>
                <uix-text size="xs" muted class="block">Income</uix-text>
                <uix-text size="xs" weight="medium" class="text-green-400 block">${formatCurrency(this.monthIncome)}</uix-text>
              </div>
              <div>
                <uix-text size="xs" muted class="block">Expenses</uix-text>
                <uix-text size="xs" weight="medium" class="text-red-400 block">${formatCurrency(this.monthExpenses)}</uix-text>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light text-sm"
            @click=${() => ide.openResource("finance://overview")}>
            <uix-icon name="bar-chart-3" size="14" class="opacity-50"></uix-icon>
            <span>Overview</span>
          </div>

          <uix-text size="xs" muted weight="medium" class="mt-4 mb-2 block px-2 uppercase tracking-wide">Accounts</uix-text>
          ${this.accounts.length === 0
            ? html`<uix-text size="xs" muted class="px-2 block">No accounts yet</uix-text>`
            : this.accounts.map((acc) => html`
              <div class="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-surface-light text-sm"
                @click=${() => ide.openResource(`finance://account/${acc.id}`)}>
                <uix-icon name=${acc.icon || "wallet"} size="14" class="opacity-50"></uix-icon>
                <span class="flex-1">${acc.name}</span>
                <uix-text size="xs" class="${acc.balance >= 0 ? "text-green-400" : "text-red-400"}">
                  ${formatCurrency(acc.balance)}
                </uix-text>
              </div>
            `)}
          <uix-button size="xs" ghost class="mt-1 w-full" @click=${() => ide.executeCommand("finance.newAccount")}>
            <uix-icon name="plus" size="12" class="mr-1"></uix-icon> New Account
          </uix-button>
        </div>
      `;
    },
  };
}
