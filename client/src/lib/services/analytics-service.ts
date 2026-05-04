/**
 * Analytics & Monitoring Service
 * 
 * Handles tracking, analytics, and monitoring for:
 * - User behavior tracking
 * - Performance monitoring
 * - Error reporting
 * - Custom events
 */

import config from '../config/env';

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: 'navigation' | 'resource' | 'paint' | 'interaction';
}

export interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: number;
  userId?: string;
  userAgent: string;
  url: string;
  context?: Record<string, any>;
}

class AnalyticsService {
  private sessionId: string;
  private userId?: string;
  private isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isEnabled = config.features.analytics;
    this.userId = this.getUserId();

    if (this.isEnabled) {
      this.initializeAnalytics();
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get current user ID from storage
   */
  private getUserId(): string | undefined {
    try {
      const user = localStorage.getItem(config.auth.userStorageKey);
      if (user) {
        const userData = JSON.parse(user);
        return userData.id;
      }
    } catch {
      // Silent fail
    }
    return undefined;
  }

  /**
   * Initialize analytics services
   */
  private initializeAnalytics(): void {
    // Google Analytics
    if (config.analytics.googleAnalyticsId) {
      this.initializeGoogleAnalytics();
    }

    // Sentry for error reporting
    if (config.analytics.errorReporting && config.analytics.sentryDsn) {
      this.initializeSentry();
    }

    // Track page view
    this.trackPageView();
  }

  /**
   * Initialize Google Analytics
   */
  private initializeGoogleAnalytics(): void {
    if (typeof window !== 'undefined' && !window.gtag) {
      // Load gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.gtag = window.gtag || function() {
        window.gtag.q = window.gtag.q || [];
        window.gtag.q.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', config.analytics.googleAnalyticsId, {
        send_page_view: false, // We'll handle page views manually
        custom_map: {
          custom_parameter_1: 'user_role',
          custom_parameter_2: 'session_id'
        }
      });
    }
  }

  /**
   * Initialize Sentry for error reporting
   */
  private initializeSentry(): void {
    // Note: In a real implementation, you would install @sentry/browser
    // and initialize it here with the DSN from config
    console.log('🔍 Sentry would be initialized with DSN:', config.analytics.sentryDsn);
  }

  /**
   * Track custom event
   */
  track(event: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', event, {
        ...properties,
        user_id: this.userId,
        session_id: this.sessionId,
      });
    }

    // Log in development
    if (config.development.debugMode) {
      console.log('📊 Analytics Event:', analyticsEvent);
    }
  }

  /**
   * Track page view
   */
  trackPageView(path?: string): void {
    const pagePath = path || window.location.pathname;
    
    this.track('page_view', {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    });

    // Google Analytics specific page view
    if (window.gtag) {
      window.gtag('config', config.analytics.googleAnalyticsId, {
        page_path: pagePath,
      });
    }
  }

  /**
   * Track user interaction
   */
  trackInteraction(action: string, element?: string, properties?: Record<string, any>): void {
    this.track('user_interaction', {
      action,
      element,
      ...properties,
    });
  }

  /**
   * Track error
   */
  trackError(error: Error, context?: Record<string, any>): void {
    if (!config.analytics.errorReporting) return;

    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      userId: this.userId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      context,
    };

    this.track('error', {
      error_message: error.message,
      error_stack: error.stack,
      ...context,
    });

    // Send to Sentry if available
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        extra: context,
        tags: {
          userId: this.userId,
          sessionId: this.sessionId,
        },
      });
    }

    if (config.development.debugMode) {
      console.error('🚨 Error Report:', errorReport);
    }
  }

  /**
   * Set user ID for analytics
   */
  setUserId(userId: string): void {
    this.userId = userId;

    // Update Google Analytics
    if (window.gtag) {
      window.gtag('set', 'user_id', userId);
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    // Google Analytics
    if (window.gtag) {
      window.gtag('set', 'user_properties', properties);
    }
  }

  /**
   * Get session info
   */
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      isEnabled: this.isEnabled,
    };
  }
}

// Extend Window interface for type safety
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    Sentry?: {
      captureException: (error: Error, context?: any) => void;
    };
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();

// Export types
export type { AnalyticsService };
