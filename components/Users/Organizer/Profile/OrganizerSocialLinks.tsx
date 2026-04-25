// Organizer social media links section
'use client';

import React from 'react';
import { Instagram, Facebook, Globe, MapPin } from 'lucide-react';

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  website?: string;
}

interface OrganizerLocation {
  city?: string;
  country?: string;
}

interface OrganizerSocialLinksProps {
  redesSocial?: SocialLinks;
  userLocation?: OrganizerLocation;
}

export default function OrganizerSocialLinks({ redesSocial, userLocation }: OrganizerSocialLinksProps) {
  const hasSocialLinks = redesSocial && (
    redesSocial.instagram || 
    redesSocial.facebook || 
    redesSocial.tikTok || 
    redesSocial.website
  );

  if (!hasSocialLinks && !userLocation) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-bold text-[#0F172A] mb-4">Informações</h2>
      
      <div className="space-y-3">
        {/* Location */}
        {userLocation && (userLocation.city || userLocation.country) && (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-10 h-10 bg-[#6D28D9]/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#6D28D9]" />
            </div>
            <span>{userLocation.city}{userLocation.city && userLocation.country ? ', ' : ''}{userLocation.country}</span>
          </div>
        )}

        {/* Instagram */}
        {redesSocial?.instagram && (
          <a 
            href={redesSocial.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-[#E1306C] transition-colors"
          >
            <div className="w-10 h-10 bg-[#E1306C]/10 rounded-full flex items-center justify-center">
              <Instagram className="w-5 h-5 text-[#E1306C]" />
            </div>
            <span>Instagram</span>
          </a>
        )}

        {/* Facebook */}
        {redesSocial?.facebook && (
          <a 
            href={redesSocial.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-[#1877F2] transition-colors"
          >
            <div className="w-10 h-10 bg-[#1877F2]/10 rounded-full flex items-center justify-center">
              <Facebook className="w-5 h-5 text-[#1877F2]" />
            </div>
            <span>Facebook</span>
          </a>
        )}

        {/* TikTok */}
        {redesSocial?.tikTok && (
          <a 
            href={redesSocial.tikTok} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-[#000000] transition-colors"
          >
            <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </div>
            <span>TikTok</span>
          </a>
        )}

        {/* Website */}
        {redesSocial?.website && (
          <a 
            href={redesSocial.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-[#2563EB] transition-colors"
          >
            <div className="w-10 h-10 bg-[#2563EB]/10 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#2563EB]" />
            </div>
            <span>Website</span>
          </a>
        )}
      </div>
    </div>
  );
}