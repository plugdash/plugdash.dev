import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { calloutPlugin } from "@plugdash/callout";
import { codeblockPlugin } from "@plugdash/codeblock";
import { enrichkitPlugin } from "@plugdash/enrichkit";
import { heartpostPlugin } from "@plugdash/heartpost";
import { shortlinkPlugin } from "@plugdash/shortlink";
import { socialcardPlugin } from "@plugdash/socialcard";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

// readtime, tocgen and sharepost render in their components and need no
// registration. engage is a component bundle, not a plugin.
// The importers (fromghost, fromsubstack) are one-time tools, so they are
// not part of the runtime config. autobuild is not used: the site is
// server-rendered on Workers, so a publish is live without a rebuild.

export default defineConfig({
	site: "https://plugdash.dev",
	output: "server",
	adapter: cloudflare({ imageService: "compile" }),
	image: { layout: "constrained", responsiveStyles: true },
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			plugins: [
				// Cloudflare sets cf-connecting-ip and a client cannot override it
				heartpostPlugin({
					collections: ["blog"],
					rateLimitPerMinute: 10,
					trustProxyHeader: "cf-connecting-ip",
				}),
				shortlinkPlugin({ prefix: "/s/" }),
				calloutPlugin(),
				codeblockPlugin({ lightTheme: "github-light" }),
				socialcardPlugin(),
				// the API key is an encrypted admin setting (Plugins > enrichkit > Settings)
				enrichkitPlugin({ provider: "anthropic" }),
			],
		}),
	],
	devToolbar: { enabled: false },
});
