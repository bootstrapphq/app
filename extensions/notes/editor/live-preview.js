import { syntaxTree } from "https://esm.sh/@codemirror/language";
import { StateField } from "https://esm.sh/@codemirror/state";
import {
  Decoration,
  EditorView,
  ViewPlugin,
  WidgetType,
} from "https://esm.sh/@codemirror/view";

class WikiLinkWidget extends WidgetType {
  constructor(text, display, onClick) {
    super();
    this.text = text;
    this.display = display;
    this.onClick = onClick;
  }
  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-wiki-link";
    span.textContent = this.display;
    span.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.onClick) this.onClick(this.text);
    });
    return span;
  }
  eq(other) {
    return this.text === other.text && this.display === other.display;
  }
}

class HRWidget extends WidgetType {
  toDOM() {
    const hr = document.createElement("hr");
    hr.className = "cm-hr-widget";
    return hr;
  }
  eq() {
    return true;
  }
}

class TableWidget extends WidgetType {
  constructor(text) {
    super();
    this.text = text;
  }
  toDOM() {
    const rows = this.text.split("\n").filter((r) => r.trim());
    const table = document.createElement("table");
    table.className = "cm-table-widget";
    rows.forEach((row, i) => {
      if (i === 1 && /^\|[\s\-:|]+\|$/.test(row.trim())) return;
      const tr = document.createElement("tr");
      const cells = row.split("|").slice(1, -1);
      cells.forEach((cell) => {
        const td = document.createElement(i === 0 ? "th" : "td");
        td.textContent = cell.trim();
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    return table;
  }
  eq(other) {
    return this.text === other.text;
  }
}

class TagWidget extends WidgetType {
  constructor(tag, onClick) {
    super();
    this.tag = tag;
    this.onClick = onClick;
  }
  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-tag";
    span.textContent = `#${this.tag}`;
    span.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.onClick) this.onClick(this.tag);
    });
    return span;
  }
  eq(other) {
    return this.tag === other.tag;
  }
}

