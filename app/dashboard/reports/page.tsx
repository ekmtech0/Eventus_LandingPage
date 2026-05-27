'use client';

import React, { useEffect, useState } from 'react';
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

  const handleViewReports = (eventId: string) => {
    const event = events.find((item) => item.eventId === eventId) ?? null;
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
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Painel de Moderação</p>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Eventos Denunciados</h1>
            <p className="max-w-2xl text-sm text-slate-600 mt-2">Este painel agrupa eventos com denúncias. Selecione um evento e revise todas as denúncias recebidas antes de tomar decisão.</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 space-y-3">
          <p className="text-sm text-slate-500">Listagem de eventos que receberam denúncias. A informação principal está agrupada por evento, não por denúncia individual.</p>
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
        </div>

        <ReportsTable
          reports={events}
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
