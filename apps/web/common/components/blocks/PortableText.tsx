import type { CodeBlock as CodeBlockType } from '@common/types/blocks.types';
import type { SanityBlockContent } from '@common/types/root.types';
import { PortableText as NativePortableText } from '@portabletext/react';
import CodeBlock from './CodeBlock';

export default function PortableText({ value }: { value: SanityBlockContent }) {
	return (
		<NativePortableText
			value={value}
			components={{
				types: {
					code: ({ value }: { value: CodeBlockType }) => {
						return <CodeBlock {...value} />;
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