function buildDecorations(view, options) {
  const state = view.state;
  const cursorLine = state.doc.lineAt(state.selection.main.head);
  const decorations = [];
  const codeRanges = [];

  for (const { from, to } of view.visibleRanges) {
    syntaxTree(state).iterate({
      from,
      to,
      enter(node) {
        const nodeFrom = node.from;
        const nodeTo = node.to;
        const startLine = state.doc.lineAt(nodeFrom);
        const endLine = state.doc.lineAt(nodeTo);
        const onCursor =
          cursorLine.number >= startLine.number &&
          cursorLine.number <= endLine.number;

        if (node.name === "FencedCode" || node.name === "CodeBlock") {
          codeRanges.push({ from: nodeFrom, to: nodeTo });
          if (!onCursor) {
            for (let i = startLine.number; i <= endLine.number; i++) {
              const line = state.doc.line(i);
              decorations.push(
                Decoration.line({ class: "cm-fenced-code" }).range(line.from),
              );
            }
          }
          return false;
        }

        if (node.name === "InlineCode") {
          codeRanges.push({ from: nodeFrom, to: nodeTo });
          if (!onCursor) {
            const inner = node.node;
            const marks = [];
            inner.cursor().iterate((child) => {
              if (child.name === "CodeMark")
                marks.push({ from: child.from, to: child.to });
            });
            if (marks.length >= 2) {
              decorations.push(
                Decoration.replace({}).range(marks[0].from, marks[0].to),
              );
              decorations.push(
                Decoration.replace({}).range(
                  marks[marks.length - 1].from,
                  marks[marks.length - 1].to,
                ),
              );
              decorations.push(
                Decoration.mark({ class: "cm-inline-code" }).range(
                  marks[0].to,
                  marks[marks.length - 1].from,
                ),
              );
            }
          }
          return false;
        }

        if (onCursor) return;

        const name = node.name;

        if (name.startsWith("ATXHeading")) {
          const level = name.match(/\d/)?.[0] || "1";
          const inner = node.node;
          let markEnd = nodeFrom;
          inner.cursor().iterate((child) => {
            if (child.name === "HeaderMark") markEnd = child.to;
          });
          const textStart = Math.min(markEnd + 1, nodeTo);
          if (markEnd > nodeFrom) {
            decorations.push(Decoration.replace({}).range(nodeFrom, textStart));
          }
          decorations.push(
            Decoration.mark({
              class: `cm-heading cm-heading-${level}`,
            }).range(textStart, nodeTo),
          );
          return false;
        }

        if (name === "StrongEmphasis") {
          const inner = node.node;
          const marks = [];
          inner.cursor().iterate((child) => {
            if (child.name === "EmphasisMark")
              marks.push({ from: child.from, to: child.to });
          });
          if (marks.length >= 2) {
            decorations.push(
              Decoration.replace({}).range(marks[0].from, marks[0].to),
            );
            decorations.push(
              Decoration.replace({}).range(
                marks[marks.length - 1].from,
                marks[marks.length - 1].to,
              ),
            );
            decorations.push(
              Decoration.mark({ class: "cm-bold" }).range(
                marks[0].to,
                marks[marks.length - 1].from,
              ),
            );
          }
          return false;
        }

        if (name === "Emphasis") {
          const inner = node.node;
          const marks = [];
          inner.cursor().iterate((child) => {
            if (child.name === "EmphasisMark")
              marks.push({ from: child.from, to: child.to });
          });
          if (marks.length >= 2) {
            decorations.push(
              Decoration.replace({}).range(marks[0].from, marks[0].to),
            );
            decorations.push(
              Decoration.replace({}).range(
                marks[marks.length - 1].from,
                marks[marks.length - 1].to,
              ),
            );
            decorations.push(
              Decoration.mark({ class: "cm-italic" }).range(
                marks[0].to,
                marks[marks.length - 1].from,
              ),
            );
          }
          return false;
        }

        if (name === "Strikethrough") {
          const inner = node.node;
          const marks = [];
          inner.cursor().iterate((child) => {
            if (child.name === "StrikethroughMark")
              marks.push({ from: child.from, to: child.to });
          });
          if (marks.length >= 2) {
            decorations.push(
              Decoration.replace({}).range(marks[0].from, marks[0].to),
            );
            decorations.push(
              Decoration.replace({}).range(
                marks[marks.length - 1].from,
                marks[marks.length - 1].to,
              ),
            );
            decorations.push(
              Decoration.mark({ class: "cm-strikethrough" }).range(
                marks[0].to,
                marks[marks.length - 1].from,
              ),
            );
          }
          return false;
        }

        if (name === "Link") {
          const inner = node.node;
          let urlFrom = -1,
            urlTo = -1;
          const linkMarks = [];
          inner.cursor().iterate((child) => {
            if (child.name === "LinkMark")
              linkMarks.push({ from: child.from, to: child.to });
            if (child.name === "URL") {
              urlFrom = child.from;
              urlTo = child.to;
            }
          });
          if (linkMarks.length >= 2 && urlFrom >= 0) {
            const url = state.doc.sliceString(urlFrom, urlTo);
            decorations.push(
              Decoration.replace({}).range(linkMarks[0].from, linkMarks[0].to),
            );
            decorations.push(
              Decoration.replace({}).range(linkMarks[1].from, nodeTo),
            );
            decorations.push(
              Decoration.mark({
                class: "cm-link",
                attributes: { "data-href": url },
              }).range(linkMarks[0].to, linkMarks[1].from),
            );
          }
          return false;
        }

        if (name === "Blockquote") {
          for (let i = startLine.number; i <= endLine.number; i++) {
            const line = state.doc.line(i);
            decorations.push(
              Decoration.line({ class: "cm-blockquote" }).range(line.from),
            );
          }
          const inner = node.node;
          inner.cursor().iterate((child) => {
            if (child.name === "QuoteMark") {
              const markEnd = Math.min(child.to + 1, nodeTo);
              decorations.push(
                Decoration.replace({}).range(child.from, markEnd),
              );
            }
          });
          return false;
        }

        if (name === "HorizontalRule") {
          decorations.push(
            Decoration.replace({ widget: new HRWidget() }).range(
              nodeFrom,
              nodeTo,
            ),
          );
          return false;
        }
      },
    });
  }

  const wikiRe = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  for (const { from, to } of view.visibleRanges) {
    const text = state.doc.sliceString(from, to);
    let match;
    while ((match = wikiRe.exec(text)) !== null) {
      const start = from + match.index;
      const end = start + match[0].length;
      const matchLine = state.doc.lineAt(start);
      if (matchLine.number === cursorLine.number) continue;
      if (codeRanges.some((r) => start >= r.from && end <= r.to)) continue;
      const linkName = match[1].trim();
      const display = (match[2] || match[1]).trim();
      decorations.push(
        Decoration.replace({
          widget: new WikiLinkWidget(
            linkName,
            display,
            options.onWikiLinkClick,
          ),
        }).range(start, end),
      );
    }
  }

  const tagRe = /(?<=\s|^)#([\w][\w-]*)/g;
  for (const { from, to } of view.visibleRanges) {
    const text = state.doc.sliceString(from, to);
    let match;
    while ((match = tagRe.exec(text)) !== null) {
      const start = from + match.index;
      const end = start + match[0].length;
      const matchLine = state.doc.lineAt(start);
      if (matchLine.number === cursorLine.number) continue;
      if (codeRanges.some((r) => start >= r.from && end <= r.to)) continue;
      decorations.push(
        Decoration.replace({
          widget: new TagWidget(match[1], options.onTagClick),
        }).range(start, end),
      );
    }
  }

  return Decoration.set(decorations, true);
}

