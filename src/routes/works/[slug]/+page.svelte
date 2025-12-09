<script lang="ts">
	import { goto } from '$app/navigation';
	import { isLoading, error } from '$lib/stores/posts';
	import type { Work, NextWork } from '$lib/types/post';
	import { urlFor } from '$lib/sanity';
	import ParallaxScroll from '$lib/components/ParallaxScroll.svelte';
	import RevealImage from '$lib/components/RevealImage.svelte';
	import { fly } from 'svelte/transition';

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	export let data: {
		work: Work;
		nextWork: NextWork | null;
		meta: {
			title: string;
			description: string;
			image: any;
			url: string;
			twitterHandle: string;
		};
	};

	let { work, nextWork, meta } = data;

	const handleWorkNavigation = async (slug: string, e: MouseEvent) => {
		e.preventDefault();
		isLoading.set(true);

		try {
			await goto(`/works/${slug}`, {
				replaceState: false,
				invalidateAll: true
			});

			// Update local state with new data after navigation
			work = data.work;
			nextWork = data.nextWork;
		} catch (err) {
			console.error('Navigation failed:', err);
			error.set(err instanceof Error ? err.message : 'Navigation failed');
		} finally {
			isLoading.set(false);
		}
	};

	// Update state when data changes
	$: {
		work = data.work;
		nextWork = data.nextWork;
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<meta name="author" content="Joy Karmakar" />

	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={urlFor(meta.image).url()} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={urlFor(meta.image).url()} />
	<meta name="twitter:creator" content={meta.twitterHandle} />

	<link rel="canonical" href={meta.url} />
</svelte:head>

{#if $isLoading}
	<div class="flex justify-center items-center min-h-[500px]">
		<div
			class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
		></div>
	</div>
{:else if $error}
	<div class="max-w-3xl mx-auto px-4 py-12">
		<div class="bg-red-50 border-l-4 border-red-400 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="ml-3">
					<p class="text-sm text-red-700">{$error}</p>
				</div>
			</div>
		</div>
	</div>
{:else if work}
	<article class="container-auto my-40">
		<header class="mb-3 relative pb-2 overflow-hidden">
			<div class="nav-border"></div>
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-40 mb-4">
				<h1 class="text-5xl md:text-7xl font-bold text-gray-900">{work.title}</h1>
				<span class="rounded-full text-2xl font-medium">
					{work.description}
				</span>
			</div>
		</header>

		<div class="prose prose-lg max-w-none">
			<div class="flex items-end flex-col gap-5 mb-8">
				{#if work.link}
					<a
						class="text-xl font-medium button overflow-hidden flex items-center gap-2"
						target="_blank"
						href={work.link}
						rel="noopener noreferrer"
						in:fly={{ y: 20, duration: 600, delay: 500 }}
					>
						View live website
						<enhanced:img class="h-4 w-4" src="/static/icons/arrow-black.svg" alt="icon" />
					</a>
				{/if}
			</div>
			<div class="flex flex-col gap-5">
				{#if work.image}
					<div class="h-[35vh] md:h-[90vh]">
						<ParallaxScroll speed={0.2}>
							<img
								loading="lazy"
								srcset={`
										${urlFor(work.image).width(480).auto('format').url()} 480w,
										${urlFor(work.image).width(768).auto('format').url()} 768w,
										${urlFor(work.image).width(1024).auto('format').url()} 1024w,
										${urlFor(work.image).width(1440).auto('format').url()} 1440w
										`}
								src={urlFor(work.image).width(800).auto('format').url()}
								sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
								alt={work.title}
								class="w-full h-[35vh] md:h-[90vh] object-cover"
							/>
						</ParallaxScroll>
					</div>
				{/if}

				{#if work.info}
					<div class="md:w-[50%] ml-auto my-20">
						<p class="font-medium text-xl">
							{@html work.info.replace(/\n/g, '<br />')}
						</p>
					</div>
				{/if}
				{#if work.image_2}
					<ParallaxScroll speed={0.2}>
						<div class="bg-[#c3c2be] md:px-[10%] pt-[15%]">
							<img
								loading="lazy"
								srcset={`
										${urlFor(work.image_2).width(480).auto('format').url()} 480w,
										${urlFor(work.image_2).width(768).auto('format').url()} 768w,
										${urlFor(work.image_2).width(1024).auto('format').url()} 1024w,
										${urlFor(work.image_2).width(1440).auto('format').url()} 1440w
									`}
								src={urlFor(work.image_2).width(800).auto('format').url()}
								sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
								alt={work.title}
								class="mx-auto w-[85%] md:w-full min-h-[100vh] md:min-h-[500vh] object-cover"
							/>
						</div>
					</ParallaxScroll>
				{/if}

				<div class="grid md:grid-cols-2 gap-5 items-stretch">
					{#if work.image_3}
						<ParallaxScroll speed={0.2}>
							<div
								class="relative w-full md:px-[10%] md:h-[120vh] bg-[#c3c2be] flex justify-center items-center overflow-hidden"
							>
								<img
									loading="lazy"
									srcset={`
										${urlFor(work.image_3).width(480).auto('format').url()} 480w,
										${urlFor(work.image_3).width(768).auto('format').url()} 768w,
										${urlFor(work.image_3).width(1024).auto('format').url()} 1024w,
										${urlFor(work.image_3).width(1440).auto('format').url()} 1440w
									`}
									src={urlFor(work.image_3).width(800).auto('format').url()}
									sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
									alt={work.title}
									class="w-[85%] md:w-full max-w-full min-h-[50vh] max-h-full object-contain"
								/>
							</div>
						</ParallaxScroll>
					{/if}
					{#if work.image_4}
						<ParallaxScroll speed={0.2}>
							<div
								class="relative w-full md:px-[10%] md:h-[120vh] bg-[#c3c2be] flex justify-center items-center overflow-hidden"
							>
								<img
									loading="lazy"
									srcset={`
										${urlFor(work.image_4).width(480).auto('format').url()} 480w,
										${urlFor(work.image_4).width(768).auto('format').url()} 768w,
										${urlFor(work.image_4).width(1024).auto('format').url()} 1024w,
										${urlFor(work.image_4).width(1440).auto('format').url()} 1440w
									`}
									src={urlFor(work.image).width(800).auto('format').url()}
									sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
									alt={work.title}
									class="w-[85%] md:w-full max-w-full min-h-[50vh] max-h-full object-contain"
								/>
							</div>
						</ParallaxScroll>
					{/if}
				</div>
				{#if work.image_5}
					<ParallaxScroll speed={0.2}>
						<div
							class="relative w-full md:px-[10%] md:h-[120vh] bg-[#c3c2be] flex justify-center items-center overflow-hidden"
						>
							<img
								loading="lazy"
								srcset={`
										${urlFor(work.image_5).width(480).auto('format').url()} 480w,
										${urlFor(work.image_5).width(768).auto('format').url()} 768w,
										${urlFor(work.image_5).width(1024).auto('format').url()} 1024w,
										${urlFor(work.image_5).width(1440).auto('format').url()} 1440w
									`}
								src={urlFor(work.image_5).width(800).auto('format').url()}
								sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
								alt={work.title}
								class="w-[85%] md:w-full max-w-full min-h-[50vh] max-h-full object-contain"
							/>
						</div>
					</ParallaxScroll>
				{/if}
			</div>
		</div>
	</article>

	{#if nextWork}
		<div class="container-auto mb-20">
			<div class="flex justify-between pb-3 relative overflow-hidden">
				<p
					class="font-medium text-2xl leading-[1.6] tracking-tighter"
					in:fly={{ x: -20, duration: 600, delay: 100 }}
				>
					Next Project
				</p>
				<div class="nav-border"></div>
			</div>

			<div class="post-container">
				<a
					href={`/works/${nextWork?.slug}`}
					class="post-card translate-y-10 transition-all duration-1000 ease-out"
					data-sveltekit-reload
				>
					<div class="flex flex-col mt-8 md:mt-0 justify-between gap-4 md:gap-5 md:w-[30%] pr-5">
						{#if nextWork}
							<h2 class="title">{nextWork.title}</h2>
						{/if}
						<div class="flex flex-col gap-4 md:gap-6">
							{#if nextWork.description}
								<p class="font-medium text-xl tracking-[.8]">{nextWork.description}</p>
							{/if}
							<button
								class="btn"
								on:click={(e) => nextWork && handleWorkNavigation(nextWork.slug, e)}
								on:click={scrollToTop}
								on:keydown={(e) => e.key === 'Enter' && scrollToTop()}
								in:fly={{ y: 20, duration: 600, delay: 700 }}>View</button
							>
						</div>
					</div>
					{#if nextWork.image}
						<div class="banner-wrap">
							<RevealImage
								className="project-banner"
								srcset={`
										${urlFor(nextWork.image).width(480).auto('format').url()} 480w,
										${urlFor(nextWork.image).width(768).auto('format').url()} 768w,
										${urlFor(nextWork.image).width(1024).auto('format').url()} 1024w,
										${urlFor(nextWork.image).width(1440).auto('format').url()} 1440w
									`}
								src={urlFor(nextWork.image).width(800).auto('format').url()}
								sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
								alt={nextWork.title}
								revealOptions={{
									duration: 1
								}}
							/>
						</div>
					{/if}
				</a>
			</div>
		</div>
	{/if}
{:else}
	<div class="flex justify-center items-center min-h-[500px]">
		<p class="text-gray-500">Work not found.</p>
	</div>
{/if}

<style>
	.nav-border {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: black;
		width: 100%;
		right: 100%;
		opacity: 0;
		animation: border 1.2s ease-in-out 0.4s forwards;
	}

	@keyframes border {
		0% {
			right: 100%;
			opacity: 1;
		}
		100% {
			right: 0;
			opacity: 1;
		}
	}

	.button {
		position: relative;
		cursor: pointer;
		overflow: hidden;
		width: fit-content;
	}

	.button:hover img {
		rotate: 45deg;
		transition: rotate 0.4s ease;
	}
	.button:not(:hover) img {
		rotate: 0deg;
		transition: rotate 0.4s ease;
	}

	.button::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: -100%;
		height: 2px;
		width: 100%;
		background-color: #151515;
		transition: left 0.4s ease;
	}

	.button:hover::before {
		animation: slideIn 0.4s ease forwards;
	}

	.button:not(:hover)::before {
		animation: slideOut 0.4s ease forwards;
	}

	@keyframes slideIn {
		0% {
			left: -100%;
		}
		100% {
			left: 0%;
		}
	}

	@keyframes slideOut {
		0% {
			left: 0%;
		}
		100% {
			left: 100%;
		}
	}

	.post-container {
		margin-top: 5rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.post-card {
		display: flex;
		justify-content: space-between;
		flex-direction: column-reverse;
		will-change: transform, opacity;
	}

	.banner-wrap {
		height: 30vh;
	}

	.title {
		font-size: 2rem;
		font-weight: 500;
	}

	.btn {
		background-color: rgba(21, 21, 21, 0.08);
		padding: 0.6rem 1rem;
		width: fit-content;
		border-radius: 0.25rem;
		font-weight: 500;
	}

	@media (min-width: 768px) {
		.post-card {
			flex-direction: row;
		}
		.banner-wrap {
			width: 70%;
			height: 90vh;
		}
	}
</style>
