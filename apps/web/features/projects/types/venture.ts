import type { SanityImage } from '@common/types/root.types';

export type Venture = {
	_type: 'venture';
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	name: string;
	description: string;
	type: string;
	roles: string[];
	stack: string[];
	status: string;
	logo: SanityImage;
	url: string;
	github: string;
	linkedin: string;
};
