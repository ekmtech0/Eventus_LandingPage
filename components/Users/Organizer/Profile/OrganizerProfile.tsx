'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

// Import sub-components
import OrganizerHeader from '../Profile/OrganizerHeader';
import OrganizerStats from '../Profile/OrganizerStats';
import OrganizerDescription from '../Profile/OrganizerDescription';
import OrganizerSocialLinks from '../Profile/OrganizerSocialLinks';
import OrganizerEvents from '../Profile/OrganizerEvents';
import OrganizerCTA from '../Profile/OrganizerCTA';

// Types
interface AddressFeature {
  city?: string;
  country?: string;
}

interface RedesSociais {
  instagram?: string;
  facebook?: string;
  tikTok?: string;
  website?: string;
}

interface Place {
  id: string;
  name: string;
  address: string;
  photo?: string;
}

interface OrganizerEvent {
  id: string;
  name: string;
  title?: string;
  date: string;
  location: string;
  attendees: number;
  image?: string;
}

interface Organizer {
  id: string;
  name: string;
  photo?: string;
  accountType: 'Organizer';
  organizadorName?: string;
  organizeType: 'Individual' | 'Company' | 'Other';
  descripcion?: string;
  redesSocial?: RedesSociais;
  qtdEvent: number;
  followers: number;
  following: number;
  userLocation?: AddressFeature;
  places?: Place[];
  events?: OrganizerEvent[];
}

// Mock data for development
const mockOrganizer: Organizer = {
  id: 'uuid-002',
  name: 'Tech Events Portugal',
  photo: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=200&h=200&fit=crop&crop=face',
  accountType: 'Organizer',
  organizadorName: 'Tech Events Portugal',
  organizeType: 'Company',
  descripcion: 'Somos a principal plataforma de eventos de tecnologia em Portugal. Organizamos meetups, conferências e workshops para conectar profissionais e entusiastas de tecnologia. Nosso missão é promover a inovação e criar oportunidades de networking na comunidade tech portuguesa.',
  qtdEvent: 45,
  followers: 12500,
  following: 230,
  userLocation: { city: 'Lisboa', country: 'Portugal' },
  redesSocial: {
    instagram: 'techeventspt',
    facebook: 'techeventsportugal',
    website: 'https://techevents.pt'
  },
  places: [
    { id: '1', name: 'Tech Hub Lisboa', address: 'Av. da Liberdade, 110', photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' },
    { id: '2', name: 'Porto Innovation Center', address: 'Rua de Santa Catarina, 50', photo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop' }
  ],
  events: [
    { id: '1', name: 'AI Summit Portugal', date: '20 Mai 2026', location: 'Lisboa', attendees: 450 },
    { id: '2', name: 'Startup Weekend', date: '5 Jun 2026', location: 'Porto', attendees: 120 },
    { id: '3', name: 'DevOps Conference', date: '15 Jun 2026', location: 'Lisboa', attendees: 280 }
  ]
};

interface OrganizerProfileProps {
  organizerName?: string;
}

export default function OrganizerProfile({ organizerName }: OrganizerProfileProps) {
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchOrganizer = async () => {
      if (!organizerName) {
        setError("Nome do organizador não fornecido");
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Buscar todos os usuários e filtrar pelo username
        const response = await fetch(`https://eventus-1mt4.onrender.com/api/user/`);
        
        if (response.ok) {
          const data = await response.json();
          console.log("Dados da API:", data);
          
          // Procurar usuário pelo username na URL
          const user = data.find((u: any) => 
            u.username?.toLowerCase() === organizerName.toLowerCase() ||
            u.name?.toLowerCase().replace(/\s+/g, '-') === organizerName.toLowerCase()
          );
          
          if (!user) {
            setError("Usuário não encontrado");
            return;
          }

          // Verificar se é um organizador (accountType: 1 = Organizer)
          if (user.accountType !== 1) {
            setError("Este perfil não é de um organizador");
            return;
          }
          
          setOrganizer({
            id: user.uid || user.id || '',
            name: user.name || '',
            photo: user.photo || '',
            accountType: 'Organizer',
            organizadorName: user.name,
            organizeType: user.organizer?.organizeType === 1 ? 'Company' : user.organizer?.organizeType === 2 ? 'Other' : 'Individual',
            descripcion: user.organizer?.descripcion || user.bio || '',
            redesSocial: {
              instagram: user.organizer?.redesSocial?.instagramUrl || user.instagram,
              facebook: user.organizer?.redesSocial?.facebookUrl || user.facebook,
              tikTok: user.organizer?.redesSocial?.tikTokUrl || user.tiktok,
              website: user.website
            },
            qtdEvent: user.qtdEvent || 0,
            followers: user.following || 0,
            following: user.follow || 0,
            userLocation: user.location ? { city: user.location.city, country: user.location.country } : undefined,
            events: []
          });
        } else {
          setError("Erro ao buscar usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar organizador:", error);
        setError("Erro ao carregar dados");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizer();
  }, [organizerName]);

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

  // Generate SEO metadata
  const seoTitle = `${organizer.name} | Organizador de Eventos | Eventus`;
  const seoDescription = organizer.descripcion 
    ? `${organizer.descripcion} - Veja os eventos de ${organizer.name} no Eventus`
    : `Descubra os eventos de ${organizer.name} no Eventus`;
  const seoImage = organizer.photo || '/default-organizer.png';

  // Schema.org Organization JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizer.name,
    url: `https://eventus.app/organizer/${organizer.name.toLowerCase().replace(/\s+/g, '-')}`,
    logo: organizer.photo,
    sameAs: [
      organizer.redesSocial?.instagram ? `https://instagram.com/${organizer.redesSocial.instagram}` : null,
      organizer.redesSocial?.facebook ? `https://facebook.com/${organizer.redesSocial.facebook}` : null,
      organizer.redesSocial?.website || null
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: organizer.userLocation?.city ? '+351-XXX-XXX-XXX' : undefined,
      contactType: 'Customer Service'
    }
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
        <meta property="og:profile:username" content={organizer.name} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
        
        {/* Schema.org */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} 
        />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Hero Background with Pattern */}
        <div className="h-56 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#2563EB] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border-4 border-white rounded-full" />
            <div className="absolute top-20 right-10 w-16 h-16 border-4 border-white rounded-full" />
            <div className="absolute bottom-10 left-1/4 w-12 h-12 border-4 border-white rounded-full" />
            <div className="absolute bottom-4 right-1/3 w-24 h-24 border-4 border-white rounded-full" />
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28">
          {/* Profile Header - Desktop & Mobile */}
          <OrganizerHeader 
            organizer={organizer}
            isFollowing={isFollowing}
            handleFollow={handleFollow}
          />

          {/* Description Section */}
          <OrganizerDescription descripcion={organizer.descripcion} />

          {/* Social Links */}
          <OrganizerSocialLinks 
            redesSocial={organizer.redesSocial}
            userLocation={organizer.userLocation}
          />

          {/* Active Events */}
          <OrganizerEvents events={organizer.events} />

          {/* Stats Section */}
          <OrganizerStats />

          {/* CTA Section */}
          <OrganizerCTA />
        </div>
      </div>
    </>
  );
}