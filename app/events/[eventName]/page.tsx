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

    return {
      title: `${event.title} – Eventus`,
      description: event.descricao,
      openGraph: {
        title: `${event.title} – Eventus`,
        description: event.descricao,
        type: "article",
        images: event.imgs?.urls?.[event.imgs.capa]
          ? [event.imgs.urls[event.imgs.capa]]
          : undefined,
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
