import type { Homepage } from '@common/types/homepage.types';
import { useMemo } from 'react';
import type { Settings } from '~/shared/types';
import { ChainedTypewriter } from '../../../shared/components/chained-typewriter';
import { ListWithTypewriter } from '../../../shared/components/list-with-typewriter';
import { Typewriter } from '../../../shared/components/typewriter';
import { CliPrefix } from './cli';
import { ANIMATION_CONFIG } from './config';
import type { IHeroVisibleState, IWhoamiListItem } from './types';

type WhoamiProps = {
	visible: IHeroVisibleState;
	toggleVisible: (key: keyof IHeroVisibleState) => void;
	homepage: Homepage;
	settings: Settings;
};

export const Whoami = ({
	visible,
	toggleVisible,
	homepage,
	settings,
}: WhoamiProps) => {
	const whoamiItems = useMemo(
		() =>
			!homepage.whoami
				? []
				: [
						{
							label: 'name',
							value: homepage.whoami.name,
						},
						{
							label: 'role',
							value: homepage.whoami.role,
						},
						{
							label: 'location',
							value: homepage.whoami.location,
						},
						{
							label: 'current',
							value: `${settings.currentWork?.position} @ ${settings.currentWork?.company}`,
						},
						{
							label: 'stack',
							value: `[${homepage.whoami.stack.join(', ')}]`,
						},
						{
							label: 'ventures',
							value: `${settings.ventures?.map((venture) => venture.name).join(', ')}`,
						},
					].map((x) => ({
						...x,
						len: x.value.length + x.label.length + 2,
					})),
		[homepage, settings],
	);

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
					items={whoamiItems.map((item, index) => {
						const isLastItem = index === whoamiItems.length - 1;
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
