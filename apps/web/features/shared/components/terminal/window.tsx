import { TerminalIcon } from 'lucide-react';

export const TerminalWindow = ({ children }: { children: React.ReactNode }) => (
	<div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-800 overflow-hidden">
		{/* Terminal Header */}
		<div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
			<div className="flex gap-1.5">
				<div className="size-3 rounded-full bg-red-500" />
				<div className="size-3 rounded-full bg-yellow-500" />
				<div className="size-3 rounded-full bg-green-500" />
			</div>
			<div className="flex items-center gap-2 ml-4 text-slate-400">
				<TerminalIcon className="size-4" />
				<span>bash</span>
			</div>
		</div>
		<div className="p-5 md:p-8 font-mono space-y-4">{children}</div>
	</div>
);
