<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import StaggerText from './StaggerText.svelte';
	import { inView } from '$lib/actions/inView';

	let text = `A showcase of web applications and backend systems I’ve developed using modern tools like Go, PostgreSQL, Redis, SvelteKit, React, Node.js, and more — all focused on speed, scalability, and great user experience.`;

	let scrollDirection: 'up' | 'down' | null = null;
	let lastScrollTop = 0;
	let scrollTimeout: ReturnType<typeof setTimeout>;

	const xPos1 = tweened(0, {
		duration: 4000,
		easing: cubicOut
	});
	const xPos2 = tweened(0, {
		duration: 4000,
		easing: cubicOut
	});

	const handleScroll = () => {
		const currentScrollTop = window.scrollY;
		const direction = currentScrollTop > lastScrollTop ? 'down' : 'up';
		scrollDirection = direction;

		const tenVwInPx = (window.innerWidth / 100) * 10; // This will be your 10vw equivalent in pixels

		// Set the target position based on scroll direction using the calculated pixel value.
		xPos1.set(direction === 'down' ? -tenVwInPx : tenVwInPx);
		xPos2.set(direction === 'down' ? tenVwInPx : -tenVwInPx);

		// Clear previous timeout
		clearTimeout(scrollTimeout);

		// Set timeout to reset position when scrolling stops
		scrollTimeout = setTimeout(() => {
			xPos1.set(0);
			xPos2.set(0);
		}, 150); // Adjust delay as needed

		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(scrollTimeout);
		};
	});

	let showHero = false;
	// Define a key for localStorage
	const HAS_VISITED_HOME_KEY = 'hasVisitedHome';
	const INITIAL_LOAD_DELAY = 1500; // Your desired delay in milliseconds

	onMount(() => {
		// Check if the user has visited the home page before
		const hasVisited = localStorage.getItem(HAS_VISITED_HOME_KEY);

		if (hasVisited) {
			// If already visited, show the content immediately
			showHero = true;
		} else {
			// If it's the first visit, apply the delay
			setTimeout(() => {
				showHero = true;
				// Set the flag in localStorage so next time there's no delay
				localStorage.setItem(HAS_VISITED_HOME_KEY, 'true');
			}, INITIAL_LOAD_DELAY);
		}
	});
</script>

{#if showHero}
	<div
		use:inView={{ threshold: 0.2 }}
		on:inview={() => (showHero = true)}
		id="hero"
		class="overflow-hidden container-auto"
	>
		<div style="transform: translateX({$xPos1}px)">
			<div
				in:fly={{ y: 20, duration: 800, delay: 300, opacity: 0 }}
				id="animated-text"
				class="flex items-center justify-center gap-5 transition-transform duration-800"
			>
				<img
					loading="lazy"
					class="icon h-[12vw] sm:h-20 xl:h-full {scrollDirection}"
					src="/icons/line.svg"
					alt=""
				/>
				<h2
					class="text-[10vw] xl:text-[7rem] lg:text-[5.5rem] md:text-[5rem] leading-[0.8] font-light tracking-tighter"
				>
					I'm Joy Karmakar
				</h2>
			</div>
		</div>

		<div class="flex flex-col xl:flex-row justify-between mt-10 gap-10 sm:mx-[8vw] lg:mx-14">
			<div
				in:fly={{ y: 20, duration: 800, delay: 1200, opacity: 0 }}
				class="xl:max-w-[50%] min-h-fit"
			>
				<StaggerText
					charClass="font-medium text-lg md:text-xl lg:text-2xl leading-[1.6] tracking-tighter"
					{text}
					delay={5}
					initialDelay={200}
					duration={800}
				/>
			</div>

			<div
				in:fly={{ y: 20, duration: 800, delay: 600, opacity: 0 }}
				class="flex items-center min-w-fit"
			>
				<h3 class="font-bold text-[10vw] xl:text-[7rem] lg:text-[5.5rem] md:text-[5rem]">
					A developer
				</h3>
			</div>
		</div>

		<div style="transform: translateX({$xPos2}px)">
			<h2
				in:fly={{ y: 20, duration: 800, delay: 900, opacity: 0 }}
				class="text-[10vw] xl:text-[7rem] lg:text-[5.5rem] md:text-[5rem] font-light leading-[0.9] mt-4 tracking-tighter flex justify-center"
			>
				lives by develop
			</h2>
		</div>
	</div>
{/if}

<style>
	.letter {
		display: inline-block;
	}

	.icon {
		animation: spinnerUp 10s linear infinite;
	}
	.icon.up {
		animation: spinnerUp 10s linear infinite;
	}
	.icon.down {
		animation: spinnerDown 10s linear infinite;
	}

	@keyframes spinnerUp {
		to {
			transform: rotate(-360deg);
		}
	}

	@keyframes spinnerDown {
		to {
			transform: rotate(360deg);
		}
	}
</style>
