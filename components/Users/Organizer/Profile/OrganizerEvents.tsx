// Organizer events section - Todos os Eventos
'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { EventResponse } from '@/types/Eventtype';

interface OrganizerEventsProps {
  events?: EventResponse[];
}

export default function OrganizerEvents({ events }: OrganizerEventsProps) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Todos os Eventos</h2>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum evento disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#0F172A]">Todos os Eventos</h2>
        <button className="text-[#6D28D9] text-sm font-medium flex items-center gap-1 hover:underline">
          Ver todos <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          // Get cover image from imgs array
          const coverIndex = event.imgs?.capa ?? 0;
          const coverImage = event.imgs?.urls?.[coverIndex];
          
          // Format location
          const location = [event.placeName, event.placeCity].filter(Boolean).join(", ");
          
          return (
          <div 
            key={event.eventId || event.id || event.name}
            className="group bg-[#F8FAFC] rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
          >
            {/* Event Image */}
            <div className="relative h-40 overflow-hidden">
              {coverImage ? (
                <Image 
                  src={coverImage} 
                  alt={event.title || event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-[#6D28D9]/20 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-[#6D28D9] opacity-50" />
                </div>
              )}
              {/* Price Tag */}
              {event.valor !== undefined && event.valor > 0 && (
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold text-[#6D28D9]">
                  {event.valor.toLocaleString('pt-PT')} AKZ
                </div>
              )}
            </div>
            
            {/* Event Details */}
            <div className="p-4">
              <h3 className="font-bold text-[#0F172A] mb-2 line-clamp-2 group-hover:text-[#6D28D9] transition-colors">
                {event.title || event.name}
              </h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.data).toLocaleDateString('pt-PT', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="line-clamp-1">{location}</span>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}