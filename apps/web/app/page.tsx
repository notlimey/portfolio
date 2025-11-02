import { TechStackArsenal } from '~/home/components/arsenal/arsenal';
import { LatestBlogPosts } from '~/home/components/blog/latest';
import { ProjectsSection } from '~/home/components/projects/projects-section';
import { About } from '../features/home/components/about/about';
import { Hero } from '../features/home/components/hero/hero';
import { useHomepage } from '../features/home/hooks/use-homepage';
import { useSettings } from '../features/shared/hooks/use-settings';
import { useVentures } from '../features/shared/hooks/use-ventures';
import { useWork } from '../features/shared/hooks/use-work';

export const dynamic = 'force-static';

export default async function Home() {
	const homePage = await useHomepage();
	const settings = await useSettings();
	const ventures = await useVentures();
	const work = await useWork();

	return (
		<>
			<Hero settings={settings} homepage={homePage} />
			<About
				homepage={homePage}
				settings={settings}
				ventures={ventures}
				work={work}
			/>
			<TechStackArsenal />
			<LatestBlogPosts />
			<ProjectsSection />
		</>
	);
}
