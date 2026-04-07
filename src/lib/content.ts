/**
 * Content layer. Pages call these helpers; the helpers try the EmDash
 * collection first and fall back to static data in src/data/ so the site
 * renders even before `pnpm bootstrap` is run.
 *
 * Once you run `pnpm bootstrap` (emdash init + emdash seed), the admin
 * at /_emdash/admin becomes the source of truth for every field below.
 */
import { getEmDashCollection, getEmDashEntry } from "emdash";
import { docs as staticDocs, type DocEntry as StaticDocEntry } from "../data/docs";
import { type Plugin, plugins as staticPlugins, sortedPlugins as sortedStaticPlugins } from "../data/plugins";

/**
 * Resolve a plugin by slug. Returns the admin-edited entry data if the
 * collection is seeded, otherwise the static record from src/data/plugins.ts.
 *
 * The returned shape is always the full `Plugin` interface - collection
 * fields are merged into the static record so unmigrated fields (props,
 * cssTokens, componentImport, componentUsage) stay available.
 */
export async function resolvePlugin(slug: string): Promise<Plugin | undefined> {
	const fallback = staticPlugins.find((p) => p.slug === slug);
	try {
		const { entry, error } = await getEmDashEntry("plugins", slug);
		if (error || !entry || !entry.data) return fallback;
		const data = entry.data as unknown as Record<string, unknown>;
		if (!fallback) return undefined;
		return mergePlugin(fallback, data);
	} catch {
		return fallback;
	}
}

/**
 * List all plugins. Reads the collection, falls back to static order.
 */
export async function resolvePlugins(): Promise<Plugin[]> {
	try {
		const { entries, error } = await getEmDashCollection("plugins");
		if (error || !entries || entries.length === 0) return sortedStaticPlugins();
		const merged = entries
			.map((entry) => {
				const data = entry.data as unknown as Record<string, unknown>;
				const fallback = staticPlugins.find((p) => p.slug === entry.id || p.slug === (data.slug as string | undefined));
				if (!fallback) return undefined;
				return mergePlugin(fallback, data);
			})
			.filter(Boolean) as Plugin[];
		if (merged.length === 0) return sortedStaticPlugins();
		return sortMerged(merged);
	} catch {
		return sortedStaticPlugins();
	}
}

/**
 * List docs metadata (title, section, summary, order) for sidebar nav
 * and the docs index. Bodies remain in .astro files per slug.
 */
export async function resolveDocs(): Promise<StaticDocEntry[]> {
	try {
		const { entries, error } = await getEmDashCollection("docs");
		if (error || !entries || entries.length === 0) return staticDocs;
		return entries
			.map((entry) => {
				const data = entry.data as unknown as Record<string, unknown>;
				const slug = (data.slug as string | undefined) ?? entry.id;
				const fallback = staticDocs.find((d) => d.slug === slug);
				if (!fallback) return undefined;
				return {
					slug,
					title: (data.title as string | undefined) ?? fallback.title,
					section: ((data.section as string | undefined) ?? fallback.section) as StaticDocEntry["section"],
					href: `/docs/${slug}`,
					summary: (data.summary as string | undefined) ?? fallback.summary,
					metadata: (data.metadata as Record<string, unknown> | undefined) ?? undefined,
				} satisfies StaticDocEntry;
			})
			.filter(Boolean) as StaticDocEntry[];
	} catch {
		return staticDocs;
	}
}

/**
 * Resolve a single doc entry by slug (for plugin metadata).
 */
export async function resolveDocEntry(slug: string): Promise<StaticDocEntry | undefined> {
	const fallback = staticDocs.find((d) => d.slug === slug);
	try {
		const { entry, error } = await getEmDashEntry("docs", slug);
		if (error || !entry || !entry.data) return fallback;
		const data = entry.data as unknown as Record<string, unknown>;
		if (!fallback) return undefined;
		return {
			slug,
			title: (data.title as string | undefined) ?? fallback.title,
			section: ((data.section as string | undefined) ?? fallback.section) as StaticDocEntry["section"],
			href: `/docs/${slug}`,
			summary: (data.summary as string | undefined) ?? fallback.summary,
			metadata: (data.metadata as Record<string, unknown> | undefined) ?? undefined,
		};
	} catch {
		return fallback;
	}
}

/**
 * Resolve a blog post by slug. Blog bodies are Portable Text stored in
 * the collection; when unseeded, returns undefined and the page can
 * handle the miss (blog has only the one launch post).
 */
export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	description: string;
	content: unknown[]; // PortableTextBlock[]
	publishedAt?: Date;
	/** Plugin-populated metadata (readingTimeMinutes, shareUrls, shortlink, etc.) */
	metadata?: Record<string, unknown>;
}

export async function resolveBlogPost(slug: string): Promise<BlogPost | undefined> {
	try {
		const { entry, error } = await getEmDashEntry("blog", slug);
		if (error || !entry || !entry.data) return undefined;
		const data = entry.data;
		const metadata = (data.metadata as Record<string, unknown> | undefined) ?? {};
		return {
			id: entry.id,
			slug,
			title: data.title ?? "",
			description: data.description ?? "",
			content: (data.content as unknown[]) ?? [],
			publishedAt: data.publishedAt instanceof Date ? data.publishedAt : undefined,
			metadata,
		};
	} catch {
		return undefined;
	}
}

// -- internal helpers ----------------------------------------------------

function mergePlugin(fallback: Plugin, data: Record<string, unknown>): Plugin {
	const s = (key: string) => data[key] as string | undefined;
	return {
		...fallback,
		name: s("name") ?? fallback.name,
		tagline: s("tagline") ?? fallback.tagline,
		headline: s("headline") ?? fallback.headline,
		sub: s("sub") ?? fallback.sub,
		homeCardCopy: s("home_card_copy") ?? fallback.homeCardCopy,
		npmPackage: s("npm_package") ?? fallback.npmPackage,
		githubUrl: s("github_url") ?? fallback.githubUrl,
		capabilities: s("capabilities") ?? fallback.capabilities,
		hooks: s("hooks") ?? fallback.hooks,
		status: (s("plugin_status") ?? fallback.status) as Plugin["status"],
		installCommand: s("install_command") ?? fallback.installCommand,
		configExample: s("config_example") ?? fallback.configExample,
		wordpressEquivalent: s("wordpress_equivalent") ?? fallback.wordpressEquivalent,
		companionComponent: s("companion_component") ?? fallback.companionComponent,
		pairs: parsePairs(s("pairs") ?? fallback.pairs.join(", ")),
		pairsNote: s("pairs_note") ?? fallback.pairsNote,
		demoCaption: s("demo_caption") ?? fallback.demoCaption,
		setupNote: s("setup_note") ?? fallback.setupNote,
		metadata: (data.metadata as Record<string, unknown> | undefined) ?? undefined,
	};
}

function parsePairs(raw: string | string[]): string[] {
	if (Array.isArray(raw)) return raw;
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

function sortMerged(list: Plugin[]): Plugin[] {
	const rank = (s: string) => (s === "stable" ? 0 : s === "beta" ? 1 : 2);
	return [...list].sort((a, b) => {
		const r = rank(a.status) - rank(b.status);
		if (r !== 0) return r;
		return a.name.localeCompare(b.name);
	});
}
