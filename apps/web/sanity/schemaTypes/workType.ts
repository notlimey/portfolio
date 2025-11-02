import { defineField, defineType } from 'sanity';

export const workSchema = defineType({
	name: 'work',
	title: 'Work',
	type: 'document',
	fields: [
		defineField({
			name: 'company',
			title: 'Company',
			type: 'string',
		}),
		defineField({
			name: 'position',
			title: 'Position',
			type: 'string',
		}),
		defineField({
			name: 'stack',
			title: 'Stack',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'startDate',
			title: 'Start Date',
			type: 'date',
		}),
		defineField({
			name: 'endDate',
			title: 'End Date',
			type: 'date',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
		}),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt',
					type: 'string',
				}),
			],
		}),
		defineField({
			name: 'website',
			title: 'Website',
			type: 'url',
		}),
	],
});
