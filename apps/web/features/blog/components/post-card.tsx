import { Badge } from '@common/components/ui/badge';
import { Card } from '@common/components/ui/card';
import type { Post } from '@common/types/post.types';
import { Calendar, Clock } from 'lucide-react';
import { toPlainText } from 'next-sanity';
import Link from 'next/link';
import { DateDisplay } from '~/shared/components/date';
import { ReadTime } from '~/shared/components/readtime';

export const PostCard = ({ post }: { post: Post }) => (
	<Link href={`/posts/${post.slug}`}>
		<Card
			key={post._id}
			className="p-6 bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all group cursor-pointer"
			onClick={() => {}}
		>
			<div className="mb-3">
				<Badge
					variant="outline"
					className="border-slate-700 text-slate-400 mb-3"
				>
					{post.category?.title}
				</Badge>
				<h3 className="text-white mb-2 group-hover:text-blue-400 transition-colors">
					{post.title}
				</h3>
			</div>

			<p className="text-slate-400 mb-4">
				{toPlainText(post.body ?? []).slice(0, 250)}
			</p>

			<div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
				<div className="flex items-center gap-1">
					<Calendar className="w-3 h-3" />
					<DateDisplay date={post.publishedAt} />
				</div>
				<div className="flex items-center gap-1">
					<Clock className="w-3 h-3" />
					<ReadTime content={post.body} />
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{post.tags?.map((tag) => (
					<Badge
						key={tag._id}
						variant="outline"
						className="bg-slate-950 border-slate-700 text-slate-400 text-xs font-mono"
					>
						#{tag.name}
					</Badge>
				))}
			</div>
		</Card>
	</Link>
);
