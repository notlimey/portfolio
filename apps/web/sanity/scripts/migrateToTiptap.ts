import { createClient } from "next-sanity";
import { toHTML } from "@portabletext/to-html";
import { generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { JSDOM } from "jsdom";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

const migrate = async () => {
  const posts = await client.fetch(`*[_type == "post"]`);

  const window = new JSDOM("").window;
  const DOMParser = window.DOMParser;

  for (const post of posts) {
    if (post.body && Array.isArray(post.body)) {
      const html = toHTML(post.body);
      const json = generateJSON(html, [StarterKit], {
        document: new DOMParser().parseFromString(html, "text/html"),
      });

      await client
        .patch(post._id)
        .set({ body: JSON.stringify(json) })
        .commit();
    }
  }
};

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});