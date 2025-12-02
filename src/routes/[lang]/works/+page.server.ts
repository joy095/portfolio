// src/routes/+page.server.ts
import { client } from '$lib/sanity';
import type { Work } from '$lib/types/post';
import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const postsQuery = `*[_type == "work"] | order(serial asc) {
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
            serial,
        }`;
		const posts: Work[] = await client.fetch<Work[]>(postsQuery);

		return {
			posts: posts
		};
	} catch (err) {
		console.error('Error fetching posts for main page SSG:', err);
		throw error(500, 'Failed to load posts.');
	}
}

export const prerender = true; // Crucial for SSG
