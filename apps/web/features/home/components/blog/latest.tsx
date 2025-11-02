'use client';
import { Badge } from '@common/components/ui/badge';
import { Button } from '@common/components/ui/button';
import { Card } from '@common/components/ui/card';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { blogPosts } from './data';

export function LatestBlogPosts() {
	const firstPost = blogPosts[0];

	return (
		<section className="py-20 bg-slate-950">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-4 justify-center">
						<BookOpen className="w-8 h-8 text-green-400" />
						<h2 className="text-4xl text-white">Blog</h2>
					</div>

					<p className="text-center text-slate-400 mb-12 font-mono">
						{
							'// Thoughts on code, architecture, and building stuff'
						}
					</p>

					{/* Featured Post */}
					{firstPost && (
						<Card className="p-8 mb-8 bg-gradient-to-br from-blue-500/10 via-slate-900 to-purple-500/10 border-blue-500/30 hover:border-blue-500/50 transition-colors">
							<Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
								Featured
							</Badge>
							<h3 className="text-white mb-3">
								{firstPost.title}
							</h3>
							<p className="text-slate-300 mb-4 text-lg">
								{firstPost.excerpt}
							</p>

							<div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-400">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<span>
										{new Date(
											firstPost.date ?? '',
										).toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										})}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									<span>{firstPost.readTime} read</span>
								</div>
								<Badge
									variant="outline"
									className="border-slate-700 text-slate-400"
								>
									{firstPost.category}
								</Badge>
							</div>

							<div className="flex flex-wrap gap-2 mb-4">
								{firstPost.tags.map((tag) => (
									<Badge
										key={tag}
										className="bg-slate-800 border-slate-700 text-slate-300 font-mono"
									>
										#{tag}
									</Badge>
								))}
							</div>

							<Button
								className="gap-2 bg-blue-600 hover:bg-blue-700"
								onClick={() => {}}
							>
								Read Article <ArrowRight className="w-4 h-4" />
							</Button>
						</Card>
					)}

					{/* Recent Posts Grid */}
					<div className="grid md:grid-cols-2 gap-6">
						{blogPosts.slice(1).map((post) => (
							<Card
								key={post.id}
								className="p-6 bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all group cursor-pointer"
								onClick={() => {}}
							>
								<div className="mb-3">
									<Badge
										variant="outline"
										className="border-slate-700 text-slate-400 mb-3"
									>
										{post.category}
									</Badge>
									<h3 className="text-white mb-2 group-hover:text-blue-400 transition-colors">
										{post.title}
									</h3>
								</div>

								<p className="text-slate-400 mb-4">
									{post.excerpt}
								</p>

								<div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
									<div className="flex items-center gap-1">
										<Calendar className="w-3 h-3" />
										<span>
											{new Date(
												post.date,
											).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
											})}
										</span>
									</div>
									<div className="flex items-center gap-1">
										<Clock className="w-3 h-3" />
										<span>{post.readTime}</span>
									</div>
								</div>

								<div className="flex flex-wrap gap-2">
									{post.tags.map((tag) => (
										<Badge
											key={tag}
											variant="outline"
											className="bg-slate-950 border-slate-700 text-slate-400 text-xs font-mono"
										>
											#{tag}
										</Badge>
									))}
								</div>
							</Card>
						))}
					</div>

					{/* Load More */}
					<div className="text-center mt-12">
						<Button
							variant="outline"
							size="lg"
							className="border-slate-700 hover:bg-slate-900 hover:border-blue-500"
						>
							Load More Articles
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
