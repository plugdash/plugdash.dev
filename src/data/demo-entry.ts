// The real blog post that the home page and docs demos render. Create it in
// the admin (Content > Blog > New, then Publish) with this slug and at least
// three h2 headings. It is a normal post, so readtime, tocgen, sharepost,
// heartpost and shortlink all work on it exactly as they do on any post.
// When the post does not exist yet, loadDemoEntry() returns null and the
// demo blocks are hidden.
import { getEmDashEntry } from "emdash";

export const DEMO_SLUG = "plugdash-demo";
export const DEMO_URL = `https://plugdash.dev/blog/${DEMO_SLUG}`;

export async function loadDemoEntry(): Promise<Record<string, unknown> | null> {
	try {
		const { entry } = await getEmDashEntry("blog", DEMO_SLUG);
		return entry ? (entry as unknown as Record<string, unknown>) : null;
	} catch {
		return null;
	}
}
