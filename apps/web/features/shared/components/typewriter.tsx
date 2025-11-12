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
	typingSpeed = 100,
	className = '',
	onComplete,
	enabled = true,
}: TypewriterProps) => {
	const [displayedText, setDisplayedText] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const hasCompletedRef = useRef(false);
	const hasStartedTypingRef = useRef(false);

	const onCompleteRef = useRef(onComplete);
	onCompleteRef.current = onComplete;

	useEffect(() => {
		if (!enabled) {
			setDisplayedText('');
			setIsTyping(false);
			hasCompletedRef.current = false;
			hasStartedTypingRef.current = false;
			return;
		}

		setDisplayedText('');
		setIsTyping(false);
		hasCompletedRef.current = false;
		hasStartedTypingRef.current = false;

		const delayTimeout = window.setTimeout(() => {
			setIsTyping(true);
			hasStartedTypingRef.current = true;
		}, delay);

		return () => window.clearTimeout(delayTimeout);
	}, [delay, enabled]);

	useEffect(() => {
		if (!isTyping || !enabled) return;

		const effectiveSpeed = Math.max(typingSpeed, 1);

		const interval = window.setInterval(() => {
			setDisplayedText((prev) => {
				if (prev.length >= text.length) {
					window.clearInterval(interval);
					setIsTyping(false);
					return text;
				}

				return text.substring(0, prev.length + 1);
			});
		}, effectiveSpeed);

		return () => window.clearInterval(interval);
	}, [isTyping, text, typingSpeed, enabled]);

	useEffect(() => {
		if (
			displayedText === text &&
			text.length > 0 &&
			!hasCompletedRef.current &&
			enabled &&
			hasStartedTypingRef.current &&
			!isTyping
		) {
			hasCompletedRef.current = true;
			onCompleteRef.current?.();
		}
	}, [displayedText, text, enabled, isTyping]);

	return (
		<span
			className={cn('relative inline-block', className)}
			style={{ minWidth: 'fit-content' }}
		>
			<span className="invisible opacity-0" aria-hidden="true">
				{text}
			</span>

			<span className="absolute left-0 top-0">{displayedText}</span>
		</span>
	);
};
