'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Check, 
  X, 
  Eye,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Event, EventStatus } from '../../../types/DashBoardTypes';

const mockEvents: Event[] = [
  { id: '1', title: 'Carnaval de Luanda', description: 'O maior desfile cultural de Angola.', type: 'Cultural', date: '2024-02-13', time: '14:00', venueId: 'v1', organizerId: 'org1', status: 'Approved', ticketPrice: 0, capacity: 50000, ticketsSold: 0, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop', createdAt: '2024-01-10T10:00:00Z' },
  { id: '2', title: 'Show do Ansioso', description: 'Turnê mundial do artista Ansio.', type: 'Musical', date: '2024-06-15', time: '20:00', venueId: 'v2', organizerId: 'org2', status: 'Pending', ticketPrice: 5000, capacity: 5000, ticketsSold: 1200, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop', createdAt: '2024-04-20T15:30:00Z' },
  { id: '3', title: 'Conferência de TI: Angola Digital', description: 'Fórum sobre o futuro tecnológico de Angola.', type: 'Tecnológica', date: '2024-05-20', time: '09:00', venueId: 'v3', organizerId: 'org3', status: 'Approved', ticketPrice: 10000, capacity: 1000, ticketsSold: 450, createdAt: '2024-03-05T08:00:00Z' },
  { id: '4', title: 'Festival de Gastronomia', description: 'Degustação de pratos típicos angolanos.', type: 'Gastronômico', date: '2024-07-02', time: '11:00', venueId: 'v4', organizerId: 'org4', status: 'Pending', ticketPrice: 2000, capacity: 2000, ticketsSold: 0, createdAt: '2024-05-01T12:00:00Z' },
  { id: '5', title: 'Jogo das Estrelas', description: 'Partida de futebol beneficente.', type: 'Desportivo', date: '2024-08-10', time: '16:00', venueId: 'v1', organizerId: 'org5', status: 'Rejected', ticketPrice: 500, capacity: 25000, ticketsSold: 0, createdAt: '2024-05-10T14:00:00Z' },
];

export default function Events() {
  const [events, setEvents] = useState(mockEvents);
  const [filter, setFilter] = useState<EventStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === 'All' || e.status === filter;
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: EventStatus) => {
    setEvents(events.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">Events Management</h2>
          <p className="text-xs text-muted-foreground font-medium italic">Administrative control over platform content quality.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-none overflow-hidden">
        {/* Table Header/Toolbar */}
        <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Filter events..." 
                className="pl-9 pr-4 py-1.5 bg-muted/30 border border-transparent focus:bg-white focus:border-border rounded-lg text-xs outline-none transition-all w-56"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-1">
              {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    filter === status 
                      ? 'bg-foreground text-background' 
                      : 'text-muted-foreground hover:bg-muted font-semibold'
                  }`}
                >
                  {status === 'All' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-6 py-3">Event Name</th>
                <th className="px-6 py-3">Organizer</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-foreground">{event.title}</p>
                    <p className="text-[11px] text-muted-foreground">{event.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs">{event.organizerId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-muted-foreground">{event.venueId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${
                      event.status === 'Approved' ? 'badge-approved bg-emerald-100 text-emerald-800' :
                      event.status === 'Pending' ? 'badge-pending bg-amber-100 text-amber-800' :
                      'badge-cancelled bg-red-100 text-red-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-[12px] font-semibold">
                      {event.status === 'Pending' ? (
                        <>
                          <button 
                            onClick={() => handleStatusChange(event.id, 'Approved')}
                            className="text-primary hover:underline"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusChange(event.id, 'Rejected')}
                            className="text-red-500 hover:underline"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button className="text-primary hover:underline">Details</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
