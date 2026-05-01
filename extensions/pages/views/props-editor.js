import { loadComponent } from "/node_modules/@bootstrapp/uix/utils/component-registry.js";

const CATEGORY_BY_TAG = {
  "uix-site-header": "page",
  "uix-footer": "page",
  "uix-hero-section": "page",
  "uix-about-section": "page",
  "uix-showcase-section": "page",
  "uix-feature-grid": "page",
  "uix-steps-section": "page",
  "uix-testimonial-section": "page",
  "uix-faq-section": "page",
  "uix-pricing-card": "page",
  "uix-pricing-table": "page",
  "uix-stats-section": "page",
  "uix-cta-section": "page",
};

const SKIP_KEYS = new Set([
  "openItems",
  "decorations",
  "stepMockups",
  "sectionId",
]);

const nameFromTag = (tag) => tag.replace(/^uix-/, "");

const titleCase = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

const classifyField = (typeDef) => {
  if (!typeDef || typeof typeDef !== "object") return { kind: "unknown" };
  const type = typeDef.type;
  if (type === "string") {
    if (Array.isArray(typeDef.enum)) return { kind: "enum", enum: typeDef.enum };
    return { kind: "string" };
  }
  if (type === "number") return { kind: "number" };
  if (type === "boolean") return { kind: "boolean" };
  if (type === "array") {
    const itemType = typeDef.itemType;
    if (itemType && typeof itemType === "object" && itemType.type) {
      return { kind: "primitive-array", itemType };
    }
    if (itemType && typeof itemType === "object") {
      return { kind: "object-array", shape: itemType };
    }
    return { kind: "array-raw" };
  }
  if (type === "object") {
    if (typeDef.properties) {
      return { kind: "object", shape: typeDef.properties };
    }
    return { kind: "object-raw" };
  }
  return { kind: "unknown" };
};

const cloneDeep = (value) => {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(cloneDeep);
  if (typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = cloneDeep(v);
    return out;
  }
  return value;
};

const defaultForType = (typeDef) => {
  if (!typeDef || typeof typeDef !== "object") return "";
  if (typeDef.defaultValue !== undefined) return cloneDeep(typeDef.defaultValue);
  switch (typeDef.type) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return "";
  }
};

const defaultForShape = (shape) => {
  const out = {};
  for (const [k, td] of Object.entries(shape)) out[k] = defaultForType(td);
  return out;
};

