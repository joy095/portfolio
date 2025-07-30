<script lang="ts">
	import Marquee from './Marquee.svelte';
	import ParallaxScroll from './ParallaxScroll.svelte';

	let numberOfLines = 11;

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<ParallaxScroll speed={0.3}>
	<footer class="background relative" style="--number-of-lines: {numberOfLines}">
		<div class="h-full w-full absolute bg-[#151515] -z-10"></div>

		<div>
			<Marquee speed={20} direction="left">
				<h2 class="text-[15vw] font-semibold tracking-tighter leading-[1] -mt-11">
					Let's Work together&nbsp;
				</h2>
			</Marquee>

			<div class="container-auto">
				<div class="flex md:flex-row flex-col-reverse items-center gap-20 md:justify-between mt-32">
					<div class="flex flex-col gap-5">
						<div class="flex flex-col gap-5">
							<a
								class="text-base md:text-lg lg:text-xl font-medium button overflow-hidden flex items-center gap-2"
								target="_blank"
								href="https://www.linkedin.com/in/joy-karmakar-cooch-behar"
								>Linkdin
								<img class="h-4 w-4" src="/icons/arrow-2.svg" alt="icon" />
							</a>
						</div>
						<div class="flex flex-col gap-5">
							<a
								class="text-base md:text-lg lg:text-xl font-medium button overflow-hidden flex items-center gap-2"
								target="_blank"
								href="https://github.com/joy095"
								>Github
								<img class="h-4 w-4" src="/icons/arrow-2.svg" alt="icon" />
							</a>
						</div>
						<div class="flex flex-col gap-5">
							<a
								class="text-base md:text-lg lg:text-xl font-medium button overflow-hidden flex items-center gap-2"
								target="_blank"
								href="/sitemap.xml"
								>Sitemap
								<img class="h-4 w-4" src="/icons/arrow-2.svg" alt="icon" />
							</a>
						</div>
					</div>
					<p class="text-xl md:text-[1.375rem] font-medium leading-[1.5] md:w-[30%]">
						I'm currently available for new work, let me know if you need a developer. I'd love to
						talk about the next big thing!
					</p>
				</div>

				<div class="flex flex-col md:flex-row justify-between items-center mt-32 gap-5">
					<a
						class="text-base md:text-lg lg:text-xl font-medium"
						href="mailto:joykarmakar852@gmail.com">joykarmakar852@gmail.com</a
					>
					<p class="text-base md:text-lg lg:text-xl font-medium leading-[1.5]">
						© 2025 Joy Karmakar. All rights reserved.
					</p>
					<button
						class="text-base md:text-lg lg:text-xl font-medium flex gap-1 items-center"
						on:click={scrollToTop}
						on:keydown={(e) => e.key === 'Enter' && scrollToTop()}
					>
						<div class="h-5 w-5 animate-bounce">
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="2"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
								></path>
							</svg>
						</div>
						Back to top
					</button>
				</div>
			</div>
		</div>
	</footer>
</ParallaxScroll>

<style>
	.background {
		position: relative;
		min-height: 100vh; /* Full viewport height */
		overflow: hidden; /* Prevent scrolling from pseudo-elements */
		color: #f1efed;
		bottom: 0;
	}

	/* Background lines */
	.background::before {
		content: '';
		position: absolute;
		top: 0;
		left: -5vw; /* Start at the very left */
		right: 0; /* Extend to the very right */
		bottom: 0;
		background-image: repeating-linear-gradient(
			to right,
			transparent,
			transparent calc((100% - 4vw) / var(--number-of-lines) - 1px),
			/* 4vw for left and right padding */ rgba(83, 83, 83, 0.3)
				calc((100% - 4vw) / var(--number-of-lines) - 1px),
			rgba(83, 83, 83, 0.3) calc((100% - 4vw) / var(--number-of-lines))
		);
		z-index: -1; /* Send to back */
	}

	/* Button hover animation styles */
	.button {
		position: relative;
		cursor: pointer;
		overflow: hidden;
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
		background-color: #f1efed;
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
