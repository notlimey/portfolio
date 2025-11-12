import { POSTS_QUERY } from '@common/queries/blog.queries';
import type { Post } from '@common/types/post.types';
import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { FeaturedPost } from '~/blog/components/featured-post';
import { PostHeader } from '~/blog/components/header';
import { PostCard } from '~/blog/components/post-card';
import { useHomepage } from '~/home/hooks/use-homepage';
import { BASE_URL } from '../../configuration';
import { client } from '../../sanity/lib/client';

export const metadata: Metadata = {
	title: 'Blog Posts',
	description:
		'Thoughts on code, architecture, and building stuff. Explore articles about Next.js, TypeScript, .NET, Azure, and software development best practices.',
	alternates: {
		canonical: `${BASE_URL}/posts`,
	},
	openGraph: {
		title: 'Blog Posts | Martin Kulvedrøsten Myhre',
		description:
			'Thoughts on code, architecture, and building stuff. Explore articles about Next.js, TypeScript, .NET, Azure, and software development best practices.',
		url: `${BASE_URL}/posts`,
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Blog Posts | Martin Kulvedrøsten Myhre',
		description:
			'Thoughts on code, architecture, and building stuff. Explore articles about Next.js, TypeScript, .NET, Azure, and software development best practices.',
	},
};

export default async function PostsPage() {
	const posts: Post[] = await client.fetch(POSTS_QUERY, { tagIds: [] });
	const homePage = await useHomepage();

	return (
		<div>
			<PostHeader />
			<section className="py-20 bg-slate-950">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="flex items-center gap-3 mb-4 justify-center">
							<BookOpen className="w-8 h-8 text-green-400" />
							<h1 className="text-4xl text-white">Blog</h1>
						</div>

						<p className="text-center text-slate-400 mb-12 font-mono">
							{
								'// Thoughts on code, architecture, and building stuff'
							}
						</p>

						{homePage.featuredPost && (
							<FeaturedPost post={homePage.featuredPost} />
						)}

						<div className="grid md:grid-cols-2 gap-6">
							{posts.map((post) => (
								<PostCard key={post._id} post={post} />
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
