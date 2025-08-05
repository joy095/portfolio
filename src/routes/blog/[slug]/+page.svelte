<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanityImage';
	import { inView } from '$lib/actions/inView';

	interface Category {
		_id?: string;
		title?: string;
	}

	interface Author {
		name?: string;
		image?: { _type: string; asset?: { _ref: string } };
		bio?: any[];
	}

	interface Post {
		title?: string;
		slug?: { current: string };
		publishedAt?: string;
		content?: any[];
		mainImage?: { _type: string; asset?: { _ref: string }; alt?: string };
		author?: Author;
		categories?: Category[];
		tags?: string[] | null;
		seo?: { metaDescription?: string };
	}

	export let data: {
		post?: Post;
		title: string;
		description: string;
		url: string;
		image: string;
	};

	let showContent = true;
	let errorMessage: string | null = null;

	if (!data.post) {
		errorMessage = 'No post data found.';
	}

	// Share functionality
	const sharePost = (platform: string) => {
		const shareUrl = data.url || window.location.href;
		const shareTitle = data.title || 'Blog Post';
		let url = '';
		switch (platform) {
			case 'x':
				url = `https://x.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(shareTitle)}`;
				break;
			case 'linkedin':
				url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&text=${encodeURIComponent(shareTitle)}`;
				break;
			case 'reddit':
				url = `https://www.reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent(shareTitle)}`;
				break;
		}
		window.open(url, '_blank');
	};
</script>

