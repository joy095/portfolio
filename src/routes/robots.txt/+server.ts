export function GET() {
	return new Response(
		`User-agent: *
Allow: /
Sitemap: https://joykarmakar.vercel.app/sitemap.xml`,
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
}
