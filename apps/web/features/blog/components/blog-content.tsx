import PortableText from '@common/components/blocks/PortableText';
import type { Post } from '@common/types/post.types';

export const BlogContent = ({ post }: { post: Post }) => {
	return (
		<div className="prose prose-invert prose-slate max-w-none">
			<div className="text-slate-300 space-y-6">
				<PortableText value={post.body ?? []} />
			</div>
		</div>
	);
};
