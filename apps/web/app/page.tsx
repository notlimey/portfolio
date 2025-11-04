import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { useLatestPosts } from '~/blog/hooks/use-posts';
import { About } from '~/home/components/about/about';
import { TechStackArsenal } from '~/home/components/arsenal/arsenal';
import { LatestBlogPosts } from '~/home/components/blog/latest';
import { Hero } from '~/home/components/hero/hero';
import { ProjectsSection } from '~/home/components/projects/projects-section';
import { useHomepage } from '~/home/hooks/use-homepage';
import { useSettings } from '~/shared/hooks/use-settings';
import { useVentures } from '~/shared/hooks/use-ventures';
import { useWork } from '~/shared/hooks/use-work';

export const dynamic = 'force-static';

export default async function Home() {
	const headersRequest = await headers();
	const { isBot } = await userAgent({ headers: headersRequest });

	const homePage = await useHomepage();
	const settings = await useSettings();
	const ventures = await useVentures();
	const work = await useWork();
	const latestPosts = await useLatestPosts({
		ignoreId: homePage.featuredPost?._id,
	});

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
}
