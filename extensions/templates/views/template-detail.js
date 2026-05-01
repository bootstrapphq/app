const CATEGORY_LABEL = {
  notes: "Notes",
  tasks: "Tasks",
  website: "Website",
};

export default function (ctx) {
  const { html, T, getIDE } = ctx;

  return {
  tag: "bsp-template-detail",
  properties: {
    uri: T.string({ defaultValue: "" }),
    templateId: T.string({ defaultValue: "" }),
    template: T.object({ attribute: false, defaultValue: null }),
    installing: T.boolean({ defaultValue: false }),
    variableValues: T.object({ attribute: false, defaultValue: {} }),
    installError: T.string({ defaultValue: "" }),
  },

  async connected() {
    if (!this.templateId && this.uri) {
      const path = this.uri.replace("templates://", "");
      if (path.startsWith("detail/")) {
        this.templateId = path.replace("detail/", "");
      }
    }
    if (this.templateId) {
      this.template = await getIDE().templates.loadTemplate(this.templateId);
    }
  },

  _setVar(id, value) {
    this.variableValues = { ...this.variableValues, [id]: value };
    if (this.installError) this.installError = "";
  },

  _isValid(template) {
    if (!template.variables) return true;
    return template.variables
      .filter((v) => v.required)
      .every((v) => {
        const val = this.variableValues[v.id];
        return val !== undefined && val !== "";
      });
  },

  async _install(template) {
    this.installing = true;
    this.installError = "";
    try {
      const response = await getIDE().executeCommand("templates.install", {
        templateId: template.id,
        variables: this.variableValues,
      });
      if (response && response.ok === false) {
        this.installError = response.error?.message || "Failed to create from template.";
      }
    } catch (e) {
      console.error("[template-detail] Install failed:", e);
      this.installError = e?.message || "Unexpected error.";
    }
    this.installing = false;
  },

  render() {
    const ide = getIDE();
    const template = this.template;

    if (!template) {
      return html`
        <div class="block w-full h-full overflow-y-auto">
          <div class="max-w-[1040px] mx-auto px-10 pt-6 pb-16">
            <a class="inline-flex items-center gap-1 text-primary text-xs cursor-pointer mb-4 select-none hover:underline" @click=${() => ide.openResource("templates://browse")}>
              <uix-icon name="arrow-left" size="14"></uix-icon>
              Back to Templates
            </a>
            <div class="flex flex-col items-center gap-3 py-18">
              <uix-icon name="package-x" size="32" class="opacity-25"></uix-icon>
              <p class="text-muted text-sm m-0">Template not found.</p>
            </div>
          </div>
        </div>
      `;
    }

    const vars = template.variables || [];
    const creates = template.getCreates
      ? template.getCreates(this.variableValues)
      : template.creates || [];
    const canInstall = this._isValid(template) && !this.installing;
    const categoryLabel = template.category
      ? (CATEGORY_LABEL[template.category] || template.category)
      : null;

    return html`
      <div class="block w-full h-full overflow-y-auto">
        <div class="max-w-[1040px] mx-auto px-10 pt-6 pb-16">
          <a class="inline-flex items-center gap-1 text-primary text-xs cursor-pointer mb-4 select-none hover:underline" @click=${() => ide.openResource("templates://browse")}>
            <uix-icon name="arrow-left" size="14"></uix-icon>
            Back to Templates
          </a>

          <header class="flex gap-5 p-6 border border-dim rounded-xl bg-surface-dark mb-5">
            <div class="flex-shrink-0 w-18 h-18 rounded-xl bg-primary/14 flex items-center justify-center">
              <uix-icon name=${template.icon || "sparkles"} size="36" class="text-primary"></uix-icon>
            </div>
            <div class="flex-1 min-w-0 flex flex-col gap-2">
              <div class="flex items-center gap-2.5 flex-wrap">
                <h1 class="m-0 text-2xl font-semibold text-default tracking-tight">${template.name}</h1>
                ${categoryLabel ? html`<uix-tag size="sm" variant="primary">${categoryLabel}</uix-tag>` : ""}
              </div>
              ${template.description ? html`<p class="mt-1 mb-0 text-default text-sm leading-relaxed">${template.description}</p>` : ""}
              <div class="flex gap-2 mt-2 flex-wrap">
                <uix-button
                  variant="primary"
                  ?disabled=${!canInstall}
                  @click=${() => this._install(template)}
                >
                  ${this.installing
                    ? html`<uix-icon name="loader" size="14"></uix-icon> Creating…`
                    : html`<uix-icon name="sparkles" size="14"></uix-icon> Use Template`
                  }
                </uix-button>
              </div>
            </div>
          </header>

          <div class="grid grid-cols-[minmax(0,1fr)_260px] gap-5 items-start max-md:grid-cols-1">
            <div class="min-w-0 flex flex-col gap-6">
              ${vars.length ? html`
                <section class="flex flex-col gap-3">
                  <h2 class="m-0 text-[13px] font-semibold text-default uppercase tracking-wide">Configure</h2>
                  <div class="flex flex-col gap-3.5">
                    ${vars.map((v) => this._renderVariable(v))}
                  </div>
                  ${this.installError ? html`
                    <p class="mt-1 text-xs text-danger inline-flex items-center gap-1.5">
                      <uix-icon name="alert-circle" size="12"></uix-icon>
                      ${this.installError}
                    </p>
                  ` : ""}
                </section>
              ` : ""}

              ${creates.length ? html`
                <section class="flex flex-col gap-3">
                  <h2 class="m-0 text-[13px] font-semibold text-default uppercase tracking-wide">What gets created</h2>
                  <div class="flex flex-col gap-0.5 border border-dim rounded-md p-2 bg-surface-dark">
                    ${creates.map((item) => html`
                      <div class="flex items-center gap-2 py-1.5 px-2 rounded text-[13px] ${item.parent ? "ml-5" : ""}">
                        <uix-icon name=${item.icon || "file"} size="14" class="text-muted flex-shrink-0"></uix-icon>
                        <span class="text-muted text-[10px] uppercase tracking-wide min-w-[80px]">${item.type}</span>
                        <span class="text-default">${item.name}</span>
                      </div>
                    `)}
                  </div>
                </section>
              ` : ""}
            </div>

            <aside class="sticky top-0">
              ${this._renderRail(template, categoryLabel)}
            </aside>
          </div>
        </div>
      </div>
    `;
  },

  _renderVariable(v) {
    const value = this.variableValues[v.id] ?? "";
    const label = html`
      ${v.label}${v.required ? html`<span class="text-danger"> *</span>` : ""}
    `;

    if (v.type === "select") {
      const options = (v.options || []).map((opt) => ({ label: opt.label, value: opt.value }));
      return html`
        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-muted">${label}</label>
          <uix-select
            size="sm"
            fullWidth
            .value=${value}
            .options=${options}
            @change=${(e) => this._setVar(v.id, e.detail.value)}
          ></uix-select>
        </div>
      `;
    }

    return html`
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-muted">${label}</label>
        <uix-input
          type=${v.type === "number" ? "number" : "text"}
          size="sm"
          fullWidth
          placeholder=${v.placeholder || ""}
          .value=${value}
          @input=${(e) => this._setVar(v.id, e.target.value)}
        ></uix-input>
      </div>
    `;
  },

  _renderRail(template, categoryLabel) {
    return html`
      <uix-card gap="md">
        <div slot="header" class="text-[11px] font-semibold tracking-wider uppercase text-muted">Details</div>
        ${categoryLabel ? html`
          <div class="flex flex-col gap-1">
            <div class="text-[10px] font-semibold tracking-wider uppercase text-muted">Category</div>
            <div class="text-[13px] text-default">${categoryLabel}</div>
          </div>
        ` : ""}
        ${template.plugin ? html`
          <div class="flex flex-col gap-1">
            <div class="text-[10px] font-semibold tracking-wider uppercase text-muted">Target plugin</div>
            <div class="text-[13px] text-default"><code class="font-mono text-[11px] px-1.5 py-0.5 bg-surface-light rounded text-default">${template.plugin}</code></div>
          </div>
        ` : ""}
        ${template.icon ? html`
          <div class="flex flex-col gap-1">
            <div class="text-[10px] font-semibold tracking-wider uppercase text-muted">Icon</div>
            <div class="text-[13px] text-default"><code class="font-mono text-[11px] px-1.5 py-0.5 bg-surface-light rounded text-default">${template.icon}</code></div>
          </div>
        ` : ""}
        <div class="flex flex-col gap-1">
          <div class="text-[10px] font-semibold tracking-wider uppercase text-muted">Template ID</div>
          <div class="text-[13px] text-default"><code class="font-mono text-[11px] px-1.5 py-0.5 bg-surface-light rounded text-default">${template.id}</code></div>
        </div>
      </uix-card>
    `;
  },
  };
}
