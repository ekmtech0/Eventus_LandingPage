// User social media links
'use client';

import React from 'react';
import { Instagram, Facebook, Globe } from 'lucide-react';

interface User {
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  website?: string;
}

interface ProfileSocialLinksProps {
  user: User;
}

export default function ProfileSocialLinks({ user }: ProfileSocialLinksProps) {
  const hasSocialLinks = user.instagram || user.facebook || user.tikTok || user.website;
  if (!hasSocialLinks) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-bold text-[#0F172A] mb-4">Redes Sociais</h2>
      <div className="flex flex-wrap gap-3">
        {user.instagram && (
          <a 
            href={`https://instagram.com/${user.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium">@{user.instagram}</span>
          </a>
        )}
        {user.facebook && (
          <a 
            href={`https://facebook.com/${user.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Facebook className="w-5 h-5" />
            <span className="text-sm font-medium">{user.facebook}</span>
          </a>
        )}
        {user.tikTok && (
          <a 
            href={`https://tiktok.com/@${user.tikTok}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <span className="text-sm font-medium">🎵 @{user.tikTok}</span>
          </a>
        )}
        {user.website && (
          <a 
            href={user.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium">Website</span>
          </a>
        )}
      </div>
    </div>
  );
}
