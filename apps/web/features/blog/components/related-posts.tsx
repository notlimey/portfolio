import { Badge } from '@common/components/ui/badge';
import { Card } from '@common/components/ui/card';
import type { Post } from '@common/types/post.types';
import { toPlainText } from 'next-sanity';
import Link from 'next/link';
import { DateDisplay } from '~/shared/components/date';
import { ReadTime } from '~/shared/components/readtime';
import { useRelatedPosts } from '../hooks/use-posts';

export const RelatedPosts = async ({ post: currentPost }: { post: Post }) => {
	const relatedPosts: Post[] = await useRelatedPosts(currentPost);

	if (relatedPosts.length === 0) return null;

	return (
		<div className="mt-16">
			<h2 className="text-3xl text-white mb-6">Related Articles</h2>
			<div className="grid md:grid-cols-2 gap-6">
				{relatedPosts
					.filter((post) => post._id !== currentPost._id)
					.slice(0, 2)
					.map((post) => (
						<Link
							key={post._id}
							href={`/posts/${post.slug}`}
							className="h-full"
						>
							<Card className="p-6 bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all group cursor-pointer h-full">
								{post.tags?.map((category) => (
									<Badge
										key={category._id}
										variant="outline"
										className="border-slate-700 text-slate-400 mb-3"
									>
										{category.name}
									</Badge>
								))}
								<h3 className="text-white mb-2 group-hover:text-blue-400 transition-colors">
									{post.title}
								</h3>
								<p className="text-slate-400 text-sm mb-4">
									{toPlainText(post.body ?? []).substring(
										0,
										120,
									)}
									...
								</p>
								<div className="flex items-center gap-3 text-sm text-slate-500">
									<DateDisplay date={post.publishedAt} />
									<span>•</span>
									<ReadTime content={post.body} />
								</div>
							</Card>
						</Link>
					))}
			</div>
		</div>
	);
};
