// src/routes/works/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';

export const load: PageServerLoad = async ({ params, parent }) => {
	console.log('Slug', params.slug);

	// Get current language from layout
	const { lang } = await parent();

	try {
		const query = `{
			// Current work item
			"current": *[_type == "work" && slug.current == $slug][0]{
				"title": coalesce(title[$lang], title.en),
				"slug": slug.current,
				serial,

				// Localized description + info
				"description": coalesce(description[$lang], description.en),
				"info": coalesce(info[$lang], info.en),

				// Images (no localization in schema except alt)
				image,
				image_2,
				image_3,
				image_4,
				image_5,

				link
			},

			// Next work (with localization)
			"next": *[
				_type == "work" && 
				serial > *[_type == "work" && slug.current == $slug][0].serial
			] | order(serial asc)[0]{
				"title": coalesce(title[$lang], title.en),
				"slug": slug.current,
				image,
				"description": coalesce(description[$lang], description.en),
			}
		}`;

		console.log('query', query);

		const { current, next } = await client.fetch(query, {
			slug: params.slug,
			lang
		});

		if (!current) {
			throw error(404, 'Work not found');
		}

		return {
			work: current,
			nextWork: next
		};
	} catch (err) {
		console.error('Error loading work:', err);
		throw error(500, 'Error loading work');
	}
};
