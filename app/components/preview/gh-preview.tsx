'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface GitHubPRData {
  title: string;
  state: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  merged_at: string | null;
  additions: number;
  deletions: number;
  changed_files: number;
  body: string;
  html_url: string;
  base: {
    repo: {
      full_name: string;
    };
  };
}

export default function GitHubPreview({ url }: { url: string }) {
  const [data, setData] = useState<GitHubPRData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Extract owner, repo, and PR number from URL
        const matches = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
        if (!matches) {
          throw new Error('Not a valid GitHub PR URL');
        }
        const [, owner, repo, prNumber] = matches;
        
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch PR data');
        }
        
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load PR data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [url]);

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>;
  }

  if (error || !data) {
    return <a href={url} className="text-sky-500 hover:text-sky-600">{url}</a>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rich-link block no-underline border overflow-hidden my-4 bg-white group"
    >
      <div className="border-b bg-gray-50 px-4 py-1 flex items-center gap-2 group-hover:border-red-500">
        <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-current">
          <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
        </svg>
        <span className="text-sm text-gray-600">{data.base.repo.full_name}</span>
      </div>
      
      <div className="px-4 pb-4 ">
        <div className="flex items-center gap-3">
          <Image
            src={data.user.avatar_url}
            alt={data.user.login}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">
              {data.title}
            </h3>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-4 text-sm">
          <div className={`flex items-center gap-1 ${
            data.state === 'open' ? 'text-green-600' : 
            data.merged_at ? 'text-purple-600' : 'text-red-600'
          }`}>
            <span className="inline-block w-2 h-2 rounded-full bg-current"></span>
            <span>{data.merged_at ? 'Merged' : data.state}</span>
          </div>
          <div className="text-gray-500">
            {data.user.login} • {formatDate(data.created_at)}
          </div>
        </div>
        
        <div className="mt-2 flex gap-4 text-sm text-gray-600">
          <span>
            <span className="text-green-600">+{data.additions}</span>
            {' / '}
            <span className="text-red-600">-{data.deletions}</span>
          </span>
          <span>{data.changed_files} files changed</span>
        </div>
      </div>
    </a>
  );
} 