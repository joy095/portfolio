<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { home_page_view_credential } from '$lib/paraglide/messages/en';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const allCertificates = [
		{
			id: '1a798f193941',
			description: 'Software Engineer',
			date: 'March 2024',
			skills: ['Software Development', 'Problem Solving', 'Data Structures', 'Algorithms'],
			link: 'https://www.hackerrank.com/certificates/1a798f193941',
			issuer: 'hackerrank'
		},
		{
			id: 'a69958cf2207',
			description: 'Python (Basic)',
			date: 'March 2024',
			skills: ['Python', 'Basic Syntax', 'Data Types', 'Functions'],
			link: 'https://www.hackerrank.com/certificates/a69958cf2207',
			issuer: 'hackerrank'
		},
		{
			id: 'e8616d3e54b8',
			description: 'Frontend Developer (React)',
			date: 'Feb 2024',
			skills: ['React.js', 'Frontend Development', 'Components', 'State Management', 'UI/UX'],
			link: 'https://www.hackerrank.com/certificates/e8616d3e54b8',
			issuer: 'hackerrank'
		},
		{
			id: 'fcc-responsive-design',
			description: 'Responsive Web Design',
			date: 'March 2025',
			skills: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Media Queries', 'Responsive Design'],
			link: 'https://www.freecodecamp.org/certification/joykarmakar/responsive-web-design',
			issuer: 'freecodecamp'
		},
		{
			id: 'webflow-101',
			description: 'Webflow 101',
			date: 'December 2024',
			skills: ['Webflow', 'UI/UX Design', 'No-Code', 'CMS', 'Interactions'],
			link: 'webflow-101.webp',
			issuer: 'webflow'
		},
		{
			id: '5cca74bd4ea1',
			description: 'Node.js (Intermediate)',
			date: 'March 2024',
			skills: ['Node.js', 'Express.js', 'APIs', 'Middleware', 'NPM'],
			link: 'https://www.hackerrank.com/certificates/5cca74bd4ea1',
			issuer: 'hackerrank'
		},
		{
			id: '9c5eff1d4124',
			description: 'Go (Basic)',
			date: 'March 2024',
			skills: ['Go Programming', 'Concurrency', 'Goroutines', 'Channels', 'Basic Syntax'],
			link: 'https://www.hackerrank.com/certificates/9c5eff1d4124',
			issuer: 'hackerrank'
		},
		{
			id: 'a8563f63dda9',
			description: 'Rest API (Intermediate)',
			date: 'March 2024',
			skills: ['RESTful APIs', 'API Design', 'HTTP Methods', 'JSON', 'Authentication'],
			link: 'https://www.hackerrank.com/certificates/a8563f63dda9',
			issuer: 'hackerrank'
		},
		{
			id: '9b2b3faab172',
			description: 'SQL (Advanced)',
			date: 'March 2024',
			skills: [
				'SQL',
				'Database Management',
				'Queries',
				'Joins',
				'Normalization',
				'Performance Tuning'
			],
			link: 'https://www.hackerrank.com/certificates/9b2b3faab172',
			issuer: 'hackerrank'
		}
	];

	let inVisible = false;

	onMount(() => {
		setTimeout(() => (inVisible = true), 1800);
	});
</script>

{#if inVisible}
	<div in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }} class="container-auto mt-40">
		<!-- About Section -->
		<div class="flex justify-between pb-3 relative overflow-hidden">
			<p
				class="font-medium text-2xl leading-[1.6] tracking-tighter"
				in:fly={{ x: -20, duration: 600, delay: 100 }}
			>
				{m['home_page.about']()}
			</p>
			<div class="nav-border"></div>
		</div>

		<div id="about" class="flex flex-col gap-5 md:flex-row justify-between mt-16">
			<div class="md:w-[60%]">
				<p
					class="font-medium text-lg sm:text-[1.5rem] md:text-[1.625rem] lg:text-3xl lg:leading-[1.6] leading-[1.6] tracking-tighter"
				>
					{m['home_page.about_description']()}
				</p>

				<div class="mt-12">
					<a
						target="_blank"
						href="https://docs.google.com/document/d/1kJOkoKP6tXdgbi35ICFMcBUJbcnZHAQ33CY5g7fvnt4/edit?usp=sharing"
						class="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-medium rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 mr-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						{m['home_page.download_cv']()}
					</a>
				</div>
			</div>

			<div
				class="md:w-2/5 lg:w-1/3 flex justify-center md:justify-end"
				in:fade={{ duration: 800, delay: 300 }}
			>
				<div
					class="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105"
				>
					<enhanced:img
						loading="lazy"
						src="/static/my_image.webp"
						alt="Joy Karmakar's professional headshot**, a web developer based in west bengal, india"
						class="w-full h-auto object-cover rounded-xl"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"
					></div>
				</div>
			</div>
		</div>

		<div class="mt-28">
			<h2 class="text-4xl font-semibold text-center mb-16 text-gray-800">
				{m['home_page.certifications']()}
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
				{#each allCertificates as cert, i (cert.id)}
					<div
						in:fly={{ y: 20, duration: 500, delay: i * 100 }}
						class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between"
					>
						<div class="flex-grow">
							<div class="h-10 mb-5 flex items-center">
								{#if cert.issuer === 'freecodecamp'}
									<img
										class="h-7 w-auto"
										src="/icons/freecodecamp-logo.svg"
										alt="FreeCodeCamp Logo"
									/>
								{:else if cert.issuer === 'webflow'}
									<img
										class="h-7 w-auto text-gray-900"
										src="/icons/webflow-icon.svg"
										alt="Webflow Logo"
									/>
								{:else}
									<img class="h-7 w-auto" src="/icons/hacker-rank-logo.svg" alt="HackerRank Logo" />
								{/if}
							</div>
							<h3 class="text-2xl font-bold text-gray-900 mb-2">
								{cert.description}
							</h3>
							<p class="text-sm text-gray-500 mb-6">Issued: {cert.date}</p>
							{#if cert.skills?.length}
								<div class="flex flex-wrap gap-2 mb-6">
									{#each cert.skills as skill}
										<span
											class="bg-gray-100 text-gray-700 text-xs font-medium px-3.5 py-1.5 rounded-full border border-gray-200"
										>
											{skill}
										</span>
									{/each}
								</div>
							{/if}
						</div>

						<a
							target="_blank"
							href={cert.link}
							class="inline-flex items-center mt-auto font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-200"
						>
							{m['home_page.view_credential']()}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 ml-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						</a>
					</div>
				{/each}
			</div>
		</div>
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
</style>
