import type { Homepage } from '@common/types/homepage.types';
import { TerminalWindow } from '~/shared/components/terminal/window';
import type { Settings } from '~/shared/types';
import { HeroWindowContent } from './window-content';

export const Hero = ({
	settings,
	homepage,
}: {
	settings: Settings;
	homepage: Homepage;
}) => {
	return (
		<section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
			<div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

			<div className="container mx-auto px-4 py-20 relative z-10 text-sm md:text-base">
				<div className="max-w-5xl mx-auto">
					<TerminalWindow>
						<HeroWindowContent
							settings={settings}
							homepage={homepage}
						/>
					</TerminalWindow>
				</div>
			</div>
		</section>
	);
};
