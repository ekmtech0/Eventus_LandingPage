import type { Metadata } from "next";
import { cache } from "react";
import OrganizerProfile from "@/components/Users/Organizer/Profile/OrganizerProfile";
import {
  getOrganizerProfileBySlug,
  slugifyOrganizerName,
} from "@/services/organizerProfile";
import { fetchEventsByUser } from "@/services/GetUser";
import type { EventResponse } from "@/types/Eventtype";

export const revalidate = 60;

interface PageProps {
  params: Promise<{
    organizerName: string;
  }>;
}

const getOrganizerCached = cache(getOrganizerProfileBySlug);

function buildDescription(description?: string, organizerName?: string, qtdEvent?: number, followers?: number) {
  const statsInfo = (qtdEvent !== undefined && followers !== undefined) 
    ? `${qtdEvent} eventos · ${followers} seguidores`
    : '';
  const fallback = `Veja os eventos, links e informações de ${organizerName || "este organizador"} na Eventus${statsInfo ? ` · ${statsInfo}` : ''}.`;
  if (!description) return fallback;

  const sanitized = description.replace(/\s+/g, " ").trim();
  const withStats = sanitized + (statsInfo ? ` · ${statsInfo}` : '');
  return withStats.length > 160 ? `${withStats.slice(0, 157)}...` : withStats;
}

function resolveImageUrl(imageUrl?: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eventusangola.com";

  if (!imageUrl) {
    return `${siteUrl}/og-image.png`;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `${siteUrl}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { organizerName } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eventusangola.com";
  const organizer = await getOrganizerCached(organizerName);

  if (!organizer) {
    return {
      title: "Organizador não encontrado | Eventus",
      description: "Não foi possível localizar este perfil de organizador.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalSlug = slugifyOrganizerName(organizer.username || organizer.name);
  const canonicalUrl = `${siteUrl}/organizer/${encodeURIComponent(canonicalSlug)}`;
  const description = buildDescription(organizer.descripcion, organizer.name, organizer.qtdEvent, organizer.followers);
  const imageUrl = resolveImageUrl(organizer.photo);
  const locationKeywords = [organizer.userLocation?.city, organizer.userLocation?.country].filter(Boolean);

  return {
    metadataBase: new URL(siteUrl),
    title: `${organizer.name} | Organizador de Eventos | Eventus`,
    description,
    keywords: [
      organizer.name,
      organizer.username,
      organizer.organizeType,
      ...locationKeywords,
      "organizador de eventos",
      "eventos Angola",
      "Eventus",
    ].filter(Boolean) as string[],
    authors: [{ name: organizer.name }],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${organizer.name} | Eventus`,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "pt_AO",
      siteName: "Eventus",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: organizer.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${organizer.name} | Eventus`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function OrganizerPage({ params }: PageProps) {
  const { organizerName } = await params;
  const organizer = await getOrganizerCached(organizerName);

  // Fetch events for this organizer if we have a user ID
  let events: EventResponse[] = [];
  if (organizer?.id) {
    const userEvents = await fetchEventsByUser(organizer.id);
    if (userEvents) {
      events = userEvents;
    }
  }

  return (
    <OrganizerProfile
      organizerName={organizerName}
      initialOrganizer={organizer}
      initialEvents={events}
      serverResolved
    />
  );
}
