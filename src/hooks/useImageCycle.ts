import { useState, useEffect } from 'react';

interface ImageCycleConfig {
  images: string[];
  initialDelay: number;
  cycleDelay: number;
  startTime: number;
}

export function useImageCycle({ images, initialDelay, cycleDelay, startTime }: ImageCycleConfig) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateImage = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (elapsed < initialDelay) {
        // Still in initial delay period
        setCurrentIndex(0);
      } else {
        // Calculate which image should be showing based on elapsed time
        const cycleTime = elapsed - initialDelay;
        const cycleCount = Math.floor(cycleTime / cycleDelay);
        setCurrentIndex(cycleCount % images.length);
      }
    };

    // Initial update
    updateImage();

    // Update every frame to ensure precise timing
    const interval = setInterval(updateImage, 1000 / 60);
    return () => clearInterval(interval);
  }, [images.length, initialDelay, cycleDelay, startTime]);

  return images[currentIndex];
}
