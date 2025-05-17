import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { lazy } from "react";
import dynamic from 'next/dynamic';

const LinkPreview = dynamic(() => import('./preview/link-preview'), {
  loading: () => <div className="block border overflow-hidden my-2 bg-[#F7F0DD] animate-pulse h-32" />,
  ssr: false
});

// Import the ImageGallery component
const ImageGallery = dynamic(() => import('./image-gallery'), {
  loading: () => <div className="block border overflow-hidden my-2 bg-[#F7F0DD] animate-pulse h-32" />,
  ssr: false
});

// Import the AudioPlayer component
const AudioPlayer = dynamic(() => import('./audio-player'), {
  loading: () => <div className="block border overflow-hidden my-2 bg-[#F7F0DD] animate-pulse h-10" />,
  ssr: false
});

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  // Check if this is a GitHub PR link
  if (href.match(/github\.com\/[^/]+\/[^/]+\/pull\/\d+/)) {
    const GitHubPreview = dynamic(() => import('./preview/gh-preview'), {
      loading: () => <div className="block border overflow-hidden my-2 bg-[#F7F0DD] animate-pulse h-32" />,
      ssr: false
    });
    return <GitHubPreview url={href} />;
  }

  // Check if this link should be rendered as a preview
  if (props.title === 'preview') {
    const LinkPreview = dynamic(() => import('./preview/link-preview'), {
      loading: () => <div className="block border overflow-hidden my-2 bg-[#F7F0DD] animate-pulse h-32" />,
      ssr: false
    });
    return <LinkPreview url={href} />;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props} className="mdx-link">
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} className="mdx-link" />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function Quote({ children }) {
  return (
    <blockquote className="pl-4 border-l-4 border-gray-500 italic text-gray-600">
      {children}
    </blockquote>
  );
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  blockquote: Quote,
  strong: ({ children }) => <strong style={{ fontFamily: 'SpaceMono-Bold, monospace' }}>{children}</strong>,
  ImageGallery,
  AudioPlayer,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
