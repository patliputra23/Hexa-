import type { AnalyticsEvent } from "@/types/music";
import type { AnalyticsSink } from "@/types/interfaces";
import { storage } from "@/storage/local-storage";

const EVENT_KEY = "lumen.analytics.events";

export const analytics: AnalyticsSink = {
  track(event: AnalyticsEvent) {
    const events = storage.get<AnalyticsEvent[]>(EVENT_KEY, []);
    storage.set(EVENT_KEY, [...events.slice(-100), event]);
  },
  async flush() {
    storage.set(EVENT_KEY, []);
  }
};

export function trackEvent(name: string, properties?: AnalyticsEvent["properties"]) {
  analytics.track({
    name,
    properties,
    timestamp: new Date().toISOString()
  });
}
