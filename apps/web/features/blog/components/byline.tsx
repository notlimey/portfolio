'use client';
import { Badge } from '@common/components/ui/badge';
import { Separator } from '@common/components/ui/seperator';
import type { Post } from '@common/types/post.types';
import { Calendar, Clock } from 'lucide-react';
import { DateDisplay } from '~/shared/components/date';
import { ReadTime } from '~/shared/components/readtime';

export const PostByline = ({ post }: { post: Post }) => (
	<div className="mb-12">
		<div className="flex flex-wrap gap-2">
			<Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
				{post.category?.title}
			</Badge>
		</div>

		<h1 className="text-5xl text-white mb-6">{post.title}</h1>

		<div className="flex flex-wrap items-center gap-4 text-slate-400 mb-6">
			<div className="flex items-center gap-2">
				<Calendar className="w-4 h-4" />
				<DateDisplay date={post.publishedAt} />
			</div>
			<div className="flex items-center gap-2">
				<Clock className="w-4 h-4" />
				<ReadTime content={post.body} />
			</div>
		</div>

		<div className="flex flex-wrap gap-2">
			{post.tags?.map((tag) => (
				<Badge
					key={tag._id}
					variant="outline"
					className="bg-slate-900 border-slate-700 text-slate-300 font-mono"
				>
					#{tag.name}
				</Badge>
			))}
		</div>

		<Separator className="mt-8 bg-slate-800" />
	</div>
);
