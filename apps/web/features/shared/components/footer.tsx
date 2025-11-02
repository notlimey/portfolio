import { Github, Linkedin, Mail, Twitter, Terminal } from 'lucide-react';
import { Button } from '@common/components/ui/button';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-slate-950 border-t border-slate-800">
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-8 mb-8">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<Terminal className="w-5 h-5 text-blue-400" />
								<h3 className="text-white">
									Martin Kulvedrøsten Myhre
								</h3>
							</div>
							<p className="text-slate-400 font-mono mb-4">
								{'// Full-stack developer & entrepreneur'}
							</p>
							<p className="text-slate-500">
								Building digital products from Hamar, Norway.
								Always learning, always shipping.
							</p>
						</div>

						<div>
							<h3 className="text-white mb-4">Connect</h3>
							<div className="flex flex-wrap gap-3 mb-4">
								<Button
									variant="outline"
									size="icon"
									className="border-slate-700 hover:border-blue-500 hover:bg-slate-900"
								>
									<Github className="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="border-slate-700 hover:border-blue-500 hover:bg-slate-900"
								>
									<Linkedin className="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="border-slate-700 hover:border-blue-500 hover:bg-slate-900"
								>
									<Twitter className="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="border-slate-700 hover:border-blue-500 hover:bg-slate-900"
								>
									<Mail className="w-4 h-4" />
								</Button>
							</div>
							<div className="text-slate-500 text-sm font-mono">
								<div>
									{
										'martin@portfolio:~$ echo "Open to opportunities"'
									}
								</div>
								<div className="text-green-400">
									Open to opportunities
								</div>
							</div>
						</div>
					</div>

					<div className="border-t border-slate-800 pt-6">
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
							<p className="font-mono text-sm">
								© {currentYear} Martin Kulvedrøsten Myhre. Built
								with Next.js &{' '}
								<span className="text-blue-400">Tailwind</span>.
							</p>
							<div className="flex gap-1 items-center font-mono text-sm">
								<span className="text-green-400">●</span>
								<span>All systems operational</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
