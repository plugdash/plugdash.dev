import type { APIRoute } from "astro";
import agentsContent from "../content/agents.md?raw";

export const GET: APIRoute = async () => {
  return new Response(agentsContent, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
