import type { APIRoute } from "astro";
import skillContent from "../content/agents.md?raw";

// Served under both /agents.md and /skill.md so agents looking for either
// convention find the same plugdash skill file. Source of truth is
// src/content/agents.md.
export const GET: APIRoute = async () => {
  return new Response(skillContent, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
