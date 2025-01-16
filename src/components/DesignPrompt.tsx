import React, { useRef } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useExamplePrompts } from '../hooks/useExamplePrompts';
import { TypewriterText } from './TypewriterText';
import { useUserInfo } from '../hooks/useUserInfo';
import { UserBadge } from './UserBadge';

interface DesignPromptProps {
  onSubmit: (prompt: string) => void;
}

export function DesignPrompt({ onSubmit }: DesignPromptProps) {
  const [prompt, setPrompt] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentExample, onComplete, isComplete } = useExamplePrompts();
  const { userInfo, clearUserInfo } = useUserInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="backdrop-blur-lg bg-white/90 rounded-xl shadow-2xl">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                name="designPrompt"
                id="designPrompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? "Type your design idea here..." : ""}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50/50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
                maxLength={200}
              />
              {!isFocused && !prompt && (
                <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                  <TypewriterText
                    text={currentExample}
                    onComplete={onComplete}
                    typingSpeed={40}
                    deletingSpeed={20}
                    pauseDuration={1500}
                    stopAfterFirstCycle={isComplete}
                    className="text-gray-400"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="lg:px-6 px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              <span className="lg:inline hidden">Send</span>
              <SendHorizontal className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      {userInfo && (
        <p className="text-sm text-gray-600 mt-3 text-center">
          We'll send your design to {userInfo.email}.{' '}
          <button
            onClick={() => clearUserInfo()}
            className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
          >
            Not you?
          </button>
        </p>
      )}
    </div>
  );
}