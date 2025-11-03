'use client';
import PortableText from '@common/components/blocks/PortableText';
import { Badge } from '@common/components/ui/badge';
import { Card } from '@common/components/ui/card';
import type { Homepage } from '@common/types/homepage.types';
import { toPlainText } from 'next-sanity';
import NextDynamic from 'next/dynamic';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Venture } from '~/projects/types/venture';
import type { Work } from '~/projects/types/work';
import type { Settings } from '~/shared/types';
import { useEffect, useState } from 'react';
const SyntaxHighlighter = NextDynamic(
	() =>
		import('react-syntax-highlighter').then(
			(m) => m.Prism as unknown as React.ComponentType<unknown>,
		),
	{ ssr: false },
) as unknown as React.FC<{
	language: string;
	style: Record<string, React.CSSProperties>;
	children?: React.ReactNode;
	showLineNumbers?: boolean;
	customStyle?: React.CSSProperties;
	lineNumberStyle?:
		| React.CSSProperties
		| ((n: number) => React.CSSProperties);
}>;

const escapeSnippetValue = (value?: string) =>
	(value ?? '').replace(/"/g, '\\"');

const formatArrayForSnippet = (items?: string[]) =>
	items && items.length
		? items.map((item) => `"${escapeSnippetValue(item)}"`).join(', ')
		: '';

const formatVenturesForSnippet = (ventures: Venture[] | undefined) => {
	if (!ventures || ventures.length === 0) {
		return '      // Add ventures in Sanity to see them here';
	}

	return ventures
		.map((venture) => {
			const snippetFields = [
				`name: "${escapeSnippetValue(
					venture.name ?? 'Untitled Venture',
				)}"`,
				venture.type
					? `type: "${escapeSnippetValue(venture.type)}"`
					: null,
				venture.description
					? `description: "${escapeSnippetValue(toPlainText(venture.description))}"`
					: null,
				venture.roles?.length
					? `roles: [${formatArrayForSnippet(venture.roles)}]`
					: null,
			].filter(Boolean) as string[];

			return `      {\n        ${snippetFields.join(',\n        ')}\n      }`;
		})
		.join(',\n');
};

export function About({
	homepage,
	settings,
	ventures,
	work,
}: {
	homepage: Homepage;
	settings: Settings;
	ventures: Venture[];
	work: Work[];
}) {
	const whoami = homepage?.whoami ?? {
		name: '',
		location: '',
		role: '',
		stack: [],
	};
	const stack = whoami.stack ?? [];
	const venturesSource =
		(settings?.ventures && settings.ventures.length > 0
			? settings.ventures
			: ventures) ?? [];
	const firstWork = work?.length > 0 ? work?.[0] : undefined;
	const currentWork = settings?.currentWork ?? firstWork ?? null;
	const currentWorkStack =
		currentWork?.stack && currentWork.stack.length > 0
			? currentWork.stack
			: stack;
	const passion =
		homepage.hero?.description?.split('\n')[0] ??
		'Building products that matter';

	const classNameBase = escapeSnippetValue(whoami.name);
	const className = classNameBase.replace(/\s+/g, '') || 'DeveloperProfile';

	const venturesForSnippet = formatVenturesForSnippet(venturesSource);
	const snippetStackWhoami = formatArrayForSnippet(stack);
	const snippetStackWork = formatArrayForSnippet(currentWorkStack);
	const snippetCompany = escapeSnippetValue(
		currentWork?.company ?? 'Independent',
	);
	const snippetPosition = escapeSnippetValue(
		currentWork?.position ?? 'Developer',
	);
	const snippetPassion = escapeSnippetValue(passion);

	const codeSnippet = `class ${className} implements Developer {
  name = "${escapeSnippetValue(whoami.name)}";
  location = "${escapeSnippetValue(whoami.location)}";
  role = "${escapeSnippetValue(whoami.role)}";
  stack = [${snippetStackWhoami}];

  getCurrentWork(): WorkInfo {
    return {
      company: "${snippetCompany}",
      position: "${snippetPosition}",
      stack: [${snippetStackWork}]
    };
  }

  getVentures(): Venture[] {
    return [
${venturesForSnippet}
    ];
  }

  getPassion(): string {
    return "${snippetPassion}";
  }
}`;

	const quickFacts = [
		whoami.location
			? {
					icon: '📍',
					text: `Based in ${whoami.location}`,
				}
			: null,
		currentWork?.company && currentWork?.position
			? {
					icon: '🏢',
					text: `${currentWork.position} @ ${currentWork.company}`,
				}
			: null,
		stack.length
			? {
					icon: '💻',
					text: `Working with ${stack.join(', ')}`,
				}
			: null,
		venturesSource.length
			? {
					icon: '🚀',
					text: `${venturesSource.length} venture${
						venturesSource.length === 1 ? '' : 's'
					} in flight`,
				}
			: null,
	].filter(Boolean) as { icon: string; text: string }[];

	return (
		<section className="py-20 bg-slate-900">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-8 items-start">
						{/* Code Editor */}
						<div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
							<div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
								<div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
									<span>Developer.ts</span>
								</div>
								<div className="flex gap-1.5">
									<div className="w-3 h-3 rounded-full bg-red-500" />
									<div className="w-3 h-3 rounded-full bg-yellow-500" />
									<div className="w-3 h-3 rounded-full bg-green-500" />
								</div>
							</div>
							<div className="overflow-x-auto">
								<CodeSnippetSSR code={codeSnippet} />
							</div>
						</div>

						{/* Info Cards */}
						<div className="space-y-6">
							<div>
								<h2 className="text-4xl mb-4 text-white">
									About Me
								</h2>
								<p className="text-slate-400 font-mono mb-4">
									{'// Developer by day, developer by night'}
								</p>
							</div>

							<Card className="p-6 bg-slate-800 border-slate-700">
								<h3 className="text-white mb-3">
									💼 Current Role
								</h3>
								{currentWork ? (
									<>
										<p className="text-slate-300 mb-2">
											{currentWork.position}{' '}
											{currentWork.company ? (
												<>
													at{' '}
													<span className="text-blue-400 font-mono">
														{currentWork.company}
													</span>
												</>
											) : null}
										</p>
										<div className="text-slate-400">
											{currentWork.description ? (
												<PortableText
													value={
														currentWork.description ??
														[]
													}
												/>
											) : null}
										</div>
										{currentWorkStack.length > 0 ? (
											<div className="flex flex-wrap gap-2 mt-4">
												{currentWorkStack.map(
													(tech, index) => (
														<Badge
															// biome-ignore lint/suspicious/noArrayIndexKey: tech is a string
															key={`${tech}-${index}`}
															className="bg-slate-900/60 text-slate-200 border-slate-700"
														>
															{tech}
														</Badge>
													),
												)}
											</div>
										) : null}
									</>
								) : (
									<p className="text-slate-400">
										No current role listed yet. Add one in
										Sanity settings to feature it here.
									</p>
								)}
							</Card>

							<Card className="p-6 bg-slate-800 border-slate-700">
								<h3 className="text-white mb-3">
									🚀 Entrepreneurship
								</h3>
								{venturesSource.length > 0 ? (
									<div className="space-y-4">
										{venturesSource.map((venture) => {
											const meta = [
												venture.roles?.length
													? venture.roles.join(', ')
													: null,
												venture.type ?? null,
											]
												.filter(Boolean)
												.join(' • ');

											return (
												<div
													key={
														venture._id ??
														venture.name
													}
												>
													<div className="flex items-center gap-2 mb-1">
														<Badge className="bg-purple-500/10 text-purple-300 border-purple-500/20">
															{venture.name}
														</Badge>
														{meta ? (
															<span className="text-slate-400 text-sm">
																{meta}
															</span>
														) : null}
													</div>
													<div className="text-slate-400">
														{venture.description ? (
															<PortableText
																value={
																	venture.description ??
																	[]
																}
															/>
														) : null}
													</div>
												</div>
											);
										})}
									</div>
								) : (
									<p className="text-slate-400">
										Showcase ventures by linking them in the
										Sanity settings document.
									</p>
								)}
							</Card>

							<Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
								<div className="flex items-start gap-3">
									<div className="text-2xl">⚡</div>
									<div>
										<h3 className="text-white mb-2">
											Quick Facts
										</h3>
										{quickFacts.length > 0 ? (
											<ul className="space-y-2 text-slate-300">
												{quickFacts.map((fact) => (
													<li
														key={fact.text}
														className="flex items-center gap-2"
													>
														<span>{fact.icon}</span>
														<span>{fact.text}</span>
													</li>
												))}
											</ul>
										) : (
											<p className="text-slate-400">
												Add more profile information to
												populate quick facts.
											</p>
										)}
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

const CodeSnippetSSR = ({ code }: { code: string }) => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => setIsClient(true), []);

	if (!isClient) {
		return (
			<pre className="m-0 p-4 bg-transparent text-slate-200 text-sm overflow-x-auto">
				<code>{code}</code>
			</pre>
		);
	}

	return (
		<SyntaxHighlighter
			language="typescript"
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
			{code}
		</SyntaxHighlighter>
	);
};
