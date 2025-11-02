'use client';
import { useMemo } from 'react';
import { Typewriter } from './typewriter';

interface ChainedTypewriterItem {
	text: string;
	key: string;
	className?: string;
}

interface ChainedTypewriterProps {
	items: ChainedTypewriterItem[];
	initialDelay?: number;
	typingSpeed?: number;
	wrapperClassName?: string;
	onComplete?: () => void;
	enabled?: boolean;
}

export const ChainedTypewriter = ({
	items,
	initialDelay = 0,
	typingSpeed = 100,
	wrapperClassName = '',
	onComplete,
	enabled = true,
}: ChainedTypewriterProps) => {
	const delays = useMemo(() => {
		let accumulatedChars = 0;
		return items.map((item) => {
			const delayForItem = initialDelay + accumulatedChars * typingSpeed;
			accumulatedChars += item.text.length;
			return delayForItem;
		});
	}, [items, initialDelay, typingSpeed]);

	return (
		<span className={wrapperClassName}>
			{items.map((item, index) => (
				<Typewriter
					key={item.key}
					text={item.text}
					enabled={enabled}
					delay={delays[index]}
					className={item.className || ''}
					typingSpeed={typingSpeed}
					onComplete={
						index === items.length - 1 ? onComplete : undefined
					}
				/>
			))}
		</span>
	);
};
