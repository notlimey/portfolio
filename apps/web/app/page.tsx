import { HOMEPAGE_QUERY } from "@common/queries/homepage.queries";
import HomeView from "@common/views/home-view";
import { client } from "../sanity/lib/client";

export default async function Home() {
  const homePage = await client.fetch(HOMEPAGE_QUERY);

  return <HomeView homepage={homePage} />;
}
