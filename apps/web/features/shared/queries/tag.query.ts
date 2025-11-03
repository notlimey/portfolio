import { groq } from 'next-sanity';

export const TAG_QUERY_RAW = groq`{
    ...,
    "slug": slug.current
}`;
