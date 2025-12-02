<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { inView } from '$lib/actions/inView.js';
	import * as m from '$lib/paraglide/messages.js';
	import { setLocale, locales } from '$lib/paraglide/runtime.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let open = false;

	function toggle() {
		open = !open;
	}

	function close(e: MouseEvent) {
		if (!e.composedPath().some((el) => (el as HTMLElement).classList?.contains('dropdown-root'))) {
			open = false;
		}
	}

	// close on outside click
	onMount(() => {
		setTimeout(() => {
			showContact = true;
		}, 1000);

		if (browser) {
			window.addEventListener('click', close);
		}

		return () => {
			if (browser) {
				window.removeEventListener('click', close);
			}
		};
	});

	const meteData = {
		title: 'Joy Karmakar - Contact Me',
		description:
			'Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies.',
		url: 'https://joykarmakar.vercel.app/contact',
		image: 'https://joykarmakar.vercel.app/contact.webp',
		siteName: 'Joy Karmakar Portfolio',
		twitterHandle: '@JoyKarmakar9871'
	};

	interface FormData {
		name: string;
		email: string;
		message: string;
		subject: string;
		phone?: string;
	}

	let formData: FormData = {
		name: '',
		email: '',
		message: '',
		subject: '',
		phone: ''
	};

	let showContact = false;
	let isEmailValid = false;
	let isPhoneValid = true;
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		isEmailValid = emailRegex.test(email);
		return isEmailValid;
	};

	const validatePhone = (phone?: string): boolean => {
		if (!phone) {
			isPhoneValid = true;
			return true;
		}
		const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
		isPhoneValid = phoneRegex.test(phone);
		return isPhoneValid;
	};

	const submitEnhance = () => {
		isSubmitting = true;
		submitStatus = 'idle'; // Reset status on new submission

		return async ({
			result,
			update
		}: {
			result: { type: string; error?: any; data?: any };
			update: () => Promise<void>;
		}) => {
			if (result.type === 'success') {
				submitStatus = 'success';
				formData = { name: '', email: '', subject: '', message: '', phone: '' }; // Clear form on success
				isEmailValid = false; // Reset validation states too
				isPhoneValid = true; // Reset phone validation

				isSubmitting = false;
				await update();
			} else if (result.type === 'failure' || result.type === 'error') {
				console.error('Submission error:', result.error);
				submitStatus = 'error';
				// You might want to get specific error message from result.data if you sent it from the server action
				// e.g., if (result.data?.error) { /* display result.data.error */ }
			}
			isSubmitting = false;
			await update(); // This updates the page data (e.g., if load function changes)
		};
	};

	// Add a reactive block to ensure initial validation runs when formData changes
	$: {
		validateEmail(formData.email);
		validatePhone(formData.phone);
	}

	onMount(() => {
		setTimeout(() => {
			showContact = true;
		}, 1000);
	});
</script>

<svelte:head>
	<title>{meteData.title}</title>
	<meta name="description" content={meteData.description} />

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={meteData.title} />
	<meta property="og:description" content={meteData.description} />
	<meta property="og:url" content={meteData.url} />
	<meta property="og:image" content={meteData.image} />
	<meta property="og:image:type" content="image/jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={meteData.siteName} />
	<link rel="canonical" href={meteData.url} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={meteData.twitterHandle} />
	<meta name="twitter:creator" content={meteData.twitterHandle} />
	<meta name="twitter:title" content={meteData.title} />
	<meta name="twitter:description" content={meteData.description} />
	<meta name="twitter:image" content={meteData.image} />
</svelte:head>

