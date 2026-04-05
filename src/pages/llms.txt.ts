import type { APIRoute } from "astro";
import { resolvePlugins } from "../lib/content";

// Reads the live `plugins` collection (falls back to static data before
// seeded). Edits made in the admin flow through here automatically.

export const GET: APIRoute = async () => {
	const plugins = await resolvePlugins();

	const lines: string[] = [
		"# PlugDash",
		"",
		"Plugin catalog for EmDash (emdashcms.com).",
		"Source: https://github.com/plugdash/plugdash",
		"npm: https://www.npmjs.com/org/plugdash",
		"",
		"## plugins",
		"",
	];

	for (const p of plugins) {
		lines.push(`### ${p.npmPackage}`);
		lines.push(`install: npm install ${p.npmPackage}`);
		lines.push(`capabilities: ${p.capabilities}`);
		lines.push(`hooks: ${p.hooks}`);
		lines.push(`tagline: ${p.tagline}`);
		if (p.companionComponent) {
			lines.push(`companion-component: ${p.companionComponent}`);
		}
		if (p.wordpressEquivalent) {
			lines.push(`wordpress-equivalent: ${p.wordpressEquivalent}`);
		}
		lines.push(`status: ${p.status}`);
		lines.push("");
	}

	return new Response(lines.join("\n"), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
