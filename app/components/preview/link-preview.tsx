"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PreviewWrapper from './preview-wrapper';

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
        
        // Handle relative image paths
        if (data.image && data.image.startsWith('/') && !data.image.startsWith('//')) {
          try {
            const urlObj = new URL(url);
            data.image = `${urlObj.protocol}//${urlObj.hostname}${data.image}`;
          } catch (e) {
            console.error('Failed to parse URL for relative image path', e);
          }
        }
        
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  const linkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-none">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );

  return (
    <PreviewWrapper
      url={url}
      icon={linkIcon}
      header={metadata ? new URL(url).hostname : ''}
      loading={loading}
      error={!metadata}
      contentPadding={false}
    >
      {metadata && (
        <div className="flex">
          <div className="flex-grow w-[60%] pr-4">
            <h3 className="font-medium text-gray-900">{metadata.title}</h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{metadata.description}</p>
          </div>
          
          {metadata.image && (
            <div className="w-[40%] border-l flex">
              <div className="relative w-full min-h-[120px]">
                <Image
                  src={metadata.image}
                  alt={metadata.title}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </PreviewWrapper>
  );
} 