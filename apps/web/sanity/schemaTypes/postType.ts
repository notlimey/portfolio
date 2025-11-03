import { defineArrayMember, defineField, defineType } from 'sanity';

export const postType = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
		}),
		defineField({
			name: 'author',
			type: 'reference',
			to: { type: 'author' },
		}),
		defineField({
			name: 'mainImage',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative text',
				},
			],
		}),
		defineField({
			name: 'category',
			type: 'reference',
			to: { type: 'category' },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tags',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: { type: 'tag' },
				}),
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'body',
			type: 'blockContent',
		}),
		defineField({
			name: 'canonicalUrl',
			title: 'Canonical URL',
			type: 'url',
		}),
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'mainImage',
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});
