import type { SanityBlockContent } from '@common/types/root.types';
import { toPlainText } from 'next-sanity';
import { useMemo } from 'react';

export const useReadTime = (body?: SanityBlockContent) =>
	useMemo(() => {
		if (!body) return '0';
		const text = toPlainText(body);
		const words = text.trim().split(/\s+/).length;
		const minutes = words / 200;
		return Math.ceil(minutes).toString();
	}, [body]);
