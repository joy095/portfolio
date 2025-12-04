// src/routes/+page.server.ts
import { client } from '$lib/sanity';
import type { Work } from '$lib/types/post';

export async function load() {
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
            serial,
        }`;
		const posts: Work[] = await client.fetch<Work[]>(postsQuery);

		return {
			posts
		};
	} catch (err) {
		console.error('Error fetching posts for main page SSG:', err);
		return {
			status: 500,
			error: new Error('Failed to load posts.'),
			posts: []
		};
	}
}

export const prerender = true;
