// Organizer profile header with info and actions
'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Users, Share2, CheckCircle, TrendingUp } from 'lucide-react';

interface Organizer {
  id: string;
  name: string;
  photo?: string;
  accountType: 'Organizer';
  organizadorName?: string;
  organizeType: 'Individual' | 'Company' | 'Other';
  descripcion?: string;
  redesSocial?: {
    instagram?: string;
    facebook?: string;
    tikTok?: string;
    website?: string;
  };
  qtdEvent: number;
  followers: number;
  following: number;
  userLocation?: {
    city?: string;
    country?: string;
  };
  places?: any[];
  events?: any[];
}

interface OrganizerHeaderProps {
  organizer: Organizer;
  isFollowing: boolean;
  handleFollow: () => void;
}

export default function OrganizerHeader({ organizer, isFollowing, handleFollow }: OrganizerHeaderProps) {
  return (
    <>
      {/* Desktop Profile Header */}
      <div className=" relative hidden lg:block bg-white rounded-2xl shadow overflow-hidden mb-6">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                {organizer.photo ? (
                  <Image 
                    src={organizer.photo} 
                    alt={organizer.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#6D28D9] flex items-center justify-center text-white text-5xl font-bold">
                    {organizer.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Organizer Info */}
            <div className="text-center lg:text-left flex-1">
              <div className="flex flex-col lg:flex-row items-center lg:items-center gap-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#0F172A]">{organizer.name}</h1>
                
              </div>
              
             
              
              {/* Location */}
              {organizer.userLocation && (
                <div className="flex items-center justify-center lg:justify-start text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {organizer.userLocation.city}, {organizer.userLocation.country}
                </div>
              )}

              {/* Stats Row */}
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <div className="text-center">
                  <span className="block text-2xl lg:text-3xl font-bold text-[#0F172A]">{organizer.qtdEvent}</span>
                  <span className="text-sm text-gray-500">Eventos</span>
                </div>
                <div className="w-px h-12 bg-[#CBD5E1]" />
                <div className="text-center">
                  <span className="block text-2xl lg:text-3xl font-bold text-[#0F172A]">
                    {organizer.followers.toLocaleString('pt-PT')}
                  </span>
                  <span className="text-sm text-gray-500">Seguidores</span>
                </div>
                <div className="w-px h-12 bg-[#CBD5E1]" />
                <div className="text-center">
                  <span className="block text-2xl lg:text-3xl font-bold text-[#0F172A]">{organizer.following || 0}</span>
                  <span className="text-sm text-gray-500">Seguindo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
            <button 
              onClick={handleFollow}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                isFollowing 
                  ? 'bg-[#F8FAFC] text-[#6D28D9] border-2 border-[#6D28D9]' 
                  : 'bg-[#6D28D9] text-white hover:bg-[#5B21B6] shadow-lg hover:shadow-xl'
              }`}
            >
              <Users className="w-5 h-5" />
              {isFollowing ? 'A seguir' : 'Seguir'}
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all shadow-lg">
              <Calendar className="w-5 h-5" />
              Ver Eventos
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium bg-[#F8FAFC] text-gray-600 border-2 border-[#CBD5E1] hover:border-[#F97316] hover:text-[#F97316] transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Profile Header */}
      <div className="lg:hidden mb-6">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo - Mobile - Circular 100% */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
              {organizer.photo ? (
                <Image 
                  src={organizer.photo} 
                  alt={organizer.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#6D28D9] flex items-center justify-center text-white text-4xl font-bold">
                  {organizer.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* REMOVIDO: Verified Badge */}
          </div>

          {/* Name - Mobile - SEM badges */}
          <h1 className="text-xl font-bold text-[#0F172A] mb-2">{organizer.name}</h1>
          {/* REMOVIDO: Badges de Verificado e Individual/Empresa */}

          {/* Location - Mobile */}
          {organizer.userLocation && (
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {organizer.userLocation.city}, {organizer.userLocation.country}
            </div>
          )}

          {/* Stats Row - Mobile */}
          <div className="flex items-center justify-center gap-4 w-full py-3 bg-white rounded-xl shadow-sm">
            <div className="text-center">
              <span className="block text-xl font-bold text-[#0F172A]">{organizer.qtdEvent}</span>
              <span className="text-xs text-gray-500">Eventos</span>
            </div>
            <div className="w-px h-8 bg-[#CBD5E1]" />
            <div className="text-center">
              <span className="block text-xl font-bold text-[#0F172A]">
                {organizer.followers.toLocaleString('pt-PT')}
              </span>
              <span className="text-xs text-gray-500">Seguidores</span>
            </div>
            <div className="w-px h-8 bg-[#CBD5E1]" />
            <div className="text-center">
              <span className="block text-xl font-bold text-[#0F172A]">{organizer.following || 0}</span>
              <span className="text-xs text-gray-500">Seguindo</span>
            </div>
          </div>

          {/* Action Buttons - Mobile - SEM Contactar */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center w-full">
            <button 
              onClick={handleFollow}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all ${
                isFollowing 
                  ? 'bg-[#F8FAFC] text-[#6D28D9] border-2 border-[#6D28D9]' 
                  : 'bg-[#6D28D9] text-white hover:bg-[#5B21B6]'
              }`}
            >
              <Users className="w-4 h-4" />
              {isFollowing ? 'A seguir' : 'Seguir'}
            </button>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all">
              <Calendar className="w-4 h-4" />
              Ver Eventos
            </button>
            {/* REMOVIDO: Botão Contactar */}
          </div>
        </div>
      </div>
    </>
  );
}