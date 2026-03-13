import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { MOCK_EVENTS } from "@/constants";

export const metadata: Metadata = {
  title: "Explorar Eventos | Eventus",
  description: "Veja todos os eventos disponíveis e descubra experiências próximas a você.",
  openGraph: {
    title: "Explorar Eventos | Eventus",
    description: "Veja todos os eventos disponíveis e descubra experiências próximas a você.",
    type: "website",
  },
};

export default function ExplorarPage() {
  return (
    <div className="section-container py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900">Explorar Eventos</h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Navegue pelos eventos mais recentes, filtre por categoria e descubra algo novo para fazer hoje.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_EVENTS.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>
    </div>
  );
}
