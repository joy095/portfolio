import { writable, type Writable } from 'svelte/store';
import { client } from '$lib/sanity';
import type { Work } from '$lib/types/post';

export const posts: Writable<Work[]> = writable([]);
export const isLoading: Writable<boolean> = writable(false);
export const error: Writable<string | null> = writable(null);

export const fetchPosts = async (): Promise<void> => {
	isLoading.set(true);
	error.set(null);

	try {
		const query = `*[_type == "work"] | order(serial asc) {
      _id,
      title,
      slug,
      image,
	  description,
	  serial,
    }`;

		const result = await client.fetch<Work[]>(query);
		posts.set(result);
	} catch (err) {
		error.set(err instanceof Error ? err.message : 'An unknown error occurred');
		posts.set([]);
	} finally {
		isLoading.set(false);
	}
};

export const fetchPostBySlug = async (slug: string): Promise<Work | null> => {
	isLoading.set(true);
	error.set(null);

	try {
		const query = `*[_type == "post" && slug.current == $slug][0]`;
		const result = await client.fetch<Work>(query, { slug });
		return result;
	} catch (err) {
		error.set(err instanceof Error ? err.message : 'An unknown error occurred');
		return null;
	} finally {
		isLoading.set(false);
	}
};
