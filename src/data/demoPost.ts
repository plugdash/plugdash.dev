// Shared fixture post for live demos across the site. Shaped like EmDash's
// content items so companion components read from post.data.metadata.*

// Standard TOC structure for per-plugin doc pages. Pages with different
// headings should define their own entries.
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

// Builds a fixture post with a real message + URL so share buttons produce
// something worth sharing. Use buildDemoPost() when the demo should reflect
// a specific page title/URL; otherwise use the default `demoPost`.
export function buildDemoPost(opts: {
  id?: string;
  slug?: string;
  title?: string;
  url?: string;
  message?: string;
  heartCount?: number;
} = {}) {
  const id = opts.id ?? "the-plugdash-launch";
  const slug = opts.slug ?? id;
  const title = opts.title ?? "PlugDash - drop-in plugins for EmDash";
  const url = opts.url ?? "https://plugdash.dev";
  const message = opts.message ?? `${title} - ${url}`;
  const enc = encodeURIComponent;

  return {
    // Top-level system fields (HeartButton reads post.id, not post.data.id)
    id,
    status: "published",
    slug,
    data: {
      slug,
      title,
      metadata: {
        wordCount: 1240,
        readingTimeMinutes: 5,
        shareUrls: {
          twitter: `https://twitter.com/intent/tweet?text=${enc(message)}&url=${enc(url)}&via=abhinavs`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
          whatsapp: `https://wa.me/?text=${enc(message)}`,
          bluesky: `https://bsky.app/intent/compose?text=${enc(message)}`,
          email: `mailto:?subject=${enc(title)}&body=${enc(message)}`,
        },
        shortlink: { url },
        heartpost: { count: opts.heartCount ?? 42 },
        tocgen: {
          entries: [
            { id: "what-it-does", text: "What it does", level: 2, children: [] },
            { id: "install", text: "Install", level: 2, children: [] },
            { id: "register", text: "Register", level: 2, children: [] },
            { id: "add-the-component", text: "Add the component", level: 2, children: [] },
            { id: "props", text: "Props", level: 2, children: [] },
            { id: "customise", text: "Customise", level: 2, children: [] },
            { id: "for-agents", text: "For agents", level: 2, children: [] },
          ],
        },
      },
    },
  };
}

export const demoPost = buildDemoPost();
