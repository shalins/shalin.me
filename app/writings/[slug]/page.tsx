import { notFound } from "next/navigation";
import { MDXPage } from "app/components/mdx-page";
import { getPosts } from "../utils";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  let posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  let post = getPosts().find((post) => post.slug === awaitedParams.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/writings/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Post({ params }) {
  const awaitedParams = await params;
  let post = getPosts().find((post) => post.slug === awaitedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <MDXPage
      content={post.content}
      metadata={post.metadata}
      slug={post.slug}
      type="article"
      urlPrefix="/writings"
    />
  );
}
