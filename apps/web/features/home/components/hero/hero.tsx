'use client';
import { Button } from '@common/components/ui/button';
import type { Homepage } from '@common/types/homepage.types';
import { animated } from '@react-spring/web';
import { Code2, Github, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Settings } from '~/shared/types';
import { Typewriter } from '../../../shared/components/typewriter';
import { CliPrefix } from './cli';
import { ANIMATION_CONFIG } from './config';
import type { IHeroVisibleState } from './types';
import { Whoami } from './whoami';

export const Hero = ({
	settings,
	homepage,
}: {
	settings: Settings;
	homepage: Homepage;
}) => {
	const [visible, setVisible] = useState<IHeroVisibleState>({
		information: false,
		projects: false,
		projectsList: false,
		search: false,
	});

	const projectsListTimeoutRef = useRef<number | null>(null);
	const searchTimeoutRef = useRef<number | null>(null);

	const toggleVisible = useCallback((key: keyof typeof visible) => {
		setVisible((prev) => {
			if (prev[key]) return prev;
			return {
				...prev,
				[key]: true,
			};
		});
	}, []);

	const handleProjectsCommandComplete = useCallback(() => {
		if (projectsListTimeoutRef.current) {
			window.clearTimeout(projectsListTimeoutRef.current);
		}

		projectsListTimeoutRef.current = window.setTimeout(() => {
			toggleVisible('projectsList');
			projectsListTimeoutRef.current = null;
		}, ANIMATION_CONFIG.afterCommandsDelay);
	}, [toggleVisible]);

	useEffect(() => {
		if (!visible.projectsList || visible.search) return;

		if (searchTimeoutRef.current) {
			window.clearTimeout(searchTimeoutRef.current);
		}

		searchTimeoutRef.current = window.setTimeout(() => {
			toggleVisible('search');
			searchTimeoutRef.current = null;
		}, ANIMATION_CONFIG.afterCommandsDelay);
	}, [visible.projectsList, visible.search, toggleVisible]);

	useEffect(
		() => () => {
			if (projectsListTimeoutRef.current) {
				window.clearTimeout(projectsListTimeoutRef.current);
				projectsListTimeoutRef.current = null;
			}
			if (searchTimeoutRef.current) {
				window.clearTimeout(searchTimeoutRef.current);
				searchTimeoutRef.current = null;
			}
		},
		[],
	);

	return (
		<section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
			{/* Grid background */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

			<div className="container mx-auto px-4 py-20 relative z-10 text-sm md:text-base">
				<div className="max-w-5xl mx-auto">
					{/* Terminal Window */}
					<div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-800 overflow-hidden">
						{/* Terminal Header */}
						<div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
							<div className="flex gap-1.5">
								<div className="w-3 h-3 rounded-full bg-red-500" />
								<div className="w-3 h-3 rounded-full bg-yellow-500" />
								<div className="w-3 h-3 rounded-full bg-green-500" />
							</div>
							<div className="flex items-center gap-2 ml-4 text-slate-400">
								<Terminal className="w-4 h-4" />
								<span>bash</span>
							</div>
						</div>

						<div className="p-5 md:p-8 font-mono space-y-4">
							<Whoami
								visible={visible}
								toggleVisible={toggleVisible}
								homepage={homepage}
								settings={settings}
							/>

							<animated.div
								className="pt-4"
								style={
									visible.projects
										? { opacity: 1 }
										: { opacity: 0 }
								}
							>
								<p className="text-green-400 mb-2 inline-flex items-center gap-2 whitespace-nowrap">
									<CliPrefix />
									<Typewriter
										text="ls ./current-focus"
										typingSpeed={
											ANIMATION_CONFIG.typingSpeedCommand
										}
										onComplete={
											handleProjectsCommandComplete
										}
										enabled={visible.projects}
										delay={
											ANIMATION_CONFIG.betweenCommandsDelay
										}
									/>
								</p>
								<animated.div
									style={
										visible.projectsList
											? { opacity: 1 }
											: { opacity: 0 }
									}
									className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm"
								>
									<div className="bg-slate-800 p-3 rounded border border-slate-700">
										<div className="text-yellow-400 mb-1">
											📁 crayon-consulting/
										</div>
										<div className="text-slate-400 text-xs">
											Consulting - Full-Stack Development
										</div>
									</div>
									<div className="bg-slate-800 p-3 rounded border border-slate-700">
										<div className="text-yellow-400 mb-1">
											📁 3steps-platform/
										</div>
										<div className="text-slate-400 text-xs">
											Handball analytics
										</div>
									</div>
									<div className="bg-slate-800 p-3 rounded border border-slate-700">
										<div className="text-yellow-400 mb-1">
											📁 limeyfy/
										</div>
										<div className="text-slate-400 text-xs">
											Client websites
										</div>
									</div>
								</animated.div>
							</animated.div>

							<animated.div
								style={
									visible.projectsList
										? { opacity: 1 }
										: { opacity: 0 }
								}
								className="pt-4 flex flex-wrap gap-3"
							>
								<Button
									className="bg-blue-600 hover:bg-blue-700"
									asChild
								>
									<Link
										href={settings.socials?.github ?? ''}
										className="gap-2 cursor-pointer"
									>
										<Github className="w-4 h-4" />
										GitHub
									</Link>
								</Button>
								<Button
									variant="outline"
									className="gap-2 border-slate-700 hover:bg-slate-800"
								>
									<Code2 className="w-4 h-4" />
									View Projects
								</Button>
							</animated.div>

							<animated.div
								style={
									visible.search
										? { opacity: 1 }
										: { opacity: 0 }
								}
								className="text-green-400"
							>
								<CliPrefix />{' '}
								<span className="animate-pulse">▋</span>
							</animated.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
