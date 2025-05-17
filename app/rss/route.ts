import { baseUrl } from "app/sitemap";
import { getPosts } from "app/writings/utils";
import { getAtalierPosts } from "app/atalier/utils";

export async function GET() {
  let writingPosts = await getPosts();
  let atalierPosts = await getAtalierPosts();
  
  // Combine both types of posts with the appropriate URL prefix
  const allPosts = [
    ...writingPosts.map(post => ({ ...post, urlPrefix: '/writings' })),
    ...atalierPosts.map(post => ({ ...post, urlPrefix: '/atalier' }))
  ];

  const itemsXml = allPosts
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}${post.urlPrefix}/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Shalin Shah</title>
        <link>${baseUrl}</link>
        <description>Writings and projects by Shalin Shah</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
