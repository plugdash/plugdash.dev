// Standard TOC structure for per-plugin doc pages.
export const pluginDocToc = [
  { id: "what-it-does", text: "What it does", level: 2 as const, children: [] },
  { id: "install", text: "Install", level: 2 as const, children: [] },
  { id: "register", text: "Register", level: 2 as const, children: [] },
  { id: "add-the-component", text: "Add the component", level: 2 as const, children: [] },
  { id: "live-demo", text: "Live demo", level: 2 as const, children: [] },
  { id: "props", text: "Props", level: 2 as const, children: [] },
  { id: "css-tokens", text: "CSS custom properties", level: 2 as const, children: [] },
  { id: "for-agents", text: "For agents", level: 2 as const, children: [] },
];

// Extend the standard TOC with extra entries inserted before "for-agents".
export function extendPluginDocToc(...extras: Array<{ id: string; text: string }>) {
  const base = pluginDocToc.slice(0, -1);
  const last = pluginDocToc[pluginDocToc.length - 1];
  return [
    ...base,
    ...extras.map((e) => ({ ...e, level: 2 as const, children: [] as never[] })),
    last,
  ];
}
