import type { Homepage } from '@common/types/homepage.types';
import dynamic from 'next/dynamic';
import { TerminalWindow } from '~/shared/components/terminal/window';
import type { Settings } from '~/shared/types';

export const Hero = ({
	settings,
	homepage,
	ssr,
}: {
	settings: Settings;
	homepage: Homepage;
	ssr: boolean;
}) => {
	const Content = dynamic(
		() => import('./window-content').then((m) => m.HeroWindowContent),
		{
			ssr,
			loading: () => (
				<div className="flex flex-col items-start justify-start md:h-[367px]">
					<p>Initializing...</p>
					<p>Booting Kernel v6.x...</p>
					<p>Starting user interface services...</p>
				</div>
			),
		},
	);

	return (
		<section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
			<div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

			<div className="container mx-auto px-4 py-20 relative z-10 text-sm md:text-base">
				<div className="max-w-5xl mx-auto">
					<TerminalWindow>
						<Content settings={settings} homepage={homepage} />
					</TerminalWindow>
				</div>
			</div>
		</section>
	);
};
