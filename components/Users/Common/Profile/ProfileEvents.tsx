// Upcoming events section
'use client';

import React from 'react';

export default function ProfileEvents() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#0F172A]">Próximos Eventos</h2>
        <span className="text-sm text-[#F97316] font-medium flex items-center">
          <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse mr-2" />
          3 happening now
        </span>
      </div>
      
      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mock Event Card 1 */}
        <div className="group bg-white border border-[#CBD5E1] rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
          <div className="relative h-36 bg-gradient-to-br from-[#6D28D9] to-[#2563EB]">
            <div className="absolute top-3 left-3 bg-[#F97316] text-white text-xs font-bold px-2 py-1 rounded-full">
              EM ALTA
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-[#0F172A] mb-1 group-hover:text-[#6D28D9] transition-colors">
              Festival de Música
            </h3>
            <p className="text-sm text-gray-500 mb-2">Lisboa, Portugal</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6D28D9] font-medium">15 Mai</span>
              <span className="text-gray-500">120 going</span>
            </div>
          </div>
        </div>

        {/* Mock Event Card 2 */}
        <div className="group bg-white border border-[#CBD5E1] rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
          <div className="relative h-36 bg-gradient-to-br from-[#2563EB] to-[#06B6D4]">
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              HOJE
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-[#0F172A] mb-1 group-hover:text-[#6D28D9] transition-colors">
              Tech Meetup
            </h3>
            <p className="text-sm text-gray-500 mb-2">Porto, Portugal</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6D28D9] font-medium">25 Abr</span>
              <span className="text-gray-500">45 going</span>
            </div>
          </div>
        </div>

        {/* Mock Event Card 3 */}
        <div className="group bg-white border border-[#CBD5E1] rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
          <div className="relative h-36 bg-gradient-to-br from-[#F97316] to-[#EF4444]">
            <div className="absolute top-3 left-3 bg-[#6D28D9] text-white text-xs font-bold px-2 py-1 rounded-full">
              EM 3 DIAS
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-[#0F172A] mb-1 group-hover:text-[#6D28D9] transition-colors">
              Arte Urbana
            </h3>
            <p className="text-sm text-gray-500 mb-2">Lisboa, Portugal</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6D28D9] font-medium">28 Abr</span>
              <span className="text-gray-500">89 going</span>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 py-3 text-[#6D28D9] font-medium hover:bg-[#6D28D9]/5 rounded-lg transition-colors">
        Ver todos os eventos →
      </button>
    </div>
  );
}
