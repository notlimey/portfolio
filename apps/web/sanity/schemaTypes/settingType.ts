import { defineField, defineType } from 'sanity';

export const settingSchema = defineType({
	name: 'setting',
	title: 'Setting',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
		}),
		defineField({
			name: 'currentWork',
			title: 'Current Work',
			type: 'reference',
			to: { type: 'work' },
		}),
		defineField({
			name: 'ventures',
			title: 'Ventures',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'venture' } }],
		}),
		defineField({
			name: 'socials',
			title: 'Socials',
			type: 'object',
			fields: [
				defineField({
					name: 'github',
					title: 'GitHub',
					type: 'url',
				}),
				defineField({
					name: 'linkedin',
					title: 'LinkedIn',
					type: 'url',
				}),
			],
		}),
	],
});
