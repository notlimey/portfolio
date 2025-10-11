import { groq } from 'next-sanity';
import { POST_QUERY_RAW } from './blog.queries';

export const HOMEPAGE_QUERY = groq`*[_type == "homePage"][0]{
  ...,
  hero {
    ...,
    image {
      ...,
      asset->
    }
  },
  "latestPosts": *[_type == "post" && publishedAt < now()] | order(publishedAt desc) [0...3]${POST_QUERY_RAW},
}`;
