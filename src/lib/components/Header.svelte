<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { headerAnimationComplete } from '$lib/stores/store';
	import { smoothScrollToSection } from '$lib/scroll';
	import { inView } from '$lib/actions/inView';
	import { locales, localizeUrl, setLocale, localizeHref } from '$lib/paraglide/runtime.js';
	import { m } from '$lib/paraglide/messages';

	export let lang;

	let currentTime: string;
	let timezone: string;
	let isVisible = false;
	let numberOfLines = 11;

	let open = false;
	let mobileMenuOpen = false;
	let buttonEl: HTMLElement;
	let menuEl: HTMLElement;
	let isMobile = false;

	const toggle = () => (open = !open);

	const close = () => (open = false);

	const handleSelect = (newLang: string) => {
		setLocale(newLang);
		const newUrl = localizeUrl(window.location.href, newLang);
		window.location.assign(newUrl);
		close();
	};

	// time helpers
	const getUserTimezone = () => {
		const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
		return timezoneName.split('/').pop()?.replace(/_/g, ' ') || timezoneName;
	};
	const updateTime = () => {
		const now = new Date();
		currentTime = new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
		}).format(now);
	};

	onMount(() => {
		timezone = getUserTimezone();
		updateTime();
		const interval = setInterval(updateTime, 1000);
		setTimeout(() => {
			isVisible = true;
		}, 0);

		// Check mobile on mount and on resize
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', checkMobile);
		};
	});

	// Track scroll direction
	let scrollDirection = 'up';
	let lastScrollY = 0;
	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		if (currentScrollY > lastScrollY) scrollDirection = 'down';
		else if (currentScrollY < lastScrollY) scrollDirection = 'up';
		lastScrollY = currentScrollY;
	};

	// LANG HANDLING

	onMount(() => {
		const hash = window.location.hash;
		if (hash) {
			setTimeout(() => {
				const section = document.querySelector(hash);
				if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 100);
		}

		window.addEventListener('scroll', handleScroll);
		headerAnimationComplete.set(true);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	let hoveredButtons: { [key: string]: boolean } = {};
	const handleHover = (id: string) => (hoveredButtons[id] = true);

	const handleNavClick = (e: Event, hash?: string) => {
		if (hash) {
			smoothScrollToSection(e, hash);
		}
		mobileMenuOpen = false;
	};
</script>

{#if isVisible}
	<header
		class="header-container container-auto background"
		style="--number-of-lines: {numberOfLines}"
		class:scrolling-down={scrollDirection === 'down'}
		class:scrolling-up={scrollDirection === 'up'}
	>
		<div
			use:inView={{ threshold: 0.2 }}
			on:inview={() => (isVisible = true)}
			on:introend={() => headerAnimationComplete.set(true)}
			class="relative flex justify-between items-center py-3 sm:py-5 px-3 sm:px-0"
		>
			<span class="overflow-hidden w-full h-1 absolute bottom-0 left-0">
				<div class="nav-border"></div>
			</span>

			<!-- Logo -->
			<a
				class="nav-links font-bold text-sm sm:text-base md:text-lg lg:text-xl flex gap-1 items-center flex-shrink-0"
				href="/{lang}"
				in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }}
				on:mouseover={() => handleHover('home')}
				on:focus={() => handleHover('home')}
				class:hovered={hoveredButtons['home']}
			>
				Joy Karmakar
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex">
				<ul class="flex gap-4 lg:gap-8 font-semibold text-black/85 text-sm lg:text-lg">
					<li class="nav-links" in:fly={{ y: 20, duration: 800, delay: 200, opacity: 0 }}>
						<a
							href="/{lang}/#about"
							on:click={(e) => smoothScrollToSection(e, '#about')}
							class="button overflow-hidden flex"
							on:mouseover={() => handleHover('about')}
							on:focus={() => handleHover('about')}
							class:hovered={hoveredButtons['about']}
						>
							{m['nav_links.about']()}
						</a>
					</li>
					<li class="nav-links" in:fly={{ y: 20, duration: 800, delay: 400, opacity: 0 }}>
						<a
							href="/{lang}/blog"
							class="button overflow-hidden flex"
							on:mouseover={() => handleHover('blog')}
							on:focus={() => handleHover('blog')}
							class:hovered={hoveredButtons['blog']}
						>
							{m['nav_links.blog']()}
						</a>
					</li>
					<li class="nav-links" in:fly={{ y: 20, duration: 800, delay: 600, opacity: 0 }}>
						<a
							href="/{lang}/contact"
							class="button overflow-hidden flex"
							on:mouseover={() => handleHover('contact')}
							on:focus={() => handleHover('contact')}
							class:hovered={hoveredButtons['contact']}
						>
							{m['nav_links.contact']()}
						</a>
					</li>
				</ul>
			</nav>

			<!-- Right side: Time and Language -->
			<div class="flex items-center gap-1 sm:gap-2">
				<!-- Time display (hidden on mobile) -->
				<div
					class="text-black/85 text-xs sm:text-sm lg:text-lg font-semibold hidden lg:flex whitespace-nowrap"
					in:fly={{ y: 20, duration: 800, delay: 800, opacity: 0 }}
				>
					{timezone} • {currentTime}
				</div>

				<!-- Language Dropdown -->
				<div class="relative inline-block text-left">
					<button
						bind:this={buttonEl}
						on:click|stopPropagation={toggle}
						class="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-2 sm:py-2.5 border border-[#151515]/20 rounded-lg sm:rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium"
						aria-expanded={open}
						aria-haspopup="true"
					>
						<!-- Globe Icon -->
						<svg
							class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
							data-slot="icon"
							fill="none"
							stroke-width="1.5"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
							></path>
						</svg>

						<span class="font-semibold text-gray-800 hidden sm:inline">
							{lang.toUpperCase()}
						</span>

						<!-- Chevron -->
						<svg
							class="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform duration-200 {open
								? 'rotate-180'
								: ''}"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if open}
						<div
							bind:this={menuEl}
							transition:fly={{ y: -8, duration: 200 }}
							class="absolute right-0 mt-2 w-40 sm:w-48 origin-top-right bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-lg z-50 overflow-hidden"
						>
							{#each locales as localeOption}
								<button
									on:click|stopPropagation={() => handleSelect(localeOption)}
									class="w-full text-left px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors
            {locales.toString() === localeOption
										? 'bg-indigo-50 text-indigo-700'
										: 'text-gray-700 hover:bg-gray-100'}"
								>
									{localeOption.toUpperCase()}
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Mobile Menu Button -->
				<button
					on:click={() => {
						mobileMenuOpen = !mobileMenuOpen;
					}}
					class="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
					aria-expanded={mobileMenuOpen}
					aria-label="Toggle menu"
				>
					{#if !mobileMenuOpen}
						<!-- Menu Icon -->
						<svg
							class="w-5 h-5 text-gray-800"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					{:else}
						<!-- Close Icon -->
						<svg
							class="w-5 h-5 text-gray-800"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if mobileMenuOpen && isMobile}
			<nav
				transition:fly={{ y: -10, duration: 200 }}
				class="border-t border-gray-200/50 bg-gradient-to-b from-white to-gray-50/50 backdrop-blur-sm"
			>
				<div class="px-3 py-4 space-y-1">
					<!-- Time Display on Mobile -->
					<div
						class="px-3 py-2 text-xs font-semibold text-black/60 uppercase tracking-wider flex items-center gap-2"
					>
						<svg class="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
							/>
						</svg>
						<span>{timezone} • {currentTime}</span>
					</div>

					<div
						class="my-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
					></div>

					<ul class="space-y-1">
						<li>
							<a
								href="/{lang}/#about"
								on:click={(e) => handleNavClick(e, '#about')}
								class="block px-3 py-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-transparent transition-all duration-200 flex items-center gap-2"
							>
								<span
									class="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"
								></span>
								{m['nav_links.about']()}
							</a>
						</li>
						<li>
							<a
								href="/{lang}/blog"
								on:click={(e) => handleNavClick(e)}
								class="block px-3 py-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-transparent transition-all duration-200 flex items-center gap-2"
							>
								<span
									class="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"
								></span>
								{m['nav_links.blog']()}
							</a>
						</li>
						<li>
							<a
								href="/{lang}/contact"
								on:click={(e) => handleNavClick(e)}
								class="block px-3 py-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-transparent transition-all duration-200 flex items-center gap-2"
							>
								<span
									class="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"
								></span>
								{m['nav_links.contact']()}
							</a>
						</li>
					</ul>
				</div>
			</nav>
		{/if}
	</header>
{/if}

<style>
	/* Header styles */
	.header-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		background-color: #f1efed;
		z-index: 10;
		transition: transform 0.3s ease-in-out;
		transform: translateY(0);
	}

	.scrolling-down {
		transform: translateY(-100%);
	}

	.scrolling-up {
		transform: translateY(0);
	}

	/* Border animation for nav */
	.nav-border {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: black;
		width: 100%;
		right: 100%;
		animation: border 1.2s ease-in-out 0.5s forwards;
	}

	@keyframes border {
		0% {
			right: 100%;
		}
		100% {
			right: 0;
		}
	}

	/* Button hover animation styles */
	.button {
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.button::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: -100%;
		height: 2px;
		width: 100%;
		background: linear-gradient(to right, #333, #000);
		transition: left 0.4s ease;
	}

	.button:hover::before {
		animation: slideIn 0.4s ease forwards;
	}

	.button.hovered:not(:hover)::before {
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

	/* Background styles */
	.background {
		min-height: 56px;
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

	/* Mobile responsive adjustments */
	@media (max-width: 640px) {
		.background {
			min-height: 48px;
		}
	}
</style>
