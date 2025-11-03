import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { HomePageContent } from '~/home/home-view';

export const dynamic = 'force-static';

export default async function Home() {
	const headersRequest = await headers();
	const { isBot } = await userAgent({ headers: headersRequest });

	return <HomePageContent isBot={isBot} />;
}
