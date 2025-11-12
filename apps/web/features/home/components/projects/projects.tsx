'use client';
import PortableText from '@common/components/blocks/PortableText';
import { Badge } from '@common/components/ui/badge';
import { Card } from '@common/components/ui/card';
import { cn } from '@common/lib/utils';
import { GitBranch } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { isVenture } from '~/projects/types/venture';
import type { Settings } from '~/shared/types';
import { urlFor } from '../../../../sanity/lib/image';
import { ContactForm } from '../contact/contact-form';

export function Projects({ currentWork, ventures }: Settings) {
	const projects = useMemo(() => {
		const list = [];
		if (currentWork) {
			list.push(currentWork);
		}
		if (ventures && ventures.length > 0) {
			list.push(...ventures);
		}
		return list;
	}, [currentWork, ventures]);

	return (
		<section className="py-20 bg-slate-950">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-4 justify-center">
						<GitBranch className="w-8 h-8 text-green-400" />
						<h2 className="text-4xl text-white">
							Current Branches
						</h2>
					</div>

					<p className="text-center text-slate-400 mb-12 font-mono">
						{"// Projects I'm actively shipping"}
					</p>

					<div className="space-y-6">
						{projects.map((project) => {
							const name =
								'company' in project
									? project.company
									: project.name;

							return (
								<Card
									key={project._id}
									className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all group"
								>
									<div className="p-6">
										<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
											<div className="flex items-start gap-4">
												<div
													className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0`}
												>
													<Image
														className={`w-6 h-6`}
														src={
															project.logo
																? urlFor(
																		project.logo,
																	)
																		.width(
																			48,
																		)
																		.height(
																			48,
																		)
																		.url()
																: '/images/logo.svg'
														}
														alt={`${name} logo`}
														width={48}
														height={48}
														loading="lazy"
													/>
												</div>
												<div>
													<div className="flex items-center gap-3 mb-1">
														<h3 className="text-white">
															{name}
														</h3>
														<Badge
															variant="outline"
															className={`${
																isVenture(
																	project,
																) &&
																project.status ===
																	'building'
																	? 'border-yellow-500/50 text-yellow-400'
																	: 'border-green-500/50 text-green-400'
															}`}
														>
															<span className="w-2 h-2 rounded-full bg-current mr-1.5 animate-pulse" />
															{isVenture(project)
																? project.status
																: 'Active'}
														</Badge>
													</div>
													<p className="text-blue-400 text-sm mb-2 font-mono">
														{isVenture(project)
															? project.roles?.join(
																	', ',
																)
															: project.position}
													</p>
													<PortableText
														value={
															project.description ??
															[]
														}
													/>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
											{project.metrics?.map((metric) => (
												<div key={metric.name}>
													<div className="text-slate-500 text-xs uppercase mb-1 font-mono">
														{metric.name}
													</div>
													<div className="text-white font-mono">
														{metric.value}
													</div>
												</div>
											))}
										</div>

										<div className="flex flex-wrap gap-2">
											{project.stack?.map((tech) => (
												<Badge
													key={tech}
													className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 font-mono"
												>
													{tech}
												</Badge>
											))}
										</div>
									</div>
								</Card>
							);
						})}
					</div>

					<ContactForm />
				</div>
			</div>
		</section>
	);
}

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
		default:
			return (
				<span className={cn('text-white/80', className)}>
					{children}
				</span>
			);
	}
};
