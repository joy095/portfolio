<script>
	import { inView } from '$lib/actions/inView';
	import { m } from '$lib/paraglide/messages';
	import { fly } from 'svelte/transition';

	let inVisible = false;

	setTimeout(() => {
		inVisible = true;
	}, 2000);
</script>

{#if inVisible}
	<div
		use:inView={{ threshold: 0.2 }}
		on:inview={() => (inVisible = true)}
		in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }}
		class="container-auto mt-40 mb-40"
	>
		<div class="flex justify-between pb-3 relative overflow-hidden">
			<p
				class="font-medium text-2xl leading-[1.6] tracking-tighter"
				in:fly={{ x: -20, duration: 600, delay: 100 }}
			>
				{m['home_page.experience']()}
			</p>
			<div class="nav-border"></div>
		</div>

		<div class="flex gap-10 md:gap-5 flex-col md:flex-row justify-between mt-16">
			<div class="md:w-[30%]">
				<p class="font-medium text-xl leading-[1.6] tracking-tighter">
					{m['home_page.work_desc']()}
				</p>
			</div>
			<div
				class="flex flex-col justify-between text-base sm:text-lg md:w-[60%] md:text-xl font-medium"
			>
				<table>
					<tbody>
						<tr>
							<td>Skkyee</td>
							<td>Web Developer</td>
							<td>Apr 2024 - Jan 2025</td>
						</tr>
						<tr>
							<td>Acceleratron</td>
							<td>Web Developer</td>
							<td>Dec 2023 - Jan 2024</td>
						</tr>
						<tr>
							<td>Logic ‘n’ Color</td>
							<td>Frontend Developer</td>
							<td>Jun 2023 - Nov 2023</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}

<style>
	td {
		padding: 1rem 0;
	}
	tr {
		border-bottom: 2px solid #c2c2c2;
	}
	tr:last-child {
		border-bottom: none;
	}

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
