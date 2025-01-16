import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface ProductLinkProps {
  url: string;
  onRetry: () => void;
}

export function ProductLink({ url, onRetry }: ProductLinkProps) {
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRetry(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="backdrop-blur-lg bg-white/90 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-[50px] text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <span>View Your Just One Original</span>
              <ExternalLink className="w-5 h-5" />
            </a>
            {showRetry && (
              <button
                onClick={onRetry}
                className="h-[50px] px-6 whitespace-nowrap text-purple-600 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 font-medium opacity-0 animate-fade-in"
              >
                <span>Create New</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}