'use client';
import PortableText from '@common/components/blocks/PortableText';
import { Avatar, AvatarImage } from '@common/components/ui/avatar';
import { Card } from '@common/components/ui/card';
import type { Author } from '@common/types/author.types';
import { urlFor } from '../../../sanity/lib/image';

export const BlogAuthor = ({ author }: { author: Author }) => (
	<Card className="mt-16 p-8 bg-slate-900 border-slate-800">
		<div className="flex items-start gap-4">
			<div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
				<Avatar className="size-20">
					<AvatarImage
						src={author.image ? urlFor(author.image).url() : ''}
						alt={author.name}
					/>
				</Avatar>
			</div>
			<div>
				<h3 className="text-white text-xl mb-2">{author.name}</h3>
				<div className="text-slate-400 mb-4">
					<PortableText value={author.bio ?? []} />
				</div>
			</div>
		</div>
	</Card>
);
