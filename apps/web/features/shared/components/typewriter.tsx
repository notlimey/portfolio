'use client';
import { cn } from '@common/lib/utils';
import { useEffect, useRef, useState } from 'react';

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
	const [isTyping, setIsTyping] = useState(false);

	const fullTextRef = useRef(text);
	const timeoutRef = useRef<number | null>(null);
	const intervalRef = useRef<number | null>(null);
	const onCompleteRef = useRef(onComplete);

	onCompleteRef.current = onComplete;

	useEffect(() => {
		if (isTyping) {
			setIsClient(true);
		}
	}, [isTyping]);

	useEffect(() => {
		fullTextRef.current = text;
		setDisplayedText('');
		setIsTyping(false);

		if (!enabled) return;

		if (delay > 0) {
			timeoutRef.current = window.setTimeout(() => {
				setIsTyping(true);
				timeoutRef.current = null;
			}, delay);
			return () => {
				if (timeoutRef.current) {
					window.clearTimeout(timeoutRef.current);
					timeoutRef.current = null;
				}
			};
		}

		setIsTyping(true);

		return () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [text, delay, enabled]);

	useEffect(() => {
		if (!isTyping) return;

		let index = 0;
		let currentText = '';

		if (intervalRef.current) {
			window.clearInterval(intervalRef.current);
		}

		const intervalDelay = Math.max(typingSpeed, 1);

		intervalRef.current = window.setInterval(() => {
			const target = fullTextRef.current;
			if (index < target.length) {
				currentText += target.charAt(index);
				setDisplayedText(currentText);
				index += 1;
				return;
			}

			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			onCompleteRef.current?.();
		}, intervalDelay);

		return () => {
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isTyping, typingSpeed]);

	useEffect(
		() => () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		},
		[],
	);

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
