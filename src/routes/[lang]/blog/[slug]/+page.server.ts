import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { error } from '@sveltejs/kit';

// DO NOT prerender this - it has dynamic content
export const prerender = false;

const builder = createImageUrlBuilder(client);

function _urlFor(source: any) {
	return builder.image(source);
}

export const load: PageServerLoad = async ({ params }) => {
	const query = `*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    title,
    slug,
    publishedAt,
    content,
    mainImage,
    "author": author->{
      name,
      image,
      bio
    },
    "categories": categories[]->{
      _id,
      title
    },
    tags,
    seo
  }`;

	try {
		const post = await client.fetch(query, { slug: params.slug });

		if (!post) {
			throw error(404, 'Post not found');
		}

		return {
			post,
			lang: params.lang,
			title: post.title || 'Untitled Post',
			description:
				post.seo?.metaDescription || `Read "${post.title || 'Untitled Post'}" on our blog`,
			url: `https://joykarmakar.vercel.app/${params.lang}/blog/${params.slug}`,
			image: post.mainImage
				? _urlFor(post.mainImage).width(1200).url()
				: 'https://joykarmakar.vercel.app/logo.webp'
		};
	} catch (err) {
		// Re-throw SvelteKit errors to preserve status codes
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Fetch error:', err);
		throw error(500, 'Failed to load post');
	}
};
