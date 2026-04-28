'use client'

import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Plus, 
  Map as MapIcon, 
  MoreVertical, 
  Building2, 
  ShieldCheck, 
  ShieldAlert,
  Users,
  Eye,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Venue } from '../../../types/DashBoardTypes';

const mockVenues: Venue[] = [
  { id: 'v1', name: 'Estádio 11 de Novembro', address: 'Via Expressa, Luanda', capacity: 50000, status: 'Active', ownerId: 'Min-Juventude', image: 'https://images.unsplash.com/photo-1540747913346-19e3adca174f?q=80&w=2070&auto=format&fit=crop' },
  { id: 'v2', name: 'Centro de Convenções de Talatona', address: 'Talatona, Luanda', capacity: 5000, status: 'Active', ownerId: 'HCTA', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop' },
  { id: 'v3', name: 'Pavilhão da Cidadela', address: 'Rangel, Luanda', capacity: 10000, status: 'Inactive', ownerId: 'Gov-Luanda', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop' },
  { id: 'v4', name: 'Baía de Luanda', address: 'Marginal, Luanda', capacity: 100000, status: 'PendingApproval', ownerId: 'Gov-Luanda', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop' },
];

export default function Locais() {
  const [venues, setVenues] = useState(mockVenues);

  const handleStatusUpdate = (id: string, status: Venue['status']) => {
    setVenues(venues.map(v => v.id === id ? { ...v, status } : v));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">Venue Directory</h2>
          <p className="text-xs text-muted-foreground font-medium italic">Monitor and approve physical locations for public events.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-none overflow-hidden">
        <div className="p-4 border-b border-border bg-gray-50/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search venues..." 
              className="w-full pl-10 pr-4 py-1.5 bg-white border border-border rounded-lg text-xs outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="px-6 py-3">Venue Name</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3 text-right">Capacity</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {venues.map((venue) => (
                <tr key={venue.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-foreground">{venue.name}</p>
                    <p className="text-[11px] text-muted-foreground uppercase font-black tracking-tighter">ID: {venue.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-muted-foreground line-clamp-1">{venue.address}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-xs font-bold">{venue.capacity.toLocaleString("pt-BR")}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      venue.status === 'Active' ? 'badge-approved bg-emerald-100 text-emerald-800' :
                      venue.status === 'PendingApproval' ? 'badge-pending bg-amber-100 text-amber-800' :
                      'badge-cancelled bg-red-100 text-red-800'
                    }`}>
                      {venue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-primary text-[12px] font-semibold hover:underline">Edit</button>
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
