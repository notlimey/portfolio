import type { SanityImage } from '@common/types/root.types';

export type Work = {
	_type: 'work';
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	company: string;
	position: string;
	stack: string[];
	startDate: string;
	endDate: string;
	description: string;
	logo: SanityImage;
	website: string;
	github: string;
	linkedin: string;
};
