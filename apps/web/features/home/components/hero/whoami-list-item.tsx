import { ChainedTypewriter } from '../../../shared/components/chained-typewriter';
import type { IWhoamiListItem } from './types';

type Props = {
	item: IWhoamiListItem;
	visible: boolean;
	toggleVisible: () => void;
	delay: number;
	typingSpeed: number;
	isLastItem: boolean;
};

export const WhoamiListItem = ({
	item,
	visible,
	toggleVisible,
	delay,
	typingSpeed,
	isLastItem,
}: Props) => (
	<div key={item.label} className="flex gap-4">
		<ChainedTypewriter
			enabled={visible}
			items={[
				{
					text: `${item.label}:`,
					key: `${item.label}-label`,
					className: 'text-blue-400 mr-2',
				},
				{
					text: item.value,
					key: `${item.label}-value`,
					className: 'text-white',
				},
			]}
			initialDelay={delay + 100}
			typingSpeed={typingSpeed}
			onComplete={isLastItem ? () => toggleVisible() : undefined}
		/>
	</div>
);
