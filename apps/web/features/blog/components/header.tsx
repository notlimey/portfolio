'use client';
import { Button } from '@common/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCopyToClipboard } from '~/shared/hooks/use-copy-to-clipboard';

export const PostHeader = () => {
	const router = useRouter();
	const { mutate: copyToClipboard } = useCopyToClipboard({
		onSuccess: () => toast.success('Copied to clipboard'),
	});

	return (
		<header className="sticky top-0 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 z-10">
			<div className="container mx-auto px-4 py-4">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<Button
						onClick={() => router.back()}
						variant="ghost"
						className="text-slate-400 hover:text-white hover:bg-slate-800"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Blog
					</Button>

					<Button
						variant="outline"
						size="sm"
						className="border-slate-700 hover:bg-slate-800"
						onClick={() => copyToClipboard(window.location.href)}
					>
						<Share2 className="w-4 h-4 mr-2" />
						Share
					</Button>
				</div>
			</div>
		</header>
	);
};
