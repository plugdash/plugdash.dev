/**
 * Plugin catalog data - drives /plugins, /plugins/[slug], home grid, /llms.txt.
 *
 * This file is the working source of truth during development. It is also the
 * seed that gets loaded into the EmDash `plugins` collection via seed/plugins.json.
 * Once EmDash is seeded on deploy, pages should migrate to reading from the
 * live collection via `getEmDashCollection("plugins")` per spec section
 * "agent surfaces" - at which point this file can be deleted.
 *
 * Copy fields (tagline, headline, sub, homeCardCopy, pairsNote, demoCaption,
 * setupNote) are edited directly in this file. Mirror any change into
 * seed/seed.json's matching plugin entry so a fresh seed stays in sync.
 */

export type PluginStatus = "alpha" | "beta";

export interface Plugin {
  slug: string;
  name: string;
  npmPackage: string;
  tagline: string;
  headline: string;
  sub: string;
  homeCardCopy: string;
  githubUrl: string;
  capabilities: string;
  hooks: string;
  status: PluginStatus;
  installCommand: string;
  configExample: string;
  wordpressEquivalent: string;
  companionComponent: string;
  pairs: string[];
  pairsNote?: string;
  demoCaption: string;
  setupNote: string;
  props?: Array<{ name: string; type: string; default?: string; description: string }>;
  cssTokens?: Array<{ name: string; description: string }>;
  componentImport?: string;
  componentUsage?: string;
  /** Plugin-populated metadata from the emdash collection entry */
  metadata?: Record<string, unknown>;
}

