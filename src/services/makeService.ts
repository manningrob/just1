// src/services/makeService.ts
import { makeConfig } from '../config/make';
import { MakeWebhookResponse, DesignSubmission } from '../types/make';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(url: string, data: any, attempt = 1): Promise<MakeWebhookResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      })
    });

    const text = await response.text();
    let result: any;

    try {
      // Handle double-encoded JSON
      if (text.startsWith('"') && text.endsWith('"')) {
        const unescapedText = JSON.parse(text);
        result = JSON.parse(unescapedText);
      } else {
        result = JSON.parse(text);
      }
    } catch (parseError) {
      throw new Error('Invalid response format from server');
    }

    if (result.status === 'error' || !response.ok) {
      // Extract clean error message without status code prefix
      let errorMessage = result.message || 'Failed to generate design';
      
      // Clean up error message format
      if (typeof errorMessage === 'string') {
        // Remove status code prefix if present
        errorMessage = errorMessage.replace(/^\[\d+\]\s*/, '');
        
        // Remove any trailing periods
        errorMessage = errorMessage.replace(/\.$/, '');
        
        // Make first letter uppercase
        errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      }
      
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate design');
  }
}

export async function submitToMake(data: DesignSubmission): Promise<MakeWebhookResponse> {
  if (!makeConfig.webhookUrl) {
    throw new Error('Make webhook URL is not configured');
  }

  // Validate required fields
  if (!data.designPrompt) {
    throw new Error('Design prompt is required');
  }

  // Ensure designPrompt is included in the request body
  const requestBody = {
    ...data,
    designPrompt: data.designPrompt.trim(),
    timestamp: new Date().toISOString()
  };

  try {
    const result = await makeRequest(makeConfig.webhookUrl, requestBody);
    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response from server');
    }
    return result;
  } catch (error) {
    console.error('Design generation error:', error);
    throw error;
  }
}
