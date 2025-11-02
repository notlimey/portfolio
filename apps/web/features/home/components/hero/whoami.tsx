import { ChainedTypewriter } from '../../../shared/components/chained-typewriter';
import { ListWithTypewriter } from '../../../shared/components/list-with-typewriter';
import { Typewriter } from '../../../shared/components/typewriter';
import { CliPrefix } from './cli';
import { ANIMATION_CONFIG, WHOAMI_WITH_LENGTH } from './config';
import type { IHeroVisibleState, IWhoamiListItem } from './types';

type WhoamiProps = {
	visible: IHeroVisibleState;
	toggleVisible: (key: keyof IHeroVisibleState) => void;
};

export const Whoami = ({ visible, toggleVisible }: WhoamiProps) => {
	return (
		<div>
			<p className="text-green-400 inline-flex items-center gap-2 whitespace-nowrap">
				<CliPrefix />
				<Typewriter
					text="whoami"
					delay={ANIMATION_CONFIG.betweenCommandsDelay}
					typingSpeed={ANIMATION_CONFIG.typingSpeedCommand}
					onComplete={() => toggleVisible('information')}
				/>
			</p>

			<div className="space-y-2 text-slate-300">
				<ListWithTypewriter
					items={WHOAMI_WITH_LENGTH.map((item, index) => {
						const isLastItem =
							index === WHOAMI_WITH_LENGTH.length - 1;
						return {
							key: item.label,
							len: item.len,
							node: (delay: number) => (
								<WhoamiListItem
									item={item}
									visible={visible.information}
									toggleVisible={() =>
										toggleVisible('projects')
									}
									delay={delay}
									typingSpeed={ANIMATION_CONFIG.typingSpeed}
									isLastItem={isLastItem}
								/>
							),
						};
					})}
					betweenItemsDelay={ANIMATION_CONFIG.timeBetweenRows}
					typingSpeed={ANIMATION_CONFIG.typingSpeed}
					className="flex gap-1 flex-col"
				/>
			</div>
		</div>
	);
};

type ListItemProps = {
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
}: ListItemProps) => (
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
