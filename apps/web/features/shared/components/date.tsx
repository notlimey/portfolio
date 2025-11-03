'use client';
import type { DetailedHTMLProps, TimeHTMLAttributes } from 'react';
import { type UnknownDate, useFormatDate } from '../hooks/use-format-date';

type Props = {
	date?: UnknownDate;
} & Omit<
	DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement>,
	'dateTime' | 'children'
>;

export const DateDisplay = ({ date, ...props }: Props) => {
	const [formatted, parsedDate] = useFormatDate(date);

	if (!parsedDate) return null;

	return (
		<time dateTime={parsedDate.toISOString()} {...props}>
			{formatted}
		</time>
	);
};
