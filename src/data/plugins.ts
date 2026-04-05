/**
 * Plugin catalog data - drives /plugins, /plugins/[slug], home grid, /llms.txt.
 *
 * This file is the working source of truth during development. It is also the
 * seed that gets loaded into the EmDash `plugins` collection via seed/plugins.json.
 * Once EmDash is seeded on deploy, pages should migrate to reading from the
 * live collection via `getEmDashCollection("plugins")` per spec section
 * "agent surfaces" - at which point this file can be deleted.
 *
 * Copy for name, tagline, headline, sub, pairsNote, demoCaption, setupNote
 * comes from plugdash-research/conversations/plugdash-launch-copy.md - do not
 * rewrite.
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
}

export const plugins: Plugin[] = [
  {
    slug: "readtime",
    name: "readtime",
    npmPackage: "@plugdash/readtime",
    tagline: "Readers decide in three seconds. Give them a reason to stay.",
    headline: "Tell readers what they're committing to.",
    sub: "Estimates reading time from your post's word count and shows it wherever you want. Works on every published post, automatically. Nothing to configure to ship something good.",
    homeCardCopy: "Readers decide in three seconds. Give them a reason to stay.",
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
      "readers who finish a post are your most likely to share or heart it. Show them the path.",
    demoCaption: "5 min read - 1,240 words, calculated at publish, shown instantly.",
    setupNote:
      "After this, every published post shows reading time. If a post doesn't have it yet, publish it again - readtime runs on every publish.",
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
    tagline: "The block every technical writer reaches for that almost no theme ships.",
    headline: "The block your readers stop and read.",
    sub: "Adds a Portable Text block type for info, warning, tip, and danger callouts. Shows up in the EmDash editor as a native block. Ships Callout.astro with default styles that look intentional - not like an afterthought. CSS custom properties for every visual value.",
    homeCardCopy: "The block every technical writer reaches for that almost no theme ships.",
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
      "callouts and code blocks are the two blocks every technical writer reaches for.",
    demoCaption: "info, warning, tip, danger - all four, out of the box.",
    setupNote:
      "After this, the callout block appears in your EmDash editor. Add the component to your layout once - every post that uses callouts renders them correctly.",
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
    tagline: "Readers who want to share your work shouldn't have to work for it.",
    headline: "Make sharing the obvious next step.",
    sub: "Generates correct share URLs for Twitter/X, LinkedIn, WhatsApp, Bluesky, and email on every publish. Renders as circular icon buttons - no JavaScript libraries, no tracking scripts, no 200KB payloads. Four variants. Looks right on day one.",
    homeCardCopy: "Readers who want to share your work shouldn't have to work for it.",
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
      "share and heart are two different signals. Most readers do one or the other. Give them both.",
    demoCaption: "Circular by default. No configuration. Works in dark and light themes.",
    setupNote:
      "After this, every published post has share URLs ready. Add the component once - every new post picks it up automatically.",
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
    tagline: "The simplest signal readers can send. Show them you counted it.",
    headline: "The lightest form of applause.",
    sub: "A heart counter backed by Cloudflare KV. One click, one count, no account needed. Ships HeartButton.astro with four variants and full CSS customisation.",
    homeCardCopy: "The lightest form of applause. One click, no account.",
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
      "a heart and a share are different signals. Give readers both.",
    demoCaption: "One click. Optimistic update. KV-backed counter.",
    setupNote:
      "After this, every post can show a heart count. The count is stored in KV and updates without a page refresh.",
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
    tagline: "A short URL for every post, ready to paste anywhere.",
    headline: "Every post, one clean URL to copy.",
    sub: "Auto-generates short URLs for published posts, stored in Cloudflare KV. Ships CopyLink.astro with three variants - circle, pill, inline. Green check on copy, resets in two seconds.",
    homeCardCopy: "Every post deserves a clean URL. Copy and share in one tap.",
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
      "copy link sits naturally alongside share and heart. Most readers use one of the three.",
    demoCaption: "Click to copy. Green check. Resets after two seconds.",
    setupNote:
      "After this, each published post gets a short URL automatically. The component copies it to the clipboard on click.",
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
    tagline: "Long posts deserve navigation. Your readers will find what they came for.",
    headline: "Long posts shouldn't make readers work to find what they need.",
    sub: "Parses headings from your Portable Text content and writes a nested navigation structure on every publish. Ships TableOfContents.astro with a sticky sidebar variant that follows readers as they scroll. Works out of the box. Skips short posts automatically.",
    homeCardCopy: "Long posts deserve navigation. Your readers will find what they came for.",
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
      "readers who can see the structure and the time commitment are more likely to start.",
    demoCaption: "Sticky sidebar on desktop. Nested h2 and h3. Active state as you scroll.",
    setupNote:
      "After this, every post with three or more headings gets a table of contents. Short posts are skipped - you don't need to configure the threshold.",
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
    tagline: "Heart, share, copy - the engagement bundle for EmDash.",
    headline: "The engagement bar your blog needed from day one.",
    sub: "A convenience bundle that composes heartpost, sharepost, and shortlink into one component. Drop EngagementBar.astro into your Post layout and readers get all three signals with one import.",
    homeCardCopy: "Heart, share, copy. One import, one bar, one well-considered default.",
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
      "engage wraps these three. Install all three, then use engage's component.",
    demoCaption: "Heart, share buttons, copy link - in one component.",
    setupNote:
      "engage is a bundle. Register heartpost, sharepost, and shortlink as plugins, then import EngagementBar.astro from @plugdash/engage in your Post layout.",
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
    tagline: "Publish in the admin. Live in 60 seconds.",
    headline: "Publish in the admin. Live in 60 seconds.",
    sub: "Fires your Cloudflare Pages, Netlify, or Vercel build hook on every publish. No git push. No manual redeploy. The admin becomes the thing that moves the site.",
    homeCardCopy: "The plugin that makes EmDash feel live.",
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
      "these write metadata on publish. autobuild makes sure the live site sees the new metadata within a minute.",
    demoCaption: "Publish, build hook fires, deploy kicks off, live. Four lines of config.",
    setupNote:
      "Get your build hook URL from Cloudflare Pages, Netlify, or Vercel. Paste it as an env var. After this, every publish rebuilds the site. Debounces 5 seconds so a batch of publishes triggers one deploy, not ten.",
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
