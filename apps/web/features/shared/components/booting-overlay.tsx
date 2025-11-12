'use client';

import { TerminalWindow } from './terminal/window';

export const BootingOverlay = () => {
	return (
		<div
			aria-hidden
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-slate-400 text-sm"
		>
			<div className="max-w-5xl mx-auto w-full">
				<TerminalWindow>
					<div className="flex flex-col items-start justify-start lg:min-h-[540px]">
						<p>Initializing...</p>
						<p>Booting Kernel v6.x...</p>
						<p>Starting user interface services...</p>
					</div>
				</TerminalWindow>
			</div>
		</div>
	);
};