const livePreviewTheme = EditorView.theme({
  "&": {
    backgroundColor: "var(--color-surface-darker, #1e1e1e) !important",
    fontSize: "1rem",
  },
  ".cm-scroller": {
    overflow: "auto",
  },
  ".cm-content": {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "32px 48px",
    fontFamily: "inherit",
  },
  ".cm-line": {
    lineHeight: "1.75",
  },
  ".cm-gutters": {
    display: "none",
  },
  ".cm-activeLineGutter": {
    display: "none",
  },
  ".cm-heading": {
    fontWeight: "600",
    lineHeight: "1.3",
  },
  ".cm-heading-1": {
    fontSize: "1.75em",
    paddingBottom: "0.2em",
    borderBottom: "1px solid var(--border-color, #444)",
  },
  ".cm-heading-2": {
    fontSize: "1.4em",
    paddingBottom: "0.15em",
    borderBottom: "1px solid var(--border-color, #444)",
  },
  ".cm-heading-3": { fontSize: "1.2em" },
  ".cm-heading-4": { fontSize: "1.05em" },
  ".cm-heading-5": { fontSize: "1em" },
  ".cm-heading-6": { fontSize: "0.9em", opacity: "0.7" },
  ".cm-bold": { fontWeight: "600" },
  ".cm-italic": { fontStyle: "italic" },
  ".cm-inline-code": {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    padding: "0.1em 0.3em",
    borderRadius: "3px",
    fontFamily: "monospace",
    fontSize: "0.875em",
  },
  ".cm-strikethrough": { textDecoration: "line-through" },
  ".cm-link": {
    color: "var(--color-primary, #83a598)",
    textDecoration: "underline",
    cursor: "pointer",
  },
  ".cm-blockquote .cm-line": {
    borderLeft: "3px solid var(--color-primary, #83a598)",
    paddingLeft: "1em",
    color: "var(--color-text-muted, #928374)",
  },
  ".cm-wiki-link": {
    color: "var(--color-primary, #83a598)",
    cursor: "pointer",
    borderBottom: "1px dashed var(--color-primary, #83a598)",
    padding: "0 2px",
  },
  ".cm-wiki-link:hover": {
    borderBottomStyle: "solid",
  },
  ".cm-hr-widget": {
    border: "none",
    borderTop: "1px solid var(--border-color, #444)",
    margin: "0.5em 0",
    display: "block",
  },
  ".cm-fenced-code .cm-line": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  ".cm-table-widget": {
    borderCollapse: "collapse",
    width: "100%",
    margin: "0.5em 0",
    fontSize: "0.9em",
  },
  ".cm-table-widget th, .cm-table-widget td": {
    border: "1px solid var(--border-color, #444)",
    padding: "6px 12px",
    textAlign: "left",
  },
  ".cm-table-widget th": {
    fontWeight: "600",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  ".cm-table-widget tr:nth-child(even) td": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  ".cm-tag": {
    color: "var(--color-primary, #83a598)",
    backgroundColor: "rgba(131, 165, 152, 0.12)",
    padding: "0.1em 0.4em",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "0.9em",
  },
  ".cm-tag:hover": {
    backgroundColor: "rgba(131, 165, 152, 0.25)",
  },
  "&.cm-focused .cm-line": {
    caretColor: "var(--color-text-default, #ebdbb2)",
  },
});

function buildTableDecorations(state) {
  const cursorLine = state.doc.lineAt(state.selection.main.head);
  const decorations = [];
  syntaxTree(state).iterate({
    enter(node) {
      if (node.name !== "Table") return;
      const startLine = state.doc.lineAt(node.from);
      const endLine = state.doc.lineAt(node.to);
      const onCursor =
        cursorLine.number >= startLine.number &&
        cursorLine.number <= endLine.number;
      if (!onCursor) {
        const tableText = state.doc.sliceString(node.from, node.to);
        decorations.push(
          Decoration.replace({ widget: new TableWidget(tableText) }).range(
            node.from,
            node.to,
          ),
        );
      }
    },
  });
  return Decoration.set(decorations, true);
}

const tableField = StateField.define({
  create(state) {
    return buildTableDecorations(state);
  },
  update(value, tr) {
    if (tr.docChanged || tr.selection) return buildTableDecorations(tr.state);
    return value;
  },
  provide: (f) => EditorView.decorations.from(f),
});

export function createLivePreview(options = {}) {
  const plugin = ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = buildDecorations(view, options);
      }
      update(update) {
        if (
          update.docChanged ||
          update.viewportChanged ||
          update.selectionSet
        ) {
          this.decorations = buildDecorations(update.view, options);
        }
      }
    },
    { decorations: (v) => v.decorations },
  );

  return [plugin, tableField, livePreviewTheme];
}
