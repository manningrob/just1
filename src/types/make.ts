export interface MakeWebhookResponse {
  status: 'success' | 'error';
  message?: string;
  shopifyUrl?: string;
  designId?: string;
  errorCode?: string;
  errorDetails?: string;
}

export interface DesignSubmission {
  designPrompt: string;
  name?: string;
  email?: string;
  designId?: string;
}