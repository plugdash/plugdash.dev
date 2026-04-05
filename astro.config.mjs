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
				// callout and autobuild intentionally omitted for now.
				// callout's sandbox entry causes an undefined plugin in
				// HookPipeline at load time (known issue, see PLAN.md).
				// autobuild has a .d.mts runtime import bug.
			],
		}),
	],
	devToolbar: { enabled: false },
});
