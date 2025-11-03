'use client';
import type { CodeBlock as CodeBlockType } from '@common/types/blocks.types';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { registerLanguage } from 'react-refractor';
import js from 'refractor/lang/javascript';
import tsx from 'refractor/lang/tsx';
import ts from 'refractor/lang/typescript';
import { toast } from 'sonner';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

registerLanguage(js);
registerLanguage(ts);
registerLanguage(tsx);

const CodeBlock = (props: CodeBlockType) => {
	const [copied, setCopied] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(props.code);

		toast.success('Copied to clipboard');
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div className="relative mt-6 overflow-x-scroll rounded-lg border bg-slate-900">
			<div className="flex justify-between bg-secondary-foreground px-4 py-2 text-secondary">
				<p className="uppercase">{props.language}</p>
				<button
					type="button"
					onClick={handleCopy}
					className="inline-flex items-center gap-2"
				>
					{copied ? (
						<CheckIcon className="size-4" />
					) : (
						<CopyIcon className="size-4" />
					)}
				</button>
			</div>
			<SyntaxHighlighter
				language={props.language || 'typescript'}
				style={vscDarkPlus}
				showLineNumbers={true}
				customStyle={{
					margin: 0,
					padding: '1rem',
					background: 'transparent',
					fontSize: '0.875rem',
				}}
				lineNumberStyle={{
					minWidth: '2.5em',
					paddingRight: '1em',
					color: '#475569',
					userSelect: 'none',
				}}
			>
				{props.code}
			</SyntaxHighlighter>
		</div>
	);
};

export default CodeBlock;
