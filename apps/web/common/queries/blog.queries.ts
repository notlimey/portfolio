import { groq } from 'next-sanity';
import { CATEGORY_QUERY_RAW } from '~/shared/queries/category.query.ts';
import { TAG_QUERY_RAW } from '~/shared/queries/tag.query';
import { AUTHOR_QUERY_RAW } from './author.queries';

export const POST_QUERY_RAW = groq`{
    ...,
    author->${AUTHOR_QUERY_RAW},
    category->${CATEGORY_QUERY_RAW},
    tags[]->${TAG_QUERY_RAW},
    "queryTags": coalesce($tagIds, []),
    "tagCount": count(tags[@._id in queryTags]),
    "slug": slug.current,
    "canonicalUrl": canonicalUrl,
}`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]${POST_QUERY_RAW}`;

export const POSTS_QUERY = groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc) ${POST_QUERY_RAW}`;

export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" 
    && slug.current != $slug 
    && publishedAt < now()
    && category._id == $categoryId
  ] 
  | order(
    tagCount desc,
    publishedAt desc
    )[0...2]
  ${POST_QUERY_RAW}
`;
