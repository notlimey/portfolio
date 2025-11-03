import {
	LATEST_POSTS_QUERY,
	RELATED_POSTS_QUERY,
} from '@common/queries/blog.queries';
import type { Post } from '@common/types/post.types';
import { client } from '../../../sanity/lib/client';

export const useRelatedPosts = async ({ slug, tags, category }: Post) => {
	const relatedPosts: Post[] = await client.fetch(RELATED_POSTS_QUERY, {
		slug,
		tagIds: tags?.map((tag) => tag._id) ?? [],
		categoryId: category._id,
	});
	return relatedPosts;
};

export const useLatestPosts = async ({ ignoreId }: { ignoreId?: string }) => {
	const latestPosts: Post[] = await client.fetch(LATEST_POSTS_QUERY, {
		tagIds: [],
		ignoreId: ignoreId || 'undefined',
	});
	return latestPosts;
};
