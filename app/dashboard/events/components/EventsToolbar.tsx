'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { EVENT_STATUS_FILTERS } from '../eventStatus';

export function EventsToolbar({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: number | 'All';
  onFilterChange: (value: number | 'All') => void;
}) {
  return (
    <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter events..."
            className="pl-9 pr-4 py-1.5 bg-muted/30 border border-transparent focus:bg-white focus:border-border rounded-lg text-xs outline-none transition-all w-56"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex gap-1 flex-wrap">
          {EVENT_STATUS_FILTERS.map((status) => (
            <button
              key={status.label}
              onClick={() => onFilterChange(status.value)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                filter === status.value ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted font-semibold'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

