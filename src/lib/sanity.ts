import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

export const client: SanityClient = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATABASE,
	apiVersion: import.meta.env.VITE_SANITY_VERSION,
	useCdn: true
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export async function getWorkBySlug(slug: string) {
	const query = `*[_type == "work" && slug.current == $slug][0]{
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
		link
	}`;
	return await client.fetch(query, { slug });
}

export async function getNextWork(slug: string) {
	const query = `
		*[_type == "work" && serial > *[_type == "work" && slug.current == $slug][0].serial] 
		| order(serial asc)[0]{
			title,
			"slug": slug.current,
			image,
			description
		}`;
	return await client.fetch(query, { slug });
}

export async function getAllWorkSlugs(): Promise<string[]> {
	const query = `*[_type == "work" && defined(slug.current)]{ "slug": slug.current }`;
	const results = await client.fetch(query);
	if (!Array.isArray(results)) throw new Error('Expected array from Sanity');
	return results.map((item: { slug: string }) => item.slug);
}
