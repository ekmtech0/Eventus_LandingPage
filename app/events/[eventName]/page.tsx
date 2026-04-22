import type { Metadata } from "next";
import { cache } from "react";
import getEventByName from "@/services/GetEvent";
import EventView from "@/components/EventView";

type PageProps = {
  params: Promise<{
    eventName: string;
  }>;
};

// 🔥 cache para evitar fetch duplicado
const getEventCached = cache(getEventByName);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eventName } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eventusangola.com";

  try {
    const event = await getEventCached(eventName);

    if (!event) {
      return {
        title: "Evento não encontrado | Eventus",
        description: "Não foi possível localizar este evento.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const canonicalUrl = `${siteUrl}/events/${encodeURIComponent(eventName)}`;
    const coverImage = event?.imgs?.urls?.[event?.imgs?.capa ?? 0];

    // 🔥 check robusto de URL
    const isAbsolute = /^https?:\/\//.test(coverImage || "");

    const imageUrl = coverImage
      ? isAbsolute
        ? coverImage
        : `${siteUrl}${coverImage}`
      : `${siteUrl}/og-image.png`;

    const eventTitle = event?.title || event?.name || "Evento";
    const eventDescription =
      event?.descricao || "Descubra este evento incrível na Eventus";

    return {
      metadataBase: new URL(siteUrl),
      title: `${eventTitle} | Eventus`,
      description: eventDescription,

      keywords: [
        eventTitle,
        event?.categories?.join(", "),
        event?.placeCity,
        event?.placeAddress,
        "eventos Angola",
        "eventus",
      ].filter(Boolean) as string[],

      authors: [{ name: event?.userName || "Eventus" }],

      robots: {
        index: true,
        follow: true,
      },

      alternates: {
        canonical: canonicalUrl,
      },

      openGraph: {
        title: `${eventTitle} – Eventus`,
        description: eventDescription,
        url: canonicalUrl,
        type: "website",
        locale: "pt_AO",
        siteName: "Eventus",
        // author: [event?.userName || "Eventus"],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: eventTitle,
            type: "image/jpeg",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${eventTitle} – Eventus`,
        description: eventDescription,
        creator: `@${event?.userName || "EventusAngola"}`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Erro ao gerar metadados do evento:", error);

    return {
      title: "Evento não encontrado | Eventus",
      description: "Não foi possível localizar este evento.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function EventPage({ params }: PageProps) {
  const { eventName } = await params;

  const event = await getEventCached(eventName);

  if (!event) {
    return (
      <div className="section-container py-20">
        <h1 className="text-3xl font-bold">Evento não encontrado</h1>
        <p className="mt-2 text-slate-600">
          Tente procurar outro evento.
        </p>
      </div>
    );
  }

  return (
    <div className="section-container py-20">
      <EventView event={event} />
    </div>
  );
}