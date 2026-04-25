// Organizer statistics section
'use client';

import React from 'react';
import { Star, TrendingUp, Calendar } from 'lucide-react';

export default function OrganizerStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <div className="w-12 h-12 bg-[#6D28D9]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Star className="w-6 h-6 text-[#6D28D9]" />
        </div>
        <span className="block text-3xl font-bold text-[#0F172A]">4.9</span>
        <span className="text-sm text-gray-500">Avaliação Média</span>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <div className="w-12 h-12 bg-[#2563EB]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <TrendingUp className="w-6 h-6 text-[#2563EB]" />
        </div>
        <span className="block text-3xl font-bold text-[#0F172A]">+2.5K</span>
        <span className="text-sm text-gray-500">Novos Seguidores (mês)</span>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm text-center">
        <div className="w-12 h-12 bg-[#F97316]/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Calendar className="w-6 h-6 text-[#F97316]" />
        </div>
        <span className="block text-3xl font-bold text-[#0F172A]">8</span>
        <span className="text-sm text-gray-500">Eventos este mês</span>
      </div>
    </div>
  );
}