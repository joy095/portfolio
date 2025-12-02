import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { sendContactMail } from '$lib/server/sendMail';
import { locales } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const prerender = false;

// Tell SvelteKit which lang values are valid
export function entries() {
	return locales.map((lang) => ({ lang }));
}

export const load: PageServerLoad = async ({ params }) => {
	return {
		lang: params.lang
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData(); // Correctly receives form-encoded data
		const name = data.get('name')?.toString() || '';
		const email = data.get('email')?.toString() || '';
		const subject = data.get('subject')?.toString() || ''; // Added subject
		const message = data.get('message')?.toString() || '';
		const phone = data.get('phone')?.toString() || undefined; // Added phone, make it optional

		// --- Server-side validation ---
		// Validate required fields
		if (!name || !email || !subject || !message) {
			return fail(400, {
				error: 'Please fill in all required fields (Name, Email, Subject, Message).'
			});
		}

		// Validate email format
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			return fail(400, { error: 'Invalid email format provided.' });
		}

		// Validate phone format if provided
		if (phone && !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone)) {
			return fail(400, { error: 'Invalid phone number format provided.' });
		}
		// --- End server-side validation ---

		try {
			// Pass all validated fields to your email function
			await sendContactMail({ name, email, subject, message, phone });
			return { success: true }; // Return success status
		} catch (err) {
			console.error('Failed to send contact email:', err);
			// Return a more generic error to the client for security
			return fail(500, { error: 'Failed to send email. Please try again later.' });
		}
	}
};
