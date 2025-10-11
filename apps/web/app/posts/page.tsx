import PostCard from '@common/components/cards/post-card';
import { POSTS_QUERY } from '@common/queries/blog.queries';
import type { Post } from '@common/types/post.types';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../sanity/lib/client';
import { BASE_URL } from '../../configuration';

export const metadata: Metadata = {
	title: 'Posts',
	description: 'Posts',
	alternates: {
		canonical: `${BASE_URL}/posts`,
	},
};

export default async function PostsPage() {
	const posts: Post[] = await client.fetch(POSTS_QUERY);

	return (
		<div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-12 lg:py-24">
			<div>
				<Link href={'/'} className="flex items-center gap-2">
					<ArrowLeft />
					Home
				</Link>
			</div>
			<h1 className="font-bold text-4xl tracking-tighter sm:text-5xl md:text-6xl">
				Posts
			</h1>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post: Post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</div>
	);
}
