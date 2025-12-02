// src/routes/+page.ts
import type { Load } from '@sveltejs/kit';

// The 'data' parameter here contains the data returned from +page.server.ts
export const load: Load = async ({ data }) => {
	// We combine the server-fetched posts with the meta data.
	// 'data' here refers to the data resolved from +page.server.ts load function.
	return {
		// Spread the server data (which contains 'posts' and potential 'error/status')
		...data,
		// Add your static meta data
		meta: {
			title: 'Joy Karmakar - Full Stack Developer & UI/UX Designer',
			description:
				'Portfolio of Joy Karmakar - Full Stack Developer specializing in React, Svelte, Node.js and modern web technologies. Explore my projects and experience.',
			url: 'https://joykarmakar.vercel.app',
			image: 'https://joykarmakar.vercel.app/logo.webp',
			siteName: 'Joy Karmakar Portfolio',
			twitterHandle: '@JoyKarmakar9871'
		}
	};
};
