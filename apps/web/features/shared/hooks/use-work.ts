import { client } from '../../../sanity/lib/client';
import type { Work } from '../../projects/types/work';
import { WORK_QUERY_ALL } from '../queries/work.query';

export const useWork = async () => {
	const work: Work[] = await client.fetch(WORK_QUERY_ALL);
	return work;
};
