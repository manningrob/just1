export type StepStatus = 'pending' | 'processing' | 'complete' | 'product-ready';

export interface DesignState {
  prompt: string;
  shopifyUrl?: string;
}