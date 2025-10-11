import { groq } from 'next-sanity';
import { AUTHOR_QUERY_RAW } from './author.queries';

export const POST_QUERY_RAW = groq`{
    ...,
    author->${AUTHOR_QUERY_RAW},
    categories[]->,
    "slug": slug.current,
    "canonicalUrl": canonicalUrl
}`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]${POST_QUERY_RAW}`;

export const POSTS_QUERY = groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc) ${POST_QUERY_RAW}`;
