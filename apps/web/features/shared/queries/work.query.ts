import { groq } from 'next-sanity';

export const WORK_QUERY_RAW = groq`{
    ...,
    logo {
        ...,
        asset->
    }
}`;

export const WORK_QUERY = groq`*[_type == "work" && slug.current == $slug][0]${WORK_QUERY_RAW}`;

export const WORK_QUERY_ALL = groq`*[_type == "work"]${WORK_QUERY_RAW}`;
