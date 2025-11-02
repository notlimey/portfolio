import { WHOAMI_ITEMS } from './data';

export const WHOAMI_WITH_LENGTH = WHOAMI_ITEMS.map((item) => ({
	label: item.label,
	value: item.value,
	len: item.value.length + item.label.length + 2,
}));

export const ANIMATION_CONFIG = {
	initial: 500,
	betweenCommandsDelay: 1000,
	afterCommandsDelay: 100,
	typingSpeed: 5,
	typingSpeedCommand: 15,
	timeBetweenRows: 50,
};
