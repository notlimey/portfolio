import type { Venture } from '../../features/projects/types/venture';
import type { Work } from '../../features/projects/types/work';
import type { Post } from './post.types';
import type { SanityImage } from './root.types';

export type HomepageWhoami = {
	name: string;
	location: string;
	role: string;
	stack: string[];
};

export type HomepageHero = {
	title: string;
	description: string;
	image?: SanityImage;
};

export type HomepageWebsite = {
	name: string;
	url: string;
	description: string;
	myRelation?: string;
};

export type HomepageSocials = {
	github?: string;
	linkedin?: string;
};

export type HomepageSettings = {
	_type: 'setting';
	name?: string;
	currentWork?: Work | null;
	ventures?: Venture[];
	socials?: HomepageSocials;
};

export type Homepage = {
	_type: 'homePage';
	whoami: HomepageWhoami;
	hero?: HomepageHero;
	highlightedProjects: (Work | Venture)[];
	settings?: HomepageSettings | null;
};
