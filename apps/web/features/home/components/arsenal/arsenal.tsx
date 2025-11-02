import { Card } from '@common/components/ui/card';
import { Badge } from '@common/components/ui/badge';
import { blogPosts } from '../blog/data';
import { techStack } from './techstack';
import { Cpu } from 'lucide-react';

export function TechStackArsenal() {
	return (
		<section className="py-20 bg-slate-900">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-4 justify-center">
						<Cpu className="w-8 h-8 text-blue-400" />
						<h2 className="text-4xl text-white">Tech Arsenal</h2>
					</div>

					<p className="text-center text-slate-400 mb-12 font-mono">
						{'// From systems programming to cloud infrastructure'}
					</p>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{Object.entries(techStack).map(([key, category]) => {
							const Icon = category.icon;
							return (
								<Card
									key={key}
									className="p-6 bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors"
								>
									<div className="flex items-center gap-3 mb-4">
										<div
											className={`w-12 h-12 rounded-lg ${category.bg} flex items-center justify-center`}
										>
											<Icon
												className={`w-6 h-6 ${category.color}`}
											/>
										</div>
										<h3 className="text-white capitalize">
											{key}
										</h3>
									</div>

									<div className="flex flex-wrap gap-2">
										{category.items.map((item) => (
											<Badge
												key={item}
												variant="outline"
												className="bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500/50"
											>
												{item}
											</Badge>
										))}
									</div>
								</Card>
							);
						})}
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
						<div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
							<div className="text-3xl text-blue-400 mb-1">
								{blogPosts.length}
							</div>
							<div className="text-slate-400 text-sm">
								Blog Posts
							</div>
						</div>
						<div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
							<div className="text-3xl text-green-400 mb-1">
								∞
							</div>
							<div className="text-slate-400 text-sm">
								Lines of Code
							</div>
						</div>
						<div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
							<div className="text-3xl text-purple-400 mb-1">
								2
							</div>
							<div className="text-slate-400 text-sm">
								Ventures
							</div>
						</div>
						<div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
							<div className="text-3xl text-orange-400 mb-1">
								24/7
							</div>
							<div className="text-slate-400 text-sm">
								Problem Solving
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
