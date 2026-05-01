import { formatCurrency } from "./format.js";

export default function (ctx) {
  const { $APP, html, T, events, createCollectionManager } = ctx;

  let _cm;
  const getCM = () => {
    if (!_cm) _cm = createCollectionManager({ model: $APP.Model.collections, types: ["account"] });
    return _cm;
  };

  return {
    tag: "bsp-finance-transactions",
    properties: {
      accountId: T.string({ defaultValue: "" }),
      transactions: T.array({ defaultValue: [] }),
      accounts: T.array({ defaultValue: [] }),
      showForm: T.boolean({ defaultValue: false }),
      filterType: T.string({ defaultValue: "" }),
      form: T.object({
        defaultValue: { title: "", amount: "", type: "expense", category: "", accountId: "", date: new Date().toISOString().split("T")[0] },
      }),
      editIdx: T.number({ defaultValue: -1 }),
      editAccountId: T.string({ defaultValue: "" }),
      editTitle: T.string({ defaultValue: "" }),
      editAmount: T.string({ defaultValue: "" }),
      editType: T.string({ defaultValue: "expense" }),
      editCategory: T.string({ defaultValue: "" }),
      editDate: T.string({ defaultValue: "" }),
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
      this.accounts = collections;

      if (this.accountId) {
        const col = collections.find((c) => c.id === this.accountId);
        this.transactions = col ? col.items.map((item, idx) => ({ ...item, accountId: col.id, _itemIndex: idx })) : [];
      } else {
        this.transactions = collections.flatMap((col) =>
          col.items.map((item, idx) => ({ ...item, accountId: col.id, accountName: col.name, _itemIndex: idx })),
        );
      }
      this.transactions = [...this.transactions].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    },
    _filteredTransactions() {
      if (!this.filterType) return this.transactions;
      return this.transactions.filter((tx) => tx.type === this.filterType);
    },
    render() {
      const filtered = this._filteredTransactions();
      return html`
        <div class="p-4 h-full overflow-y-auto">
          <uix-flex align="center" justify="between" class="mb-4">
            <uix-heading level="3">Transactions</uix-heading>
            <uix-button size="sm" @click=${() => { this.showForm = !this.showForm; }}>
              <uix-icon name=${this.showForm ? "x" : "plus"} size="14" class="mr-1"></uix-icon>
              ${this.showForm ? "Cancel" : "Add Transaction"}
            </uix-button>
          </uix-flex>

          ${this.showForm ? this._renderForm() : ""}

          <uix-flex gap="xs" class="mb-3">
            ${["", "income", "expense", "transfer"].map((type) => html`
              <uix-button size="xs" variant=${this.filterType === type ? "primary" : "ghost"}
                @click=${() => { this.filterType = type; }}>
                ${type ? type.charAt(0).toUpperCase() + type.slice(1) : "All"}
              </uix-button>
            `)}
          </uix-flex>

          ${filtered.length === 0
            ? html`<div class="text-center py-12">
                <uix-icon name="receipt" size="48" class="opacity-20 mb-4"></uix-icon>
                <uix-text muted>No transactions${this.filterType ? ` of type "${this.filterType}"` : ""}.</uix-text>
              </div>`
            : html`<div class="grid gap-1">
                ${filtered.map((tx) =>
                  this.editIdx === tx._itemIndex && this.editAccountId === tx.accountId
                    ? this._renderEditRow(tx) : this._renderRow(tx),
                )}
              </div>`}
        </div>
      `;
    },
    _renderRow(tx) {
      return html`
        <uix-flex align="center" gap="sm" class="py-2 px-3 rounded hover:bg-surface-light group">
          <uix-icon
            name=${tx.type === "income" ? "arrow-down-left" : tx.type === "transfer" ? "arrow-right-left" : "arrow-up-right"}
            size="14"
            class="${tx.type === "income" ? "text-green-400" : tx.type === "transfer" ? "text-blue-400" : "text-red-400"}"></uix-icon>
          <uix-flex direction="column" class="flex-1 min-w-0">
            <uix-text size="sm">${tx.title}</uix-text>
            <uix-text size="xs" muted>${tx.date}${tx.category ? ` · ${tx.category}` : ""}${tx.accountName ? ` · ${tx.accountName}` : ""}</uix-text>
          </uix-flex>
          <uix-text size="sm" weight="medium" class="${tx.type === "income" ? "text-green-400" : "text-red-400"}">
            ${tx.type === "income" ? "+" : "-"}${formatCurrency(parseFloat(tx.amount) || 0)}
          </uix-text>
          <uix-button size="xs" ghost class="opacity-0 group-hover:opacity-100" @click=${() => this._startEdit(tx)}>
            <uix-icon name="pencil" size="12"></uix-icon>
          </uix-button>
          <uix-button size="xs" ghost class="opacity-0 group-hover:opacity-100" @click=${() => this._deleteTransaction(tx)}>
            <uix-icon name="trash-2" size="12"></uix-icon>
          </uix-button>
        </uix-flex>
      `;
    },
    _renderEditRow(tx) {
      return html`
        <div class="py-2 px-3 rounded bg-surface-dark">
          <div class="grid gap-2">
            <uix-flex gap="xs">
              ${["expense", "income", "transfer"].map((type) => html`
                <uix-button size="xs" variant=${this.editType === type ? "primary" : "ghost"}
                  @click=${() => { this.editType = type; }}>${type.charAt(0).toUpperCase() + type.slice(1)}</uix-button>
              `)}
            </uix-flex>
            <uix-flex gap="sm">
              <uix-input size="sm" class="flex-1" placeholder="Description" .value=${this.editTitle}
                @input=${(e) => { this.editTitle = e.target.value; }}
                @keydown=${(e) => { if (e.key === "Enter") this._saveEdit(tx); if (e.key === "Escape") this.editIdx = -1; }}></uix-input>
              <uix-input size="sm" type="number" placeholder="Amount" style="width: 120px" .value=${this.editAmount}
                @input=${(e) => { this.editAmount = e.target.value; }}></uix-input>
            </uix-flex>
            <uix-flex gap="sm">
              <uix-input size="sm" type="date" style="width: 160px" .value=${this.editDate}
                @input=${(e) => { this.editDate = e.target.value; }}></uix-input>
              <uix-input size="sm" class="flex-1" placeholder="Category" .value=${this.editCategory}
                @input=${(e) => { this.editCategory = e.target.value; }}></uix-input>
              <uix-button size="sm" @click=${() => this._saveEdit(tx)}>Save</uix-button>
              <uix-button size="sm" ghost @click=${() => { this.editIdx = -1; }}>Cancel</uix-button>
            </uix-flex>
          </div>
        </div>
      `;
    },
    _renderForm() {
      return html`
        <uix-card class="mb-4">
          <div class="p-4 grid gap-3">
            <uix-flex gap="sm">
              ${["expense", "income", "transfer"].map((type) => html`
                <uix-button size="xs" variant=${this.form.type === type ? "primary" : "ghost"}
                  @click=${() => { this.form = { ...this.form, type }; }}>${type.charAt(0).toUpperCase() + type.slice(1)}</uix-button>
              `)}
            </uix-flex>
            <uix-input size="sm" placeholder="Description" .value=${this.form.title}
              @input=${(e) => { this.form = { ...this.form, title: e.target.value }; }}></uix-input>
            <uix-flex gap="sm">
              <uix-input size="sm" type="number" placeholder="Amount" class="flex-1" .value=${this.form.amount}
                @input=${(e) => { this.form = { ...this.form, amount: e.target.value }; }}></uix-input>
              <uix-input size="sm" type="date" class="flex-1" .value=${this.form.date}
                @input=${(e) => { this.form = { ...this.form, date: e.target.value }; }}></uix-input>
            </uix-flex>
            <uix-flex gap="sm">
              <select class="flex-1 px-2 py-1 rounded text-sm bg-surface-dark text-default border border-dim"
                @change=${(e) => { this.form = { ...this.form, accountId: e.target.value }; }}>
                <option value="">Select account...</option>
                ${this.accounts.map((a) => html`<option value=${a.id} ?selected=${this.form.accountId === a.id}>${a.name}</option>`)}
              </select>
              <uix-input size="sm" class="flex-1" placeholder="Category" .value=${this.form.category}
                @input=${(e) => { this.form = { ...this.form, category: e.target.value }; }}></uix-input>
            </uix-flex>
            <uix-button size="sm" @click=${() => this._addTransaction()}>Add Transaction</uix-button>
          </div>
        </uix-card>
      `;
    },
    _startEdit(tx) {
      this.editIdx = tx._itemIndex;
      this.editAccountId = tx.accountId;
      this.editTitle = tx.title || "";
      this.editAmount = tx.amount ? String(tx.amount) : "";
      this.editType = tx.type || "expense";
      this.editCategory = tx.category || "";
      this.editDate = tx.date || "";
    },
    async _saveEdit(tx) {
      const accountId = tx.accountId || this.accountId;
      if (!accountId || tx._itemIndex === undefined) return;
      const cm = getCM();
      await cm.editItem(accountId, tx._itemIndex, {
        title: this.editTitle,
        amount: String(parseFloat(this.editAmount) || 0),
        type: this.editType,
        category: this.editCategory,
        date: this.editDate,
      });
      this.editIdx = -1;
      await this.loadData();
    },
    async _addTransaction() {
      const amount = parseFloat(this.form.amount);
      const targetAccountId = this.form.accountId || this.accountId;
      if (!this.form.title || !amount || !targetAccountId) return;
      const cm = getCM();
      await cm.addItem(targetAccountId, {
        title: this.form.title,
        amount: String(amount),
        type: this.form.type,
        category: this.form.category,
        date: this.form.date,
      });
      this.form = { title: "", amount: "", type: "expense", category: "", accountId: targetAccountId, date: new Date().toISOString().split("T")[0] };
      this.showForm = false;
      await this.loadData();
    },
    async _deleteTransaction(tx) {
      const accountId = tx.accountId || this.accountId;
      if (!accountId || tx._itemIndex === undefined) return;
      const cm = getCM();
      await cm.removeItem(accountId, tx._itemIndex);
      await this.loadData();
    },
  };
}
