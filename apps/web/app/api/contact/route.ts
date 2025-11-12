import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_SUBJECT_LENGTH = 200;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

const contactSchema = z.object({
	subject: z
		.string()
		.min(1, 'Subject is required')
		.max(
			MAX_SUBJECT_LENGTH,
			`Subject must be less than ${MAX_SUBJECT_LENGTH} characters`,
		),
	name: z
		.string()
		.min(1, 'Name is required')
		.max(
			MAX_NAME_LENGTH,
			`Name must be less than ${MAX_NAME_LENGTH} characters`,
		),
	email: z
		.string()
		.email('Invalid email address')
		.max(255, 'Email is too long'),
	message: z
		.string()
		.min(1, 'Message is required')
		.max(
			MAX_MESSAGE_LENGTH,
			`Message must be less than ${MAX_MESSAGE_LENGTH} characters`,
		),
});

const sanitizeHtml = (text: string): string => {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;')
		.replace(/\//g, '&#x2F;');
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const checkRateLimit = (ip: string): boolean => {
	const now = Date.now();
	const record = rateLimitMap.get(ip);

	if (!record || now > record.resetTime) {
		rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
		return true;
	}

	if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
		return false;
	}

	record.count += 1;
	return true;
};

export async function POST(req: Request) {
	const clientIp =
		req.headers.get('x-forwarded-for')?.split(',')[0] ||
		req.headers.get('x-real-ip') ||
		'unknown';

	if (!checkRateLimit(clientIp)) {
		return NextResponse.json(
			{
				success: false,
				error: 'Too many requests. Please try again later.',
			},
			{ status: 429 },
		);
	}

	try {
		const body = await req.json();

		const validatedData = contactSchema.parse(body);

		const recipientEmail = 'mkm@limeyfy.no';

		const sanitizedName = sanitizeHtml(validatedData.name);
		const sanitizedEmail = sanitizeHtml(validatedData.email);
		const sanitizedSubject = sanitizeHtml(validatedData.subject);
		const sanitizedMessage = sanitizeHtml(validatedData.message).replace(
			/\n/g,
			'<br>',
		);

		const data = await resend.emails.send({
			from: 'Contact Form <contact@system.limeyfy.no>',
			to: recipientEmail,
			replyTo: validatedData.email,
			subject: sanitizedSubject,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>From:</strong> ${sanitizedName} (${sanitizedEmail})</p>
				<p><strong>Subject:</strong> ${sanitizedSubject}</p>
				<h3>Message:</h3>
				<p>${sanitizedMessage}</p>
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

		return NextResponse.json(
			{ success: false, error: 'Failed to send email' },
			{ status: 500 },
		);
	}
}
