"use client";

import { useEffect, useState } from 'react';

interface TableOfContentsProps {
  source: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ source }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Extract headers from the MDX source
    const headerRegex = /^#{2,4}\s+(.+)$/gm;
    const matches = Array.from(source.matchAll(headerRegex));
    
    const items = matches.map((match) => {
      const headerText = match[1];
      const level = match[0].split('#').length - 1;
      
      // Use the same slugify function as in mdx.tsx
      const id = headerText
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

      return {
        id,
        text: headerText,
        level,
      };
    });

    setHeadings(items);
  }, [source]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc mb-8 pt-2 bg-neutral-100">
      <h2 className="text-lg font-medium mb-2">table of contents</h2>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li
            key={heading.id}
          >
            <a
              href={`#${heading.id}`}
              className="toc-link"
              style={{
                paddingLeft: `${(heading.level - 2) * 1}rem`,
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 