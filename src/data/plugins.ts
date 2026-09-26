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
  /** Plugin-populated metadata from the emdash collection entry */
  metadata?: Record<string, unknown>;
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
      'import { readtimePlugin } from "@plugdash/readtime"\n// in emdash plugins array:\nreadtimePlugin({ collections: ["blog"] })',
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
    configExample: 'import { calloutPlugin } from "@plugdash/callout"\n// in emdash plugins array:\ncalloutPlugin()',
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
    configExample: 'import { sharepostPlugin } from "@plugdash/sharepost"\n// in emdash plugins array:\nsharepostPlugin({ via: "abhinavs" })',
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
    configExample: 'import { heartpostPlugin } from "@plugdash/heartpost"\n// in emdash plugins array:\nheartpostPlugin()',
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
    configExample: 'import { shortlinkPlugin } from "@plugdash/shortlink"\n// in emdash plugins array:\nshortlinkPlugin({ autoCreate: true })',
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
    configExample: 'import { tocgenPlugin } from "@plugdash/tocgen"\n// in emdash plugins array:\ntocgenPlugin({ minHeadings: 3 })',
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
      'import { autobuildPlugin } from "@plugdash/autobuild"\n// in emdash plugins array:\nautobuildPlugin({\n  hookUrl: import.meta.env.CF_PAGES_DEPLOY_HOOK,\n  allowedHosts: ["api.cloudflare.com"],\n})',
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
  {
    slug: "codeblock",
    name: "codeblock",
    npmPackage: "@plugdash/codeblock",
    tagline: "Server-rendered syntax highlighting for EmDash code blocks. Zero client JavaScript.",
    headline: "Highlighted code, rendered on the server.",
    sub: "Runs the code blocks EmDash already stores through Shiki at render time, so the page ships coloured HTML with no client JavaScript and no runtime theme switching. Nothing is rewritten on save - change the theme and every existing post picks it up on the next render. Ships CodeBlock.astro, auto-wired into PortableText.",
    homeCardCopy: "Server-rendered syntax highlighting. Zero client JavaScript.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/codeblock",
    capabilities: "content:read",
    hooks: "none",
    status: "alpha",
    installCommand: "npm install @plugdash/codeblock",
    configExample:
      'import { codeblockPlugin } from "@plugdash/codeblock"\n// in emdash plugins array:\ncodeblockPlugin({ theme: "github-dark", lineNumbers: true })',
    wordpressEquivalent: "SyntaxHighlighter Evolved",
    companionComponent: "CodeBlock.astro",
    pairs: ["callout", "tocgen"],
    pairsNote:
      "callouts and code blocks are the two blocks every technical writer reaches for.",
    demoCaption: "TypeScript, Python, an unknown language - highlighted, plaintext fallback, no client JS either way.",
    setupNote:
      "After this, every existing code block in your posts renders highlighted - no editor changes, no migration. Auto-wired into PortableText, so there's nothing else to add unless you want direct control outside Portable Text.",
    componentImport: 'import CodeBlock from "@plugdash/codeblock/CodeBlock.astro"',
    componentUsage: '<CodeBlock code={source} language="typescript" />',
    props: [
      { name: "code", type: "string", description: "Source to highlight - required to render" },
      { name: "language", type: "string", description: "Language name. Unknown ones render as plaintext." },
      { name: "filename", type: "string", description: "Shown in the header bar" },
      { name: "theme", type: "string", default: '"github-dark"', description: "Shiki theme name" },
      { name: "lightTheme", type: "string", description: "Second theme for light mode" },
      { name: "lineNumbers", type: "boolean", default: "false", description: "Show the line number gutter" },
      { name: "class", type: "string", description: "Additional CSS class" },
      { name: "node", type: "object", description: "Block data from PortableText auto-wiring" },
    ],
    cssTokens: [
      { name: "--plugdash-codeblock-radius", description: "Border radius (default 6px)" },
      { name: "--plugdash-codeblock-padding", description: "Padding around the code (default 1rem)" },
      { name: "--plugdash-codeblock-size", description: "Font size (default 0.875rem)" },
      { name: "--plugdash-codeblock-line-height", description: "Line height (default 1.6)" },
      { name: "--plugdash-codeblock-font", description: "Font family (default monospace stack)" },
      { name: "--plugdash-codeblock-header-padding", description: "Header bar padding (default 0.5rem 1rem)" },
      { name: "--plugdash-codeblock-header-bg", description: "Header bar background (default #1a1a1a)" },
      { name: "--plugdash-codeblock-header-color", description: "Header bar text (default #9ca3af)" },
      { name: "--plugdash-codeblock-gutter-width", description: "Line number column width (default 2rem)" },
      { name: "--plugdash-codeblock-gutter-color", description: "Line number colour (default #6b7280)" },
    ],
  },
  {
    slug: "enrichkit",
    name: "enrichkit",
    npmPackage: "@plugdash/enrichkit",
    tagline: "AI enrichment for publishers who don't want to think about prompts.",
    headline: "One publish, one LLM call, five new fields.",
    sub: "Adds a summary, key topics, auto-tags, a reading level estimate, and a tweet draft to post metadata - one LLM call per publish, choose which enrichments you need. Skips anything under 100 words. Never fails a publish, whatever the API does.",
    homeCardCopy: "AI enrichment for publishers who don't want to think about prompts.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/enrichkit",
    capabilities: "content:read, content:write, network:request",
    hooks: "content:afterSave",
    status: "alpha",
    installCommand: "npm install @plugdash/enrichkit",
    configExample:
      'import { enrichkitPlugin } from "@plugdash/enrichkit"\n// in emdash plugins array:\nenrichkitPlugin({\n  provider: "anthropic",\n  apiKey: process.env.ANTHROPIC_API_KEY,\n})',
    wordpressEquivalent: "",
    companionComponent: "",
    pairs: ["sharepost", "autobuild"],
    pairsNote:
      "the tweetDraft enrichkit writes is exactly what an agent needs to post automatically - sharepost covers the human share path, autobuild gets the new metadata live within a minute.",
    demoCaption: "One LLM call on publish - summary, topics, tags, reading level, and a tweet draft.",
    setupNote:
      "Set an API key at build time or later from the admin. After that, every published post over 100 words gets enriched automatically - nothing to do per post.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "provider", type: '"anthropic" | "openai"', description: "Required - which LLM API to call" },
      { name: "apiKey", type: "string", description: "Required - API key for the chosen provider" },
      { name: "model", type: "string", default: "provider default", description: "claude-haiku-4-5 (Anthropic) or gpt-4o-mini (OpenAI)" },
      { name: "enrichments.summary", type: "boolean", default: "true", description: "2-3 sentence summary of the main argument" },
      { name: "enrichments.keyTopics", type: "boolean", default: "true", description: "3-5 main topics as short noun phrases" },
      { name: "enrichments.readingLevel", type: "boolean", default: "false", description: 'Estimated grade level (e.g. "Grade 8")' },
      { name: "enrichments.autoTags", type: "boolean", default: "true", description: "3-8 lowercase, hyphenated discovery tags" },
      { name: "enrichments.tweetDraft", type: "boolean", default: "true", description: "Tweet draft under 280 characters" },
    ],
    // no cssTokens - no component
  },
  {
    slug: "socialcard",
    name: "socialcard",
    npmPackage: "@plugdash/socialcard",
    tagline: "A good share preview is often the only reason someone clicks. Give every post one.",
    headline: "Every post gets a share image. Automatically.",
    sub: "Renders an Open Graph card for every published post - title, author, and date, in one of three templates. Uploads it and writes the URL to metadata.ogImage on publish. No design tool, no third-party image API, no manual export.",
    homeCardCopy: "A good share preview is often the only reason someone clicks. Give every post one.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/socialcard",
    capabilities: "content:read, content:write, media:write",
    hooks: "plugin:install, content:afterSave",
    status: "alpha",
    installCommand: "npm install @plugdash/socialcard",
    configExample:
      'import { socialcardPlugin } from "@plugdash/socialcard"\n// in emdash plugins array:\nsocialcardPlugin({ template: "bold" })',
    wordpressEquivalent: "Social Image Generator",
    companionComponent: "",
    pairs: ["sharepost", "autobuild"],
    pairsNote:
      "a card that actually represents the post makes sharepost's links worth clicking, and autobuild makes sure it's live within a minute of publish.",
    demoCaption: "Publish a post, get a card - title, author, and date rendered as an SVG, no image service required.",
    setupNote:
      "After this, every published post gets an OG card automatically. Existing posts need a republish to pick it up - socialcard only runs on content:afterSave.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "template", type: '"default" | "minimal" | "bold"', default: '"default"', description: "Card layout" },
      { name: "width", type: "number", default: "1200", description: "Card width in pixels" },
      { name: "height", type: "number", default: "630", description: "Card height in pixels" },
      { name: "background", type: "string (hex)", default: '"#0f172a"', description: "Background colour" },
      { name: "foreground", type: "string (hex)", default: '"#f8fafc"', description: "Text (and, on minimal, paper) colour" },
      { name: "logo", type: "string (URL)", description: "Logo drawn in the top-left corner" },
      { name: "fonts.title", type: "string (CSS font stack)", default: "system sans", description: "Font stack for the title line" },
      { name: "fonts.body", type: "string (CSS font stack)", default: "system sans", description: "Font stack for the byline" },
    ],
    // no cssTokens - this plugin has no client component, it renders SVG server-side
  },
  {
    slug: "fromghost",
    name: "fromghost",
    npmPackage: "@plugdash/fromghost",
    tagline: "Your Ghost posts, in EmDash's admin, no CLI step.",
    headline: "Bring your Ghost site over without leaving the admin.",
    sub: "Registers a Ghost source in EmDash's own import screen, next to the built-in WordPress importers. Upload the JSON export from Ghost's Settings > Labs, and it reads posts, pages, tags, and authors, converts post bodies to Portable Text, and resolves feature images so EmDash's own pipeline can download them.",
    homeCardCopy: "Bring your Ghost site over - posts, tags, authors, and images included.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/fromghost",
    capabilities: "content:write, media:write",
    hooks: "none - registers an ImportSource, not a content hook",
    status: "alpha",
    installCommand: "npm install @plugdash/fromghost",
    configExample:
      'import { fromghostPlugin } from "@plugdash/fromghost"\n// in emdash plugins array:\nfromghostPlugin({ siteUrl: "https://yourghostsite.com" })',
    wordpressEquivalent: "",
    companionComponent: "",
    pairs: [],
    demoCaption: "One JSON export in - post/page/tag/author counts ready to review before you import.",
    setupNote:
      "After this, \"Ghost Export File\" appears as a source in EmDash's admin import screen. Upload the export there - there's no separate CLI step.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "targetCollection", type: "string", default: '"posts"', description: "Collection suggested for Ghost posts in the import UI" },
      { name: "preserveSlugs", type: "boolean", default: "true", description: "Keep Ghost's slugs instead of regenerating from the title" },
      { name: "importImages", type: "boolean", default: "true", description: "Carry feature and inline images over" },
      { name: "importTags", type: "boolean", default: "true", description: "Carry Ghost tags over as taxonomy terms" },
      { name: "siteUrl", type: "string", default: '""', description: "The Ghost site's URL, to resolve __GHOST_URL__ image paths" },
      { name: "onWarn", type: "(message: string) => void", default: "discard", description: "Called for every recoverable problem during import" },
    ],
  },
  {
    slug: "fromsubstack",
    name: "fromsubstack",
    npmPackage: "@plugdash/fromsubstack",
    tagline: "Migrate from Substack to EmDash in minutes, not a rewrite.",
    headline: "Bring your Substack archive with you.",
    sub: "Registers Substack as a source in EmDash's admin importer. Upload the export ZIP from Substack's Settings > Exports, and it reads posts.csv plus each post's HTML, converts bodies to Portable Text, and reports images so EmDash can bring them in too. Paid and draft posts are flagged in metadata, not hidden.",
    homeCardCopy: "Bring your Substack archive with you - posts, images, and paywall status included.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/fromsubstack",
    capabilities: "content:write, media:write",
    hooks: "none - registers an import source, not a content hook",
    status: "alpha",
    installCommand: "npm install @plugdash/fromsubstack",
    configExample:
      'import { fromsubstackPlugin } from "@plugdash/fromsubstack"\n// in emdash plugins array:\nfromsubstackPlugin({ targetCollection: "posts", status: "draft" })',
    wordpressEquivalent: "",
    companionComponent: "",
    pairs: [],
    demoCaption: "One export ZIP in - posts, images, and paid/free status ready to review.",
    setupNote:
      "After this, \"Substack\" appears as a source in EmDash's admin importer. Upload the export ZIP there - there's no separate CLI step.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "targetCollection", type: "string", default: '"posts"', description: "Collection posts import into" },
      { name: "status", type: '"draft" | "published"', default: '"draft"', description: "Status for posts Substack had marked published (a post still a draft on Substack always imports as a draft)" },
      { name: "importImages", type: "boolean", default: "true", description: "Report body images so EmDash imports them" },
      { name: "preserveSlugs", type: "boolean", default: "true", description: "Keep the slug from the Substack post URL instead of re-slugifying the title" },
      { name: "onWarn", type: "(message: string) => void", default: "console.warn", description: "Where per-post warnings (skips, empty bodies) go" },
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
  "codeblock",
  "socialcard",
  "enrichkit",
  "fromghost",
  "fromsubstack",
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
