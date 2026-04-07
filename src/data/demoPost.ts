// Fixture post builder for static pages (docs, plugin pages, homepage).
// When a collection entry has plugin-populated metadata, pass it via the
// `metadata` option and it takes priority over computed fallbacks.
//
// For real emdash content (blog posts), metadata comes from the collection
// entry directly - see resolveBlogPost() in lib/content.ts.

import { generateAllShareUrls } from "@plugdash/sharepost/utils";
import type { Platform } from "@plugdash/sharepost/utils";

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

const ALL_PLATFORMS: Platform[] = ["twitter", "linkedin", "whatsapp", "bluesky", "email"];

interface TocEntry {
  id: string;
  text: string;
  level: number;
  children: unknown[];
}

// Builds a fixture post for static pages. When the collection entry has
// plugin-populated metadata, pass it via `metadata` and those fields
// take priority over computed fallbacks.
export function buildDemoPost(opts: {
  id?: string;
  slug?: string;
  title?: string;
  url?: string;
  message?: string;
  heartCount?: number;
  readingTimeMinutes?: number;
  wordCount?: number;
  tocEntries?: TocEntry[];
  /** Plugin-populated metadata from the collection - overrides computed values */
  metadata?: Record<string, unknown>;
} = {}) {
  const id = opts.id ?? "the-plugdash-launch";
  const slug = opts.slug ?? id;
  const title = opts.title ?? "PlugDash - drop-in plugins for EmDash";
  const url = opts.url ?? "https://plugdash.dev";
  const meta = opts.metadata ?? {};

  return {
    id,
    status: "published",
    slug,
    data: {
      slug,
      title,
      metadata: {
        wordCount: meta.wordCount ?? opts.wordCount ?? 1240,
        readingTimeMinutes: meta.readingTimeMinutes ?? opts.readingTimeMinutes ?? 5,
        shareUrls: meta.shareUrls ?? generateAllShareUrls({
          title,
          url,
          platforms: ALL_PLATFORMS,
          via: "abhinavs",
        }),
        shortlink: meta.shortlink ?? { url },
        heartpost: meta.heartpost ?? { count: opts.heartCount ?? 42 },
        tocgen: meta.tocgen ?? {
          entries: opts.tocEntries ?? pluginDocToc,
        },
      },
    },
  };
}

export const demoPost = buildDemoPost();
