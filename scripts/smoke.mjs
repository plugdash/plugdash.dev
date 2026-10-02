// Smoke test for the plugins on the demo post of a running plugdash.dev.
//
//   node scripts/smoke.mjs                       # checks https://plugdash.dev
//   BASE_URL=http://localhost:5149 node scripts/smoke.mjs
//
// Env: BASE_URL (default https://plugdash.dev), DEMO_SLUG (default
// plugdash-demo), SITE_URL (the site's public origin, default
// https://plugdash.dev; share links and og:image use it even on a local run).
// Exits 1 when any check fails and prints one line per check.
import { chromium } from "playwright";

const BASE_URL = (process.env.BASE_URL || "https://plugdash.dev").replace(/\/$/, "");
const SITE_URL = (process.env.SITE_URL || "https://plugdash.dev").replace(/\/$/, "");
const DEMO_SLUG = process.env.DEMO_SLUG || "plugdash-demo";
const WPM = 238;
const postUrl = `${BASE_URL}/blog/${DEMO_SLUG}`;

const results = [];
async function check(name, fn) {
	try {
		const detail = await fn();
		results.push({ name, ok: true, detail });
	} catch (err) {
		results.push({ name, ok: false, detail: err instanceof Error ? err.message : String(err) });
	}
}
function assert(cond, msg) {
	if (!cond) throw new Error(msg);
}

// On a local run the page points at the public origin; fetch from BASE_URL instead.
const local = (url) => (url.startsWith(SITE_URL) ? BASE_URL + url.slice(SITE_URL.length) : url);

const browser = await chromium.launch();
try {
	const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
	const heartRequests = [];
	page.on("request", (req) => {
		if (req.url().includes("/_emdash/api/plugins/heartpost/heart-status")) heartRequests.push(req.url());
	});

	const res = await page.goto(postUrl, { waitUntil: "networkidle" });
	if (!res || res.status() !== 200) {
		throw new Error(`${postUrl} returned ${res?.status()} - is the demo post published?`);
	}

	const heart = page.locator(".plugdash-heart").first();
	const hasHeart = (await heart.count()) > 0;
	const postId = hasHeart ? await heart.getAttribute("data-post-id") : null;
	const legacyId = hasHeart ? await heart.getAttribute("data-legacy-id") : null;

	await check("readtime equals ceil(words / 238)", async () => {
		const words = await page.$$eval(
			".post-content :is(p, h1, h2, h3, h4, h5, h6, li, blockquote)",
			(els) => els.map((e) => e.innerText).join(" ").split(/\s+/).filter(Boolean).length,
		);
		const shown = Number(await page.locator(".post-meta .plugdash-rt-minutes").first().innerText());
		const expected = Math.max(1, Math.ceil(words / WPM));
		assert(shown === expected, `shown ${shown} min, expected ${expected} for ${words} words`);
		return `${shown} min for ${words} words`;
	});

	await check("X share link has the public URL and via", async () => {
		const href = await page.locator('a[href*="twitter.com/intent/tweet"], a[href*="x.com/intent"]').first().getAttribute("href");
		const wantUrl = `url=${encodeURIComponent(SITE_URL)}`;
		assert(href?.includes(wantUrl), `href ${href} has no ${wantUrl}`);
		assert(href.includes("via=abhinavs"), `href ${href} has no via=abhinavs`);
		return href;
	});

	await check("short link redirects 301 to the post", async () => {
		assert(postId, "no heart button with data-post-id, so no entry id");
		const code = postId.slice(-8).toLowerCase();
		const r = await fetch(`${BASE_URL}/s/${code}`, { redirect: "manual" });
		const location = r.headers.get("location") || "";
		assert(r.status === 301, `/s/${code} returned ${r.status}`);
		assert(new URL(location, BASE_URL).pathname === `/blog/${DEMO_SLUG}`, `/s/${code} points at ${location}`);
		return `/s/${code} -> ${location}`;
	});

	await check("og:image is a PNG", async () => {
		const meta = page.locator('meta[property="og:image"]');
		const og = (await meta.count()) ? await meta.first().getAttribute("content") : null;
		assert(og, "no og:image meta tag");
		const r = await fetch(local(new URL(og, BASE_URL).href));
		const type = r.headers.get("content-type") || "";
		assert(r.status === 200, `${og} returned ${r.status}`);
		assert(type.startsWith("image/png"), `${og} is ${type}`);
		return og;
	});

	await check("TOC links all point at heading ids", async () => {
		const hrefs = await page.$$eval(".plugdash-toc a[href^='#']", (as) => as.map((a) => a.getAttribute("href")));
		assert(hrefs.length > 0, "no TOC links");
		const missing = await page.evaluate(
			(hs) => hs.filter((h) => !document.getElementById(decodeURIComponent(h.slice(1)))),
			hrefs,
		);
		assert(missing.length === 0, `no element for ${missing.join(", ")}`);
		return `${hrefs.length} links`;
	});

	await check("no heart request before scroll", async () => {
		assert(heartRequests.length === 0, `${heartRequests.length} heart-status request(s) on load`);
		return "0 requests";
	});

	await check("heart count matches heart-status", async () => {
		assert(postId, "no heart button");
		let q = `id=${encodeURIComponent(postId)}`;
		if (legacyId) q += `&legacyId=${encodeURIComponent(legacyId)}`;
		const r = await fetch(`${BASE_URL}/_emdash/api/plugins/heartpost/heart-status?${q}`);
		const json = await r.json();
		assert(json?.success === true && typeof json.data?.count === "number", `heart-status replied ${JSON.stringify(json)}`);
		const loaded = page.waitForResponse((resp) => resp.url().includes("heart-status"), { timeout: 10_000 });
		await heart.scrollIntoViewIfNeeded();
		await loaded;
		await page.waitForTimeout(300);
		const shown = Number(await heart.locator(".plugdash-heart-count").innerText());
		assert(shown === json.data.count, `button shows ${shown}, route says ${json.data.count}`);
		return `${shown}`;
	});
} catch (err) {
	results.push({ name: "load demo post", ok: false, detail: err instanceof Error ? err.message : String(err) });
} finally {
	await browser.close();
}

for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}: ${r.detail}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `\n${failed} check(s) failed on ${postUrl}` : `\nall ${results.length} checks passed on ${postUrl}`);
process.exit(failed ? 1 : 0);
