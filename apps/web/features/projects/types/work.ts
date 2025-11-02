import type { SanityBlockContent, SanityImage } from '@common/types/root.types';

export type Work = {
	_type: 'work';
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	company: string;
	position: string;
	stack?: string[];
	startDate?: string;
	endDate?: string;
	description?: SanityBlockContent;
	logo?: SanityImage;
	website?: string;
	github?: string;
	linkedin?: string;
	metrics?: { name: string; value: string }[];
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isWork = (project: any): project is Work => {
	return project._type === 'work';
};
