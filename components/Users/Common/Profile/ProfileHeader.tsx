// Profile header with user info and actions
'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, UserPlus, MessageCircle, Share2 } from 'lucide-react';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  photo?: string;
  accountType: 'Common';
  bio?: string;
  phone?: string;
  birthDate?: string;
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  website?: string;
  following: number;
  follow: number;
  userLocation?: {
    city?: string;
    country?: string;
  };
  interests?: string[];
}

interface ProfileHeaderProps {
  user: User;
  isFollowing: boolean;
  handleFollow: () => void;
}

export default function ProfileHeader({ user, isFollowing, handleFollow }: ProfileHeaderProps) {
  return (
    <>
      {/* Desktop Profile Header */}
      <div className="hidden sm:block bg-white rounded-2xl shadow overflow-hidden mb-6">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                {user.photo ? (
                  <Image 
                    src={user.photo} 
                    alt={user.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#6D28D9] flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">{user.name}</h1>
              <p className="text-[#6D28D9] font-medium mb-2">@{user.username}</p>
              
              {user.bio && (
                <p className="text-gray-600 mb-3 max-w-lg">{user.bio}</p>
              )}
              
              {/* Location */}
              {user.userLocation && (
                <div className="flex items-center justify-center sm:justify-start text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.userLocation.city}, {user.userLocation.country}
                </div>
              )}

              {/* Stats Row */}
              <div className="flex items-center justify-center sm:justify-start gap-6">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-[#0F172A]">{user.follow}</span>
                  <span className="text-sm text-gray-500">Seguidores</span>
                </div>
                <div className="w-px h-10 bg-[#CBD5E1]" />
                <div className="text-center">
                  <span className="block text-2xl font-bold text-[#0F172A]">{user.following}</span>
                  <span className="text-sm text-gray-500">A seguir</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center sm:justify-start">
            <button 
              onClick={handleFollow}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
                isFollowing 
                  ? 'bg-[#F8FAFC] text-[#6D28D9] border-2 border-[#6D28D9]' 
                  : 'bg-[#6D28D9] text-white hover:bg-[#5B21B6] shadow-lg hover:shadow-xl'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              {isFollowing ? 'A seguir' : 'Seguir'}
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium bg-[#F8FAFC] text-[#2563EB] border-2 border-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all">
              <MessageCircle className="w-5 h-5" />
              Mensagem
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium bg-[#F8FAFC] text-gray-600 border-2 border-[#CBD5E1] hover:border-[#F97316] hover:text-[#F97316] transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Profile Header */}
      <div className="sm:hidden mb-6">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo - Mobile */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
              {user.photo ? (
                <Image 
                  src={user.photo} 
                  alt={user.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#6D28D9] flex items-center justify-center text-white text-4xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* Online indicator - Mobile */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-3 border-white rounded-full" />
          </div>

          {/* Name & Username - Mobile */}
          <h1 className="text-xl font-bold text-[#0F172A] mb-1">{user.name}</h1>
          <p className="text-[#6D28D9] font-medium text-sm mb-2">@{user.username}</p>
          
          {/* Bio - Mobile */}
          {user.bio && (
            <p className="text-gray-600 text-sm mb-3 px-4">{user.bio}</p>
          )}
          
          {/* Location - Mobile */}
          {user.userLocation && (
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {user.userLocation.city}, {user.userLocation.country}
            </div>
          )}

          {/* Stats Row - Mobile */}
          <div className="flex items-center justify-center gap-6 w-full py-3 bg-white rounded-xl shadow-sm">
            <div className="text-center">
              <span className="block text-xl font-bold text-[#0F172A]">{user.follow}</span>
              <span className="text-xs text-gray-500">Seguidores</span>
            </div>
            <div className="w-px h-8 bg-[#CBD5E1]" />
            <div className="text-center">
              <span className="block text-xl font-bold text-[#0F172A]">{user.following}</span>
              <span className="text-xs text-gray-500">A seguir</span>
            </div>
          </div>

          {/* Action Buttons - Mobile */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center w-full">
            <button 
              onClick={handleFollow}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all ${
                isFollowing 
                  ? 'bg-[#F8FAFC] text-[#6D28D9] border-2 border-[#6D28D9]' 
                  : 'bg-[#6D28D9] text-white hover:bg-[#5B21B6]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              {isFollowing ? 'A seguir' : 'Seguir'}
            </button>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm bg-[#F8FAFC] text-[#2563EB] border-2 border-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all">
              <MessageCircle className="w-4 h-4" />
              Mensagem
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-[#F8FAFC] text-gray-600 border-2 border-[#CBD5E1] hover:border-[#F97316] hover:text-[#F97316] transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
