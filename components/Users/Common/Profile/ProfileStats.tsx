// User statistics cards
'use client';

import React from 'react';
import { Calendar, Heart, Star } from 'lucide-react';

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm text-center">
        <Calendar className="w-6 h-6 mx-auto text-[#6D28D9] mb-2" />
        <span className="block text-2xl font-bold text-[#0F172A]">12</span>
        <span className="text-sm text-gray-500">Eventos</span>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm text-center">
        <Heart className="w-6 h-6 mx-auto text-[#F97316] mb-2" />
        <span className="block text-2xl font-bold text-[#0F172A]">34</span>
        <span className="text-sm text-gray-500">Salvos</span>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm text-center">
        <Star className="w-6 h-6 mx-auto text-[#2563EB] mb-2" />
        <span className="block text-2xl font-bold text-[#0F172A]">8</span>
        <span className="text-sm text-gray-500">Interesses</span>
      </div>
    </div>
  );
}
