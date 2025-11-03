'use client';
import { Button } from '@common/components/ui/button';
import { Card } from '@common/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-slate-950 py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<Card className="p-12 bg-slate-900 border-slate-800 text-center">
						<h2 className="text-2xl text-white mb-4">
							Article Not Found
						</h2>
						<p className="text-slate-400 mb-6">
							The article you're looking for doesn't exist.
						</p>
						<Button
							variant="outline"
							className="border-slate-700 hover:bg-slate-800"
							onClick={() => router.back()}
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Blog
						</Button>
					</Card>
				</div>
			</div>
		</div>
	);
}
