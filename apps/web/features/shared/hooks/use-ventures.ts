import { client } from '../../../sanity/lib/client';
import type { Venture } from '../../projects/types/venture';
import { VENTURE_QUERY_ALL } from '../queries/venture.query';

export const useVentures = async () => {
	const ventures: Venture[] = await client.fetch(VENTURE_QUERY_ALL);
	return ventures;
};
