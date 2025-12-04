<script lang="ts">
	import { useImageReveal } from '$lib/actions/useImageReveal';

	export let src: string;
	export let alt: string = '';
	export let className: string = '';
	export let revealOptions: {
		duration?: number;
		ease?: string;
		color?: string;
		delay?: number;
	} = {};

	export let srcset: string = '';
	export let sizes: string = '';
</script>

<div class="reveal-wrapper {className}" use:useImageReveal={revealOptions}>
	<img loading="lazy" {src} {alt} class="w-full h-full object-cover" />
</div>

<style>
	.reveal-wrapper {
		width: 100%;
		height: 100%;
	}
</style>
