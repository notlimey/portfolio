'use client';
import type { Homepage } from '@common/types/homepage.types';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';

export default function PostCard({
	website,
}: {
	website: Homepage['otherWebsites'][number];
}) {
	return (
		<a href={website.url} key={website.url} className="h-full">
			<Card className="flex h-full flex-col">
				<CardHeader>
					<CardTitle className="line-clamp-2">
						{website.name}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="line-clamp-4 text-muted-foreground">
						{website.description}
					</p>
				</CardContent>
				<CardFooter>
					<p className="text-muted-foreground text-sm">
						{website.myRelation}
					</p>
				</CardFooter>
			</Card>
		</a>
	);
}
