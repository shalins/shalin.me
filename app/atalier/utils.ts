import { getMDXPosts } from "app/lib/mdx";

export function getAtalierPosts() {
  return getMDXPosts("app/atalier/posts");
} 