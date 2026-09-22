// * Environment configuration type definitions
export interface AppEnvironment {
  readonly appUrl: string;
  readonly apiUrl: string;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly geminiApiKey?: string;
}
