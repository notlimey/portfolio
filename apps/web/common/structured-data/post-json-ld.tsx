import type { Post } from '@common/types/post.types';
import { toPlainText } from '@portabletext/react';
import { urlFor } from '../../sanity/lib/image';
import { BASE_URL } from '../../configuration';

const sanitizeJsonLd = (json: object): string => {
	return JSON.stringify(json).replace(/</g, '\\u003c');
};

const calculateWordCount = (text: string): number => {
	return text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
};

export function generatePostJsonLd(post: Post) {
	if (!post) return null;

	const absoluteUrl = `${BASE_URL}/posts/${post.slug}`;
	const imageUrl = post.mainImage
		? urlFor(post.mainImage).width(1200).url()
		: '';
	const description = `${toPlainText(post.body ?? []).slice(0, 150)}...`;
	const articleBody = toPlainText(post.body ?? []);
	const wordCount = calculateWordCount(articleBody);
	const keywords = post.tags?.map((tag) => tag.name) || [];

	const jsonLd: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': absoluteUrl,
		},
		headline: post.title,
		datePublished: post.publishedAt || post._createdAt,
		dateModified: post._updatedAt || post._createdAt,
		author: {
			'@type': 'Person',
			name: post.author?.name || 'Martin Kulvedrøsten Myhre',
			...(post.author?.image && {
				image: urlFor(post.author.image).url(),
			}),
		},
		publisher: {
			'@type': 'Organization',
			name: 'Martin Kulvedrøsten Myhre',
			url: BASE_URL,
		},
		description: description,
		inLanguage: 'en-US',
	};

	// Add optional fields only if they have values
	if (imageUrl) {
		jsonLd.image = {
			'@type': 'ImageObject',
			url: imageUrl,
			width: 1200,
			height: 630,
		};
	}

	if (articleBody) {
		jsonLd.articleBody = articleBody;
	}

	if (post.category?.title) {
		jsonLd.articleSection = post.category.title;
	}

	if (keywords.length > 0) {
		jsonLd.keywords = keywords.join(', ');
	}

	if (wordCount > 0) {
		jsonLd.wordCount = wordCount;
	}

	return sanitizeJsonLd(jsonLd);
}

export function PostJsonLd({ post }: { post: Post }) {
	const jsonLdString = generatePostJsonLd(post);

	if (!jsonLdString) return null;

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: This is a necessary evil for injecting JSON-LD
			dangerouslySetInnerHTML={{ __html: jsonLdString }}
		/>
	);
}
