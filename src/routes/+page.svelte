<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Project from '$lib/components/Project.svelte';
	import Experience from '$lib/components/Experience.svelte';

	import type { PageData } from './$types';
	import { smoothScrollToSection } from '$lib/scroll';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages';

	export let data: PageData;
	const { posts, error, lang } = data;

	const meta = {
		title: `${m['home_page.title']()}`,
		description: `${m['home_page.description']()}`,
		url: `https://joykarmakar.vercel.app/${lang}`,
		image: 'https://joykarmakar.vercel.app/logo.webp',
		siteName: 'Joy Karmakar Portfolio',
		twitterHandle: '@JoyKarmakar9871'
	};

	let contentVisible = false;

	onMount(() => {
		setTimeout(() => {
			contentVisible = true;
		}, 1500); // 1500ms = 1.5 seconds delay
	});
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

<Hero />

{#if contentVisible}
	<div class="container-auto">
		<div class="flex justify-between border-b-2 border-black/80 pb-3">
			<p class="font-medium text-2xl leading-[1.6] tracking-tighter">{m['home_page.feature_work']()}</p>
			<a
				on:click={(e) => smoothScrollToSection(e, '#project')}
				href="{lang}/#project"
				class="text-lg font-medium flex items-center gap-1"
			>
				{m['home_page.scroll_down']()}
				<enhanced:img
					loading="lazy"
					src="/static/icons/arrow.svg"
					alt="arrow"
					class="animate-bounce h-4 w-4"
				/>
			</a>
		</div>
	</div>

	<div id="project"></div>
{/if}

<!-- <Project {lang} {posts} {error} /> -->

{#if contentVisible}
	<div class="container-auto text-center mt-28">
		<a
			href="{lang}/works"
			class="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-medium rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300"
		>
			{m['home_page.all_works']()}
		</a>
	</div>
{/if}

<About />

<Experience />
