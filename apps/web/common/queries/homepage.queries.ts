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
	highlightedProjects[]->{
		...,
		logo
	},
	"settings": *[_type == "setting"][0]{
		...,
		currentWork->{
			...,
			logo
		},
		ventures[]->{
			...,
			logo
		}
	},
	"work": coalesce(*[_type == "work"]{
		...,
		logo
	}, []),
	"ventures": coalesce(*[_type == "venture"]{
		...,
		logo
	}, [])
}`;
