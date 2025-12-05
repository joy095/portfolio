import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { error } from '@sveltejs/kit';

// export const prerender = true;

// Pre-render all slugs
export async function entries() {
	const query = `*[_type == "post" && !(_id in path('drafts.**'))]{
		"slug": slug.current
	}`;
	try {
		const posts = await client.fetch(query);
		return posts.map((p: { slug: string }) => ({ slug: p.slug }));
	} catch (err) {
		console.error('Error fetching slugs:', err);
		return [];
	}
}

const builder = createImageUrlBuilder(client);

function _urlFor(source: any) {
	return builder.image(source);
}

export const load: PageServerLoad = async ({ params, parent }) => {
	// get active locale from layout +layout.server.ts
	const { lang } = await parent();

	// GROQ with localization + fallback (de → en)
	const query = `
		*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
			"title": coalesce(title[$lang], title.en),
			"excerpt": coalesce(excerpt[$lang], excerpt.en),
			"content": coalesce(content[$lang], content.en),
			"alt": coalesce(mainImage.alt[$lang], mainImage.alt.en),

			slug,
			publishedAt,
			mainImage,

			"author": author->{
				name,
				image,
				"bio": coalesce(bio[$lang], bio.en)
			},

			"categories": categories[]->{
				_id,
				"title": coalesce(title)
			},

			tags,
			seo
		}
	`;

	try {
		const post = await client.fetch(query, { slug: params.slug, lang });

		if (!post) {
			throw error(404, 'Post not found');
		}

		return {
			post,
			title: post.title ?? 'Untitled Post',

			description: post.seo?.metaDescription ?? `Read "${post.title ?? 'Untitled Post'}"`,

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
