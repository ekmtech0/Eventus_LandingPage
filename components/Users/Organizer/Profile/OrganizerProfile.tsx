'use client';

import { useEffect, useState } from 'react';
import OrganizerHeader from '../Profile/OrganizerHeader';
import OrganizerStats from '../Profile/OrganizerStats';
import OrganizerDescription from '../Profile/OrganizerDescription';
import OrganizerSocialLinks from '../Profile/OrganizerSocialLinks';
import OrganizerEvents from '../Profile/OrganizerEvents';
import OrganizerCTA from '../Profile/OrganizerCTA';
import {
  getOrganizerProfileBySlug,
  slugifyOrganizerName,
  type OrganizerProfileData as Organizer,
} from '@/services/organizerProfile';

interface OrganizerProfileProps {
  organizerName?: string;
  initialOrganizer?: Organizer | null;
  serverResolved?: boolean;
}

export default function OrganizerProfile({
  organizerName,
  initialOrganizer = null,
  serverResolved = false,
}: OrganizerProfileProps) {
  const [organizer, setOrganizer] = useState<Organizer | null>(initialOrganizer);
  const [isLoading, setIsLoading] = useState(!serverResolved && !initialOrganizer);
  const [error, setError] = useState<string | null>(
    serverResolved && !initialOrganizer ? 'Usuário não encontrado' : null,
  );
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (serverResolved) {
      return;
    }

    const fetchOrganizer = async () => {
      if (!organizerName) {
        setError('Nome do organizador não fornecido');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const resolvedOrganizer = await getOrganizerProfileBySlug(organizerName);

        if (!resolvedOrganizer) {
          setOrganizer(null);
          setError('Usuário não encontrado');
          return;
        }

        setOrganizer(resolvedOrganizer);
      } catch (fetchError) {
        console.error('Erro ao buscar organizador:', fetchError);
        setError('Erro ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizer();
  }, [organizerName, serverResolved]);

  const handleFollow = () => setIsFollowing(!isFollowing);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6D28D9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">A carregar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Ops!</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!organizer) {
    return null;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eventusangola.com';
  const canonicalSlug = slugifyOrganizerName(organizer.username || organizer.name);
  const organizerUrl = `${siteUrl}/organizer/${encodeURIComponent(canonicalSlug)}`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': organizer.organizeType === 'Company' ? 'Organization' : 'Person',
    name: organizer.name,
    description: organizer.descripcion,
    url: organizerUrl,
    image: organizer.photo,
    sameAs: [
      organizer.redesSocial?.instagram || null,
      organizer.redesSocial?.facebook || null,
      organizer.redesSocial?.tikTok || null,
      organizer.redesSocial?.website || null,
    ].filter(Boolean),
    address: organizer.userLocation
      ? {
          '@type': 'PostalAddress',
          addressLocality: organizer.userLocation.city,
          addressCountry: organizer.userLocation.country,
        }
      : undefined,
    mainEntityOfPage: organizerUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="h-56 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#2563EB] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border-4 border-white rounded-full" />
            <div className="absolute top-20 right-10 w-16 h-16 border-4 border-white rounded-full" />
            <div className="absolute bottom-10 left-1/4 w-12 h-12 border-4 border-white rounded-full" />
            <div className="absolute bottom-4 right-1/3 w-24 h-24 border-4 border-white rounded-full" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28">
          <OrganizerHeader
            organizer={organizer}
            isFollowing={isFollowing}
            handleFollow={handleFollow}
          />

          <OrganizerDescription descripcion={organizer.descripcion} />

          <OrganizerSocialLinks
            redesSocial={organizer.redesSocial}
            userLocation={organizer.userLocation}
          />

          <OrganizerEvents events={organizer.events} />

          <OrganizerStats />

          <OrganizerCTA />
        </div>
      </main>
    </>
  );
}
