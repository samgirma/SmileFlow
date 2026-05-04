import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { validateEnvironment } from './lib/config/env';
import { analytics } from './lib/services/analytics-service';

// Validate environment variables
try {
  validateEnvironment();
  console.log('✅ Environment validation passed');
} catch (error) {
  console.error('❌ Environment validation failed:', error);
}

// Initialize analytics
analytics.trackPageView();

// Create router
const router = createRouter({ routeTree });

// Register router for analytics
router.subscribe('onBeforeNavigate', ({ fromLocation, toLocation }) => {
  analytics.trackPageView(toLocation.pathname);
});

// Error boundary for analytics
router.subscribe('onError', (error) => {
  analytics.trackError(error, {
    from: window.location.pathname,
    to: error.info?.toLocation?.pathname,
  });
});

// Performance monitoring
if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;
        analytics.trackPerformance('page_load_time', navEntry.loadEventEnd - navEntry.loadEventStart, 'navigation');
        analytics.trackPerformance('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart, 'paint');
      }
    });
  });
  
  observer.observe({ entryTypes: ['navigation'] });
}

export function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

// Export for testing
export default App;
