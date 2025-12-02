import type { PageLoad } from './$types';
import { getWorkBySlug, getNextWork, getAllWorkSlugs } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export const prerender = true;

export async function entries() {
	try {
		const slugs = await getAllWorkSlugs();
		if (!Array.isArray(slugs)) throw new Error('Slugs should be an array');
		const languages = ['en', 'de']; // Replace with your actual supported languages
        return slugs.flatMap(slug => 
            languages.map(lang => ({ lang, slug }))
        );
	} catch (err) {
		console.error('Error fetching work slugs for prerender:', err);
		return [];
	}
}

export const load: PageLoad = async ({ params, url }) => {
	const slug = params.slug;
	const lang = params.lang;

	const work = await getWorkBySlug(slug, lang);
	if (!work) throw error(404, 'Work not found');
	const nextWork = await getNextWork(slug, lang);

	const fullUrl = `${url.origin}/${lang}/works/${slug}`;

	return {
		work,
		nextWork,
		meta: {
			title: work.title ? `${work.title} - Joy Karmakar` : 'Joy Karmakar',
			description: work.description || 'Project showcase by Joy Karmakar',
			image: work.image || undefined,
			url: fullUrl,
			twitterHandle: '@JoyKarmakar9871'
		}
	};
};
