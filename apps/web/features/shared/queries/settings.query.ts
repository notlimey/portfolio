import { groq } from 'next-sanity';
import { VENTURE_QUERY_RAW } from './venture.query';
import { WORK_QUERY_RAW } from './work.query';

export const SETTINGS_QUERY = groq`*[_type == "setting"][0]{
    ...,
    currentWork->${WORK_QUERY_RAW},
    ventures[]->${VENTURE_QUERY_RAW},
    socials {
        github,
        linkedin
    }
}`;
