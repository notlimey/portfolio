"use client";
import type { Homepage } from "@common/types/homepage.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PostCard({
  website,
}: {
  website: Homepage["otherWebsites"][number];
}) {
  return (
    <a href={website.url} key={website.url} className="h-full">
      <Card className="h-full flex-col flex">
        <CardHeader>
          <CardTitle className="line-clamp-2">{website.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-4">
            {website.description}
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm">{website.myRelation}</p>
        </CardFooter>
      </Card>
    </a>
  );
}
