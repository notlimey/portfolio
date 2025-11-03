import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCopyToClipboard = ({ onSuccess }: { onSuccess?: () => void }) =>
	useMutation({
		mutationFn: async (text: string) => {
			await navigator.clipboard.writeText(text);
			return true;
		},
		onSuccess: () => {
			onSuccess?.();
		},
		onError: (error) => {
			toast.error('Failed to copy to clipboard');
		},
	});
