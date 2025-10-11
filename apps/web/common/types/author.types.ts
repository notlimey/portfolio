import type { SanityBlockContent, SanityImage } from './root.types';

export type Author = {
	slug: string;
	image?: SanityImage;
	name: string;
	bio?: SanityBlockContent;
};
