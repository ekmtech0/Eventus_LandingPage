// User interests section
'use client';

import React from 'react';

interface ProfileInterestsProps {
  interests: string[];
}

export default function ProfileInterests({ interests }: ProfileInterestsProps) {
  if (!interests || interests.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-bold text-[#0F172A] mb-4">Interesses</h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-gradient-to-r from-[#6D28D9]/10 to-[#2563EB]/10 text-[#6D28D9] rounded-full text-sm font-medium hover:from-[#6D28D9]/20 hover:to-[#2563EB]/20 cursor-pointer transition-all"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
