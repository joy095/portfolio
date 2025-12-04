<!-- ParallaxScroll.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	interface $$Props {
		speed?: number;
	}

	export let speed: number = 2;

	let container: HTMLDivElement;
	let content: HTMLDivElement;
	let containerHeight: number = 0;

	onMount(() => {
		// Get initial content height
		if (content) {
			const contentRect = content.getBoundingClientRect();
			containerHeight = contentRect.height;
		}

		const handleScroll = (): void => {
			if (!container || !content) return;

			const containerRect = container.getBoundingClientRect();
			const scrolledPastContainer = -containerRect.top;

			if (containerRect.top <= window.innerHeight && containerRect.bottom >= 0) {
				const translateY = scrolledPastContainer * speed;
				content.style.transform = `translateY(${translateY}px)`;
			}
		};

		// Also handle resize events to update height if content changes
		const handleResize = (): void => {
			if (content) {
				const contentRect = content.getBoundingClientRect();
				containerHeight = contentRect.height;
			}
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="parallax-container" bind:this={container} style="height: {containerHeight}px">
	<div class="parallax-content" bind:this={content}>
		<slot></slot>
	</div>
</div>

<style>
	.parallax-container {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.parallax-content {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
