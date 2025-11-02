import { useMemo, type ReactNode } from 'react';

type ListWithTypewriterProps = {
	items: { node: (delay: number) => ReactNode; key: string; len: number }[];
	className?: string;
	initialDelay?: number;
	typingSpeed?: number;
	betweenItemsDelay?: number;
};

export const calculateTimeToFinish = (
	items: { len: number }[],
	typingSpeed: number,
	initialDelay: number,
	betweenItemsDelay: number,
) => {
	const totalLen = items.reduce((acc, curr) => acc + curr.len, 0);
	return (
		totalLen * typingSpeed +
		initialDelay +
		betweenItemsDelay * (items.length - 1)
	);
};

export const ListWithTypewriter = ({
	items,
	className = '',
	initialDelay = 0,
	typingSpeed = 100,
	betweenItemsDelay = 0,
}: ListWithTypewriterProps) => {
	const delays = useMemo(() => {
		let accumulatedLength = 0;
		return items.map((_item, index) => {
			const delay =
				initialDelay +
				accumulatedLength * typingSpeed +
				betweenItemsDelay * index;
			accumulatedLength += _item.len;
			return delay;
		});
	}, [items, initialDelay, typingSpeed, betweenItemsDelay]);

	return (
		<div className={className}>
			{items.map((item, index) => (
				<div key={item.key}>
					{item.node(delays[index] ?? initialDelay)}
				</div>
			))}
		</div>
	);
};
