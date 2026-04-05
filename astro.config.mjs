import node from "@astrojs/node";
import react from "@astrojs/react";
import { autobuildPlugin } from "@plugdash/autobuild";
import { calloutPlugin } from "@plugdash/callout";
import { heartpostPlugin } from "@plugdash/heartpost";
import { readtimePlugin } from "@plugdash/readtime";
import { sharepostPlugin } from "@plugdash/sharepost";
import { shortlinkPlugin } from "@plugdash/shortlink";
import { tocgenPlugin } from "@plugdash/tocgen";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

// engage is NOT registered here. It is a convenience bundle with no plugin
// logic - Post.astro imports EngagementBar.astro from @plugdash/engage directly.
// The three underlying engagement plugins (heartpost, sharepost, shortlink)
// are registered below.

export default defineConfig({
	output: "server",
	adapter: node({ mode: "standalone" }),
	image: { layout: "constrained", responsiveStyles: true },
	integrations: [
		react(),
		emdash({
			database: sqlite({ url: "file:./data.db" }),
			storage: local({
				directory: "./uploads",
				baseUrl: "/_emdash/api/media/file",
			}),
			plugins: [
				readtimePlugin({ collections: ["blog"] }),
				tocgenPlugin({ minHeadings: 3 }),
				sharepostPlugin({ via: "abhinavs" }),
				heartpostPlugin(),
				shortlinkPlugin({ autoCreate: true }),
				calloutPlugin(),
				// autobuild only makes sense when a deploy hook URL is configured.
				// Skipped in dev to avoid loading @plugdash/autobuild@0.1.1's
				// sandbox entry, which has a packaging bug (stray import of a
				// .d.mts types file). Re-enable in production by setting the env var.
				...(import.meta.env.CF_PAGES_DEPLOY_HOOK
					? [autobuildPlugin({ hookUrl: import.meta.env.CF_PAGES_DEPLOY_HOOK })]
					: []),
			],
		}),
	],
	devToolbar: { enabled: false },
});
