import { PROCESSING_STEPS } from '../constants/processingSteps';
import { EXPECTED_PROCESS_TIME, STEP_DURATION, MIN_STEPS } from '../constants/timing';

export function getRandomSteps(maxDuration: number = EXPECTED_PROCESS_TIME): string[] {
  // Calculate number of steps based on duration and step time
  const numSteps = Math.max(MIN_STEPS, Math.ceil(maxDuration / STEP_DURATION));
  
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...PROCESSING_STEPS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // If we need more steps than available, repeat some randomly
  if (numSteps > PROCESSING_STEPS.length) {
    const additional = numSteps - PROCESSING_STEPS.length;
    const extraSteps = shuffled
      .slice(0, additional)
      .map(step => step); // Create copies of steps
    return [...shuffled, ...extraSteps];
  }
  
  return shuffled.slice(0, numSteps);
}