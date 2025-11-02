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
			name: 'description',
			title: 'Description',
			type: 'text',
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
