'use client';
import { cn } from '@common/lib/utils';
import React, { useEffect, useState } from 'react';

type TypewriterProps = {
	text: string;
	delay?: number;
	className?: string;
	typingSpeed?: number;
	onComplete?: () => void;
	enabled?: boolean;
};

export const Typewriter = ({
	text,
	delay = 0,
	className = '',
	typingSpeed = 100,
	onComplete,
	enabled = true,
}: TypewriterProps) => {
	const [displayedText, setDisplayedText] = useState('');
	const [isClient, setIsClient] = useState(false);
	const [isTyping, setIsTyping] = useState(delay === 0);

	const fullTextRef = React.useRef(text);

	useEffect(() => {
		if (!enabled) return;
		if (delay <= 0) return;
		const timeout = setTimeout(() => {
			setIsTyping(true);
		}, delay);
		return () => clearTimeout(timeout);
	}, [delay, enabled]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: onComplete is not a dependency that should be included in the effect
	useEffect(() => {
		if (!isTyping) return;

		setIsClient(true);

		let i = 0;
		let currentText = '';

		const typingInterval = setInterval(() => {
			if (i < fullTextRef.current.length) {
				currentText += fullTextRef.current.charAt(i);
				setDisplayedText(currentText);
				i++;
			} else {
				onComplete?.();
				clearInterval(typingInterval);
			}
		}, typingSpeed);

		return () => clearInterval(typingInterval);
	}, [isTyping, typingSpeed]);

	return (
		<span
			className={`${className} relative inline-block`}
			style={{ minWidth: 'fit-content' }}
		>
			{/* Invisible placeholder to reserve space and prevent layout shift */}
			<span className="invisible whitespace-nowrap" aria-hidden="true">
				{text}
			</span>
			{/* Visible typing text */}
			<span
				className={cn(
					'absolute left-0 top-0 whitespace-nowrap',
					isClient ? 'opacity-100' : 'opacity-0',
				)}
			>
				{isClient ? displayedText : text}
			</span>
		</span>
	);
};
