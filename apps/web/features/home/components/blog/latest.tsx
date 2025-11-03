'use client';
import { Badge } from '@common/components/ui/badge';
import { Button } from '@common/components/ui/button';
import { Card } from '@common/components/ui/card';
import type { Post } from '@common/types/post.types';
import { toPlainText } from '@portabletext/react';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { DateDisplay } from '~/shared/components/date';
import { ReadTime } from '~/shared/components/readtime';
import { blogPosts } from './data';
import { PostCard } from '~/blog/components/post-card';
import { FeaturedPost } from '~/blog/components/featured-post';

export function LatestBlogPosts({
	latestPosts,
	featuredPost,
}: {
	latestPosts: Post[];
	featuredPost?: Post | null;
}) {
	return (
		<section className="py-20 bg-slate-950">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-4 justify-center">
						<BookOpen className="w-8 h-8 text-green-400" />
						<h2 className="text-4xl text-white">Blog</h2>
					</div>

					<p className="text-center text-slate-400 mb-12 font-mono">
						{
							'// Thoughts on code, architecture, and building stuff'
						}
					</p>

					{featuredPost && <FeaturedPost post={featuredPost} />}

					<div className="grid md:grid-cols-2 gap-6">
						{latestPosts.map((post) => (
							<PostCard key={post._id} post={post} />
						))}
					</div>

					{/* Load More */}
					<div className="text-center mt-12">
						<Button
							variant="outline"
							size="lg"
							className="border-slate-700 hover:bg-slate-900 hover:border-blue-500"
						>
							Load More Articles
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