<div use:inView={{ threshold: 0.2 }} on:inview={() => (showContact = true)} class="container-auto">
	<h1
		class="mt-40 font-semibold text-[5rem] md:text-[6.875rem] tracking-tighter leading-tight"
		in:fly={{ duration: 800, y: 50 }}
	>
		Contact
	</h1>

	<div class="border-t border-black">
		<div class="flex mt-20">
			<div class="md:w-[30%]"></div>
			<div class="md:w-[70%]">
				<p class="text-xl md:text-3xl leading-[1.5] font-medium">
					I'm looking forward to hearing from you! If you prefer not to fill out forms, feel free to
					email me directly and let's talk about the next big thing!
				</p>

				<a
					class="text-xl font-medium button overflow-hidden flex items-center pb-2 gap-2 mt-5 w-fit nav-links"
					href="mailto:joykarmakar852@gmail.com"
					>joykarmakar852@gmail.com

					<div class="h-4 w-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
							/>
						</svg>
					</div>
				</a>

				<form method="POST" use:enhance={submitEnhance} class="mt-10 mb-32 bg-[#e5e1dc] p-5 md:p-8">
					<div class="flex flex-col gap-2">
						<label class="text-xl font-medium" for="name">Name*</label>
						<input
							class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
							type="text"
							name="name"
							bind:value={formData.name}
							required
							placeholder="Ex. John Doe"
						/>
					</div>

					<div class="flex flex-col gap-2 mt-6">
						<label class="text-xl font-medium" for="subject">Subject*</label>
						<input
							class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
							type="text"
							name="subject"
							bind:value={formData.subject}
							required
							placeholder="Subject"
						/>
					</div>

					<div class="flex flex-col gap-2 mt-6">
						<label class="text-xl font-medium" for="email">Email*</label>
						<input
							class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
							type="email"
							name="email"
							bind:value={formData.email}
							on:input={(e) => validateEmail(e.currentTarget.value)}
							class:invalid={!isEmailValid && formData.email}
							required
							placeholder="hello@website.com"
						/>
						{#if !isEmailValid && formData.email}
							<p class="text-red-500 text-sm mt-1">Please enter a valid email address</p>
						{/if}
					</div>

					<div class="flex flex-col gap-2 mt-6">
						<label class="text-xl font-medium" for="phone">Phone</label>
						<input
							class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
							type="tel"
							name="phone"
							bind:value={formData.phone}
							on:input={(e) => validatePhone(e.currentTarget.value)}
							class:invalid={!isPhoneValid && formData.phone}
							placeholder="+91 1234567890"
						/>
						{#if !isPhoneValid && formData.phone}
							<p class="text-red-500 text-sm mt-1">Please enter a valid phone number</p>
						{/if}
					</div>

					<div class="flex flex-col gap-2 mt-6">
						<label class="text-xl font-medium" for="message">Message*</label>
						<textarea
							class="rounded bg-[#f1efed] placeholder:text-[#888786] p-3 focus:outline-none"
							name="message"
							bind:value={formData.message}
							required
							placeholder="Share Message"
							rows="5"
						></textarea>
					</div>

					<button
						disabled={!isEmailValid || isSubmitting}
						class="nav-links mt-6 px-7 py-3 bg-[#151515] text-[#f1efed]"
					>
						{#if isSubmitting}
							Sending...
						{:else}
							Submit
						{/if}
					</button>

					{#if submitStatus === 'success'}
						<p class="text-green-500 mt-2">Message sent successfully!</p>
					{:else if submitStatus === 'error'}
						<p class="text-red-500 mt-2">Failed to send message. Please try again.</p>
					{/if}
				</form>
			</div>
		</div>
	</div>
</div>

<!-- <h1>{m.greeting({ name: 'Alice' })}</h1>
<p>{m.welcome()}</p>

<div>
	{#each locales as locale}
		<button on:click={() => setLocale(locale)}>
			{locale}
		</button>
	{/each}
</div> -->

<style>
	/* smooth dropdown */
	@keyframes fade {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	.animate-fade {
		animation: fade 0.15s ease-out;
	}

	.invalid {
		border: 2px solid red;
	}

	button:disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}

	/* Button hover animation styles */
	.button {
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.button:hover div {
		rotate: 45deg;
		transition: rotate 0.4s ease;
	}
	.button:not(:hover) div {
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
</style>
