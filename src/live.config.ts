/**
 * EmDash live content collections.
 *
 * Registers the _emdash loader so Astro Content Layer can query
 * EmDash collections via getEmDashCollection() / getEmDashEntry().
 */
import { defineLiveCollection } from "astro:content";
import { emdashLoader } from "emdash/runtime";

export const collections = {
	_emdash: defineLiveCollection({ loader: emdashLoader() }),
};
