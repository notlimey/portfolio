import {toPlainText} from '@portabletext/react';
import {Post} from "@common/types/post.types";
import {urlFor} from "../../sanity/lib/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.yourdomain.com';
const ORGANIZATION_NAME = 'Limeyfy AS'; // Leveraging entrepreneurial context

const sanitizeJsonLd = (json: object): string => {
    return JSON.stringify(json).replace(/</g, '\\u003c');
};

export function generatePostJsonLd(post: Post) {
    if (!post) return null;

    const absoluteUrl = `${BASE_URL}/posts/${post.slug}`;
    const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).url() : '';
    const description = toPlainText(post.body ?? []).slice(0, 150) + '...';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': absoluteUrl,
        },
        headline: post.title,
        image: imageUrl,
        datePublished: post.publishedAt || post._createdAt,
        dateModified: post._updatedAt || post._createdAt,
        author: {
            '@type': 'Person',
            name: post.author?.name || 'Martin Kulvedrøsten Myhre',
        },
        publisher: {
            '@type': 'Person',
            name: post.author?.name || 'Martin Kulvedrøsten Myhre',
        },
        description: description,
    };

    return sanitizeJsonLd(jsonLd);
}

export function PostJsonLd({ post }: { post: Post }) {
    const jsonLdString = generatePostJsonLd(post);

    if (!jsonLdString) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
    );
}