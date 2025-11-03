import { RELATED_POSTS_QUERY } from '@common/queries/blog.queries';
import type { Post } from '@common/types/post.types';
import { client } from '../../../sanity/lib/client';

export const useRelatedPosts = async ({ slug }: { slug: string }) => {
	const relatedPosts: Post[] = await client.fetch(RELATED_POSTS_QUERY, {
		slug,
	});
	return relatedPosts;
};
