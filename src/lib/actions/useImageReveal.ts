// src/lib/actions/useImageReveal.ts
interface RevealOptions {
	duration?: number;
	ease?: string;
	color?: string;
	delay?: number;
}

export function useImageReveal(node: HTMLElement, options: RevealOptions = {}) {
	const { duration = 2, ease = 'ease', color = '#f1efed', delay = 0 } = options;

	// Create and style overlay element
	const overlay = document.createElement('div');
	overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${color};
      z-index: 1;
      transform: translateY(0%);
    `;

	// Add necessary styles to parent node
	node.style.position = 'relative';
	node.style.overflow = 'hidden';

	// Append overlay to node
	node.appendChild(overlay);

	// Create Intersection Observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Add animation when in viewport
					setTimeout(() => {
						overlay.style.transition = `transform ${duration}s ${ease}`;
						overlay.style.transform = 'translateY(100%)';
					}, delay);

					// Cleanup observer after animation
					observer.unobserve(node);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: '50px'
		}
	);

	// Start observing
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			overlay.remove();
		}
	};
}
