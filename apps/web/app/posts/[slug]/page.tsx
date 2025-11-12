import { POST_BY_SLUG_QUERY, POSTS_QUERY } from '@common/queries/blog.queries';
import { PostJsonLd } from '@common/structured-data/post-json-ld';
import type { Post } from '@common/types/post.types';
import type { Metadata } from 'next';
import { toPlainText } from 'next-sanity';
import { notFound } from 'next/navigation';
import { BlogAuthor } from '~/blog/components/author';
import { BlogContent } from '~/blog/components/blog-content';
import { PostByline } from '~/blog/components/byline';
import { PostHeader } from '~/blog/components/header';
import { BASE_URL } from '../../../configuration';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import { RelatedPosts } from '~/blog/components/related-posts';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const posts: Post[] = await client.fetch(POSTS_QUERY, { tagIds: [] });
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export const revalidate = 3600;

export const generateMetadata = async ({ params }: PageProps) => {
	const { slug } = await params;
	const post: Post = await client.fetch(POST_BY_SLUG_QUERY, {
		slug,
		tagIds: [],
	});

	if (!post) {
		return {};
	}

	const imageUrl = post.mainImage
		? urlFor(post.mainImage).width(1200).height(630).url()
		: `${BASE_URL}/og-image.png`;

	return {
		title: post?.title,
		description: `${toPlainText(post?.body ?? []).slice(0, 150)}...`,
		openGraph: {
			title: post?.title,
			description: `${toPlainText(post?.body ?? []).slice(0, 150)}...`,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt:
						post.mainImage?.alt || post?.title || 'Blog post image',
				},
			],
			type: 'article',
			publishedTime: post.publishedAt,
			modifiedTime: post._updatedAt,
			authors: post.author?.name ? [post.author.name] : undefined,
			tags: post.tags?.map((tag) => tag.name),
		},
		twitter: {
			card: 'summary_large_image',
			title: post?.title,
			description: `${toPlainText(post?.body ?? []).slice(0, 150)}...`,
			images: [imageUrl],
		},
		alternates: {
			canonical: post.canonicalUrl || `${BASE_URL}/posts/${post.slug}`,
		},
	} satisfies Metadata;
};

export default async function PostPage({ params }: PageProps) {
	const { slug } = await params;
	const post: Post = await client.fetch(POST_BY_SLUG_QUERY, {
		slug,
		tagIds: [],
	});

	if (!post) return notFound();

	return (
		<>
			<PostJsonLd post={post} />
			<PostHeader />

			<article className="py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<PostByline post={post} />
						<BlogContent post={post} />
						{post.author && <BlogAuthor author={post.author} />}
						<RelatedPosts post={post} />
					</div>
				</div>
			</article>
		</>
	);
}
