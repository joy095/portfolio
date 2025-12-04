import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteInspector } from '@sveltejs/vite-plugin-svelte-inspector';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
			disableAsyncLocalStorage: true
		}),
		tailwindcss(),
		enhancedImages(),
		svelteInspector({
			// optional configuration
			toggleKeyCombo: 'meta-shift', // default
			holdMode: true,
			showToggleButton: 'always', // or 'active' | 'never'
			toggleButtonPos: 'bottom-right'
		}),
		sveltekit()
	],
	preview: {
		host: '0.0.0.0', // Make the app accessible on all network interfaces
		port: 4000 // Change this to any port you'd like for production preview
	}
});
