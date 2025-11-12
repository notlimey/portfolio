import type { Venture } from '../projects/types/venture';
import type { Work } from '../projects/types/work';

export type SettingsSocials = {
	github?: string;
	linkedin?: string;
	email?: string;
};

export type Settings = {
	_type: 'setting';
	name?: string;
	currentWork?: Work | null;
	ventures?: Venture[];
	socials?: SettingsSocials;
};

export type Tag = {
	_type: 'tag';
	_id: string;
	_createdAt: string;
	_updatedAt: string;
	name: string;
};
