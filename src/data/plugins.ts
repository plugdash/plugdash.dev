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
    headline: "The block readers actually stop and read.",
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
    tagline: "If a reader wants to share your post, that should take one click.",
    headline: "Make sharing the obvious next move.",
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
    headline: "One click, no account, and it still counts.",
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
    demoCaption: "The count moves the instant you click, before KV even confirms it.",
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
    demoCaption: "Click to copy - a green check confirms it, then fades after two seconds.",
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
    headline: "Three plugins, one import, one row under every post.",
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
    headline: "The admin panel that also deploys your site.",
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
    demoCaption: "Publish in the admin and the build hook fires - four lines of config, no git push.",
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
  {
    slug: "socialcard",
    name: "socialcard",
    npmPackage: "@plugdash/socialcard",
    tagline: "The preview image that decides whether anyone clicks the link at all.",
    headline: "Generate the card before anyone hits share.",
    sub: "socialcard renders an OG image with Satori the moment you publish, then converts it to PNG with resvg-js - both running inside the same Cloudflare Worker that serves the rest of your site. No screenshot service, no third-party API key, no cold start. Three templates ship built in, every colour and font is config, not code.",
    homeCardCopy: "The OG image renders in the Worker, at publish, not through a screenshot service.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/socialcard",
    capabilities: "read:content, write:content, network:storage",
    hooks: "content:afterSave",
    status: "alpha",
    installCommand: "npm install @plugdash/socialcard",
    configExample:
      'import socialcard from "@plugdash/socialcard"\n// in emdash plugins array:\nsocialcard({ template: "bold", background: "#0f172a" })',
    wordpressEquivalent: "Social Image Generator",
    companionComponent: "",
    pairs: ["sharepost", "readtime"],
    pairsNote:
      "sharepost puts the link in front of people. socialcard is what they see before they click it - the two only work as a pair.",
    demoCaption: "1200x630 PNG, rendered from Satori JSX, generated once per publish.",
    setupNote:
      "Publish a post and the card exists at metadata.ogImage before the deploy even finishes. Point your layout's og:image meta tag at it once and every future post inherits it.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "template", type: '"default" | "minimal" | "bold"', default: '"default"', description: "Layout template" },
      { name: "width", type: "number", default: "1200", description: "Image width in px" },
      { name: "height", type: "number", default: "630", description: "Image height in px" },
      { name: "background", type: "string", default: '"#0f172a"', description: "Background colour (hex)" },
      { name: "foreground", type: "string", default: '"#f8fafc"', description: "Text colour (hex)" },
      { name: "logo", type: "string", description: "Optional logo image URL" },
    ],
  },
  {
    slug: "fromsubstack",
    name: "fromsubstack",
    npmPackage: "@plugdash/fromsubstack",
    tagline: "The export button Substack gives you, turned into a working blog somewhere else.",
    headline: "Point it at the export ZIP. Walk away with a working blog.",
    sub: "fromsubstack unzips a Substack export, converts each post's HTML into Portable Text, and re-uploads every image to your own media library. Slugs carry over by default, so old links from newsletters and search results keep resolving. Everything lands as a draft first - nothing goes live until you review it.",
    homeCardCopy: "Unzip the Substack export, get EmDash content back - posts, images, slugs intact.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/fromsubstack",
    capabilities: "write:content, write:media, read:schema",
    hooks: "none - runs as a one-time CLI import",
    status: "beta",
    installCommand: "npm install @plugdash/fromsubstack",
    configExample: '// runs via CLI, not the plugins array:\nnpx emdash plugin fromsubstack --file export.zip --status draft',
    wordpressEquivalent: "",
    companionComponent: "",
    pairs: ["fromghost", "redirects"],
    pairsNote:
      "if the old Substack URLs are indexed anywhere, redirects is what keeps them from turning into 404s once the archive moves.",
    demoCaption: "5 posts, 3 with images, imported and re-hosted in one CLI run.",
    setupNote:
      "Export your archive from Substack's settings, then run the import command with the ZIP path. Re-running the same file skips posts it's already imported instead of duplicating them.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "targetCollection", type: "string", default: '"posts"', description: "Collection to import into" },
      { name: "status", type: '"draft" | "published"', default: '"draft"', description: "Status assigned to imported posts" },
      { name: "importImages", type: "boolean", default: "true", description: "Download and re-host images" },
      { name: "preserveSlugs", type: "boolean", default: "true", description: "Keep the original Substack slug" },
    ],
  },
  {
    slug: "redirects",
    name: "redirects",
    npmPackage: "@plugdash/redirects",
    tagline: "Change a slug and the old URL still has to go somewhere.",
    headline: "Rename a post without breaking the link everyone already has.",
    sub: "redirects watches every slug change and writes a 301 automatically, no extra step. Every request gets checked against the redirect table before your site ever renders a page, and a hit counter tracks which old URLs are still getting traffic. A CSV importer handles the bulk redirects you bring over from a migration.",
    homeCardCopy: "Change a slug, get a 301 automatically. No dead links from a rename.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/redirects",
    capabilities: "read:content, write:routes, read:routes, read:kv, write:kv",
    hooks: "content:beforeSave, route:request",
    status: "beta",
    installCommand: "npm install @plugdash/redirects",
    configExample:
      'import redirects from "@plugdash/redirects"\n// in emdash plugins array:\nredirects({ autoRedirect: true, statusCode: 301 })',
    wordpressEquivalent: "Redirection",
    companionComponent: "",
    pairs: ["fromsubstack", "fromghost"],
    pairsNote:
      "a migration brings a list of URLs that used to work somewhere else. redirects is what makes them keep working here.",
    demoCaption: "Rename a slug, and the old path 301s to the new one before the next request.",
    setupNote:
      "Install it and slug changes start redirecting immediately. Bring over redirects from an old CMS with the CSV importer on the admin page instead of typing each one in by hand.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "autoRedirect", type: "boolean", default: "true", description: "Create a redirect automatically on slug change" },
      { name: "statusCode", type: "301 | 302", default: "301", description: "Status code for generated redirects" },
    ],
  },
  {
    slug: "clickcount",
    name: "clickcount",
    npmPackage: "@plugdash/clickcount",
    tagline: "shortlink tells you the link works. clickcount tells you who used it.",
    headline: "Know which links people actually click, not just which ones you made.",
    sub: "clickcount hooks into shortlink's redirect route and counts every request in Cloudflare KV - referrer domain, country, running total, all written as fire-and-forget so tracking never slows the redirect down. A dashboard widget surfaces your top five links and a 7-day sparkline without leaving the admin.",
    homeCardCopy: "Every shortlink redirect counted - referrer, country, running total, no extra request.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/clickcount",
    capabilities: "read:kv, write:kv, read:routes",
    hooks: "route:request",
    status: "alpha",
    installCommand: "npm install @plugdash/clickcount",
    configExample:
      'import clickcount from "@plugdash/clickcount"\n// in emdash plugins array:\nclickcount({ trackReferrers: true, trackCountries: true })',
    wordpressEquivalent: "Pretty Links",
    companionComponent: "",
    pairs: ["shortlink"],
    pairsNote:
      "clickcount only has something to count once shortlink exists. Install both for the full picture - the link and the traffic on it.",
    demoCaption: "Top 5 links this week, ranked by clicks, refreshed on every dashboard load.",
    setupNote:
      "Install it next to shortlink and every redirect starts getting counted immediately - no extra config, no separate tracking script.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "trackReferrers", type: "boolean", default: "true", description: "Record referrer domain per click" },
      { name: "trackCountries", type: "boolean", default: "true", description: "Record country from the CF-IPCountry header" },
      { name: "retentionDays", type: "number", default: "90", description: "Days to keep daily records before purge" },
    ],
  },
  {
    slug: "codeblock",
    name: "codeblock",
    npmPackage: "@plugdash/codeblock",
    tagline: "Syntax highlighting that doesn't ship a highlighter to the browser.",
    headline: "The code block renders highlighted. The browser does none of the work.",
    sub: "codeblock runs Shiki inside the Worker and highlights code at render time, not at save time, so a theme upgrade or a language fix applies to every post retroactively with nothing stored as pre-rendered HTML. Twelve common languages preload by default; anything else loads from Shiki's registry on first use.",
    homeCardCopy: "Shiki highlighting, rendered server-side, zero JavaScript shipped to the browser.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/codeblock",
    capabilities: "read:content",
    hooks: "none - render-time transform, not a lifecycle hook",
    status: "beta",
    installCommand: "npm install @plugdash/codeblock",
    configExample: 'import CodeBlock from "@plugdash/codeblock/CodeBlock.astro"\n<CodeBlock block={block} theme="github-dark" />',
    wordpressEquivalent: "SyntaxHighlighter Evolved",
    companionComponent: "CodeBlock.astro",
    pairs: ["callout", "tocgen"],
    pairsNote:
      "a technical post is callouts and code blocks, in some order. Most posts that use one use both.",
    demoCaption: "TypeScript, highlighted with github-dark, no client bundle added to the page.",
    setupNote:
      "Drop CodeBlock.astro into your Portable Text renderer for code blocks and every fenced snippet in every post highlights from then on, including posts that already existed.",
    componentImport: 'import CodeBlock from "@plugdash/codeblock/CodeBlock.astro"',
    componentUsage: '<CodeBlock block={block} theme="github-dark" />',
    props: [
      { name: "block", type: "Portable Text code block", description: "Required - the code block to render" },
      { name: "theme", type: "string", default: '"github-dark"', description: "Shiki theme name" },
      { name: "lightTheme", type: "string", description: "Optional theme used in light mode" },
      { name: "lineNumbers", type: "boolean", default: "false", description: "Show line numbers" },
    ],
  },
  {
    slug: "paygate",
    name: "paygate",
    npmPackage: "@plugdash/paygate",
    tagline: "A post behind a paywall, without a subscription behind it.",
    headline: "Charge per post. Skip the subscription business entirely.",
    sub: "paygate turns EmDash's built-in x402 support into a settings panel a publisher can actually use - price a post, pick full block or preview, done. A request without a payment receipt gets a 402 response with the payment details attached; an AI agent with a wallet can pay it and read the post without a human ever seeing a login screen.",
    homeCardCopy: "Price a post, gate it, get paid to a wallet address - no Stripe, no subscription tier.",
    githubUrl: "https://github.com/plugdash/plugdash/tree/main/packages/paygate",
    capabilities: "read:content, write:content, write:routes, read:kv, write:kv",
    hooks: "route:request, content:afterSave",
    status: "alpha",
    installCommand: "npm install @plugdash/paygate",
    configExample:
      'import paygate from "@plugdash/paygate"\n// in emdash plugins array:\npaygate({ walletAddress: "0x...", network: "base", defaultPrice: 1.00 })',
    wordpressEquivalent: "MemberPress",
    companionComponent: "",
    pairs: ["readtime", "tocgen"],
    pairsNote:
      "someone deciding whether to pay for a post wants to know how long it is and how it's laid out first. readtime and tocgen both show up on the preview before the paywall does.",
    demoCaption: "No receipt, no read - a 402 response with the price attached, resolved the moment payment lands.",
    setupNote:
      "Set your wallet address once in the plugin config, then flip 'require payment' on any post from its Monetisation panel in the admin. Free posts stay free until you say otherwise.",
    componentImport: "",
    componentUsage: "",
    props: [
      { name: "walletAddress", type: "string", description: "Required - wallet that receives payment" },
      { name: "defaultPrice", type: "number", default: "1.00", description: "Price in USD" },
      { name: "network", type: '"base" | "ethereum" | "polygon"', default: '"base"', description: "Payment network" },
      { name: "gateType", type: '"full" | "preview"', default: '"full"', description: "Block entirely or show an excerpt" },
      { name: "previewWords", type: "number", default: "100", description: "Words shown in preview mode" },
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
