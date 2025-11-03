'use client';
import { Badge } from '@common/components/ui/badge';
import { Button } from '@common/components/ui/button';
import { Card } from '@common/components/ui/card';
import type { Post } from '@common/types/post.types';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { toPlainText } from 'next-sanity';
import Link from 'next/link';
import { DateDisplay } from '~/shared/components/date';
import { ReadTime } from '~/shared/components/readtime';

export const FeaturedPost = ({ post }: { post: Post }) => (
	<Link href={`/posts/${post.slug}`}>
		<Card className="p-8 mb-8 bg-gradient-to-br from-blue-500/10 via-slate-900 to-purple-500/10 border-blue-500/30 hover:border-blue-500/50 transition-colors">
			<Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
				Featured
			</Badge>
			<h3 className="text-white mb-3">{post.title}</h3>
			<p className="text-slate-300 mb-4 text-lg">
				{toPlainText(post.body ?? []).slice(0, 250)}
			</p>

			<div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-400">
				<div className="flex items-center gap-2">
					<Calendar className="w-4 h-4" />
					<DateDisplay date={post.publishedAt} />
				</div>
				<div className="flex items-center gap-2">
					<Clock className="w-4 h-4" />
					<ReadTime content={post.body} />
				</div>
				<Badge
					variant="outline"
					className="border-slate-700 text-slate-400"
				>
					{post.category.title}
				</Badge>
			</div>

			<div className="flex flex-wrap gap-2 mb-4">
				{post.tags?.map((tag) => (
					<Badge
						key={tag._id}
						className="bg-slate-800 border-slate-700 text-slate-300 font-mono"
					>
						#{tag.name}
					</Badge>
				))}
			</div>

			<Button className="gap-2 bg-blue-600 hover:bg-blue-700">
				Read Article <ArrowRight className="w-4 h-4" />
			</Button>
		</Card>
	</Link>
);
