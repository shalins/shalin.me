import { getPosts } from "app/writings/utils";
import { getAtalierPosts } from "app/atalier/utils";

export const baseUrl = "https://shalin.me";

export default async function sitemap() {
  let writingPosts = getPosts().map((post) => ({
    url: `${baseUrl}/writings/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let atalierPosts = getAtalierPosts().map((post) => ({
    url: `${baseUrl}/atalier/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/writings", "/atalier"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...writingPosts, ...atalierPosts];
}
