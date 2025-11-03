import type { SanityBlockContent } from '@common/types/root.types';
import { useReadTime } from '~/blog/hooks/use-readtime';

export const ReadTime = ({ content }: { content?: SanityBlockContent }) => {
	const readTime = useReadTime(content);

	return <span>{readTime} minute read</span>;
};
