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
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
				},
			],
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'company',
			},
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
			name: 'metrics',
			title: 'Metrics',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							type: 'string',
						}),
						defineField({
							name: 'value',
							title: 'Value',
							type: 'string',
						}),
					],
				},
			],
		}),
		defineField({
			name: 'website',
			title: 'Website',
			type: 'url',
		}),
	],
});
