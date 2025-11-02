import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import { ThemeProvider } from '@common/providers/theme-provider';
import { GlobalSchema } from '@common/structured-data/global';
import { Toaster } from '@components/ui/sonner';
import { BASE_URL } from '../configuration';
import { Footer } from '~/shared/components/footer';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
});

const AUTHORITATIVE_NAME = 'Martin Kulvedrøsten Myhre';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<GlobalSchema />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				{children}
				<Toaster />
				<Footer />
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		default: AUTHORITATIVE_NAME,
		template: `%s | ${AUTHORITATIVE_NAME}`,
	},
	description: `High-Performance Full-Stack Developer, CEO, and Founder specializing in Next.js, .NET/C#, and privacy-focused Azure architecture.`,
	keywords: [
		'Martin Kulvedrøsten Myhre',
		'Next.js',
		'TypeScript',
		'.NET C# API',
		'Microsoft Azure',
		'Docker',
		'Optimizely',
		'Sanity CMS',
		'Vertical Slice Architecture',
		'Limeyfy AS',
	],

	openGraph: {
		title: AUTHORITATIVE_NAME,
		description: `Senior Full-Stack Developer & Architect focusing on Simplicity, Performance, and Privacy.`,
		url: BASE_URL,
		siteName: AUTHORITATIVE_NAME,
		images: [
			{
				url: `${BASE_URL}/public/og-image.png`, // Requires a specific OG image in /public
				width: 1200,
				height: 630,
				alt: AUTHORITATIVE_NAME,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: AUTHORITATIVE_NAME,
		description: `Full-Stack Architect, CEO, and Optimizely Certified Developer.`,
		images: [`${BASE_URL}/public/og-image.png`],
	},
	alternates: {
		canonical: BASE_URL,
	},
};
