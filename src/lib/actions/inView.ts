export function inView(node: HTMLElement, options?: IntersectionObserverInit) {
	let observer: IntersectionObserver;
	let hasIntersected = false; // Add a flag to track if it has intersected

	const observe = () => {
		if (observer) {
			observer.disconnect();
		}

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (!hasIntersected) {
						// Only dispatch 'inview' if it hasn't intersected before
						node.dispatchEvent(new CustomEvent('inview'));
						hasIntersected = true; // Set flag to true
						// Disconnect observer after the first intersection to prevent re-triggering
						observer.unobserve(node);
					}
				}
			});
		}, options);

		observer.observe(node);
	};

	observe();

	return {
		update(newOptions: IntersectionObserverInit) {
			const optionsChanged = JSON.stringify(options) !== JSON.stringify(newOptions);
			if (optionsChanged) {
				options = newOptions;
				// If options change, and we want to allow it to run again, reset hasIntersected and re-observe
				if (!hasIntersected) {
					// Only re-observe if it hasn't run yet
					observe();
				}
			}
		},
		destroy() {
			if (observer) {
				observer.disconnect();
			}
		}
	};
}
