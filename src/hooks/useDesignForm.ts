import { useState, useRef, useEffect } from 'react';
import { StepStatus } from '../types';
import { submitToMake } from '../services/makeService';
import { toast } from 'react-hot-toast';
import { useUserInfo } from './useUserInfo';

const PREVIEW_STATES = {
  PRODUCT: 'product-ready',
  PROCESSING: 'processing',
  ERROR: 'error'
} as const;

export function useDesignForm() {
  const [step, setStep] = useState<StepStatus>('pending');
  const [shopifyUrl, setShopifyUrl] = useState<string>('');
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userInfo, setUserInfo, designPrompt, setDesignPrompt } = useUserInfo();
  const currentPromptRef = useRef<string>('');

  // Check for preview mode on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const previewState = params.get('preview');

    if (previewState === PREVIEW_STATES.PRODUCT) {
      setStep('product-ready');
      setShopifyUrl('https://preview.example.com');
    } else if (previewState === PREVIEW_STATES.PROCESSING) {
      setStep('processing');
    } else if (previewState === PREVIEW_STATES.ERROR) {
      setStep('processing');
      setError('This is a preview of the error state');
    }
  }, []);

  const handleDesignSubmit = (prompt: string) => {
    if (isSubmitting) return;
    
    // Store the current prompt in both state and ref
    currentPromptRef.current = prompt;
    setDesignPrompt(prompt);
    setStep('processing');
    setError(undefined);
    
    // If we already have user info, submit directly
    if (userInfo) {
      handleUserInfoSubmit(userInfo.name, userInfo.email);
    }
  };

  const handleUserInfoSubmit = async (name: string, email: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Save user info for future submissions
    setUserInfo({ name, email });

    try {
      // Use the current prompt from the ref
      const currentPrompt = currentPromptRef.current;
      if (!currentPrompt) {
        throw new Error('No design prompt provided');
      }

      const response = await submitToMake({
        designPrompt: currentPrompt,
        name,
        email,
      } as DesignSubmission);
      
      if (response.status === 'success' && response.shopifyUrl) {
        setShopifyUrl(response.shopifyUrl);
        setStep('product-ready');
        setError(undefined);
      } else {
        throw new Error(response.message || 'Failed to generate design');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleRetry = () => {
    setStep('pending');
    setError(undefined);
    // Don't clear user info on retry, only clear the design prompt
    setDesignPrompt('');
  };

  return {
    step,
    error,
    shopifyUrl,
    handleDesignSubmit,
    handleUserInfoSubmit,
    handleRetry,
    userInfo
  };
}