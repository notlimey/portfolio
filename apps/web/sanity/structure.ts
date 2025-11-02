import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title('Blog')
		.items([
			S.listItem()
				.title('Home Page')
				.child(
					S.editor()
						.schemaType('homePage')
						.id('homePage')
						.title('Home Page'),
				),
			S.documentTypeListItem('post').title('Posts'),
			S.documentTypeListItem('category').title('Categories'),
			S.documentTypeListItem('author').title('Authors'),
			S.divider(),
			...S.documentTypeListItems().filter((item) => {
				const id = item.getId();
				return (
					id &&
					![
						'post',
						'category',
						'author',
						'homePage',
						'setting',
					].includes(id)
				);
			}),
			S.listItem()
				.title('Settings')
				.child(
					S.editor()
						.schemaType('setting')
						.id('setting')
						.title('Settings'),
				),
		]);
