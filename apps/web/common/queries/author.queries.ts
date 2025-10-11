import { groq } from 'next-sanity';

export const AUTHOR_QUERY_RAW = groq`{
    name,
    image,
    bio,
    "slug": slug.current
}`;
