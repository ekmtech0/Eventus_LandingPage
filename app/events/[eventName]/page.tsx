import type { Metadata } from "next";
import getEventByName from "@/services/GetEvent";
import EventView from "@/components/EventView";

type PageProps = {
  params: {
    eventName: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const name = params.eventName;

  try {
    const event = await getEventByName(name);

    const canonicalUrl = `https://eventusangola.com/events/${encodeURIComponent(name)}`;
    const coverImage = event.imgs?.urls?.[event.imgs.capa];

    return {
      title: event.title,
      description: event.descricao,
      keywords: [
        event.title,
        event.categoria,
        event.manualLocation?.municipio,
        "eventos Angola",
        "eventus",
      ].filter(Boolean) as string[],
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${event.title} – Eventus`,
        description: event.descricao,
        url: canonicalUrl,
        type: "article",
        images: coverImage
          ? [{ url: coverImage, width: 1200, height: 630, alt: event.title }]
          : [{ url: "/og-image.png", width: 1200, height: 630, alt: event.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${event.title} – Eventus`,
        description: event.descricao,
        images: coverImage ? [coverImage] : ["/og-image.png"],
      },
    };
  } catch {
    return {
      title: "Evento não encontrado | Eventus",
      description: "Não foi possível localizar este evento.",
    };
  }
}

export default async function EventPage({ params }: PageProps) {
  const { eventName } = params;
  const event = await getEventByName(eventName);

  if (!event) {
    return (
      <div className="section-container py-20">
        <h1 className="text-3xl font-bold">Evento não encontrado</h1>
        <p className="mt-2 text-slate-600">Tente procurar outro evento.</p>
      </div>
    );
  }

  return (
    <div className="section-container py-20">
      <EventView event={event} />
    </div>
  );
}
