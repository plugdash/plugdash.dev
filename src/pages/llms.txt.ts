import type { APIRoute } from "astro";
import { sortedPlugins } from "../data/plugins";

// Per spec: /llms.txt must read from the live `plugins` collection, not a
// hardcoded list. While the EmDash admin is being seeded, this reads from
// src/data/plugins.ts which is the working source. Swap to
// `getEmDashCollection("plugins")` once the collection is seeded.

export const GET: APIRoute = async () => {
  const plugins = sortedPlugins();

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
