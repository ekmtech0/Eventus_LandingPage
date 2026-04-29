'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { DashboardEvent } from '@/types/DashBoardTypes';
import { getDashboardEvents } from './dashboardEventsApi';
import { EventsToolbar } from './components/EventsToolbar';
import { EventsTable } from './components/EventsTable';
import { EventDetailsModal } from './components/EventDetailsModal';
import type { EventStatus } from './eventStatus';

export default function Events() {
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<number | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDashboardEvents();
        if (isMounted) setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao buscar eventos';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return events.filter((event) => {
      const matchesFilter = filter === 'All' || event.status === filter;
      const matchesSearch =
        term.length === 0 ||
        event.name.toLowerCase().includes(term) ||
        event.organizerName.toLowerCase().includes(term) ||
        event.placeName.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [events, filter, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">Events Management</h2>
          <p className="text-xs text-muted-foreground font-medium italic">
            Administrative control over platform content quality.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-none overflow-hidden">
        <EventsToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
        />
        <EventsTable events={filteredEvents} isLoading={isLoading} error={error} onViewDetails={setSelectedEventId} />
      </div>

      <EventDetailsModal
        eventId={selectedEventId}
        onClose={() => setSelectedEventId(null)}
        onStatusUpdated={(id: string, status: EventStatus) =>
          setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, status } : event)))
        }
      />
    </div>
  );
}
