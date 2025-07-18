// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace svelteHTML {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		interface HTMLAttributes<T> {
			// Custom events for the inView action
			'on:inview'?: (event: CustomEvent) => void;
			'on:outview'?: (event: CustomEvent) => void;
		}
	}
}

export { };
