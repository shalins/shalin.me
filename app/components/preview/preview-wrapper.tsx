'use client';

import { ReactNode } from 'react';

interface PreviewWrapperProps {
  url: string;
  icon: ReactNode;
  header: string;
  children: ReactNode;
  loading?: boolean;
  error?: boolean;
  contentPadding?: boolean;
}

export default function PreviewWrapper({
  url,
  icon,
  header,
  children,
  loading = false,
  error = false,
  contentPadding = true
}: PreviewWrapperProps) {
  // Base wrapper style applied consistently to prevent flash
  const baseWrapperStyle = "block border overflow-hidden my-2 bg-[#F7F0DD]";
  
  if (loading) {
    return <div className={`${baseWrapperStyle} animate-pulse h-32`}></div>;
  }

  if (error) {
    return <a href={url} className="text-sky-500 hover:text-sky-600">{url}</a>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseWrapperStyle} rich-link no-underline group`}
    >
      <div className="border-b bg-[#F7F0DD] px-4 py-1 flex items-center gap-2 group-hover:border-red-500">
        {icon}
        <span className="text-sm text-gray-600">{header}</span>
      </div>
      
      <div className={`bg-[#FAF8EC] ${contentPadding ? 'px-4 pb-4' : 'pl-4'}`}>
        {children}
      </div>
    </a>
  );
} 