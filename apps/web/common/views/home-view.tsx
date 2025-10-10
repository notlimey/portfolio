"use client";
import PostCard from "@common/components/cards/post-card";
import WebsiteCard from "@common/components/cards/website-card";
import { Badge } from "@common/components/ui/badge";
import type { Homepage } from "@common/types/homepage.types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";

export default function HomeView({ homepage }: { homepage: Homepage }) {
  return (
    <div className="mx-auto max-w-[1240px] py-12 lg:py-24 flex flex-col gap-12 ">
      <section className="w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  {homepage.hero.title}
                </h1>
                <div className="flex gap-2 pb-4 pt-2">
                  <Badge>Software Developer</Badge>
                  <Badge>CEO</Badge>
                  <Badge>Entrepreneur</Badge>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {homepage.hero.description}
                </p>
              </div>
            </div>
            <Image
              src={urlFor(homepage.hero.image).width(1240).height(900).quality(70).url()}
              width="550"
              height="400"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {homepage.latestPostsTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {homepage.latestPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/posts">View All Posts</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-ful">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Other Websites to Visit
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {homepage.otherWebsites.map((website) => (
                <WebsiteCard key={website.url} website={website} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
