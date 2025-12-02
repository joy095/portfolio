// src/routes/[lang]/+layout.server.ts
import { baseLocale } from '$lib/paraglide/runtime.js';
import type { LayoutServerLoad } from './$types';

import { client } from '$lib/sanity';
import type { Work } from '$lib/types/post';

export const prerender = false;

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	// Correct variable assignment
	const lang = params.lang ?? baseLocale;

	// Save cookie for 1 year
	cookies.set('PARAGLIDE_LOCALE', lang, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: 'lax',
		secure: import.meta.env.PROD,
		httpOnly: false
	});

	// Fetch Sanity posts
	let posts: Work[] = [];

	try {
		const postsQuery = `*[_type == "work"] | order(serial asc)[0..3] {
			_id,
			title,
			"slug": slug.current,
			image {
				asset->{
					_id,
					url
				}
			},
			description,
			serial
		}`;

		posts = await client.fetch<Work[]>(postsQuery);
	} catch (err) {
		console.error('Error fetching posts in layout:', err);
	}

	// Returned to layout and child pages
	return {
		lang,
		posts
	};
};
