import type { Venture } from '../../features/projects/types/venture';
import type { Work } from '../../features/projects/types/work';

export type Homepage = {
	_type: 'homePage';
	whoami: {
		name: string;
		location: string;
		role: string;
		stack: string[];
	};
	highlightedProjects: (Work | Venture)[];
};
