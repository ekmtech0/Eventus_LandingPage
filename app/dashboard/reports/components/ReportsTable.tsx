'use client';

import { Eye } from 'lucide-react';
import type { ReportedEvent } from '@/types/DashBoardTypes';

interface ReportsTableProps {
  reports: ReportedEvent[];
  isLoading: boolean;
  error: string | null;
  onViewDetails: (eventId: string) => void;
}

export function ReportsTable({
  reports,
  isLoading,
  error,
  onViewDetails,
}: ReportsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
            <th className="px-6 py-3">Evento</th>
            <th className="px-6 py-3">Organizador</th>
            <th className="px-6 py-3">Denúncias</th>
            <th className="px-6 py-3 text-right">Ação</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50 font-medium">
          {isLoading ? (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-xs text-muted-foreground">
                A carregar eventos denunciados...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600">
                  {error}
                </div>
              </td>
            </tr>
          ) : reports.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-xs text-muted-foreground">
                Nenhum evento denunciado no momento.
              </td>
            </tr>
          ) : (
            reports.map((event) => (
              <tr key={event.eventId} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
                      <img src={event.eventImageUrl} alt={event.eventName} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{event.eventName}</p>
                      <p className="text-[11px] text-muted-foreground truncate">ID: {event.eventId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{event.organizerName}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-foreground">
                    <span className="text-amber-700">🔥 {event.pendingReports} Pendentes</span>
                    <span className="text-muted-foreground">{event.totalReports} no total</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetails(event.eventId)}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4" />
                    Ver Denúncias
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
