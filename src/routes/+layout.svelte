<script lang="ts">
	import '@fontsource-variable/space-grotesk';
	import { onMount } from 'svelte';

	import { initializeLenis } from '$lib/scroll';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import { headerAnimationComplete } from '$lib/stores/store';
	import Footer from '$lib/components/Footer.svelte';

	let numberOfLines = 11;
	let showSplash = false; // Initialize to false by default on SSR
	let isContentVisible = false; // Initialize to false to hide content initially

	onMount(() => {
		initializeLenis(); // Initialize Lenis on mount

		if (showSplash) {
			// Only hide splash after 3 seconds if it was shown
			setTimeout(() => {
				showSplash = false;
			}, 3000);
		}

		// Subscribe to headerAnimationComplete
		headerAnimationComplete.subscribe((isComplete: boolean) => {
			// Only update isContentVisible if splash is no longer shown
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

		/* Background container */
		.background {
			position: relative;
			min-height: 100vh;
			overflow: hidden;
		}

		/* Background lines */
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
