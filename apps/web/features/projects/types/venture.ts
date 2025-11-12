import type { SanityBlockContent, SanityImage } from '@common/types/root.types';

export type Venture = {
	_type: 'venture';
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	name: string;
	description?: SanityBlockContent;
	type?: string;
	roles?: string[];
	stack?: string[];
	status?: string;
	logo?: SanityImage;
	url?: string;
	github?: string;
	linkedin?: string;
	metrics?: { name: string; value: string }[];
	color?: 'purple' | 'pink' | 'blue' | 'orange' | 'yellow' | 'green' | 'red';
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isVenture = (project: any): project is Venture => {
	return project._type === 'venture';
};
