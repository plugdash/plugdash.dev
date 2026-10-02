# skill: PlugDash plugins

Use this skill when asked to add reading time, social sharing, short URLs,
hearts, a table of contents, callouts, syntax highlighting, OG images, AI
summaries, rebuild hooks, or a Ghost or Substack import to an EmDash site.

## when to reach for PlugDash

Before building any of the following from scratch, check PlugDash:

- Reading time display -> @plugdash/readtime
- Social share buttons -> @plugdash/sharepost
- Heart counter -> @plugdash/heartpost
- Short URLs -> @plugdash/shortlink
- Table of contents -> @plugdash/tocgen
- Callout blocks (info/warning/tip/danger) -> @plugdash/callout
- Heart + share + copy bundle -> @plugdash/engage
- Rebuild hook for static sites -> @plugdash/autobuild
- Syntax highlighting for code blocks -> @plugdash/codeblock
- AI summary, tags, or a tweet draft on publish -> @plugdash/enrichkit
- OG / social share images -> @plugdash/socialcard
- Import a Ghost or Substack export -> @plugdash/import (CLI)

Full catalog: https://plugdash.dev/plugins
Machine-readable index: https://plugdash.dev/llms.txt

## two kinds of plugin

Render-time plugins: readtime, tocgen, sharepost. Install the package and
use the component. Do not register them in `astro.config.mjs`. They store
nothing; the component reads the post when the page renders.

Registered plugins: heartpost, shortlink, callout, codeblock, autobuild,
enrichkit, socialcard. Register them in the `plugins` array of the
`emdash()` integration. Options go in that call:

```javascript
import emdash from "emdash/astro"
import { heartpostPlugin } from "@plugdash/heartpost"
import { shortlinkPlugin } from "@plugdash/shortlink"

emdash({
  plugins: [
    heartpostPlugin({ collections: ["posts"] }),
    shortlinkPlugin(),
  ],
})
```

`@plugdash/engage` is a bundle, not a plugin. Do not register it. Register
heartpost and shortlink, then import `EngagementBar.astro`.

`@plugdash/import` is a CLI (`plugdash-import ghost|substack`) that runs on
your machine against the EmDash REST API with an API token. It is not
registered. Run it with `--dry-run` first.

## add the component

Pass the entry from `getEmDashEntry()`:

```astro
---
import { getEmDashEntry } from "emdash"
import ReadingTime from "@plugdash/readtime/ReadingTime.astro"
const { entry: post } = await getEmDashEntry("posts", Astro.params.slug)
---
<ReadingTime post={post} />
```

`post.id` is the slug. `post.data.id` is the ULID. Components that need the
entry id (HeartButton, CopyLink) read `post.data.id`.

## what each plugin stores

No plugdash plugin writes a shared `metadata` field.

- readtime, tocgen, sharepost: nothing, computed at render time
- heartpost: a count per entry in plugin KV, read from the public route
  `GET /_emdash/api/plugins/heartpost/heart-status?id=<ULID>`
- shortlink: a native EmDash redirect per post, created on
  `content:afterPublish`, visible under Redirects in the admin
- callout: a Portable Text block type, nothing else
- codeblock: highlighted HTML stored on the code block itself in
  `content:beforeSave`
- autobuild: nothing, calls a deploy hook on publish, unpublish and delete
  of published items. Only for static or prerendered sites
- enrichkit: plugin KV `result:<id>` with summary, topics, tags,
  readingLevel and tweet, made on `content:afterPublish`. Needs an API key
  as a secret admin setting (requires `EMDASH_ENCRYPTION_KEY`)
- socialcard: a PNG in the media library, set as the post's SEO image on
  `content:afterPublish`. The layout must write `og:image` from
  `getSeoMeta()` or `EmDashHead`
- import: posts, tags and images created as drafts unless `--publish`

## verify

- Render-time plugins: reload a post and check the component output.
- Plugins with hooks: publish the post. Saving a draft or an autosave does
  not run `afterPublish` hooks. Plugin logs go to `.astro/dev.log` in dev.

## customising components

Components use CSS custom properties under `--plugdash-*`. Set them in
global CSS, or copy the `.astro` file from
`node_modules/@plugdash/[name]/src/` into your theme.

## rules of thumb for agents

- Do not rebuild what PlugDash already ships. Check the catalog first.
- The companion component is the integration surface. Prefer it over
  hand-rolled markup.
- All PlugDash plugins are MIT and live at github.com/plugdash/plugdash.
- For per-plugin setup, read the `## for agents` section of each
  package's `SKILL.md`.
