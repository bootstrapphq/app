import {
  EditorView,
  StateField,
  autocompletion,
  keymap,
  showTooltip,
  startCompletion,
  syntaxTree,
} from "/node_modules/@bootstrapp/uix/form/codemirror.js";

const ICONS = {
  bold: `<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>`,
  italic: `<line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>`,
  strikethrough: `<path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/>`,
  code: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  link: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  heading: `<path d="M6 12h12"/><path d="M6 4v16"/><path d="M18 4v16"/>`,
};

function svgIcon(name, size = 16) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.innerHTML = ICONS[name] || "";
  return svg;
}

function wrapSelection(view, prefix, suffix) {
  const sel = view.state.selection.main;
  if (sel.empty) return false;
  const text = view.state.doc.sliceString(sel.from, sel.to);
  const leadingSpaces = text.length - text.trimStart().length;
  const trailingSpaces = text.length - text.trimEnd().length;
  const trimmed = text.trim();
  if (!trimmed) return false;
  const wrapFrom = sel.from + leadingSpaces;
  const wrapTo = sel.to - trailingSpaces;
  view.dispatch({
    changes: { from: wrapFrom, to: wrapTo, insert: prefix + trimmed + suffix },
    selection: {
      anchor: wrapFrom + prefix.length,
      head: wrapFrom + prefix.length + trimmed.length,
    },
  });
  return true;
}

function applyLink(view) {
  const sel = view.state.selection.main;
  if (sel.empty) return false;
  const text = view.state.doc.sliceString(sel.from, sel.to);
  const trimmed = text.trim();
  const leadingSpaces = text.length - text.trimStart().length;
  const wrapFrom = sel.from + leadingSpaces;
  const trailingSpaces = text.length - text.trimEnd().length;
  const wrapTo = sel.to - trailingSpaces;
  if (!trimmed) return false;
  const insert = `[${trimmed}](url)`;
  const urlStart = wrapFrom + trimmed.length + 3;
  view.dispatch({
    changes: { from: wrapFrom, to: wrapTo, insert },
    selection: { anchor: urlStart, head: urlStart + 3 },
  });
  return true;
}

