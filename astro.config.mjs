import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { autobuildPlugin } from "@plugdash/autobuild";
import { calloutPlugin } from "@plugdash/callout";
import { heartpostPlugin } from "@plugdash/heartpost";
import { readtimePlugin } from "@plugdash/readtime";
import { sharepostPlugin } from "@plugdash/sharepost";
import { shortlinkPlugin } from "@plugdash/shortlink";
import { tocgenPlugin } from "@plugdash/tocgen";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

// engage is NOT registered here. It is a convenience bundle with no plugin
// logic - Post.astro imports EngagementBar.astro from @plugdash/engage directly.
// The three underlying engagement plugins (heartpost, sharepost, shortlink)
// are registered below.


export default defineConfig({
	output: "server",
	adapter: cloudflare({ imageService: "compile" }),
	image: { layout: "constrained", responsiveStyles: true },
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			plugins: [
				readtimePlugin(),
				tocgenPlugin(),
				sharepostPlugin(),
				heartpostPlugin(),
				shortlinkPlugin(),
				calloutPlugin(),
				autobuildPlugin({ hookUrl: import.meta.env.CF_PAGES_DEPLOY_HOOK }),
			],
		}),
	],
	devToolbar: { enabled: false },
});
