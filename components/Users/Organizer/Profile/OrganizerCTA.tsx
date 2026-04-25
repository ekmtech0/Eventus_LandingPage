// Organizer call-to-action section
'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function OrganizerCTA() {
  return (
    <div className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] rounded-2xl p-6 sm:p-8 text-white mb-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#FCD34D]" />
            <span className="text-[#FCD34D] font-medium">Pronto para criar o seu evento?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Torne-se um Organizador</h2>
          <p className="text-white/80 text-sm sm:text-base max-w-md">
            Junte-se à nossa comunidade de organizadores e alcance milhares de participantes.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#6D28D9] font-bold rounded-full hover:bg-[#F8FAFC] transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
          Criar Evento
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}