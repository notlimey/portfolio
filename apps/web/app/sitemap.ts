import { POSTS_QUERY } from "@common/queries/blog.queries";
import type { Post } from "@common/types/post.types";
import type { MetadataRoute } from "next";
import { client } from "../sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site: MetadataRoute.Sitemap = [
    {
      url: "https://mkmyhre.com",
      lastModified: new Date(),
    },
  ];
  const posts: Post[] = await client.fetch(POSTS_QUERY);

  for (const post of posts) {
    site.push({
      url: `https://mkmyhre.com/posts/${post.slug}`,
      lastModified: new Date(),
    });
  }

  return site;
}
