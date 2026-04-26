// Organizer statistics section - Apenas Avaliação
'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function OrganizerStats() {
  return (
    <div className="mb-6">
      {/* Apenas Avaliação - visível em desktop */}
      <div className="hidden lg:block bg-white rounded-xl p-6 shadow-sm text-center">
        <div className="w-12 h-12 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Star className="w-6 h-6 text-[#6D28D9]" />
        </div>
        <span className="block text-3xl font-bold text-[#0F172A]">4.9</span>
        <span className="text-sm text-gray-500">Avaliação Média</span>
      </div>
    </div>
  );
}