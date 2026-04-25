// Organizer description section
'use client';

import React from 'react';

interface OrganizerDescriptionProps {
  descripcion?: string;
}

export default function OrganizerDescription({ descripcion }: OrganizerDescriptionProps) {
  if (!descripcion) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-bold text-[#0F172A] mb-3">Sobre</h2>
      <p className="text-gray-600 leading-relaxed">{descripcion}</p>
    </div>
  );
}