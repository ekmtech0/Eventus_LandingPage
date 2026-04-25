'use client';

import { useState } from 'react';
import Head from 'next/head';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileInterests from './ProfileInterests';
import ProfileSocialLinks from './ProfileSocialLinks';
import ProfileEvents from './ProfileEvents';
import ProfileCTA from './ProfileCTA';

// Types
interface AddressFeature {
  city?: string;
  country?: string;
}

interface CommonUser {
  id: string;
  username: string;
  name: string;
  email: string;
  photo?: string;
  accountType: 'Common';
  gender?: 'male' | 'female' | 'other';
  bio?: string;
  phone?: string;
  birthDate?: string;
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  website?: string;
  following: number;
  follow: number;
  userLocation?: AddressFeature;
  interests?: string[];
}

// Mock data for development
const mockUser: CommonUser = {
  id: 'uuid-001',
  username: 'johndoe',
  name: 'John Doe',
  email: 'john@example.com',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  accountType: 'Common',
  bio: 'Apaixonado por música, arte e eventos culturais. Adoro descobrir novas experiências e compartilhar momentos inesquecíveis com amigos.',
  phone: '+351 912 345 678',
  instagram: 'johndoe',
  facebook: 'johndoe',
  tikTok: 'johndoe',
  website: 'https://johndoe.com',
  following: 150,
  follow: 89,
  userLocation: { city: 'Lisboa', country: 'Portugal' },
  interests: ['Música', 'Arte', 'Tech', 'Food', 'Desporto', 'Cultura']
};

interface CommonProfileProps {
  user?: CommonUser;
}

export default function CommonProfile({ user = mockUser }: CommonProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => setIsFollowing(!isFollowing);

  // Generate SEO metadata
  const seoTitle = `${user.name} | Perfil Eventus`;
  const seoDescription = user.bio 
    ? `${user.bio} - Veja os eventos de @${user.username} no Eventus`
    : `Descubra os eventos e interesses de ${user.name} no Eventus`;
  const seoImage = user.photo || '/default-avatar.png';

  // Schema.org Person JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: user.name,
    url: `https://eventus.app/user/${user.username}`,
    image: user.photo,
    sameAs: [
      user.instagram ? `https://instagram.com/${user.instagram}` : null,
      user.facebook ? `https://facebook.com/${user.facebook}` : null,
      user.tikTok ? `https://tiktok.com/@${user.tikTok}` : null,
      user.website || null
    ].filter(Boolean)
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:type" content="profile" />
        <meta property="og:profile:username" content={user.username} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
        <meta name="twitter:profile:username" content={user.username} />
        
        {/* Schema.org */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} 
        />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Hero Background */}
        <div className="h-48 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#2563EB]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
          {/* Profile header with user info and actions */}
          <ProfileHeader user={user} isFollowing={isFollowing} handleFollow={handleFollow} />
          {/* User statistics cards */}
          <ProfileStats />
          {/* User interests section */}
          <ProfileInterests interests={user.interests || []} />
          {/* User social media links */}
          <ProfileSocialLinks user={user} />
          {/* Upcoming events section */}
          <ProfileEvents />
          {/* Call to action section */}
          <ProfileCTA />
        </div>
      </div>
    </>
  );
}