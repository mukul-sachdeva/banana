const SESSION_STORAGE_KEY = 'flowzap-session-id';

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `flowzap-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return 'server-session';
  }

  try {
    const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) {
      return existing;
    }

    const nextSessionId = generateSessionId();
    window.localStorage.setItem(SESSION_STORAGE_KEY, nextSessionId);
    return nextSessionId;
  } catch {
    return generateSessionId();
  }
}

export function buildAnalyticsContext(extraProperties: Record<string, unknown> = {}) {
  const location = typeof window !== 'undefined' ? window.location : null;
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const browserLanguage = typeof navigator !== 'undefined' ? navigator.language : 'unknown';

  return {
    sessionId: getOrCreateSessionId(),
    timestamp: new Date().toISOString(),
    currentUrl: location?.href || '',
    pathname: location?.pathname || '',
    referrer,
    browserLanguage,
    deviceType: detectDeviceType(userAgent),
    userAgent,
    ...extraProperties,
  };
}

function detectDeviceType(userAgent: string): string {
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'ios';
  }

  if (/Android/i.test(userAgent)) {
    return 'android';
  }

  return 'desktop';
}
