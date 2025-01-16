import { useState, useCallback } from 'react';

const EXAMPLE_PROMPTS = [
  "A turtle riding a surfboard",
  "A futuristic cityscape at sunset",
  "A steampunk coffee machine",
  "A cosmic jellyfish in space",
  "An art deco peacock",
  "A cyberpunk street food vendor",
  "A magical floating library",
  "A robot tending to a zen garden",
  "A mythical phoenix with flames",
  "An underwater treehouse coral reef",
  "A Victorian tea party"
];

export function useExamplePrompts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = useCallback(() => {
    if (currentIndex < EXAMPLE_PROMPTS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex]);

  return {
    currentExample: isComplete ? "Enter your design idea..." : EXAMPLE_PROMPTS[currentIndex],
    onComplete: handleComplete,
    isComplete
  };
}