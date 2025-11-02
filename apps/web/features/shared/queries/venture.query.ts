import { groq } from 'next-sanity';

export const VENTURE_QUERY_RAW = groq`{
    ...,
    logo {
        ...,
        asset->
    }
}`;

export const VENTURE_QUERY = groq`*[_type == "venture" && slug.current == $slug][0]${VENTURE_QUERY_RAW}`;

export const VENTURE_QUERY_ALL = groq`*[_type == "venture"]${VENTURE_QUERY_RAW}`;
