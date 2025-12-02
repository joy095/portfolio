<script>
	import Project from '$lib/components/Project.svelte';
	import { fly } from 'svelte/transition';
	import { inView } from '$lib/actions/inView.js';

	export let data;
	const { posts, error, meta } = data;

	let showContact = false;

	setTimeout(() => {
		showContact = true;
	}, 1000);
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

<div use:inView={{ threshold: 0.2 }} on:inview={() => (showContact = true)} class="container-auto">
	<h1
		class="mt-40 font-semibold text-[5rem] md:text-[6.875rem] tracking-tighter leading-tight"
		in:fly={{ duration: 800, y: 50 }}
	>
		Works
	</h1>

	<div class="border-t border-black"></div>
</div>
<Project {posts} {error} />
