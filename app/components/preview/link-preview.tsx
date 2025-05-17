"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface MetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export default function LinkPreview({ url }: { url: string }) {
  const [metadata, setMetadata] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>;
  }

  if (!metadata) {
    return <a href={url} className="text-sky-500 hover:text-sky-600">{url}</a>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 my-4"
    >
      <div className="flex items-center p-4">
        <div className="flex-grow">
          <h4 className="text-gray-900 ">{metadata.title}</h4>
          <p className="text-gray-600 text-sm line-clamp-2">{metadata.description}</p>
          <p className="text-gray-400 text-xs mt-2">{new URL(url).hostname}</p>
        </div>
        {metadata.image && (
          <div className="ml-4 flex-shrink-0">
            <Image
              src={metadata.image}
              alt={metadata.title}
              width={1000}
              height={400}
              className="rounded object-cover"
            />
          </div>
        )}
      </div>
    </a>
  );
} 