export default function (ctx) {
  const { html, T } = ctx;

  return {
    tag: "bsp-props-editor",
    properties: {
      tag: T.string({ defaultValue: "" }),
      props: T.object({ attribute: false, defaultValue: {} }),
      definition: T.object({ attribute: false, defaultValue: null }),
      loading: T.boolean({ defaultValue: false }),
      error: T.string({ defaultValue: "" }),
      expanded: T.object({ attribute: false, defaultValue: {} }),
      jsonErrors: T.object({ attribute: false, defaultValue: {} }),
    },

    async willUpdate({ changedProps }) {
      if (changedProps.has("tag") && this.tag) {
        await this._loadDefinition();
      }
    },

    async _loadDefinition() {
      if (!this.tag) return;
      this.loading = true;
      this.error = "";
      try {
        const category = CATEGORY_BY_TAG[this.tag] || "page";
        const name = nameFromTag(this.tag);
        const metadata = await loadComponent(category, name);
        this.definition = metadata.module;
      } catch (e) {
        this.error = e.message || "Failed to load component";
      }
      this.loading = false;
    },

    _emit(nextProps) {
      this.props = nextProps;
      this.emit("change", { props: nextProps });
    },

    _setValue(key, value) {
      const next = { ...(this.props || {}), [key]: value };
      this._emit(next);
    },

    _toggleExpanded(path) {
      this.expanded = { ...this.expanded, [path]: !this.expanded[path] };
    },

    _isExpanded(path) {
      return this.expanded[path] !== false;
    },

    _renderStringInput(value, onChange, { label = "", placeholder = "", multiline = false } = {}) {
      if (multiline) {
        return html`<uix-textarea
          label=${label}
          placeholder=${placeholder}
          rows="4"
          full-width
          .value=${value || ""}
          @input=${(e) => onChange(e.detail.value)}
        ></uix-textarea>`;
      }
      return html`<uix-input
        label=${label}
        placeholder=${placeholder}
        size="sm"
        full-width
        .value=${value || ""}
        @input=${(e) => onChange(e.detail.value)}
      ></uix-input>`;
    },

    _renderNumberInput(value, onChange, { label = "" } = {}) {
      const field = html`<uix-number-input
        size="sm"
        .value=${value ?? 0}
        @input=${(e) => onChange(e.detail.value)}
      ></uix-number-input>`;
      if (!label) return field;
      return html`<uix-form-control label=${label}>${field}</uix-form-control>`;
    },

    _renderBooleanInput(value, onChange, { label = "" } = {}) {
      return html`<uix-switch
        label=${label}
        size="sm"
        .checked=${!!value}
        @change=${(e) => onChange(e.detail.checked)}
      ></uix-switch>`;
    },

    _renderEnumInput(value, onChange, options, { label = "" } = {}) {
      return html`<uix-select
        label=${label}
        .value=${value || ""}
        .options=${options}
        @change=${(e) => onChange(e.detail.value)}
      ></uix-select>`;
    },

    _renderField(key, typeDef, value, onChange, path) {
      const field = classifyField(typeDef);
      const label = titleCase(key);
      switch (field.kind) {
        case "string": {
          const multiline = key === "body" || key === "description" || key === "quote" || key === "answer";
          return this._renderStringInput(value, onChange, { label, multiline });
        }
        case "number":
          return this._renderNumberInput(value, onChange, { label });
        case "boolean":
          return this._renderBooleanInput(value, onChange, { label });
        case "enum":
          return this._renderEnumInput(value, onChange, field.enum, { label });
        case "object":
          return this._renderObjectField(label, field.shape, value || {}, onChange, path);
        case "object-array":
          return this._renderObjectArrayField(label, field.shape, value || [], onChange, path);
        case "primitive-array":
          return this._renderPrimitiveArrayField(label, field.itemType, value || [], onChange, path);
        case "array-raw":
        case "object-raw":
        case "unknown":
        default:
          return this._renderJsonField(label, value, onChange);
      }
    },

    _renderObjectField(label, shape, value, onChange, path) {
      const open = this._isExpanded(path);
      return html`<uix-accordion
        variant="bordered"
        .openItems=${open ? [0] : []}
        @accordion-toggle=${() => this._toggleExpanded(path)}
      >
        <div class="flex items-center gap-1.5 w-full text-[11px] font-semibold uppercase tracking-wide text-muted text-left cursor-pointer">
          <span>${label}</span>
        </div>
        <div class="flex flex-col gap-2">
          ${Object.entries(shape).map(([subKey, subType]) => {
            const subValue = value[subKey];
            const subPath = `${path}.${subKey}`;
            return this._renderField(
              subKey,
              subType,
              subValue,
              (v) => onChange({ ...value, [subKey]: v }),
              subPath,
            );
          })}
        </div>
      </uix-accordion>`;
    },

    _renderObjectArrayField(label, shape, items, onChange, path) {
      const open = this._isExpanded(path);
      const addItem = () => onChange([...items, defaultForShape(shape)]);
      const removeItem = (i) =>
        onChange(items.filter((_, idx) => idx !== i));
      const updateItem = (i, next) =>
        onChange(items.map((it, idx) => (idx === i ? next : it)));
      const moveItem = (i, dir) => {
        const j = i + dir;
        if (j < 0 || j >= items.length) return;
        const next = [...items];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
      };
      const itemOpenIndices = items
        .map((_, i) => (this._isExpanded(`${path}[${i}]`) ? i : -1))
        .filter((i) => i >= 0);
      return html`<uix-accordion
        variant="bordered"
        .openItems=${open ? [0] : []}
        @accordion-toggle=${() => this._toggleExpanded(path)}
      >
        <div class="flex items-center gap-1.5 w-full text-[11px] font-semibold uppercase tracking-wide text-muted text-left cursor-pointer">
          <span>${label}</span>
          <span class="ml-auto text-[10px] font-medium px-1.5 py-px rounded-full bg-surface-light text-muted">${items.length}</span>
        </div>
        <div class="flex flex-col gap-2">
          <uix-accordion
            variant="separated"
            .openItems=${itemOpenIndices}
            @accordion-toggle=${(e) =>
              this._toggleExpanded(`${path}[${e.detail.index}]`)}
          >
            ${items.flatMap((item, i) => {
              const itemPath = `${path}[${i}]`;
              const previewKey = Object.keys(shape)[0];
              const previewValue =
                (item && item[previewKey]) || `Item ${i + 1}`;
              return [
                html`<div class="flex items-center gap-1 cursor-pointer">
                  <div class="flex items-center gap-1.5 flex-1 text-xs text-default text-left overflow-hidden">
                    <span class="overflow-hidden text-ellipsis whitespace-nowrap">${previewValue}</span>
                  </div>
                  <div
                    class="flex gap-0.5"
                    @click=${(e) => e.stopPropagation()}
                  >
                    <button
                      class="inline-flex items-center justify-center w-[22px] h-[22px] p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-surface-light hover:text-default disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                      ?disabled=${i === 0}
                      @click=${() => moveItem(i, -1)}
                    >
                      <uix-icon name="chevron-up" size="12"></uix-icon>
                    </button>
                    <button
                      class="inline-flex items-center justify-center w-[22px] h-[22px] p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-surface-light hover:text-default disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                      ?disabled=${i === items.length - 1}
                      @click=${() => moveItem(i, 1)}
                    >
                      <uix-icon name="chevron-down" size="12"></uix-icon>
                    </button>
                    <button
                      class="inline-flex items-center justify-center w-[22px] h-[22px] p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-danger/10 hover:text-danger disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Remove"
                      @click=${() => removeItem(i)}
                    >
                      <uix-icon name="trash-2" size="12"></uix-icon>
                    </button>
                  </div>
                </div>`,
                html`<div class="flex flex-col gap-2">
                  ${Object.entries(shape).map(([subKey, subType]) =>
                    this._renderField(
                      subKey,
                      subType,
                      item?.[subKey],
                      (v) => updateItem(i, { ...item, [subKey]: v }),
                      `${itemPath}.${subKey}`,
                    ),
                  )}
                </div>`,
              ];
            })}
          </uix-accordion>
          <button class="inline-flex items-center gap-1 py-1.5 px-2.5 bg-transparent border border-dashed border-dim rounded-md cursor-pointer text-xs font-medium text-muted self-start hover:border-primary hover:text-primary" @click=${addItem}>
            <uix-icon name="plus" size="12"></uix-icon>
            Add ${label.replace(/s$/, "")}
          </button>
        </div>
      </uix-accordion>`;
    },

    _renderPrimitiveArrayField(label, itemType, items, onChange, path) {
      const open = this._isExpanded(path);
      const addItem = () => onChange([...items, defaultForType(itemType)]);
      const removeItem = (i) =>
        onChange(items.filter((_, idx) => idx !== i));
      const updateItem = (i, v) =>
        onChange(items.map((it, idx) => (idx === i ? v : it)));
      return html`<uix-accordion
        variant="bordered"
        .openItems=${open ? [0] : []}
        @accordion-toggle=${() => this._toggleExpanded(path)}
      >
        <div class="flex items-center gap-1.5 w-full text-[11px] font-semibold uppercase tracking-wide text-muted text-left cursor-pointer">
          <span>${label}</span>
          <span class="ml-auto text-[10px] font-medium px-1.5 py-px rounded-full bg-surface-light text-muted">${items.length}</span>
        </div>
        <div class="flex flex-col gap-2">
          ${items.map(
            (item, i) => html`<div class="flex items-center gap-1.5">
              ${itemType.type === "number"
                ? this._renderNumberInput(item, (v) => updateItem(i, v))
                : this._renderStringInput(item, (v) => updateItem(i, v))}
              <button
                class="inline-flex items-center justify-center w-[22px] h-[22px] p-0 border-none bg-transparent rounded cursor-pointer text-muted hover:bg-danger/10 hover:text-danger disabled:opacity-30 disabled:cursor-not-allowed"
                title="Remove"
                @click=${() => removeItem(i)}
              >
                <uix-icon name="trash-2" size="12"></uix-icon>
              </button>
            </div>`,
          )}
          <button class="inline-flex items-center gap-1 py-1.5 px-2.5 bg-transparent border border-dashed border-dim rounded-md cursor-pointer text-xs font-medium text-muted self-start hover:border-primary hover:text-primary" @click=${addItem}>
            <uix-icon name="plus" size="12"></uix-icon>
            Add ${label.replace(/s$/, "")}
          </button>
        </div>
      </uix-accordion>`;
    },

    _renderJsonField(label, value, onChange) {
      const serialized =
        value === null || value === undefined ? "" : JSON.stringify(value, null, 2);
      const hasError = !!this.jsonErrors?.[label];
      return html`<uix-textarea
        class="font-mono text-xs"
        label=${`${label} (JSON)`}
        rows="4"
        full-width
        ?error=${hasError}
        .value=${serialized}
        @change=${(e) => {
          const text = (e.detail.value || "").trim();
          if (!text) {
            this._setJsonError(label, false);
            onChange(null);
            return;
          }
          try {
            onChange(JSON.parse(text));
            this._setJsonError(label, false);
          } catch {
            this._setJsonError(label, true);
          }
        }}
        @input=${() => this._setJsonError(label, false)}
      ></uix-textarea>`;
    },

    _setJsonError(label, flag) {
      const prev = this.jsonErrors || {};
      if (!!prev[label] === flag) return;
      this.jsonErrors = { ...prev, [label]: flag };
    },

    render() {
      if (this.loading) {
        return html`<div class="p-4 text-muted text-center text-[13px]">Loading schema…</div>`;
      }
      if (this.error) {
        return html`<div class="p-4 text-center text-[13px] text-danger">${this.error}</div>`;
      }
      if (!this.definition || !this.definition.properties) {
        return html`<div class="p-4 text-muted text-center text-[13px]">No schema available for ${this.tag}.</div>`;
      }

      const properties = this.definition.properties;
      const entries = Object.entries(properties).filter(
        ([key]) => !SKIP_KEYS.has(key) && !key.startsWith("_"),
      );

      return html`<div class="flex flex-col gap-2.5 text-[13px]">
        ${entries.map(([key, typeDef]) =>
          this._renderField(
            key,
            typeDef,
            this.props?.[key],
            (v) => this._setValue(key, v),
            key,
          ),
        )}
      </div>`;
    },
  };
}
