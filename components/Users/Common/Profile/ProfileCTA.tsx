// Call to action section
'use client';

import React from 'react';

export default function ProfileCTA() {
  return (
    <div className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] rounded-2xl p-8 text-center mb-8">
      <h2 className="text-2xl font-bold text-white mb-2">
        Queres descobrir eventos?
      </h2>
      <p className="text-white/80 mb-6">
        Junta-te à comunidade Eventus e nunca percas um evento
      </p>
      <button className="px-8 py-3 bg-[#F97316] text-white font-bold rounded-full hover:bg-[#EA580C] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        Criar Conta
      </button>
    </div>
  );
}
