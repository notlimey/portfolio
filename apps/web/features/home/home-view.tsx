import dynamic from 'next/dynamic';
import { useLatestPosts } from '~/blog/hooks/use-posts';
import { useSettings } from '~/shared/hooks/use-settings';
import { useVentures } from '~/shared/hooks/use-ventures';
import { useWork } from '~/shared/hooks/use-work';
import { ProjectsSection } from './components/projects/projects-section';
import { useHomepage } from './hooks/use-homepage';

export const HomePageContent = async ({ isBot }: { isBot: boolean }) => {
	const homePage = await useHomepage();
	const settings = await useSettings();
	const ventures = await useVentures();
	const work = await useWork();
	const latestPosts = await useLatestPosts({
		ignoreId: homePage.featuredPost?._id,
	});

	const Hero = dynamic(
		() => import('./components/hero/hero').then((m) => m.Hero),
		{
			ssr: true,
		},
	);

	const About = dynamic(
		() => import('./components/about/about').then((m) => m.About),
		{
			ssr: true,
		},
	);

	const TechStackArsenal = dynamic(
		() =>
			import('~/home/components/arsenal/arsenal').then(
				(m) => m.TechStackArsenal,
			),
		{ ssr: true },
	);

	const LatestBlogPosts = dynamic(
		() =>
			import('~/home/components/blog/latest').then(
				(m) => m.LatestBlogPosts,
			),
		{
			ssr: true,
		},
	);

	return (
		<>
			<h1 className="sr-only">
				Martin Kulvedrøsten Myhre — Full-Stack Developer & Architect
			</h1>
			<Hero settings={settings} homepage={homePage} />
			<About
				homepage={homePage}
				settings={settings}
				ventures={ventures}
				work={work}
			/>
			<TechStackArsenal />
			<LatestBlogPosts
				latestPosts={latestPosts}
				featuredPost={homePage.featuredPost}
			/>
			<ProjectsSection />
		</>
	);
};
