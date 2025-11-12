'use client';
import { Button } from '@common/components/ui/button';
import type { Homepage } from '@common/types/homepage.types';
import { animated } from '@react-spring/web';
import { Code2, Github } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Settings } from '~/shared/types';
import { Typewriter } from '../../../shared/components/typewriter';
import { CliPrefix } from './cli';
import { ANIMATION_CONFIG } from './config';
import type { IHeroVisibleState } from './types';
import { Whoami } from './whoami';

export const HeroWindowContent = ({
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
		<>
			<Whoami
				visible={visible}
				toggleVisible={toggleVisible}
				homepage={homepage}
				settings={settings}
			/>

			<animated.div
				className="pt-4"
				style={visible.projects ? { opacity: 1 } : { opacity: 0 }}
			>
				<p className="text-green-400 mb-2 inline-flex items-center gap-2 whitespace-nowrap">
					<CliPrefix />
					<Typewriter
						text="ls ./current-focus"
						typingSpeed={ANIMATION_CONFIG.typingSpeedCommand}
						onComplete={handleProjectsCommandComplete}
						enabled={visible.projects}
						delay={ANIMATION_CONFIG.betweenCommandsDelay}
					/>
				</p>
				<animated.div
					style={
						visible.projectsList ? { opacity: 1 } : { opacity: 0 }
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
						<div className="text-yellow-400 mb-1">📁 limeyfy/</div>
						<div className="text-slate-400 text-xs">
							Client websites
						</div>
					</div>
				</animated.div>
			</animated.div>

			<animated.div
				style={visible.projectsList ? { opacity: 1 } : { opacity: 0 }}
				className="pt-4 flex flex-wrap gap-3"
			>
				<Button className="bg-blue-600 hover:bg-blue-700" asChild>
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
					asChild
				>
					<Link href="#projects">
						<Code2 className="w-4 h-4" />
						View Projects
					</Link>
				</Button>
			</animated.div>

			<animated.div
				style={visible.search ? { opacity: 1 } : { opacity: 0 }}
				className="text-green-400"
			>
				<CliPrefix /> <span className="animate-pulse">▋</span>
			</animated.div>
		</>
	);
};
