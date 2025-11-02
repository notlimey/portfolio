import { groq } from 'next-sanity';

export const HOMEPAGE_QUERY = groq`*[_type == "homePage"][0]{
	...,
	hero {
		...,
		image {
			...,
			asset->
		}
	},
	highlightedProjects[]->{
		...,
		logo
	}
}`;
