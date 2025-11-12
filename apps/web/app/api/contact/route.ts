import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
	subject: z.string().min(1, 'Subject is required'),
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	message: z.string().min(1, 'Message is required'),
});

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const validatedData = contactSchema.parse(body);

		const recipientEmail = 'mkm@limeyfy.no';

		const data = await resend.emails.send({
			from: 'Contact Form <contact@system.limeyfy.no>',
			to: recipientEmail,
			replyTo: validatedData.email,
			subject: validatedData.subject,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
				<p><strong>Subject:</strong> ${validatedData.subject}</p>
				<h3>Message:</h3>
				<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
			`,
		});

		return NextResponse.json(
			{ success: true, messageId: data.data?.id },
			{ status: 200 },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ success: false, errors: error.issues },
				{ status: 400 },
			);
		}

		console.error('Error sending email:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to send email' },
			{ status: 500 },
		);
	}
}
