import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

// export const prerender = true;

export const load: PageServerLoad = async ({ parent }) => {
	const { lang } = await parent(); // get active locale from layout

	const query = `*[_type == "post" && !(_id in path('drafts.**'))] 
      | order(publishedAt desc) {
        _id,
        "title": title[$lang],
        "excerpt": excerpt[$lang],
        "content": content[$lang],
        "alt": mainImage.alt[$lang],
        slug,
        publishedAt,
        mainImage,
        "author": author->{
          name
        },
        "categories": categories[]->{
          _id,
          "title": title
        }
    }`;

	try {
		const posts = await client.fetch(query, { lang });

		return { posts };
	} catch (err) {
		console.error('Fetch error:', err);
		throw error(500, 'Failed to load posts');
	}
};
