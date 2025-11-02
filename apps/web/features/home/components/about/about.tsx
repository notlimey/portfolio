'use client';
import { Card } from '@common/components/ui/card';
import { Badge } from '@common/components/ui/badge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Homepage } from '@common/types/homepage.types';

export function About({ homepage }: { homepage: Homepage }) {
	const codeSnippet = `// Martin Kulvedrøsten Myhre

class MartinMyhre implements Developer {
  name = "Martin Kulvedrøsten Myhre";
  location = "Elverum, Norway";
  role = "Full-Stack Developer";
  
  getCurrentWork(): WorkInfo {
    return {
      company: "Crayon (prev. Inmeta)",
      position: "Junior Consultant",
      stack: ["TypeScript", ".NET", "Next.js", "Azure"]
    };
  }
  
  getVentures(): Venture[] {
    return [
      {
        name: "3Steps AS",
        type: "Startup",
        description: "Handball analytics platform"
      },
      {
        name: "Limeyfy AS", 
        type: "Agency",
        description: "Web solutions for clients"
      }
    ];
  }
  
  getPassion(): string {
    return "Building products that matter";
  }
}`;

	return (
		<section className="py-20 bg-slate-900">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-8 items-start">
						{/* Code Editor */}
						<div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
							<div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
								<div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
									<span>Developer.ts</span>
								</div>
								<div className="flex gap-1.5">
									<div className="w-3 h-3 rounded-full bg-red-500" />
									<div className="w-3 h-3 rounded-full bg-yellow-500" />
									<div className="w-3 h-3 rounded-full bg-green-500" />
								</div>
							</div>
							<div className="overflow-x-auto">
								<SyntaxHighlighter
									language="typescript"
									style={vscDarkPlus}
									showLineNumbers={true}
									customStyle={{
										margin: 0,
										padding: '1rem',
										background: 'transparent',
										fontSize: '0.875rem',
									}}
									lineNumberStyle={{
										minWidth: '2.5em',
										paddingRight: '1em',
										color: '#475569',
										userSelect: 'none',
									}}
								>
									{codeSnippet}
								</SyntaxHighlighter>
							</div>
						</div>

						{/* Info Cards */}
						<div className="space-y-6">
							<div>
								<h2 className="text-4xl mb-4 text-white">
									About Me
								</h2>
								<p className="text-slate-400 font-mono mb-4">
									{'// Developer by day, developer by night'}
								</p>
							</div>

							<Card className="p-6 bg-slate-800 border-slate-700">
								<h3 className="text-white mb-3">
									💼 Current Role
								</h3>
								<p className="text-slate-300 mb-2">
									Junior Consultant at{' '}
									<span className="text-blue-400 font-mono">
										Crayon
									</span>{' '}
									<span className="text-slate-500 text-sm">
										(prev. Inmeta)
									</span>
								</p>
								<p className="text-slate-400">
									Building full-stack solutions with
									TypeScript and .NET. Working across the
									entire stack - from frontend React/Next.js
									to backend APIs, DevOps, and systems
									programming.
								</p>
							</Card>

							<Card className="p-6 bg-slate-800 border-slate-700">
								<h3 className="text-white mb-3">
									🚀 Entrepreneurship
								</h3>
								<div className="space-y-3">
									<div>
										<div className="flex items-center gap-2 mb-1">
											<Badge className="bg-green-500/10 text-green-400 border-green-500/20">
												3Steps AS
											</Badge>
											<span className="text-slate-400 text-sm">
												Co-Founder
											</span>
										</div>
										<p className="text-slate-400">
											Revolutionizing handball with data.
											Building analytics and management
											tools for teams.
										</p>
									</div>
									<div>
										<div className="flex items-center gap-2 mb-1">
											<Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
												Limeyfy AS
											</Badge>
											<span className="text-slate-400 text-sm">
												Founder
											</span>
										</div>
										<p className="text-slate-400">
											Crafting web solutions for small
											businesses. From concept to
											deployment.
										</p>
									</div>
								</div>
							</Card>

							<Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
								<div className="flex items-start gap-3">
									<div className="text-2xl">⚡</div>
									<div>
										<h3 className="text-white mb-2">
											Quick Facts
										</h3>
										<ul className="space-y-1 text-slate-300">
											<li>📍 Based in Elverum, Norway</li>
											<li>💻 Full-stack enthusiast</li>
											<li>
												🏢 Corporate + Startup
												experience
											</li>
											<li>🎯 Product-minded engineer</li>
										</ul>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
