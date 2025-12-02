import nodemailer from 'nodemailer';
import * as env from '$env/static/private';

// Define the interface for the contact form data
interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	phone?: string;
}

// Configure your SMTP transporter
// Using env variables from $env/static/private
const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: parseInt(env.SMTP_PORT || '465', 10),
	secure: env.SMTP_PORT === '465' || env.SMTP_PORT === 'ssl', // true for 465 (SSL/TLS), false for other ports (like 587 with STARTTLS)
	// If using port 587 with STARTTLS, you might need:
	// secure: false,
	// requireTLS: true,
	debug: false, // Set to true during development to see detailed logs, false for production
	logger: false, // Set to true during development to see detailed logs, false for production
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS
	}
});

/**
 * Sends a contact email with a premium HTML template.
 * @param {ContactFormData} formData - The contact form data.
 * @returns {Promise<void>}
 */
export async function sendContactMail({
	name,
	email,
	subject,
	message,
	phone
}: ContactFormData): Promise<void> {
	// Basic text message for fallback (always good to have)
	const textMessage = `New Contact Form Submission from Your Website:

Name: ${name}
Email: ${email}
Subject: ${subject}
${phone ? `Phone: ${phone}\n` : ''}
Message:
${message}

---
Website: https://joykarmakar.vercel.app
`;

	// Premium HTML message with inline styles
	const htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                background-color: #f8f8f8;
                margin: 0;
                padding: 20px 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                overflow: hidden;
            }
            .header {
                background-color: #1a202c; /* A dark, professional color */
                color: #ffffff;
                padding: 25px 30px;
                text-align: center;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }
            .content {
                padding: 30px;
            }
            .content p {
                margin-bottom: 15px;
                font-size: 16px;
            }
            .content strong {
                color: #1a202c; /* Matching header color for emphasis */
            }
            .message-box {
                background-color: #f0f4f8; /* Light background for the message */
                border-left: 4px solid #4a90e2; /* A subtle accent color */
                padding: 20px;
                margin-top: 20px;
                border-radius: 4px;
                font-style: italic;
                white-space: pre-wrap; /* Preserves whitespace and line breaks */
            }
            .footer {
                background-color: #f2f2f2;
                color: #777777;
                text-align: center;
                padding: 20px 30px;
                font-size: 14px;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                margin-top: 20px;
            }
            .footer a {
                color: #4a90e2;
                text-decoration: none;
                font-weight: 500;
            }
            .divider {
                border-bottom: 1px solid #eeeeee;
                margin: 25px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Contact Submission</h1>
            </div>
            <div class="content">
                <p>You've received a new message through your website contact form:</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #4a90e2; text-decoration: none;">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}

                <div class="divider"></div>

                <p><strong>Message:</strong></p>
                <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                </div>
            </div>
            <div class="footer">
                <p>This message was sent from your website's contact form.</p>
                <p>Visit your portfolio: <a href="https://joykarmakar.vercel.app" target="_blank" rel="noopener noreferrer">joykarmakar.vercel.app</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

	try {
		const info = await transporter.sendMail({
			from: `"${name}" <${email}>`,
			to: env.CONTACT_RECEIVER_EMAIL, // Use env for SvelteKit
			subject: `New Contact Form Message from ${name} - ${subject}`,
			text: textMessage,
			html: htmlMessage
		});

		console.log('Contact email sent:', info.messageId);
	} catch (error) {
		console.error('Error sending contact email:', error);
		// Re-throw the error so the calling function (SvelteKit action) can catch it
		throw error;
	}
}
