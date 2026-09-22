import type { AppEnvironment } from './env.types';

// * Resolve active application URL using dynamic fallback ternary
// ! Rule: deploy env (VITE_APP_URL) -> dev.vars (DEV_APP_URL) -> localhost:3000
const resolveAppUrl = (): string => {
  return import.meta.env.VITE_APP_URL
    ? import.meta.env.VITE_APP_URL
    : import.meta.env.DEV_APP_URL
      ? import.meta.env.DEV_APP_URL
      : 'http://localhost:3000';
};

// * Resolve active API endpoint URL using dynamic fallback ternary
const resolveApiUrl = (): string => {
  return import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : import.meta.env.DEV_API_URL
      ? import.meta.env.DEV_API_URL
      : 'http://localhost:3000/api';
};

// * Application runtime environment config
export const env: AppEnvironment = {
  appUrl: resolveAppUrl(),
  apiUrl: resolveApiUrl(),
  isProduction: import.meta.env.PROD ?? false,
  isDevelopment: import.meta.env.DEV ?? true,
  geminiApiKey: import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY,
};
