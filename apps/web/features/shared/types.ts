import type { Venture } from '../projects/types/venture';
import type { Work } from '../projects/types/work';

export type SettingsSocials = {
	github?: string;
	linkedin?: string;
};

export type Settings = {
	_type: 'setting';
	name?: string;
	currentWork?: Work | null;
	ventures?: Venture[];
	socials?: SettingsSocials;
};
