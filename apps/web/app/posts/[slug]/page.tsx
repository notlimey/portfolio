import { POST_BY_SLUG_QUERY } from '@common/queries/blog.queries';
import { PostJsonLd } from '@common/structured-data/post-json-ld';
import type { Post } from '@common/types/post.types';
import PostView from '@common/views/posts/post-view';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toPlainText } from 'next-sanity';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import { BASE_URL } from '../../../configuration';

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const post: Post = await client.fetch(POST_BY_SLUG_QUERY, {
		slug: params.slug,
	});

	if (!post) {
		return {};
	}

	return {
		title: post?.title,
		description: `${toPlainText(post?.body ?? []).slice(0, 150)}...`,
		openGraph: {
			images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
		},
		twitter: {
			images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
		},
		alternates: {
			canonical: post.canonicalUrl || `${BASE_URL}/posts/${post.slug}`,
		},
	} satisfies Metadata;
};

export default async function PostPage({
	params,
}: {
	params: { slug: string };
}) {
	const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: params.slug });

	if (!post) return notFound();

	return (
		<>
			<PostJsonLd post={post} />
			<PostView {...post} />
		</>
	);
}
