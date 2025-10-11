export const sanitizeJsonLd = (json: object): string => {
	return JSON.stringify(json).replace(/</g, '\\u003c');
};
