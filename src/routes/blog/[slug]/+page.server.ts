// src/routes/blog/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { error } from '@sveltejs/kit';

// Enable SSG
export const prerender = true;

// Define all possible slugs for pre-rendering
export async function entries() {
	const query = `*[_type == "post" && !(_id in path('drafts.**'))] {
    slug
  }`;
	try {
		const posts = await client.fetch(query);
		return posts.map((post: { slug: { current: string } }) => ({
			slug: post.slug.current
		}));
	} catch (err) {
		console.error('Error fetching slugs:', err);
		return [];
	}
}

const builder = imageUrlBuilder(client);

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
			title: post.title || 'Untitled Post',
			description:
				post.seo?.metaDescription || `Read "${post.title || 'Untitled Post'}" on our blog`,
			url: `https://joykarmakar.vercel.app/blog/${params.slug}`,
			image: post.mainImage
				? _urlFor(post.mainImage).width(1200).url()
				: 'https://joykarmakar.vercel.app/logo.webp'
		};
	} catch (err) {
		console.error('Fetch error:', err);
		throw error(500, 'Failed to load post');
	}
};
