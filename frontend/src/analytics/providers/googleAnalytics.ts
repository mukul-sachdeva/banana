import type { AnalyticsProvider } from '../analytics';

export const googleAnalyticsProvider: AnalyticsProvider = {
  name: 'Google Analytics',
  isEnabled: () => typeof window !== 'undefined' && typeof (window as any).gtag === 'function',
  track: async (_eventName, properties) => {
    try {
      const gtag = (window as any).gtag;
      if (typeof gtag !== 'function') {
        return;
      }

      gtag('event', _eventName, properties);
    } catch (error) {
      console.warn('[Analytics] Google Analytics provider failed', error);
    }
  },
};
