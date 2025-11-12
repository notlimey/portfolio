import { defineField, defineType } from 'sanity';

export const ventureSchema = defineType({
	name: 'venture',
	title: 'Venture',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
			},
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
			name: 'type',
			title: 'Type',
			type: 'string',
		}),
		defineField({
			name: 'roles',
			title: 'Roles',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'color',
			type: 'string',
			options: {
				list: [
					{ title: 'Purple', value: 'purple' },
					{ title: 'Pink', value: 'pink' },
					{ title: 'Blue', value: 'blue' },
					{ title: 'Orange', value: 'orange' },
					{ title: 'Yellow', value: 'yellow' },
					{ title: 'Green', value: 'green' },
					{ title: 'Red', value: 'red' },
				],
			},
		}),
		defineField({
			name: 'stack',
			title: 'Stack',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'status',
			title: 'Status',
			type: 'string',
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
			name: 'url',
			title: 'URL',
			type: 'url',
		}),
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
});
