import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	preview: {
		host: '0.0.0.0', // Make the app accessible on all network interfaces
		port: 4000 // Change this to any port you'd like for production preview
	}
});
