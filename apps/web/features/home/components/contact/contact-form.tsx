'use client';
import axios from 'axios';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { z } from 'zod';
import {
	CodeIndent,
	CodeLine,
	CodeLineFunction,
	CodeLineWithInput,
	CodeLineWithTextarea,
	SyntaxHighlight,
} from '~/shared/components/code';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

const contactSchema = z.object({
	subject: z.string().min(1, 'Subject is required'),
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = () => {
	const submitMutation = useMutation({
		mutationFn: async (data: ContactFormData) => {
			const response = await axios.post('/api/contact', data);
			if (response.status !== 200) {
				throw new Error(response.data.error || 'Failed to send email');
			}

			return response.data;
		},
		onSuccess: () => {
			toast.success('Email sent successfully!');
			form.reset();
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : 'Failed to send email',
			);
		},
	});

	const form = useForm({
		defaultValues: {
			subject: '',
			name: '',
			email: '',
			message: '',
		} as ContactFormData,
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: contactSchema,
		},
		onSubmit: async ({ value }) => submitMutation.mutate(value),
	});

	return (
		<div className="mt-12 p-6 bg-slate-900 rounded-lg border border-slate-800 font-mono text-sm">
			<div className="text-slate-500 mb-2">
				{'// Want to collaborate? Send an email to me!'}
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div className="text-slate-300 space-y-1">
					<form.Field
						name="subject"
						validators={{
							onChange: ({ value }) => {
								const result =
									contactSchema.shape.subject.safeParse(
										value,
									);
								if (!result.success) {
									const firstError = result.error.issues[0];
									return firstError?.message;
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<CodeLineWithInput
								number={1}
								name="subject"
								placeholder="Subject"
								value={field.state.value}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								onBlur={field.handleBlur}
								aria-label="Subject"
								aria-required="true"
								aria-invalid={
									field.state.meta.errors.length > 0
								}
							/>
						)}
					</form.Field>
					<form.Field
						name="name"
						validators={{
							onChange: ({ value }) => {
								const result =
									contactSchema.shape.name.safeParse(value);
								if (!result.success) {
									const firstError = result.error.issues[0];
									return firstError?.message;
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<CodeLineWithInput
								number={2}
								name="name"
								placeholder="John Doe"
								value={field.state.value}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								onBlur={field.handleBlur}
								aria-label="Name"
								aria-required="true"
								aria-invalid={
									field.state.meta.errors.length > 0
								}
							/>
						)}
					</form.Field>
					<form.Field
						name="email"
						validators={{
							onChange: ({ value }) => {
								const result =
									contactSchema.shape.email.safeParse(value);
								if (!result.success) {
									const firstError = result.error.issues[0];
									return firstError?.message;
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<CodeLineWithInput
								number={3}
								name="email"
								type="email"
								placeholder="john@doe.com"
								value={field.state.value}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								onBlur={field.handleBlur}
								aria-label="Email"
								aria-required="true"
								aria-invalid={
									field.state.meta.errors.length > 0
								}
							/>
						)}
					</form.Field>
					<form.Field
						name="message"
						validators={{
							onChange: ({ value }) => {
								const result =
									contactSchema.shape.message.safeParse(
										value,
									);
								if (!result.success) {
									const firstError = result.error.issues[0];
									return firstError?.message;
								}
								return undefined;
							},
						}}
					>
						{(field) => (
							<CodeLineWithTextarea
								start={4}
								end={7}
								name="message"
								placeholder="Message"
								value={field.state.value}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								onBlur={field.handleBlur}
								aria-label="Message"
								aria-required="true"
								aria-invalid={
									field.state.meta.errors.length > 0
								}
							/>
						)}
					</form.Field>
					<CodeLine number={8} />
					<CodeLineFunction
						name="collaborate"
						args={['data']}
						async={true}
						lineNumber={11}
						lineCount={3}
						onRun={() => {
							form.handleSubmit();
						}}
						isRunning={submitMutation.isPending}
					>
						<CodeLine number={11}>
							<CodeIndent />
							<SyntaxHighlight color="orange">
								const
							</SyntaxHighlight>
							<SyntaxHighlight color="blue">
								response
							</SyntaxHighlight>
							<SyntaxHighlight color="orange">=</SyntaxHighlight>
							<SyntaxHighlight color="blue">
								await
							</SyntaxHighlight>
							<div>
								<SyntaxHighlight color="white">
									fetch
								</SyntaxHighlight>
								<SyntaxHighlight color="blue">
									.post
								</SyntaxHighlight>
								<SyntaxHighlight color="pink">
									('/api/contact'
								</SyntaxHighlight>
								<SyntaxHighlight color="orange">
									,
								</SyntaxHighlight>
								<SyntaxHighlight color="white">
									{' '}
									data
								</SyntaxHighlight>
								<SyntaxHighlight color="pink">
									)
								</SyntaxHighlight>
								<SyntaxHighlight color="white">
									;
								</SyntaxHighlight>
							</div>
						</CodeLine>
						<CodeLine number={12}>
							<CodeIndent />
							<SyntaxHighlight color="orange">
								return
							</SyntaxHighlight>
							<div>
								<SyntaxHighlight color="blue">
									response
								</SyntaxHighlight>
								<SyntaxHighlight color="white">
									.json();
								</SyntaxHighlight>
							</div>
						</CodeLine>
					</CodeLineFunction>
				</div>
			</form>
		</div>
	);
};
