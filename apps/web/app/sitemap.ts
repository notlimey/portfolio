import { POSTS_QUERY } from '@common/queries/blog.queries';
import type { Post } from '@common/types/post.types';
import type { MetadataRoute } from 'next';
import { client } from '../sanity/lib/client';
import { BASE_URL } from '../configuration';
// Use Date objects for lastModified to let Next.js format correctly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();

	const site: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: now,
		},
		{
			url: `${BASE_URL}/posts`,
			lastModified: now,
		},
	];
	const posts: Post[] = await client.fetch(POSTS_QUERY, { tagIds: [] });

	for (const post of posts) {
		site.push({
			url: `${BASE_URL}/posts/${post.slug}`,
			lastModified: new Date(post._updatedAt),
		});
	}

	return site;
}
