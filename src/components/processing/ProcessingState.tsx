import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import { ProgressBar } from '../ProgressBar';

interface ProcessingStateProps {
  progress: number;
  currentStep: string;
}

export function ProcessingState({ progress, currentStep }: ProcessingStateProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="backdrop-blur-lg bg-white/90 rounded-xl shadow-2xl overflow-hidden p-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-full space-y-4">
            <ProgressBar progress={progress} />
            <div className="min-h-[4rem] flex flex-col items-center justify-center">
              <div className="flex items-center gap-3 text-xl font-medium text-gray-800">
                <LoadingSpinner size={24} className="text-purple-600" />
                <span className="animate-fade-in">{currentStep}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}