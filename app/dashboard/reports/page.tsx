'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ReportsTable } from './components/ReportsTable';
import { ReportDetailsModal } from './components/ReportDetailsModal';
import { getAdminReports, updateAdminEventReportsAction } from './reportsApi';
import type { ReportedEvent } from '@/types/DashBoardTypes';

export default function ReportsPage() {
  const [events, setEvents] = useState<ReportedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ReportedEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Ignored' | 'Suspended'>('Pending');

  useEffect(() => {
    let active = true;

    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAdminReports();
        if (!active) return;
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao carregar eventos denunciados.';
        if (active) setError(message);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void loadEvents();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!successMessage) return;
    const timer = window.setTimeout(() => setSuccessMessage(null), 4200);
    return () => window.clearTimeout(timer);
  }, [successMessage]);

  const filteredReports = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        event.eventName.toLowerCase().includes(searchLower) ||
        event.eventId.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      if (filterStatus === 'All') return true;

      if (filterStatus === 'Pending') {
        return event.pendingReports > 0;
      }

      if (filterStatus === 'Ignored') {
        return (
          event.pendingReports === 0 &&
          event.reports.length > 0 &&
          event.reports.every((report) => report.status === 'Dismissed')
        );
      }

      if (filterStatus === 'Suspended') {
        return (
          event.pendingReports === 0 &&
          event.reports.some((report) => report.status === 'Reviewed' || report.status === 'Suspended')
        );
      }

      return true;
    });
  }, [events, filterStatus, searchQuery]);

  const handleViewReports = (eventId: string) => {
    const event = filteredReports.find((item) => item.eventId === eventId) ?? null;
    setSelectedEvent(event);
  };

  const handleIgnoreAll = async (eventId: string) => {
    try {
      setError(null);
      await updateAdminEventReportsAction(eventId, 'Dismiss');
      setEvents((current) => current.filter((item) => item.eventId !== eventId));
      setSuccessMessage('Denúncias ignoradas com sucesso.');
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao ignorar denúncias.');
    }
  };

  const handleSuspendEvent = async (eventId: string) => {
    try {
      setError(null);
      await updateAdminEventReportsAction(eventId, 'SuspendEvent');
      setEvents((current) => current.filter((item) => item.eventId !== eventId));
      setSuccessMessage('Evento suspenso com sucesso.');
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao suspender evento.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div>
            <h1 className="text-xl font-bold tracking-tight mb-1">Eventos Denunciados</h1>
            <p className="text-xs text-muted-foreground font-medium italic">Este painel agrupa eventos com denúncias. Selecione um evento e revise todas as denúncias recebidas antes de tomar decisão.</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        {/* <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 space-y-3">
          {successMessage ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {successMessage}
            </div>
          ) : null}
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}
        </div> */}

        <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filtrar denúncias..."
                className="w-56 rounded-lg border border-transparent bg-muted/30 py-1.5 pl-9 pr-4 text-xs outline-none transition-all focus:border-border focus:bg-white"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {[
                { label: 'Todos', value: 'All' },
                { label: 'Pendentes', value: 'Pending' },
                { label: 'Ignorados', value: 'Ignored' },
                { label: 'Suspensos', value: 'Suspended' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setFilterStatus(filter.value as 'All' | 'Pending' | 'Ignored' | 'Suspended')}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all ${
                    filterStatus === filter.value
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-muted font-semibold'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ReportsTable
          reports={filteredReports}
          isLoading={isLoading}
          error={error}
          onViewDetails={handleViewReports}
        />
      </div>

      <ReportDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onIgnoreAll={handleIgnoreAll}
        onSuspendEvent={handleSuspendEvent}
      />
    </div>
  );
}
