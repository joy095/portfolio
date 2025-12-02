<script lang="ts">
	import '@fontsource-variable/space-grotesk';
	import { onMount } from 'svelte';

	import { initializeLenis } from '$lib/scroll';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import { headerAnimationComplete } from '$lib/stores/store';
	import Footer from '$lib/components/Footer.svelte';

	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let numberOfLines = 11;
	let showSplash = false;
	let isContentVisible = false;

	onMount(() => {
		initializeLenis();

		if (showSplash) {
			setTimeout(() => {
				showSplash = false;
			}, 3000);
		}

		headerAnimationComplete.subscribe((isComplete: boolean) => {
			if (!showSplash) {
				isContentVisible = isComplete;
			}
		});
	});
</script>

<main class="background" style="--number-of-lines: {numberOfLines}">
	<div class="mt-20">
		<slot />
	</div>
</main>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<Header />
{#if isContentVisible}
	<Cursor />
	<Footer />
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	:global(html) {
		font-family: 'Space Grotesk Variable', sans-serif;
		color: #151515;
		background-color: #f1efed;
		letter-spacing: -0.02em;

		.background {
			position: relative;
			min-height: 100vh;
			overflow: hidden;
		}

		.background::before {
			content: '';
			position: absolute;
			top: 0;
			left: -5vw;
			right: 0;
			bottom: 0;
			background-image: repeating-linear-gradient(
				to right,
				transparent,
				transparent calc((100% - 4vw) / var(--number-of-lines) - 1px),
				rgba(204, 204, 204, 0.3) calc((100% - 4vw) / var(--number-of-lines) - 1px),
				rgba(204, 204, 204, 0.3) calc((100% - 4vw) / var(--number-of-lines))
			);
			z-index: -1;
		}
	}
</style>
