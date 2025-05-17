import { getMDXPosts } from "app/lib/mdx";

export function getPosts() {
  return getMDXPosts("app/writings/posts");
}
