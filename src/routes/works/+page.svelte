<script>
	import Project from '$lib/components/Project.svelte';

	export let data;
	const { posts, error, meta } = data;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />

	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={meta.siteName} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta name="twitter:site" content={meta.twitterHandle} />
	<meta name="twitter:creator" content={meta.twitterHandle} />
</svelte:head>

<Project {posts} {error} />
