import type { MetadataRoute } from "next";

type SitemapEvent = {
  eventName?: string;
  data?: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eventusangola.com";
const EVENTS_API_URL = "https://eventus-1mt4.onrender.com/api/events";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/explorar`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/download`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const response = await fetch(EVENTS_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return staticRoutes;
    }

    const payload = (await response.json()) as SitemapEvent[] | { value?: SitemapEvent[] };
    const events = Array.isArray(payload) ? payload : payload.value ?? [];

    const eventRoutes: MetadataRoute.Sitemap = events
      .filter((event) => Boolean(event.eventName))
      .map((event) => ({
        url: `${SITE_URL}/events/${encodeURIComponent(event.eventName as string)}`,
        lastModified: event.data ? new Date(event.data) : now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticRoutes, ...eventRoutes];
  } catch {
    return staticRoutes;
  }
}