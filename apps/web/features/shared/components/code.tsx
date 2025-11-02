import { cn } from '@common/lib/utils';
import { PlayIcon } from 'lucide-react';
import { useMemo } from 'react';

export const CodeLineVariable = ({
	children,
	name,
	number,
}: {
	children: React.ReactNode;
	name: string;
	number?: number;
}) => (
	<CodeLine number={number}>
		<div className="w-full flex items-center gap-[6px]">
			<ColorText color="purple">const</ColorText>
			<ColorText color="blue">{name}</ColorText>
			<ColorText color="orange">=</ColorText>
			{children}
		</div>
	</CodeLine>
);

export const CodeLineFunction = ({
	children,
	name,
	args,
	async,
	lineNumber,
	lineCount,
	onRun,
}: {
	children: React.ReactNode;
	name: string;
	args: string[];
	async: boolean;
	lineNumber?: number;
	lineCount?: number;
	onRun?: () => void;
}) => (
	<>
		{onRun ? (
			<CodeLine number={(lineNumber ?? 0) - 1}>
				<button
					type="button"
					onClick={onRun}
					className="flex items-center gap-2 cursor-pointer transition-colors text-white hover:text-green-400"
				>
					<PlayIcon className="w-4 h-4 text-green-400" />
					<span>Run function</span>
				</button>
				<span className="text-slate-500">{`// Run the function to send an email`}</span>
			</CodeLine>
		) : null}
		<CodeLine number={lineNumber}>
			<ColorText color="purple">const</ColorText>
			<ColorText color="blue">{name}</ColorText>
			<ColorText color="orange">=</ColorText>
			{async ? <ColorText color="yellow">async</ColorText> : null}
			<ColorText color="white">({args.join(', ')})</ColorText>
			<ColorText color="white">{`=> {`}</ColorText>
		</CodeLine>
		{children}
		<CodeLine number={(lineNumber ?? 0) + (lineCount ?? 0)}>
			<ColorText color="white">{`}`}</ColorText>
		</CodeLine>
	</>
);

export const CodeIndent = () => <span className="w-[24px]" />;

export const CodeLineWithInput = ({
	number,
	name,
	placeholder,
}: {
	number?: number;
	name: string;
	placeholder: string;
}) => (
	<CodeLineVariable name={name} number={number}>
		<input type="text" className="inline-input" placeholder={placeholder} />
	</CodeLineVariable>
);

export const CodeLineWithTextarea = ({
	start,
	end,
	name,
	placeholder,
}: {
	name: string;
	placeholder: string;
	start: number;
	end: number;
}) => (
	<>
		<CodeLineVariable name={name} number={start}>
			<span className="text-yellow-400">`</span>
		</CodeLineVariable>
		<CodeLines
			start={start}
			end={end - 1}
			className="max-h-full overflow-y-auto"
		>
			<textarea
				className="inline-input h-full w-full max-w-[600px]"
				placeholder={placeholder}
				style={{
					resize: 'none',
				}}
			/>
		</CodeLines>
		<CodeLine number={end}>
			<span className="text-orange-400">`;</span>
		</CodeLine>
	</>
);

export const CodeLine = ({
	children,
	number,
}: {
	children?: React.ReactNode;
	number?: number;
}) => (
	<>
		<div className="inline-flex items-center gap-2 whitespace-nowrap">
			<div className="w-5 text-right">
				{number ? (
					<span className="text-slate-500">{number}.</span>
				) : null}
			</div>
			{children}
		</div>
		<br />
	</>
);

export const CodeLines = ({
	children,
	className,
	start,
	end,
}: {
	children: React.ReactNode;
	className?: string;
	start?: number;
	end?: number;
}) => {
	const lines = useMemo(() => {
		return Array.from(
			{ length: (end ?? 0) - (start ?? 0) + 1 },
			(_, index) => (start ?? 0) + index,
		);
	}, [start, end]);

	return (
		<div
			className={cn(
				'flex items-start gap-2 whitespace-nowrap',
				className,
			)}
		>
			<div className="w-5 flex flex-col gap-1 text-right">
				{lines.map((line) => (
					<span key={line} className="text-slate-500">
						{line}.{' '}
					</span>
				))}
			</div>
			<div
				className="flex-1"
				style={{
					height: 20 * lines.length,
				}}
			>
				{children}
			</div>
		</div>
	);
};

export const ConstantVariable = ({
	children,
	number,
	name,
}: {
	children: React.ReactNode;
	number?: number;
	name: string;
}) => (
	<CodeLine number={number}>
		<div className="w-full flex items-center gap-[6px]">
			<ColorText color="purple">const</ColorText>
			<ColorText color="blue">{name}</ColorText>
			<ColorText color="orange">=</ColorText>
			{children}
		</div>
	</CodeLine>
);

const ColorText = ({
	children,
	color,
	className,
}: {
	children: React.ReactNode;
	color?: string;
	className?: string;
}) => {
	switch (color) {
		case 'purple':
			return (
				<span className={cn('text-purple-400', className)}>
					{children}
				</span>
			);
		case 'pink':
			return (
				<span className={cn('text-pink-400', className)}>
					{children}
				</span>
			);
		case 'blue':
			return (
				<span className={cn('text-blue-400', className)}>
					{children}
				</span>
			);
		case 'orange':
			return (
				<span className={cn('text-orange-400', className)}>
					{children}
				</span>
			);
		case 'yellow':
			return (
				<span className={cn('text-yellow-400', className)}>
					{children}
				</span>
			);
		default:
			return (
				<span className={cn('text-white/80', className)}>
					{children}
				</span>
			);
	}
};

export const SyntaxHighlight = ColorText;
