// src/routes/works/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }: { params: { slug: string } }) => {
	try {
		const query = `{
            "current": *[_type == "work" && slug.current == $slug][0]{
                title,
                "slug": slug.current,
                serial,
                image,
                image_2,
                image_3,
                image_4,
                image_5,
                description,
                info,
                link,
            },
            "next": *[_type == "work" && serial > *[_type == "work" && slug.current == $slug][0].serial] | order(serial asc)[0]{
            title,
            "slug": slug.current,
            image,
            description,
            }
        }`;

		const { current, next } = await client.fetch(query, { slug: params.slug });

		if (!current) {
			throw error(404, 'Work not found');
		}

		return {
			work: current,
			nextWork: next
		};
	} catch (err) {
		console.error('Error loading work:', err);
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		throw error(500, 'Error loading work');
	}
};
