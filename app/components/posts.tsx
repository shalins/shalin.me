import Link from "next/link";
import { formatDate, getPosts } from "app/writings/utils";

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
          // <div className="w-full flex flex-col flex-grow md:flex-row space-x-0 md:space-x-2">
          //   <Link
          //     key={post.slug}
          //     className="flex flex-col flex-grow space-y-1 mb-4"
          //     href={`/writings/${post.slug}`}
          //   >
          //     <p className="tracking-tight">{post.metadata.title}</p>
          //   </Link>
          //   <p className="w-[200px] tabular-nums">
          //     {formatDate(post.metadata.publishedAt, false)}
          //   </p>
          // </div>
          <div className="w-full flex justify-between items-center mb-4">
            <Link
              key={post.slug}
              className="flex-grow"
              href={`/writings/${post.slug}`}
            >
              <p className="tracking-tight">{post.metadata.title}</p>
            </Link>
            <p className="tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
          </div>
        ))}
    </div>
  );
}
