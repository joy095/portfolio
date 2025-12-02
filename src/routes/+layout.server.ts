import { baseLocale, locales, setLocale } from '$lib/paraglide/runtime.js';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const lang = params.lang;

	// Validate the locale
	if (!locales.includes(lang)) {
		redirect(307, `/${baseLocale}`);
	}

	// Set the locale for server-side rendering
	setLocale(lang);

	return {
		lang
	};
};
