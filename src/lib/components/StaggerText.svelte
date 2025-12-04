<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let text: string = '';
	export let delay: number = 30;
	export let initialDelay: number = 0;
	export let duration: number = 800;
	export let lineDelay: number = 500;

	// CSS class props
	export let containerClass: string = '';
	export let lineClass: string = '';
	export let wordClass: string = '';
	export let charClass: string = '';

	let mounted = false;
	let lines: string[][][] = [];
	let visibleChars: boolean[][][] = [];

	onMount(() => {
		lines = text.split('\n').map((line) => line.split(' ').map((word) => Array.from(word)));

		visibleChars = lines.map((line) => line.map((word) => new Array(word.length).fill(false)));

		lines.forEach((line, lineIndex) => {
			const lineStartDelay = initialDelay + lineDelay * lineIndex;

			line.forEach((word, wordIndex) => {
				word.forEach((_, charIndex) => {
					setTimeout(
						() => {
							visibleChars[lineIndex][wordIndex][charIndex] = true;
						},
						lineStartDelay + delay * getCharCountBeforePosition(lineIndex, wordIndex, charIndex)
					);
				});
			});
		});

		mounted = true;
	});

	function getCharCountBeforePosition(
		lineIndex: number,
		wordIndex: number,
		charIndex: number
	): number {
		let count = 0;
		for (let w = 0; w <= wordIndex; w++) {
			for (let c = 0; c < (w === wordIndex ? charIndex : lines[lineIndex][w].length); c++) {
				count++;
			}
		}
		return count;
	}
</script>

<div
	in:fly={{ y: 20, duration: 800, delay: 300, opacity: 0 }}
	class={`flex flex-col ${containerClass}`}
>
	{#if mounted}
		{#each lines as line, lineIndex}
			<div class={`flex flex-wrap gap-x-2 ${lineClass}`}>
				{#each line as word, wordIndex}
					<span class={`inline-flex ${wordClass}`}>
						{#each word as char, charIndex}
							{#if visibleChars[lineIndex][wordIndex][charIndex]}
								<span
									class={charClass}
									in:fly={{
										y: 20,
										duration,
										delay: 0
									}}
								>
									{char}
								</span>
							{/if}
						{/each}
					</span>
				{/each}
			</div>
		{/each}
	{/if}
</div>
