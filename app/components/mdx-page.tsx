import { CustomMDX } from "./mdx";
import { TableOfContents } from "./table-of-contents";
import { Metadata } from "app/lib/mdx";
import { baseUrl } from "app/sitemap";

interface MDXPageProps {
  content: string;
  metadata: Metadata;
  slug: string;
  type?: "article" | "project";
  urlPrefix: string;
}

export function MDXPage({ content, metadata, slug, type = "article", urlPrefix }: MDXPageProps) {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "article" ? "Article" : "Project",
            headline: metadata.title,
            datePublished: metadata.publishedAt,
            dateModified: metadata.publishedAt,
            description: metadata.summary,
            image: metadata.image
              ? `${baseUrl}${metadata.image}`
              : `/og?title=${encodeURIComponent(metadata.title)}`,
            url: `${baseUrl}${urlPrefix}/${slug}`,
            author: {
              "@type": "Person",
              name: "Shalin Shah",
            },
          }),
        }}
      />
      <h1 className="title text-3xl tracking-tighter">
        {metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600">
          {metadata.publishedAt}
        </p>
      </div>
      <TableOfContents source={content} />
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </section>
  );
} 