export const plugins: Plugin[] = [
  {
    slug: "readtime",
    name: "readtime",
    npmPackage: "@plugdash/readtime",
    tagline: "The estimate readers check before they commit to a paragraph.",
    headline: "Tell them what they're signing up for before they scroll.",
    sub: "readtime counts words at publish time and writes the estimate straight into your post's metadata. No client-side JavaScript, no recalculating on every page view. Four display variants, three sizes, every value bound to a CSS token.",
    homeCardCopy: "Readers check the estimate before they read the paragraph.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/readtime",
    capabilities: "read:content, write:metadata",
    hooks: "content:afterSave",
    status: "beta",
    installCommand: "npm install @plugdash/readtime",
    configExample:
      'import readtime from "@plugdash/readtime"\n// in emdash plugins array:\nreadtime({ collections: ["blog"] })',
    wordpressEquivalent: "Reading Time WP",
    companionComponent: "ReadingTime.astro",
    pairs: ["heartpost", "sharepost"],
    pairsNote:
      "someone who finishes a post is your best candidate to share it or heart it. readtime runs before either of those decisions gets made.",
    demoCaption: "5 min read - 1,240 words, computed once at publish, served instantly.",
    setupNote:
      "Every published post gets a reading time automatically. Older posts pick it up the next time you hit publish.",
    componentImport: 'import ReadingTime from "@plugdash/readtime/ReadingTime.astro"',
    componentUsage: "<ReadingTime post={post} />",
    props: [
      { name: "post", type: "EmDash content item", description: "Required - the post" },
      { name: "variant", type: '"badge" | "pill" | "inline" | "minimal"', default: '"badge"', description: "Visual style" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size scale" },
      { name: "label", type: "string", default: '"min read"', description: "Text after the number" },
      { name: "showWords", type: "boolean", default: "false", description: "Also show word count" },
    ],
    cssTokens: [
      { name: "--plugdash-rt-color", description: "Text colour" },
      { name: "--plugdash-rt-size", description: "Font size" },
      { name: "--plugdash-rt-bg", description: "Background (badge/pill only)" },
      { name: "--plugdash-rt-border", description: "Border colour (badge only)" },
      { name: "--plugdash-rt-radius", description: "Border radius (badge/pill)" },
      { name: "--plugdash-rt-padding", description: "Padding (badge/pill)" },
    ],
  },
  {
    slug: "callout",
    name: "callout",
    npmPackage: "@plugdash/callout",
    tagline: "The block every technical writer reaches for, and most CMSes never ship.",
    headline: "A block worth reading, not skimming past.",
    sub: "callout registers a native Portable Text block for info, warning, tip, and danger. It shows up in the EmDash editor like any other block, and Callout.astro ships with defaults that look designed, not bolted on. Every visual value is a CSS custom property.",
    homeCardCopy: "Info, warning, tip, danger - four callouts, one native editor block.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/callout",
    capabilities: "blocks:register",
    hooks: "editor:registerBlock",
    status: "beta",
    installCommand: "npm install @plugdash/callout",
    configExample: 'import callout from "@plugdash/callout"\n// in emdash plugins array:\ncallout()',
    wordpressEquivalent: "",
    companionComponent: "Callout.astro",
    pairs: ["codeblock", "tocgen"],
    pairsNote:
      "callouts and code blocks are the two things a technical writer reaches for first.",
    demoCaption: "Four variants, zero configuration.",
    setupNote:
      "The callout block shows up in your EmDash editor immediately. Wire the component into your layout once, and every callout in every post renders correctly from then on.",
    componentImport: 'import Callout from "@plugdash/callout/Callout.astro"',
    componentUsage: '<Callout variant="info" title="Heads up">...</Callout>',
    props: [
      { name: "variant", type: '"info" | "warning" | "tip" | "danger"', default: '"info"', description: "Visual tone" },
      { name: "title", type: "string", description: "Optional heading" },
    ],
    cssTokens: [
      { name: "--plugdash-callout-radius", description: "Border radius" },
      { name: "--plugdash-callout-padding", description: "Inner padding" },
      { name: "--plugdash-callout-border-width", description: "Border thickness" },
    ],
  },
  {
    slug: "sharepost",
    name: "sharepost",
    npmPackage: "@plugdash/sharepost",
    tagline: "If a reader wants to share your post, that should take one click, not a workaround.",
    headline: "Make sharing the obvious next move, not a detour.",
    sub: "sharepost generates correct share URLs for X, LinkedIn, WhatsApp, Bluesky, and email on every publish, then renders them as circular icon buttons. No JavaScript SDKs, no tracking pixels, no 200KB of vendor script for five links.",
    homeCardCopy: "Correct share URLs for five platforms, computed once, at publish.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/sharepost",
    capabilities: "read:content, write:metadata",
    hooks: "content:afterSave",
    status: "beta",
    installCommand: "npm install @plugdash/sharepost",
    configExample: 'import sharepost from "@plugdash/sharepost"\n// in emdash plugins array:\nsharepost({ via: "abhinavs" })',
    wordpressEquivalent: "AddToAny",
    companionComponent: "ShareButtons.astro",
    pairs: ["heartpost", "readtime"],
    pairsNote:
      "a share and a heart are different signals from different readers. Run both, and you stop guessing which one you're missing.",
    demoCaption: "Circular by default, no configuration, correct in both themes.",
    setupNote:
      "Every published post has share URLs the moment it goes live. Add the component once, and every future post inherits it.",
    componentImport: 'import ShareButtons from "@plugdash/sharepost/ShareButtons.astro"',
    componentUsage: "<ShareButtons post={post} />",
    props: [
      { name: "post", type: "EmDash content item", description: "Required" },
      { name: "variant", type: '"circle" | "pill" | "inline" | "minimal"', default: '"circle"', description: "Visual style" },
      { name: "platforms", type: "array", default: '["twitter","linkedin","bluesky"]', description: "Which networks to show" },
    ],
    cssTokens: [
      { name: "--plugdash-share-gap", description: "Space between buttons" },
      { name: "--plugdash-share-padding", description: "Button padding" },
      { name: "--plugdash-share-radius", description: "Button radius" },
    ],
  },
  {
    slug: "heartpost",
    name: "heartpost",
    npmPackage: "@plugdash/heartpost",
    tagline: "The lightest thing a reader can do to tell you they liked it.",
    headline: "One click. No account. Counted anyway.",
    sub: "heartpost stores a heart count in Cloudflare KV and updates it with an optimistic client-side increment, so the number moves before the network round-trip finishes. HeartButton.astro ships in four variants, fully restyled through CSS custom properties.",
    homeCardCopy: "One click, no account, counted in KV.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/heartpost",
    capabilities: "kv:read, kv:write",
    hooks: "api:register",
    status: "alpha",
    installCommand: "npm install @plugdash/heartpost",
    configExample: 'import heartpost from "@plugdash/heartpost"\n// in emdash plugins array:\nheartpost()',
    wordpressEquivalent: "WP ULike",
    companionComponent: "HeartButton.astro",
    pairs: ["sharepost", "readtime"],
    pairsNote:
      "a heart is a quiet yes. A share is a loud one. Run both and you can tell which post readers loved versus which one they wanted other people to see.",
    demoCaption: "Click. Count moves instantly. KV confirms behind it.",
    setupNote:
      "Every post gets a heart count the moment you add the component. No account system to stand up, no cookies to manage.",
    componentImport: 'import HeartButton from "@plugdash/heartpost/HeartButton.astro"',
    componentUsage: "<HeartButton post={post} />",
    props: [
      { name: "post", type: "EmDash content item", description: "Required" },
      { name: "variant", type: '"circle" | "pill" | "inline"', default: '"circle"', description: "Visual style" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size scale" },
    ],
    cssTokens: [
      { name: "--plugdash-heart-color", description: "Active colour" },
      { name: "--plugdash-heart-size", description: "Icon size" },
    ],
  },
  {
    slug: "shortlink",
    name: "shortlink",
    npmPackage: "@plugdash/shortlink",
    tagline: "A clean URL for every post, generated the moment you publish.",
    headline: "The link you'd actually want to paste in a tweet.",
    sub: "shortlink generates a short URL for every published post and stores it in Cloudflare KV. CopyLink.astro ships in three variants - circle, pill, inline - with a green check on copy that resets itself after two seconds.",
    homeCardCopy: "Copy the link in one click. No dashboard, no separate service.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/shortlink",
    capabilities: "kv:read, kv:write",
    hooks: "content:afterSave, api:register",
    status: "alpha",
    installCommand: "npm install @plugdash/shortlink",
    configExample: 'import shortlink from "@plugdash/shortlink"\n// in emdash plugins array:\nshortlink({ autoCreate: true })',
    wordpressEquivalent: "Pretty Links",
    companionComponent: "CopyLink.astro",
    pairs: ["sharepost", "heartpost"],
    pairsNote:
      "shortlink, sharepost, and heartpost are the three things a reader can do without leaving the page. Most posts ship all three.",
    demoCaption: "Click to copy. Green check confirms it. Gone in two seconds.",
    setupNote:
      "Every published post gets a short URL automatically, no separate step. The component handles the clipboard copy.",
    componentImport: 'import CopyLink from "@plugdash/shortlink/CopyLink.astro"',
    componentUsage: "<CopyLink post={post} />",
    props: [
      { name: "post", type: "EmDash content item", description: "Required" },
      { name: "variant", type: '"circle" | "pill" | "inline"', default: '"circle"', description: "Visual style" },
    ],
    cssTokens: [
      { name: "--plugdash-copy-color", description: "Icon colour" },
      { name: "--plugdash-copy-size", description: "Button size" },
    ],
  },
  {
    slug: "tocgen",
    name: "tocgen",
    npmPackage: "@plugdash/tocgen",
    tagline: "A 3,000-word post without a table of contents is a post nobody finishes.",
    headline: "Show readers the shape of the post before they commit to it.",
    sub: "tocgen parses headings out of your Portable Text content at publish time and writes a nested navigation tree into the post's metadata. TableOfContents.astro renders it with a sticky sidebar variant that tracks scroll position. Posts under the heading threshold are skipped automatically.",
    homeCardCopy: "A table of contents, generated from your headings, skipped on short posts.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/tocgen",
    capabilities: "read:content, write:metadata",
    hooks: "content:afterSave",
    status: "beta",
    installCommand: "npm install @plugdash/tocgen",
    configExample: 'import tocgen from "@plugdash/tocgen"\n// in emdash plugins array:\ntocgen({ minHeadings: 3 })',
    wordpressEquivalent: "Table of Contents Plus",
    companionComponent: "TableOfContents.astro",
    pairs: ["readtime", "callout"],
    pairsNote:
      "readtime tells a reader how long the post is. tocgen shows them the shape of it. Together they answer the two questions a reader asks before committing: how long, and about what.",
    demoCaption: "Sticky on desktop, nested h2/h3, active section highlighted as you scroll.",
    setupNote:
      "Every post with three or more headings gets a table of contents automatically. Shorter posts are skipped - nothing to configure.",
    componentImport: 'import TableOfContents from "@plugdash/tocgen/TableOfContents.astro"',
    componentUsage: "<TableOfContents post={post} sticky />",
    props: [
      { name: "post", type: "EmDash content item", description: "Required" },
      { name: "sticky", type: "boolean", default: "false", description: "Stick to viewport while scrolling" },
      { name: "maxDepth", type: "2 | 3 | 4", default: "3", description: "Deepest heading level to include" },
    ],
    cssTokens: [
      { name: "--plugdash-toc-size", description: "Font size" },
      { name: "--plugdash-toc-indent", description: "Nested indent" },
      { name: "--plugdash-toc-hover", description: "Hover colour" },
    ],
  },
  {
    slug: "engage",
    name: "engage",
    npmPackage: "@plugdash/engage",
    tagline: "heartpost, sharepost, and shortlink, wired into one component.",
    headline: "Three plugins. One import. One row underneath every post.",
    sub: "engage composes heartpost, sharepost, and shortlink into a single EngagementBar.astro. Install the three underlying plugins, then import the bundle instead of stitching the components together yourself.",
    homeCardCopy: "One row under every post: heart, share, copy link.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/engage",
    capabilities: "none - convenience package only",
    hooks: "none - convenience package only",
    status: "beta",
    installCommand: "npm install @plugdash/engage",
    configExample:
      "// engage is not registered in astro.config.mjs.\n// Register heartpost, sharepost, and shortlink instead,\n// then import EngagementBar.astro directly:",
    wordpressEquivalent: "",
    companionComponent: "EngagementBar.astro",
    pairs: ["heartpost", "sharepost", "shortlink"],
    pairsNote:
      "engage wraps heartpost, sharepost, and shortlink. Install all three plugins, then use engage's component instead of assembling your own layout.",
    demoCaption: "Heart, share buttons, and copy link, rendered from one component.",
    setupNote:
      "engage is a bundle, not a plugin of its own. Register heartpost, sharepost, and shortlink, then import EngagementBar.astro from @plugdash/engage into your Post layout.",
    componentImport: 'import EngagementBar from "@plugdash/engage/EngagementBar.astro"',
    componentUsage: "<EngagementBar post={post} />",
    props: [
      { name: "post", type: "EmDash content item", description: "Required" },
      { name: "showHeart", type: "boolean", default: "true", description: "Render heart button" },
      { name: "showShare", type: "boolean", default: "true", description: "Render share buttons" },
      { name: "showCopy", type: "boolean", default: "true", description: "Render copy link" },
      { name: "variant", type: '"circle" | "pill" | "ghost"', default: '"circle"', description: "Visual style" },
    ],
    cssTokens: [
      { name: "--plugdash-engage-gap", description: "Space between actions" },
      { name: "--plugdash-engage-size", description: "Button size" },
      { name: "--plugdash-engage-radius", description: "Button radius" },
    ],
  },
  {
    slug: "autobuild",
    name: "autobuild",
    npmPackage: "@plugdash/autobuild",
    tagline: "Hit publish in the admin. The deploy is already running.",
    headline: "Publish in the admin. Live in under a minute.",
    sub: "autobuild fires your Cloudflare Pages, Netlify, or Vercel build hook on every publish - no git push, no manual redeploy. It debounces for five seconds, so a batch of edits triggers one deploy instead of ten.",
    homeCardCopy: "The plugin that makes the admin the thing that ships the site.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/autobuild",
    capabilities: "read:content, network:fetch",
    hooks: "content:afterSave, content:afterDelete",
    status: "beta",
    installCommand: "npm install @plugdash/autobuild",
    configExample:
      'import autobuild from "@plugdash/autobuild"\n// in emdash plugins array:\nautobuild({\n  hookUrl: import.meta.env.CF_PAGES_DEPLOY_HOOK,\n  allowedHosts: ["api.cloudflare.com"],\n})',
    wordpressEquivalent: "",
    companionComponent: "",
    pairs: ["readtime", "tocgen"],
    pairsNote:
      "readtime and tocgen write metadata on publish. autobuild is what gets that metadata onto the live site within a minute, instead of at the next scheduled build.",
    demoCaption: "Publish. Build hook fires. Deploy starts. Four lines of config.",
    setupNote:
      "Paste your build hook URL from Cloudflare Pages, Netlify, or Vercel as an env var. Every publish rebuilds the site after that, debounced so a burst of edits fires one deploy, not ten.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "method", type: '"POST" | "GET"', default: '"POST"', description: "HTTP method for the hook" },
      { name: "collections", type: "string[]", description: "Which collections trigger rebuilds" },
      { name: "statuses", type: "string[]", default: '["published"]', description: "Trigger only on these statuses" },
      { name: "debounceMs", type: "number", default: "5000", description: "Debounce window for rapid publishes" },
      { name: "body", type: "string | object", description: "Optional request body" },
      { name: "headers", type: "object", description: "Optional extra headers" },
    ],
  },
];

export function getPlugin(slug: string): Plugin | undefined {
  return plugins.find((p) => p.slug === slug);
}

// Display order: primary sort by status (beta before alpha), then by
// editorial importance within each tier. Plugins that show on every
// post rank above bundles and infra.
const importanceOrder = [
  "readtime",
  "sharepost",
  "tocgen",
  "callout",
  "engage",
  "autobuild",
  "heartpost",
  "shortlink",
];

export function sortedPlugins(): Plugin[] {
  const statusRank = (p: Plugin) => (p.status === "beta" ? 0 : 1);
  const importanceRank = (p: Plugin) => {
    const i = importanceOrder.indexOf(p.slug);
    return i === -1 ? importanceOrder.length : i;
  };
  return [...plugins].sort((a, b) => {
    const r = statusRank(a) - statusRank(b);
    if (r !== 0) return r;
    return importanceRank(a) - importanceRank(b);
  });
}
