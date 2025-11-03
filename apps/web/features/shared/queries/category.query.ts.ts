import { groq } from 'next-sanity';

export const CATEGORY_QUERY_RAW = groq`{
    ...,
    "slug": slug.current
}`;
