import { baseLocale } from '$lib/paraglide/runtime.js';
import type { LayoutServerLoad } from './$types';
import { client } from '$lib/sanity';
import type { Work } from '$lib/types/post';

export const prerender = true;

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	const lang = params.lang ?? baseLocale;

	// Set cookie
	cookies.set('PARAGLIDE_LOCALE', lang, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		httpOnly: false
	});

	// <-- READ THE COOKIE
	const langCookie = cookies.get('PARAGLIDE_LOCALE') ?? lang;

	// Fetch Sanity posts
	let posts: Work[] = [];
	try {
		const postsQuery = `*[_type == "work"] | order(serial asc)[0..3] {
			_id,
			title,
			"slug": slug.current,
			image { asset->{ _id, url } },
			description,
			serial
			}`;
		posts = await client.fetch<Work[]>(postsQuery);
	} catch (err) {
		console.error('Error fetching posts', err);
	}

	return {
		lang,
		langCookie,
		posts
	};
};
