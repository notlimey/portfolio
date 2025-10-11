import { POSTS_QUERY } from '@common/queries/blog.queries';
import type { Post } from '@common/types/post.types';
import type { MetadataRoute } from 'next';
import { client } from '../sanity/lib/client';
import { BASE_URL } from '../configuration';
import { format } from 'date-fns';

const DATE_FORMAT = 'dd/MM/yyyy';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = format(new Date(), DATE_FORMAT);

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
	const posts: Post[] = await client.fetch(POSTS_QUERY);

	for (const post of posts) {
		site.push({
			url: `${BASE_URL}/posts/${post.slug}`,
			lastModified: format(new Date(post._updatedAt), DATE_FORMAT),
		});
	}

	return site;
}
