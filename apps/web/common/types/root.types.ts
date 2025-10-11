export type SanityImage = {
	_type: 'image';
	asset: {
		_ref: string;
		_type: string;
	};
};

// biome-ignore lint/suspicious/noExplicitAny: Sanity block content is a flexible and dynamic array, so we use any[] for simplicity.
export type SanityBlockContent = any[];
