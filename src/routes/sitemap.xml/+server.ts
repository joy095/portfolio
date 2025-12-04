import { client } from '$lib/sanity';

export async function GET() {
	const site = 'https://joykarmakar.vercel.app';

	const works = await client.fetch(`*[_type == "work"]{ "slug": slug.current }`);
	const blogs = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);

	const urls = [
		{ loc: `${site}/`, priority: 1.0 },
		{ loc: `${site}/about`, priority: 0.9 },
		{ loc: `${site}/contact`, priority: 0.9 },
		{ loc: `${site}/works`, priority: 0.8 },
		...works.map((w: { slug: string }) => ({
			loc: `${site}/works/${w.slug}`,
			priority: 0.8
		})),
		...blogs.map((w: { slug: string }) => ({
			loc: `${site}/blog/${w.slug}`,
			priority: 0.8
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `<url>
	<loc>${url.loc}</loc>
	<priority>${url.priority}</priority>
</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
