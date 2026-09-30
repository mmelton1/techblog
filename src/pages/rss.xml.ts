import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/consts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const projects = (await getCollection("projects", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: projects.map((project) => ({
      title: project.data.title,
      description: project.data.summary,
      pubDate: project.data.publishDate,
      link: `/projects/${project.id}/`,
    })),
  });
}
