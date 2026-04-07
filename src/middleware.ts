import { defineMiddleware } from "astro:middleware";
import { env } from "cloudflare:workers";

/**
 * Rate-limit heartpost API routes (heart / heart-remove) to 10 req/min
 * per IP using Cloudflare's Rate Limiting binding.
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;
	if (
		context.request.method !== "POST" ||
		!pathname.startsWith("/_emdash/api/plugins/heartpost/")
	) {
		return next();
	}

	const limiter = (env as any).HEART_LIMITER;
	if (!limiter) return next();

	const ip =
		context.request.headers.get("cf-connecting-ip") ??
		context.clientAddress ??
		"unknown";

	const { success } = await limiter.limit({ key: ip });
	if (!success) {
		return new Response(JSON.stringify({ error: "rate_limited" }), {
			status: 429,
			headers: { "Content-Type": "application/json", "Retry-After": "60" },
		});
	}

	return next();
});
