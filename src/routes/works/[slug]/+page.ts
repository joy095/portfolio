import type { PageLoad } from './$types';
import { getWorkBySlug, getNextWork, getAllWorkSlugs } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function entries() {
	try {
		const slugs = await getAllWorkSlugs();
		if (!Array.isArray(slugs)) throw new Error('Slugs should be an array');
		return slugs.map((slug) => ({ slug }));
	} catch (err) {
		console.error('Error fetching work slugs for prerender:', err);
		return [];
	}
}

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	const work = await getWorkBySlug(slug);
	if (!work) throw error(404, 'Work not found');
	const nextWork = await getNextWork(slug);

	const fullUrl = `https://joykarmakar.vercel.app/works/${slug}`;

	return {
		work,
		nextWork,
		meta: {
			title: `${work.title} - Joy Karmakar`,
			description: work.description || 'Project showcase by Joy Karmakar',
			image: work.image,
			url: fullUrl,
			twitterHandle: '@JoyKarmakar9871'
		}
	};
};
