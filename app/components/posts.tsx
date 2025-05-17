import Link from "next/link";
import { getPosts } from "app/writings/utils";

export function Posts() {
  let allPosts = getPosts();

  return (
    <div>
      {allPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <div className="w-full flex justify-between items-center mb-4">
            <Link
              key={post.slug}
              className="flex-grow"
              href={`/writings/${post.slug}`}
            >
              <p className="tracking-tight">{post.metadata.title}</p>
            </Link>
            <p className="tabular-nums">
              {post.metadata.publishedAt}
            </p>
          </div>
        ))}
    </div>
  );
}
