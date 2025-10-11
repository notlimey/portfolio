'use client';
import type { Post } from '@common/types/post.types';
import Link from 'next/link';
import { toPlainText } from 'next-sanity';
import { urlFor } from '../../../sanity/lib/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';

export default function PostCard({ post }: { post: Post }) {
	return (
		<Link href={`/posts/${post.slug}`} key={post._id} className="h-full">
			<Card className="flex h-full flex-col">
				<CardHeader>
					<CardTitle className="line-clamp-2">{post.title}</CardTitle>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="line-clamp-4 text-muted-foreground">
						{toPlainText(post.body ?? []).slice(0, 250)}
					</p>
				</CardContent>
				<CardFooter className="!py-2 flex items-center border-t">
					<div className="flex items-center gap-2">
						<Avatar className="size-8">
							<AvatarImage
								src={
									post?.author?.image
										? (urlFor(post?.author?.image).url() ??
											'')
										: ''
								}
								alt={post?.author?.name}
							/>
							<AvatarFallback>
								{post?.author?.name?.charAt(0).toUpperCase()}
								{post?.author?.name
									?.split(' ')[1]
									?.charAt(0)
									.toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium text-sm">
								{post?.author?.name}
							</p>
							<p
								className="inline-flex items-center gap-1 text-muted-foreground text-sm"
								suppressHydrationWarning
							>
								{post.publishedAt ? (
									<>
										<span suppressHydrationWarning>
											{new Date(
												post.publishedAt,
											).toLocaleTimeString('nb-NO', {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
										<span>-</span>
										<span suppressHydrationWarning>
											{new Date(
												post.publishedAt,
											).toLocaleDateString()}
										</span>
									</>
								) : (
									'-'
								)}
							</p>
						</div>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
