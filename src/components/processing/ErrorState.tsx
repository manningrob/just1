import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="backdrop-blur-lg bg-white/90 rounded-xl shadow-2xl overflow-hidden p-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Design Generation Failed</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Try a Different Design</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}