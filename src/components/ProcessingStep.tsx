import React, { useState, useEffect, useRef } from 'react';
import { getRandomSteps } from '../utils/processingUtils';
import { STEP_DURATION, PROGRESS_UPDATE_INTERVAL } from '../constants/timing';
import { ErrorState } from './processing/ErrorState';
import { ProcessingState } from './processing/ProcessingState';
import { UserInfoForm } from './processing/UserInfoForm';
import { useUserInfo } from '../hooks/useUserInfo';

interface ProcessingStepProps {
  onSubmit: (name: string, email: string) => void;
  error?: string;
  onRetry?: () => void;
}

export function ProcessingStep({ onSubmit, error, onRetry }: ProcessingStepProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const startTimeRef = useRef<number>(0);
  const stepsRef = useRef<string[]>([]);
  const { userInfo, designPrompt } = useUserInfo();
  const submitAttemptedRef = useRef(false);

  // Auto-submit if we have user info
  useEffect(() => {
    if (userInfo && !isSubmitted && !error && !submitAttemptedRef.current) {
      submitAttemptedRef.current = true;
      handleSubmit(userInfo.name, userInfo.email);
    }
  }, [userInfo, error]);

  useEffect(() => {
    if (error) {
      setIsSubmitted(false);
      submitAttemptedRef.current = false;
      setProgress(0);
      setCurrentStep(0);
    }
  }, [error]);

  useEffect(() => {
    if (isSubmitted && !error) {
      startTimeRef.current = Date.now();
      stepsRef.current = getRandomSteps();
      setSteps(stepsRef.current);

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const totalDuration = stepsRef.current.length * STEP_DURATION;
        const progressPercent = Math.min((elapsedTime / totalDuration) * 100, 100);
        
        const currentStepIndex = Math.min(
          Math.floor(elapsedTime / STEP_DURATION),
          stepsRef.current.length - 1
        );

        setProgress(progressPercent);
        setCurrentStep(currentStepIndex);

      }, PROGRESS_UPDATE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [isSubmitted, error]);

  const handleSubmit = (name: string, email: string) => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    onSubmit(name, email);
  };

  if (error) {
    return <ErrorState error={error} onRetry={onRetry || (() => {})} />;
  }

  if (isSubmitted) {
    return (
      <ProcessingState 
        progress={progress} 
        currentStep={steps[currentStep] || steps[steps.length - 1]} 
      />
    );
  }
  
  return <UserInfoForm onSubmit={handleSubmit} />;

}