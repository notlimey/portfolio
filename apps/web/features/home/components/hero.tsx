'use client';
import { Button } from '@common/components/ui/button';
import { animated, useSpring } from '@react-spring/web';
import { Code2, Github, Terminal } from 'lucide-react';
import { useState } from 'react';
import { ChainedTypewriter } from '../../shared/components/chained-typewriter';
import {
	calculateTimeToFinish,
	ListWithTypewriter,
} from '../../shared/components/list-with-typewriter';
import { Typewriter } from '../../shared/components/typewriter';
import { sleep } from '@common/lib/utils';

const whoami = [
	{
		label: 'name',
		value: 'Martin Kulvedrøsten Myhre',
	},
	{
		label: 'role',
		value: 'Full-Stack Developer & Entrepreneur',
	},
	{
		label: 'location',
		value: 'Hamar, Norway 🇳🇴',
	},
	{
		label: 'current',
		value: 'Junior Consultant @ Crayon (prev. Inmeta)',
	},
	{
		label: 'stack',
		value: '[TypeScript, .NET, Next.js, React, Systems]',
	},
	{
		label: 'ventures',
		value: '3Steps AS, Limeyfy AS',
	},
];

const whoamiWithLength = whoami.map((item) => ({
	label: item.label,
	value: item.value,
	len: item.value.length + item.label.length + 2,
}));
const WHOAMI_TIME_BETWEEN_ROWS = 50;
const WHOAMI_TYPING_SPEED = 5;

const animationConfig = {
	initial: 500, // delay in milliseconds
	delayAfterInitial: 200,
	text: 100, // speed in milliseconds
	whoamiItem: 50,
	delayBeforeProjects: 500,
	projects: 100,
	delayAfterProjects: 200,
};

const START_INFORMATION_DELAY =
	animationConfig.initial +
	animationConfig.delayAfterInitial +
	animationConfig.whoamiItem * 6;

export const Hero = () => {
	const timeToFinishInformation = calculateTimeToFinish(
		whoamiWithLength,
		WHOAMI_TYPING_SPEED,
		START_INFORMATION_DELAY,
		WHOAMI_TIME_BETWEEN_ROWS,
	);

	const timeUntilProjects =
		timeToFinishInformation + animationConfig.delayBeforeProjects;

	const [visible, setVisible] = useState({
		information: false,
		projects: false,
		projectsList: false,
		search: false,
	});

	const toggleVisible = (key: keyof typeof visible) => {
		setVisible((prev) => ({
			...prev,
			[key]: true,
		}));
	};

	const toggleProjectsList = () => {
		const timeout = setTimeout(async () => {
			toggleVisible('projectsList');
			await sleep(500);
			toggleVisible('search');
		}, 500);
		return () => clearTimeout(timeout);
	};

	return (
		<section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
			{/* Grid background */}
			<div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

			<div className="container mx-auto px-4 py-20 relative z-10">
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

						<div className="p-8 font-mono space-y-4">
							<p className="text-green-400 inline-flex items-center gap-2 whitespace-nowrap">
								<span>martin@portfolio:~$</span>
								<Typewriter
									text="whoami"
									delay={animationConfig.initial}
									typingSpeed={WHOAMI_TYPING_SPEED * 3}
									onComplete={() =>
										toggleVisible('information')
									}
								/>
							</p>

							<div className="space-y-2 text-slate-300">
								<ListWithTypewriter
									items={whoamiWithLength.map(
										(item, index) => ({
											node: (delay: number) => (
												<div
													key={item.label}
													className="flex gap-4"
												>
													<ChainedTypewriter
														enabled={
															visible.information
														}
														items={[
															{
																text: `${item.label}:`,
																key: `${item.label}-label`,
																className:
																	'text-blue-400 mr-2',
															},
															{
																text: item.value,
																key: `${item.label}-value`,
																className:
																	'text-white',
															},
														]}
														initialDelay={
															delay + 100
														}
														typingSpeed={
															WHOAMI_TYPING_SPEED
														}
														onComplete={() =>
															index ===
															whoamiWithLength.length -
																1
																? toggleVisible(
																		'projects',
																	)
																: undefined
														}
													/>
												</div>
											),
											key: item.label,
											len: item.len,
										}),
									)}
									betweenItemsDelay={WHOAMI_TIME_BETWEEN_ROWS}
									typingSpeed={WHOAMI_TYPING_SPEED}
									className="flex gap-1 flex-col"
								/>
							</div>

							<animated.div
								className="pt-4"
								style={
									visible.projects
										? { opacity: 1 }
										: { opacity: 0 }
								}
							>
								<p className="text-green-400 mb-2 inline-flex items-center gap-2 whitespace-nowrap">
									<span>martin@portfolio:~$</span>
									<Typewriter
										text="ls ./current-focus"
										typingSpeed={WHOAMI_TYPING_SPEED * 3}
										onComplete={() => toggleProjectsList()}
										enabled={visible.projects}
										delay={500}
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
											📁 full-stack-dev/
										</div>
										<div className="text-slate-400 text-xs">
											Enterprise solutions
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
								<Button className="gap-2 bg-blue-600 hover:bg-blue-700">
									<Github className="w-4 h-4" />
									GitHub
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
								martin@portfolio:~${' '}
								<span className="animate-pulse">▋</span>
							</animated.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
