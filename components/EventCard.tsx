import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Event } from "@/types/Eventtype";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const cover = event.imgs?.urls?.[event.imgs?.capa ?? 0];
  const slug = encodeURIComponent(event.eventName);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/events/${slug}`} className="block">
        {cover && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={cover}
              alt={event.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 450px"
              priority={false}
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.data).toLocaleDateString()}</span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-slate-900">{event.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{event.descricao}</p>
          <p className="mt-4 text-sm font-semibold text-primary">
            {event.placeCity}, {event.placeAddress}
          </p>
        </div>
      </Link>
    </article>
  );
}
