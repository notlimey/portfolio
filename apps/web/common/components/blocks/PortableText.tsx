import type { CodeBlock as CodeBlockType } from '@common/types/blocks.types';
import type { SanityBlockContent, SanityImage } from '@common/types/root.types';
import { PortableText as NativePortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../../../sanity/lib/image';
import CodeBlock from './CodeBlock';

const PortableTextImage = ({ value }: { value: SanityImage }) => {
	if (!value?.asset) return null;

	const imageUrl = urlFor(value).width(1200).height(675).url();
	const alt = value?.alt || '';

	return (
		<figure className="my-8">
			<Image
				src={imageUrl}
				alt={alt}
				width={1200}
				height={675}
				className="w-full h-auto rounded-lg"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
				loading="lazy"
			/>
			{alt && (
				<figcaption className="mt-2 text-sm text-slate-400 text-center">
					{alt}
				</figcaption>
			)}
		</figure>
	);
};

export default function PortableText({ value }: { value: SanityBlockContent }) {
	return (
		<NativePortableText
			value={value}
			components={{
				types: {
					code: ({ value }: { value: CodeBlockType }) => {
						return <CodeBlock {...value} />;
					},
					image: ({ value }: { value: SanityImage }) => {
						return <PortableTextImage value={value} />;
					},
				},
				marks: {
					code: ({ children }: { children: React.ReactNode }) => {
						return <code className="code-tag">{children}</code>;
					},
				},
			}}
		/>
	);
}
