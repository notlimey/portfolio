import { defineField, defineType } from 'sanity';

export const homePage = defineType({
	name: 'homePage',
	title: 'Home Page',
	type: 'document',
	fields: [
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'object',
			fields: [
				defineField({
					name: 'title',
					title: 'Title',
					type: 'string',
				}),

				defineField({
					name: 'description',
					title: 'Description',
					type: 'text',
				}),

				defineField({
					name: 'image',
					title: 'Image',
					type: 'image',
				}),
			],
		}),
		defineField({
			name: 'latestPosts',
			title: 'Latest Posts title',
			type: 'string',
		}),
		defineField({
			name: 'otherWebsitesTitle',
			title: 'Other Websites Title',
			type: 'string',
		}),
		defineField({
			name: 'otherWebsites',
			title: 'Other Websites',
			type: 'array',
			of: [
				defineField({
					name: 'website',
					title: 'Website',
					type: 'object',
					fields: [
						defineField({
							name: 'name',
							title: 'Name',
							type: 'string',
						}),
						defineField({
							name: 'url',
							title: 'URL',
							type: 'url',
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
						}),
						defineField({
							name: 'myRelation',
							title: 'My Relation',
							type: 'string',
						}),
					],
				}),
			],
		}),
	],
});
