import { About } from '../features/home/components/about/about';
import { Hero } from '../features/home/components/hero/hero';
import { useHomepage } from '../features/home/hooks/use-homepage';

export const dynamic = 'force-static';

export default async function Home() {
	const homePage = await useHomepage();

	return (
		<>
			<Hero homepage={homePage} />
			<About homepage={homePage} />
		</>
	);
}
