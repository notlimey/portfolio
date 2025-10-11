'use client';

import PortableText from '@common/components/blocks/PortableText';
import { Badge } from '@common/components/ui/badge';
import type { Post } from '@common/types/post.types';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { urlFor } from '../../../sanity/lib/image';

export default function PostView({
	body,
	title,
	categories,
	author,
	publishedAt,
}: Post) {
	return (
		<div className="mx-auto flex max-w-[880px] flex-col gap-5 px-8 py-10">
			<div>
				<Link href={'/'} className="flex items-center gap-2">
					<ArrowLeft />
					Home
				</Link>
			</div>
			<h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
				{title}
			</h1>
			<div className="flex flex-col gap-2">
				<div className="mb-3 flex items-center gap-2">
					<Avatar className="size-12">
						<AvatarImage
							src={
								author?.image
									? (urlFor(author?.image).url() ?? '')
									: ''
							}
							alt={author?.name}
						/>
						<AvatarFallback>
							{author?.name?.charAt(0).toUpperCase()}
							{author?.name
								?.split(' ')[1]
								?.charAt(0)
								.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium text-sm">{author?.name}</p>
						<p
							className="inline-flex items-center gap-1 text-muted-foreground text-sm"
							suppressHydrationWarning
						>
							{publishedAt ? (
								<>
									<span suppressHydrationWarning>
										{new Date(
											publishedAt,
										).toLocaleTimeString('nb-NO', {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</span>
									<span>-</span>
									<span suppressHydrationWarning>
										{new Date(
											publishedAt,
										).toLocaleDateString()}
									</span>
								</>
							) : (
								'-'
							)}
						</p>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					{categories?.map((x) => (
						<Badge key={x.slug}>{x.title}</Badge>
					))}
				</div>
			</div>
			<div className="portabletext">
				<PortableText value={body ?? []} />
			</div>
		</div>
	);
}
