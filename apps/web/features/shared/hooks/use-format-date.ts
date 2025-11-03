import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

export type UnknownDate = string | Date | null | undefined;

const parseUnknownDate = (date?: UnknownDate): Date | null => {
	if (!date) return null;
	if (date instanceof Date) return date;
	return new Date(date);
};

export const useFormatDate = (
	date?: UnknownDate,
	formatString: string = 'dd. MMMM, yyyy',
	fallback: string = '-',
): [string, Date | null] => {
	const parsedDate: Date | null = parseUnknownDate(date);
	if (!parsedDate) return [fallback, null];
	const formatted = format(parsedDate, formatString, {
		locale: nb,
	});

	return [formatted, parsedDate];
};
