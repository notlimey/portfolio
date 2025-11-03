'use server';

import { HOMEPAGE_QUERY } from '@common/queries/homepage.queries';
import type { Homepage } from '@common/types/homepage.types';
import { client } from '../../../sanity/lib/client';

export const useHomepage = async () => {
	const homePage: Homepage = await client.fetch(HOMEPAGE_QUERY, {
		tagIds: [],
	});
	return homePage;
};
