'use client';

import React from 'react';
import { AlertCircle, Eye } from 'lucide-react';
import type { DashboardEvent } from '@/types/DashBoardTypes';
import { formatDate } from '../format';
import { statusBadgeClasses, statusLabel } from '../eventStatus';

export function EventsTable({
  events,
  isLoading,
  error,
  onViewDetails,
}: {
  events: DashboardEvent[];
  isLoading: boolean;
  error: string | null;
  onViewDetails: (id: string) => void;
}) {
  return (
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
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-xs text-muted-foreground">
                A carregar eventos...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </td>
            </tr>
          ) : events.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-xs text-muted-foreground">
                Nenhum evento encontrado.
              </td>
            </tr>
          ) : (
            events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-foreground">{event.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {formatDate(event.data)} • {event.inicio}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs">{event.organizerName}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-muted-foreground">{event.placeName}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${statusBadgeClasses(event.status)}`}>
                    {statusLabel(event.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 text-[12px] font-semibold">
                    <button
                      onClick={() => onViewDetails(event.id)}
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

