import { client } from '../../../sanity/lib/client';
import { SETTINGS_QUERY } from '../queries/settings.query';
import type { Settings } from '../types';

export const useSettings = async () => {
	const settings: Settings = await client.fetch(SETTINGS_QUERY);
	return settings;
};
