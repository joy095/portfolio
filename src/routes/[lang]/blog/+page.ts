import { locales } from '$lib/paraglide/runtime';
import type { PageLoad } from './$types';

export const prerender = true;

// Tell SvelteKit which lang values are valid
export function entries() {
	return locales.map((lang) => ({ lang }));
}

export const load: PageLoad = async ({ params }) => {
	return {
		lang: params.lang
	};
};
