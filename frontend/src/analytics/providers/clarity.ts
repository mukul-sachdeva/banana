import type { AnalyticsProvider } from '../analytics';

export const clarityProvider: AnalyticsProvider = {
  name: 'Microsoft Clarity',
  isEnabled: () => typeof window !== 'undefined' && typeof (window as any).clarity === 'function',
  track: async (_eventName) => {
    try {
      const clarity = (window as any).clarity;
      if (typeof clarity !== 'function') {
        return;
      }

      clarity('event', _eventName);
    } catch (error) {
      console.warn('[Analytics] Clarity provider failed', error);
    }
  },
};
