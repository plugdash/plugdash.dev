# plugdash.dev

The plugin catalog for EmDash. Built on EmDash with every plugdash plugin
installed and visible on the site itself.

## develop

```bash
pnpm install
pnpm dev
```

Admin lives at `localhost:4321/_emdash/admin`.

## what is here

- `src/pages/` - home, plugin pages, docs, blog, `/llms.txt`, `/agents.md`
- `src/layouts/` - Base, Post, Doc
- `src/components/` - PluginCard, InstallCommand, PortableText
- `src/data/plugins.ts` - working source of truth for the catalog.
  Pages should migrate to `getEmDashCollection("plugins")` once the
  `plugins` collection is seeded via `pnpm seed`.
- `src/content/agents.md` - skill file served at `/agents.md` and
  submitted as a PR to emdash-cms/emdash on launch day.
- `seed/seed.json` - seed data for the EmDash admin, loaded via
  `pnpm seed` (emdash seed).

## deploy

- Cloudflare Pages. Domain: plugdash.dev. Database: D1 (`plugdash`).
  Storage: R2 (`plugdash-media`).
- `wrangler d1 create plugdash`, paste id into `wrangler.jsonc`
- `wrangler r2 bucket create plugdash-media`
- Add `CF_PAGES_DEPLOY_HOOK` as a Pages env var
- Point `plugdash.dev` at the Pages project

Reference: `../PLAN.md`, `../TODO.md`, and
`../plugdash-research/conversations/plugdash-website-spec.md`.

## rules

- No em-dashes in copy or code comments. Use regular dashes or rewrite.
- Every plugin listed on the site must also be installed on the site.
- Copy for headings, taglines, and marketing text comes from
  `plugdash-research/conversations/plugdash-launch-copy.md` verbatim.
- `engage` is NOT registered as a plugin. Import `EngagementBar.astro`
  from `@plugdash/engage` directly in `Post.astro`.
