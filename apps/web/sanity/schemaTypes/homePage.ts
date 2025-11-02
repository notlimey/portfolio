import { BookOpenIcon, Code, CpuIcon, GlobeIcon, UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const homePage = defineType({
	name: 'homePage',
	title: 'Home Page',
	type: 'document',
	groups: [
		{
			name: 'whoami',
			title: 'Whoami',
			icon: UserIcon,
			default: true,
		},
		{
			name: 'about',
			title: 'About Me',
			icon: Code,
		},
		{
			name: 'arsenal',
			title: 'Tech Arsenal',
			icon: CpuIcon,
		},
		{
			name: 'other',
			title: 'Other',
			icon: GlobeIcon,
		},
	],
	fields: [
		defineField({
			name: 'whoami',
			title: 'Whoami',
			type: 'object',
			group: 'whoami',
			fields: [
				defineField({
					name: 'name',
					title: 'Name',
					type: 'string',
				}),
				defineField({
					name: 'location',
					title: 'Location',
					type: 'string',
				}),
				defineField({
					name: 'role',
					title: 'Role',
					type: 'string',
				}),
				defineField({
					name: 'stack',
					title: 'Stack',
					type: 'array',
					of: [{ type: 'string' }],
				}),
			],
		}),
		defineField({
			name: 'highlightedProjects',
			group: 'about',
			title: 'Highlighted Projects',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'work' }, { type: 'venture' }],
				},
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
