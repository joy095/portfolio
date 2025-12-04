// src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

// Enable SSG by setting prerender to true
export const prerender = true;

export const load: PageServerLoad = async () => {
	const query = `*[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    "author": author->{
      name
    },
    "categories": categories[]->{
      _id,
      title
    }
  }`;

	try {
		const posts = await client.fetch(query);
		if (!posts || posts.length === 0) {
			return { posts: [] };
		}
		return { posts };
	} catch (err) {
		console.error('Fetch error:', err);
		throw error(500, 'Failed to load posts');
	}
};
