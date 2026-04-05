export interface DocEntry {
  slug: string;
  title: string;
  href: string;
  section: "on-ramp" | "plugins";
}

export const docs: DocEntry[] = [
  { slug: "getting-started", title: "Getting started", href: "/docs/getting-started", section: "on-ramp" },
  { slug: "what-is-emdash", title: "What is EmDash", href: "/docs/what-is-emdash", section: "on-ramp" },
  { slug: "installing-plugins", title: "Installing plugins", href: "/docs/installing-plugins", section: "on-ramp" },
  { slug: "readtime", title: "readtime", href: "/docs/readtime", section: "plugins" },
  { slug: "tocgen", title: "tocgen", href: "/docs/tocgen", section: "plugins" },
  { slug: "callout", title: "callout", href: "/docs/callout", section: "plugins" },
  { slug: "sharepost", title: "sharepost", href: "/docs/sharepost", section: "plugins" },
  { slug: "heartpost", title: "heartpost", href: "/docs/heartpost", section: "plugins" },
  { slug: "shortlink", title: "shortlink", href: "/docs/shortlink", section: "plugins" },
  { slug: "engage", title: "engage", href: "/docs/engage", section: "plugins" },
  { slug: "autobuild", title: "autobuild", href: "/docs/autobuild", section: "plugins" },
];

export function docsBySection(): Record<string, DocEntry[]> {
  return {
    "on-ramp": docs.filter((d) => d.section === "on-ramp"),
    plugins: docs.filter((d) => d.section === "plugins"),
  };
}
