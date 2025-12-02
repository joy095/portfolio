// src/routes/[lang]/works/+page.ts
import type { PageLoad } from './$types';

// The 'data' parameter here contains the data returned from +page.server.ts
export const load: PageLoad = async ({ data, params }) => {
	const { lang } = params;
	// We combine the server-fetched posts with the meta data.
	// 'data' here refers to the data resolved from +page.server.ts load function.
	return {
		// Spread the server data (which contains 'posts' and potential 'error/status')
		...data,
		// Add your static meta data
		meta: {
			title: 'Joy Karmakar - Work',
			description:
				'Work of Joy Karmakar - Full Stack Developer specializing in React, Svelte, Node.js and modern web technologies. Explore my projects and experience.',
			url: `https://joykarmakar.vercel.app/${lang}/works`,
			image: 'https://joykarmakar.vercel.app/logo.webp',
			siteName: 'Joy Karmakar Portfolio',
			twitterHandle: '@JoyKarmakar9871'
		}
	};
};
