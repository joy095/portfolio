import * as LenisModule from '@studio-freight/lenis';

const Lenis = LenisModule.default;

export const initializeLenis = () => {
	const lenis = new (Lenis as any)({
		lerp: 0.1,
		smoothWheel: true
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
};

import { goto } from '$app/navigation';

export const smoothScrollToSection = async (event: MouseEvent, sectionId: string) => {
	event.preventDefault();
	const currentPath = window.location.pathname;
	const targetPath = '/'; // Assuming all sections are on the home page

	try {
		if (currentPath !== targetPath) {
			// Navigate to the home page first
			await goto(targetPath, {
				replaceState: false,
				noScroll: true // Prevent automatic scrolling
			});
		}

		// Wait briefly for the DOM to update
		setTimeout(() => {
			const section = document.querySelector(sectionId);
			if (section) {
				section.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}, 100);
	} catch (error) {
		console.error('Navigation error:', error);
	}
};
