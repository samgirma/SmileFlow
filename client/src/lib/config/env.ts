/**
 * Environment Configuration
 * 
 * Centralized environment variable management with validation
 * and fallback values for development.
 */

// Environment variable getter with validation
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      console.warn(`⚠️ Environment variable ${key} not found, using default: ${defaultValue}`);
      return defaultValue;
    }
    throw new Error(`❌ Required environment variable ${key} is not defined`);
  }
  return value;
};

// Boolean environment variable parser
const getEnvBool = (key: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

// Number environment variable parser
const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    console.warn(`⚠️ Environment variable ${key} is not a valid number, using default: ${defaultValue}`);
    return defaultValue;
  }
  return parsed;
};

// List environment variable parser
const getEnvList = (key: string, defaultValue: string[] = []): string[] => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value.split(',').map(item => item.trim()).filter(Boolean);
};

// Configuration object
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
    authEndpoint: getEnvVar('VITE_AUTH_ENDPOINT', '/auth'),
  },

  // Authentication
  auth: {
    tokenStorageKey: getEnvVar('VITE_TOKEN_STORAGE_KEY', 'sf_token'),
    userStorageKey: getEnvVar('VITE_USER_STORAGE_KEY', 'sf_user'),
  },

  // External Services
  ai: {
    serviceUrl: getEnvVar('VITE_AI_SERVICE_URL', 'https://ai.smileflow.com/api'),
    serviceKey: getEnvVar('VITE_AI_SERVICE_KEY', ''),
    model: getEnvVar('VITE_AI_MODEL', 'gpt-4'),
    enabled: getEnvBool('VITE_ENABLE_AI_ASSISTANT', true),
  },

  // Analytics & Monitoring
  analytics: {
    googleAnalyticsId: getEnvVar('VITE_GOOGLE_ANALYTICS_ID', ''),
    sentryDsn: getEnvVar('VITE_SENTRY_DSN', ''),
    enabled: getEnvBool('VITE_ENABLE_ANALYTICS', false),
    errorReporting: getEnvBool('VITE_ENABLE_ERROR_REPORTING', false),
  },

  // Image & Media Services
  media: {
    cdnUrl: getEnvVar('VITE_IMAGE_CDN_URL', 'https://cdn.smileflow.com'),
    placeholderUrl: getEnvVar('VITE_IMAGE_PLACEHOLDER_URL', 'https://images.unsplash.com'),
  },

  // Payment & Billing
  payments: {
    stripePublishableKey: getEnvVar('VITE_STRIPE_PUBLISHABLE_KEY', ''),
  },

  // Development & Debug
  development: {
    debugMode: getEnvBool('VITE_DEBUG_MODE', false),
    mockApi: getEnvBool('VITE_MOCK_API', false),
    logRequests: getEnvBool('VITE_LOG_REQUESTS', false),
  },

  // Feature Flags
  features: {
    aiAssistant: getEnvBool('VITE_ENABLE_AI_ASSISTANT', true),
    analytics: getEnvBool('VITE_ENABLE_ANALYTICS', false),
    errorReporting: getEnvBool('VITE_ENABLE_ERROR_REPORTING', false),
  },
} as const;

// Environment validation
export const validateEnvironment = (): void => {
  const requiredVars = [
    'VITE_API_BASE_URL',
    'VITE_AUTH_ENDPOINT',
    'VITE_TOKEN_STORAGE_KEY',
    'VITE_USER_STORAGE_KEY',
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Development warnings
  if (config.development.debugMode) {
    console.log('🔧 Debug mode enabled');
    console.log('📡 API Base URL:', config.api.baseUrl);
    console.log('🤖 AI Assistant:', config.features.aiAssistant ? 'Enabled' : 'Disabled');
    console.log('📊 Analytics:', config.features.analytics ? 'Enabled' : 'Disabled');
    console.log('💳 Stripe:', config.payments.stripePublishableKey ? 'Configured' : 'Not configured');
  }
};

// Export configuration types for TypeScript
export type Config = typeof config;

export default config;
