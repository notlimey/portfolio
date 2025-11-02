import type { SchemaTypeDefinition } from 'sanity';
import { authorType } from './authorType';
import { blockContentType } from './blockContentType';
import { categoryType } from './categoryType';
import { homePage } from './homePage';
import { postType } from './postType';
import { settingSchema } from './settingType';
import { workSchema } from './workType';
import { ventureSchema } from './ventureType';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		blockContentType,
		workSchema,
		ventureSchema,
		categoryType,
		postType,
		authorType,
		homePage,
		settingSchema,
	],
};