<svelte:head>
	<title>{data.title || 'Blog Post'}</title>
	<meta name="description" content={data.description || 'Read our latest blog post'} />
	<meta
		property="og:title"
		content={`Joy Karmakar - ${data.title}` || 'Joy Karmakar - Blog Post'}
	/>
	<meta property="og:description" content={data.description || 'Read our latest blog post'} />
	<meta property="og:url" content={data.url || ''} />
	<meta property="og:image" content={data.image || ''} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href={data.url || ''} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.title || 'Blog Post'} />
	<meta name="twitter:description" content={data.description || 'Read our latest blog post'} />
	<meta name="twitter:image" content={data.image || ''} />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if showContent}
	<div
		use:inView={{ threshold: 0.2 }}
		on:inview={() => (showContent = true)}
		class="container-auto"
		in:fly={{ duration: 800, y: 50 }}
	>
		{#if errorMessage}
			<div class="text-red-500 text-xl p-4 text-center">
				<p>{errorMessage}</p>
			</div>
		{:else if data.post}
			<!-- Hero Section -->
			<section class="hero">
				{#if data.post.mainImage?.asset}
					<div class="hero-image" in:fade={{ duration: 1000 }}>
						<img
							srcset={`
										${urlFor(data.post.mainImage).width(480).auto('format').url()} 480w,
										${urlFor(data.post.mainImage).width(768).auto('format').url()} 768w,
										${urlFor(data.post.mainImage).width(1024).auto('format').url()} 1024w,
										${urlFor(data.post.mainImage).width(1440).auto('format').url()} 1440w
									`}
							src={urlFor(data.post.mainImage).width(800).auto('format').url()}
							sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
							alt={data.post.mainImage.alt || data.post.title || 'Post Image'}
							class="w-full h-auto object-cover rounded-xl shadow-lg"
						/>
					</div>
				{/if}
				<h1
					class="hero-title font-display text-[3.5rem] md:text-[5rem] leading-tight tracking-tight text-center"
					in:fly={{ duration: 800, y: 20, delay: 200 }}
				>
					{data.post.title || 'Untitled Post'}
				</h1>
			</section>

			<!-- Main Content -->
			<div class="content-grid">
				<!-- Sidebar (Metadata) -->
				<aside class="sidebar sticky top-20">
					<div class="metadata bg-[#f1efed] p-6 rounded-xl shadow-md">
						<div class="author flex items-center gap-4 mb-4">
							{#if data.post.author?.image?.asset}
								<img
									src={urlFor(data.post.author.image).width(60).url()}
									alt={data.post.author.name || 'Author'}
									class="w-12 h-12 rounded-full object-cover"
								/>
							{/if}
							<div>
								<p class="text-lg font-semibold">By {data.post.author?.name || 'Unknown Author'}</p>
								<p class="text-sm text-gray-600">
									{data.post.publishedAt
										? new Date(data.post.publishedAt).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})
										: 'No Date'}
								</p>
							</div>
						</div>
						{#if data.post.categories?.length}
							<div class="mb-4">
								<p class="text-sm font-semibold text-gray-700">Categories:</p>
								<div class="flex flex-wrap gap-2 mt-2">
									{#each data.post.categories as cat}
										<span class="category-tag">{cat.title || 'Unknown'}</span>
									{/each}
								</div>
							</div>
						{/if}
						{#if data.post.tags && data.post.tags.length}
							<div class="mb-4">
								<p class="text-sm font-semibold text-gray-700">Tags:</p>
								<div class="flex flex-wrap gap-2 mt-2">
									{#each data.post.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							</div>
						{/if}
						<div class="share-buttons flex gap-4">
							<button class="share-btn x" on:click={() => sharePost('x')} aria-label="Share on x">
								<img class="w-5 h-5" src="/icons/x-logo.svg" alt="x logo" />
							</button>
							<button
								class="share-btn linkedin"
								on:click={() => sharePost('linkedin')}
								aria-label="Share on LinkedIn"
							>
								<img class="w-5 h-5" src="/icons/linkedin-logo.svg" alt="linkedin logo" />
							</button>
							<button
								class="share-btn reddit"
								on:click={() => sharePost('reddit')}
								aria-label="Share on reddit"
							>
								<img class="w-5 h-5" src="/icons/reddit-logo.svg" alt="reddit logo" />
							</button>
						</div>
					</div>
				</aside>

				<!-- Article Content -->
				<article class="content">
					<div class="prose prose-xl max-w-none">
						{#if data.post.content}
							<PortableText value={data.post.content} />
						{:else}
							<p class="text-gray-600">No content available.</p>
						{/if}
					</div>
				</article>
			</div>
		{/if}
	</div>
{:else}
	<div class="container-auto text-center p-10">
		<p class="text-xl font-semibold text-gray-600">Loading...</p>
	</div>
{/if}

<style>
	/* Global Container */
	.container-auto {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	/* Hero Section */
	.hero {
		position: relative;
		margin-bottom: 4rem;
		margin-top: 10rem;
	}
	.hero-image {
		position: relative;
		overflow: hidden;
		border-radius: 1rem;
	}
	.hero-image img {
		width: 100%;
		max-height: 120vh;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.hero-image:hover img {
		transform: scale(1.05);
	}
	.hero-title {
		font-family: 'Playfair Display', serif;
		color: #151515;
		margin: 2rem 0 1rem;
	}

	/* Content Grid */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 2rem;
		margin-bottom: 4rem;
	}
	@media (max-width: 768px) {
		.content-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Sidebar */
	.sidebar {
		padding-top: 1rem;
	}
	.metadata {
		border: 1px solid #e5e1dc;
	}
	.category-tag {
		display: inline-block;
		background: #151515;
		color: #f1efed;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
	}
	.tag {
		display: inline-block;
		background: #e5e1dc;
		color: #151515;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
	}
	.share-buttons {
		margin-top: 1rem;
	}
	.share-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: #151515;
		color: #f1efed;
		cursor: pointer;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
	}
	.share-btn:hover {
		background: #333;
		transform: scale(1.1);
	}
	.share-btn.x {
		background: #ffffff;
	}
	.share-btn.linkedin {
		background: #0077b5;
	}
	.share-btn.reddit {
		background: #ff4500;
	}

	/* Content */
	.content {
		font-family: 'Inter', sans-serif;
		line-height: 1.8;
	}
	.prose {
		color: #151515;
	}
	.prose :global(h2) {
		font-family: 'Playfair Display', serif;
		font-size: 2.25rem;
		font-weight: 700;
		margin-top: 2.5rem;
		color: #151515;
	}
	.prose :global(h3) {
		font-family: 'Inter', sans-serif;
		font-size: 1.75rem;
		font-weight: 600;
		margin-top: 2rem;
		color: #151515;
	}
	.prose :global(p) {
		margin-bottom: 1.25rem;
		color: #333;
	}
	.prose :global(pre) {
		background: #f1efed;
		padding: 1.5rem;
		border-radius: 0.75rem;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.6;
	}
	.prose :global(code) {
		background: #e5e1dc;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}
	.prose :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1.25rem;
	}
	.prose :global(li) {
		margin-bottom: 0.5rem;
	}

	/* Responsive Adjustments */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2.5rem;
		}
		.hero-image {
			height: 40vh;
		}
		.sidebar {
			position: static;
		}
	}
</style>
