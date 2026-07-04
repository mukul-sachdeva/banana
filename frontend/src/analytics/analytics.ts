import { EVENTS, type AnalyticsEventName } from './constants';
import { buildAnalyticsContext } from './session';
import { googleAnalyticsProvider } from './providers/googleAnalytics';
import { clarityProvider } from './providers/clarity';
import { metaPixelProvider } from './providers/metaPixel';

export interface AnalyticsProvider {
  name: string;
  isEnabled: () => boolean;
  track: (eventName: string, properties: Record<string, unknown>) => Promise<void> | void;
}

export interface AnalyticsProperties {
  [key: string]: unknown;
}

const providers: AnalyticsProvider[] = [googleAnalyticsProvider, clarityProvider, metaPixelProvider];
const recentEvents = new Set<string>();

export function trackEvent(eventName: AnalyticsEventName | string, properties: AnalyticsProperties = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = buildAnalyticsContext(properties);
  const dedupeKey = `${eventName}:${JSON.stringify(payload)}`;

  if (recentEvents.has(dedupeKey)) {
    return;
  }

  recentEvents.add(dedupeKey);
  window.setTimeout(() => recentEvents.delete(dedupeKey), 1000);

  console.info('[Analytics]', eventName, payload);

  void Promise.allSettled(
    providers.filter((provider) => provider.isEnabled()).map(async (provider) => {
      try {
        await provider.track(eventName, payload);
      } catch (error) {
        console.warn(`[Analytics] ${provider.name} failed`, error);
      }
    })
  );
}

export function trackPageView(pathname: string) {
  void trackEvent(EVENTS.PAGE_VIEW, { pathname });
}
