import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  onComplete: () => void;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  stopAfterFirstCycle?: boolean;
  className?: string;
}

export function TypewriterText({ 
  text, 
  onComplete, 
  typingSpeed = 50, 
  deletingSpeed = 30,
  pauseDuration = 800,
  stopAfterFirstCycle = false,
  className = ''
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset state when text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(true);
  }, [text]);

  // Handle typing animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      if (isTyping) {
        if (currentIndex < text.length) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, currentIndex + 1));
            setCurrentIndex(prev => prev + 1);
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            if (!stopAfterFirstCycle) {
              setIsTyping(false);
            }
          }, pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        } else {
          onComplete();
        }
      }
    };

    handleTyping();
    return () => clearTimeout(timeout);
  }, [text, currentIndex, isTyping, displayText, onComplete, typingSpeed, deletingSpeed, pauseDuration, stopAfterFirstCycle]);

  return <span className={className}>{displayText}</span>;
}