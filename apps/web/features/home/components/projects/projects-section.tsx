import { useSettings } from '~/shared/hooks/use-settings';
import { useVentures } from '~/shared/hooks/use-ventures';
import { useWork } from '~/shared/hooks/use-work';
import { Projects } from './projects';

export const ProjectsSection = async () => {
	const settings = await useSettings();

	return <Projects {...settings} />;
};
