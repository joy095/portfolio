import { locales, setLocale } from '$lib/paraglide/runtime.js';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	const lang = params.lang;

	const langCookie = cookies.get('PARAGLIDE_LOCALE') ?? lang;

	// Validate the locale
	if (!locales.includes(lang)) {
		redirect(307, `/${langCookie}`);
	}

	// Set the locale for server-side rendering
	setLocale(lang);

	return {
		lang
	};
};
