export const makeConfig = {
  webhookUrl: import.meta.env.VITE_MAKE_WEBHOOK_URL,
  retryAttempts: 3,
  retryDelay: 1000,
};