import { EVENTS } from '../constants';
import type { AnalyticsProvider } from '../analytics';

const EVENT_MAPPING: Record<string, string> = {
  [EVENTS.BOOKING_SUCCESS]: 'Lead',
  [EVENTS.BOOKING_SUBMITTED]: 'InitiateCheckout',
  [EVENTS.PAGE_VIEW]: 'PageView',
};

export const metaPixelProvider: AnalyticsProvider = {
  name: 'Meta Pixel',
  isEnabled: () => typeof window !== 'undefined' && typeof (window as any).fbq === 'function',
  track: async (eventName, properties) => {
    try {
      const fbq = (window as any).fbq;
      if (typeof fbq !== 'function') {
        return;
      }

      const mappedEvent = EVENT_MAPPING[eventName] || null;
      if (mappedEvent) {
        fbq('track', mappedEvent, properties);
        return;
      }

      fbq('trackCustom', eventName, properties);
    } catch (error) {
      console.warn('[Analytics] Meta Pixel provider failed', error);
    }
  },
};