function toggleHeading(view, level) {
  const sel = view.state.selection.main;
  const line = view.state.doc.lineAt(sel.head);
  const match = line.text.match(/^(#{1,6})\s/);
  const from = line.from;
  let to = from;
  let insert = "";
  if (level != null) {
    to = match ? from + match[0].length : from;
    insert = "#".repeat(level) + " ";
  } else if (!match) {
    insert = "# ";
  } else if (match[1].length < 3) {
    to = from + match[0].length;
    insert = "#".repeat(match[1].length + 1) + " ";
  } else {
    to = from + match[0].length;
  }
  view.dispatch({ changes: { from, to, insert } });
  return true;
}

function setLinePrefix(view, prefix) {
  const sel = view.state.selection.main;
  const line = view.state.doc.lineAt(sel.head);
  const match = line.text.match(/^(#{1,6}\s|>\s|- \[[ x]\]\s|- |\* |\d+\.\s)/);
  const from = line.from;
  const to = match ? from + match[0].length : from;
  view.dispatch({
    changes: { from, to, insert: prefix },
    selection: { anchor: from + prefix.length },
  });
  return true;
}

function insertAtCursor(view, template, cursorOffset = 0, selectRange) {
  const pos = view.state.selection.main.head;
  const changes = { from: pos, insert: template };
  let selection;
  if (selectRange) {
    selection = {
      anchor: pos + selectRange[0],
      head: pos + selectRange[1],
    };
  } else {
    selection = { anchor: pos + template.length - cursorOffset };
  }
  view.dispatch({ changes, selection });
  return true;
}

const TOOLBAR_ACTIONS = [
  { name: "bold", label: "Bold", icon: "bold", apply: (v) => wrapSelection(v, "**", "**") },
  { name: "italic", label: "Italic", icon: "italic", apply: (v) => wrapSelection(v, "*", "*") },
  { name: "strikethrough", label: "Strikethrough", icon: "strikethrough", apply: (v) => wrapSelection(v, "~~", "~~") },
  { name: "code", label: "Code", icon: "code", apply: (v) => wrapSelection(v, "`", "`") },
  { name: "link", label: "Link", icon: "link", apply: applyLink },
  { name: "heading", label: "Heading", icon: "heading", apply: (v) => toggleHeading(v) },
];

function buildToolbarDOM(view) {
  const dom = document.createElement("div");
  dom.className = "cm-sel-toolbar";
  for (const action of TOOLBAR_ACTIONS) {
    const btn = document.createElement("button");
    btn.className = "cm-sel-toolbar-btn";
    btn.title = action.label;
    btn.appendChild(svgIcon(action.icon));
    btn.addEventListener("mousedown", (e) => e.preventDefault());
    btn.addEventListener("click", () => {
      action.apply(view);
      view.focus();
    });
    dom.appendChild(btn);
  }
  return dom;
}

const toolbarField = StateField.define({
  create() {
    return null;
  },
  update(value, tr) {
    const sel = tr.state.selection.main;
    if (sel.empty) return null;
    return {
      pos: sel.from,
      above: true,
      strictSide: true,
      create(view) {
        return { dom: buildToolbarDOM(view) };
      },
    };
  },
  provide(f) {
    return showTooltip.from(f);
  },
});

const toolbarKeymap = keymap.of([
  { key: "Mod-b", run: (v) => wrapSelection(v, "**", "**") },
  { key: "Mod-i", run: (v) => wrapSelection(v, "*", "*") },
  { key: "Mod-Shift-s", run: (v) => wrapSelection(v, "~~", "~~") },
  { key: "Mod-e", run: (v) => wrapSelection(v, "`", "`") },
  { key: "Mod-k", run: applyLink },
]);

const toolbarTheme = EditorView.theme({
  ".cm-tooltip.cm-sel-toolbar": {
    display: "flex",
    gap: "2px",
    padding: "4px",
    backgroundColor: "var(--color-surface-darker, #1a1a1a)",
    border: "1px solid var(--border-color, #444)",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },
  ".cm-sel-toolbar-btn": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    padding: "0",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "transparent",
    color: "var(--color-text-default, #ebdbb2)",
    cursor: "pointer",
  },
  ".cm-sel-toolbar-btn:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const SLASH_ITEMS = [
  { label: "Table", detail: "Insert a table", template: "| Header 1 | Header 2 |\n|---|---|\n|  |  |\n", cursorOffset: 5 },
  { label: "Code Block", detail: "Insert a code block", template: "```\n\n```\n", cursorOffset: 5 },
  { label: "Horizontal Rule", detail: "Insert a divider", template: "---\n", cursorOffset: 0 },
  { label: "Blockquote", detail: "Insert a quote", template: "> ", cursorOffset: 0 },
  { label: "Bullet List", detail: "Insert a bullet list", template: "- ", cursorOffset: 0 },
  { label: "Numbered List", detail: "Insert a numbered list", template: "1. ", cursorOffset: 0 },
  { label: "Checklist", detail: "Insert a checklist", template: "- [ ] ", cursorOffset: 0 },
  { label: "Image", detail: "Insert an image", template: "![alt](url)", selectFrom: 7, selectTo: 10 },
];

function isInsideCode(state, pos) {
  let inside = false;
  syntaxTree(state).iterate({
    from: pos,
    to: pos,
    enter(node) {
      if (node.name === "FencedCode" || node.name === "CodeBlock" || node.name === "InlineCode") {
        inside = true;
        return false;
      }
    },
  });
  return inside;
}

function slashSource(context) {
  if (isInsideCode(context.state, context.pos)) return null;
  const line = context.state.doc.lineAt(context.pos);
  const textBefore = line.text.slice(0, context.pos - line.from);
  const match = textBefore.match(/(^|\s)\/(\w*)$/);
  if (!match) return null;
  const from = context.pos - match[2].length - 1;
  return {
    from,
    options: SLASH_ITEMS.map((item) => ({
      label: item.label,
      detail: item.detail,
      type: "keyword",
      apply: (view, _completion, from, to) => {
        const insert = item.template;
        const base = from;
        let selection;
        if (item.selectFrom != null) {
          selection = { anchor: base + item.selectFrom, head: base + item.selectTo };
        } else {
          selection = { anchor: base + insert.length - item.cursorOffset };
        }
        view.dispatch({ changes: { from, to, insert }, selection });
      },
    })),
    filter: true,
  };
}

const slashTrigger = EditorView.inputHandler.of((view, from, _to, text) => {
  if (text === "/") {
    const line = view.state.doc.lineAt(from);
    const before = line.text.slice(0, from - line.from);
    if (/^$|\s$/.test(before) && !isInsideCode(view.state, from)) {
      setTimeout(() => startCompletion(view), 0);
    }
  }
  return false;
});

const slashTheme = EditorView.theme({
  ".cm-tooltip-autocomplete": {
    backgroundColor: "var(--color-surface-darker, #1a1a1a) !important",
    border: "1px solid var(--border-color, #444) !important",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    overflow: "hidden",
  },
  ".cm-tooltip-autocomplete ul": { fontFamily: "inherit", fontSize: "0.875rem" },
  ".cm-tooltip-autocomplete ul li": { padding: "6px 12px", color: "var(--color-text-default, #ebdbb2)" },
  ".cm-tooltip-autocomplete ul li[aria-selected]": { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "var(--color-text-default, #ebdbb2)" },
  ".cm-completionDetail": { color: "var(--color-text-muted, #928374)", fontStyle: "normal !important", marginLeft: "8px" },
  ".cm-completionIcon": { display: "none" },
});

function buildContextMenuItems(view) {
  const hasSelection = !view.state.selection.main.empty;
  const act = (fn) => () => { fn(); view.focus(); };
  return [
    { label: "Add link", icon: "link", keybinding: "Ctrl+K", group: "1-link", action: act(() => {
      if (hasSelection) applyLink(view);
      else insertAtCursor(view, "[text](url)", 0, [1, 5]);
    })},
    { label: "Format", icon: "type", group: "2-actions", children: [
      { label: "Bold", icon: "bold", keybinding: "Ctrl+B", action: act(() => wrapSelection(view, "**", "**")) },
      { label: "Italic", icon: "italic", keybinding: "Ctrl+I", action: act(() => wrapSelection(view, "*", "*")) },
      { label: "Strikethrough", icon: "strikethrough", keybinding: "Ctrl+Shift+S", action: act(() => wrapSelection(view, "~~", "~~")) },
      { label: "Code", icon: "code", keybinding: "Ctrl+E", action: act(() => wrapSelection(view, "`", "`")) },
    ]},
    { label: "Paragraph", icon: "pilcrow", group: "2-actions", children: [
      { label: "Heading 1", icon: "heading-1", action: act(() => toggleHeading(view, 1)) },
      { label: "Heading 2", icon: "heading-2", action: act(() => toggleHeading(view, 2)) },
      { label: "Heading 3", icon: "heading-3", action: act(() => toggleHeading(view, 3)) },
      { separator: true },
      { label: "Bullet List", icon: "list", action: act(() => setLinePrefix(view, "- ")) },
      { label: "Numbered List", icon: "list-ordered", action: act(() => setLinePrefix(view, "1. ")) },
      { label: "Checklist", icon: "square-check", action: act(() => setLinePrefix(view, "- [ ] ")) },
      { separator: true },
      { label: "Blockquote", icon: "quote", action: act(() => setLinePrefix(view, "> ")) },
    ]},
    { label: "Insert", icon: "plus", group: "2-actions", children: [
      { label: "Table", icon: "table", action: act(() => insertAtCursor(view, "| Header 1 | Header 2 |\n|---|---|\n|  |  |\n", 5)) },
      { label: "Code Block", icon: "code", action: act(() => insertAtCursor(view, "```\n\n```\n", 5)) },
      { label: "Horizontal Rule", icon: "minus", action: act(() => insertAtCursor(view, "---\n")) },
      { label: "Image", icon: "image", action: act(() => insertAtCursor(view, "![alt](url)", 0, [7, 10])) },
    ]},
    { label: "Cut", icon: "scissors", keybinding: "Ctrl+X", group: "3-clipboard", action: act(() => document.execCommand("cut")) },
    { label: "Copy", icon: "copy", keybinding: "Ctrl+C", group: "3-clipboard", action: act(() => document.execCommand("copy")) },
    { label: "Paste", icon: "clipboard-paste", keybinding: "Ctrl+V", group: "3-clipboard", action: async () => {
      try {
        const text = await navigator.clipboard.readText();
        const sel = view.state.selection.main;
        view.dispatch({ changes: { from: sel.from, to: sel.to, insert: text }, selection: { anchor: sel.from + text.length } });
      } catch (_e) { document.execCommand("paste"); }
      view.focus();
    }},
    { label: "Select All", icon: "text-select", keybinding: "Ctrl+A", group: "3-clipboard", action: act(() => {
      view.dispatch({ selection: { anchor: 0, head: view.state.doc.length } });
    })},
  ];
}

const contextMenuHandler = EditorView.domEventHandlers({
  contextmenu: (event, view) => {
    event.preventDefault();
    event.stopPropagation();
    const existing = document.querySelector("ide-context-menu");
    if (existing) existing.remove();
    const menu = document.createElement("ide-context-menu");
    menu.items = buildContextMenuItems(view);
    menu.position = { x: event.clientX, y: event.clientY };
    menu.target = view;
    document.body.appendChild(menu);
    return true;
  },
});

export function createSelectionToolbar() {
  return [toolbarTheme, toolbarField, toolbarKeymap];
}

export function createSlashCommands() {
  return [
    slashTheme,
    slashTrigger,
    autocompletion({
      override: [slashSource],
      activateOnTyping: true,
      icons: false,
    }),
  ];
}

export function createContextMenu() {
  return [contextMenuHandler];
}

export function createToolbar() {
  return [...createSelectionToolbar(), ...createSlashCommands(), ...createContextMenu()];
}
