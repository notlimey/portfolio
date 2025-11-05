// src/components/StructuredData/GlobalSchema.tsx
import { BASE_URL } from '../../configuration';

const jsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Person',
			'@id': 'https://mkmyhre.com/#person',
			name: 'Martin Kulvedrøsten Myhre',
			url: 'https://mkmyhre.com',
			jobTitle: [
				'Junior Consultant',
				'CEO',
				'Full-Stack Developer',
				'Architect',
			],
			alumniOf: {
				'@type': 'EducationalOrganization',
				name: 'Hamar Katedralskole',
			},
			knowsAbout: [
				'Next.js',
				'Sanity',
				'Optimizely',
				'.NET',
				'C#',
				'TypeScript',
				'Microsoft Azure',
				'Docker',
				'Architecture',
			],
			worksFor: [
				{ '@id': '#crayonconsulting' },
				{ '@id': '#readplayas' },
				{ '@id': '#limeyfyas' },
			],
			contactPoint: [
				{
					'@type': 'ContactPoint',
					contactType: 'Work Email',
					email: 'mkm@limeyfy.no',
				},
			],
			sameAs: [
				'https://www.linkedin.com/in/martinkmyhre',
				'https://github.com/notlimey',
				'https://3steps.no',
				'https://limeyfy.no',
			],
		},
		{
			'@type': 'Organization',
			'@id': '#crayonconsulting',
			name: 'Crayon Consulting AS',
			alternateName: 'Inmeta Consulting AS',
			description: 'Junior Consultant employer.',
			address: {
				'@type': 'PostalAddress',
				addressLocality:
					'Oslo/Bergen/Trondheim/Hamar/Kristiansand/Stockholm/Malmö',
			},
		},
		{
			'@type': 'Corporation',
			'@id': '#readplayas',
			name: 'Readplay AS',
			alternateName: '3Steps AS',
			url: 'https://3steps.no',
			description:
				'Data platform for statistics and management of sports teams and organizations.',
		},
		{
			'@type': 'Organization',
			'@id': '#limeyfyas',
			name: 'Limeyfy AS',
			url: 'https://limeyfy.no',
			slogan: 'Transform Your Ideas into Powerful Software Solutions',
			description:
				'Company offering services in web development, consulting, investments, and design.',
		},
		{
			'@type': 'WebSite',
			url: BASE_URL,
			name: "Martin Kulvedrøsten Myhre's Personal Website",
		},
		// Add WebPage metadata for the homepage
		{
			'@type': 'WebPage',
			url: BASE_URL,
			name: 'Home — Martin Kulvedrøsten Myhre',
			description:
				'Senior Full-Stack Developer & Architect focusing on simplicity, performance, and privacy.',
			isPartOf: { '@id': BASE_URL },
		},
	],
};

export function GlobalSchema() {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: This is a necessary evil for injecting JSON-LD
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
