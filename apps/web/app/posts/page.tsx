import PostCard from "@common/components/cards/post-card";
import { POSTS_QUERY } from "@common/queries/blog.queries";
import type { Post } from "@common/types/post.types";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { client } from "../../sanity/lib/client";

export const metadata: Metadata = {
    title: "Posts",
    description: "Posts",
    alternates: {
        canonical: "https://mkmyhre.com/posts"
    }
};

export default async function PostsPage() {
    const posts: Post[] = await client.fetch(POSTS_QUERY);

    return (
        <div className="mx-auto max-w-[1240px] py-12 lg:py-24 flex flex-col gap-5 px-5">
            <div>
                <Link href={"/"} className="flex items-center gap-2">
                    <ArrowLeft/>
                    Home
                </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Posts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: Post) => (
                    <PostCard key={post._id} post={post}/>
                ))}
            </div>
        </div>
    );
}
