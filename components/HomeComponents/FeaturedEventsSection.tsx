import Link from 'next/link';
import { EventCard } from "@/components/EventCard";
import { Calendar, Search, Smartphone, Menu, X, Download, ArrowRight } from 'lucide-react';
import { getEvents } from '@/services/GetEvent';



export const FeaturedEventsSection: React.FC = async () => {
  const events = await getEvents();

  return(
   <section className="bg-white">
        <div className="section-container p-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Eventos em Destaque</h2>
              <p className="text-slate-600 max-w-xl">
                As experiências mais populares e aguardadas da semana selecionadas especialmente para você.
              </p>
            </div>
            <Link href="/explorar" className="text-primary font-bold flex items-center gap-2 hover:underline">
              Ver todos os eventos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event) => (
              <EventCard key={event.eventId} event={event} />
            ))}
          </div>
        </div>
      </section>
  )
      }