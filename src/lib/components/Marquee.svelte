<!-- Marquee.svelte -->
<script>
	export let speed = 30; // Speed in seconds
	export let direction = 'left'; // or 'right'
</script>

<div class="marquee-container">
	<div
		class="marquee-content"
		style="--duration: {speed}s; --direction: {direction === 'left' ? -1 : 1};"
	>
		<div class="marquee-item">
			<slot />
		</div>
		<div class="marquee-item" aria-hidden="true">
			<slot />
		</div>
	</div>
</div>

<style>
	.marquee-container {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.marquee-content {
		display: flex;
		width: max-content;
		transform: translateX(var(--scroll-start, 0));
		animation: scroll var(--duration) linear infinite;
	}

	.marquee-item {
		flex-shrink: 0;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(var(--direction) * 50%));
		}
	}
</style>
