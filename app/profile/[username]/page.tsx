import CommonProfile from '@/components/Users/Common/Profile/CommonProfile';
import OrganizerProfile from '@/components/Users/Organizer/Profile/OrganizerProfile';
import { getUserByUsername } from '@/services/GetUser';
import { mapUserToOrganizerProfile } from '@/services/organizerProfile';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

// Tipos de conta
const ACCOUNT_TYPE = {
  COMMON: 0,
  ORGANIZER: 1,
} as const;

// Base URL do site
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eventusangola.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  
  try {
    const user = await getUserByUsername(decodedUsername);
    
    if (!user) {
      return {
        title: 'Perfil não encontrado | Eventus',
        description: 'Este perfil não existe no Eventus.',
        robots: 'noindex, nofollow',
      };
    }
    
    const isOrganizer = user.accountType === ACCOUNT_TYPE.ORGANIZER;
    const userName = user.name || user.username || 'Utilizador';
    const userBio = user.bio || `Veja o perfil de ${userName} no Eventus - ${isOrganizer ? 'organizador de eventos' : 'descubra eventos e interesses'}`;
    const userPhoto = user.photo || `${BASE_URL}/default-avatar.png`;
    const profileUrl = `${BASE_URL}/profile/${username}`;
    
    const title = isOrganizer 
      ? `${userName} | Organizador de Eventos | Eventus`
      : `${userName} | Perfil Eventus`;
    
    // Truncar descrição se muito longa
    const description = userBio.length > 160 ? userBio.substring(0, 157) + '...' : userBio;
    
    return {
      metadataBase: new URL(BASE_URL),
      title,
      description,
      openGraph: {
        title,
        description,
        url: profileUrl,
        siteName: 'Eventus',
        type: 'profile',
        locale: 'pt_AO',
        images: [
          {
            url: userPhoto,
            width: 400,
            height: 400,
            alt: `${userName} - ${isOrganizer ? 'Organizador' : 'Utilizador'} Eventus`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [userPhoto],
        site: '@eventus',
        creator: user.username ? `@${user.username}` : undefined,
      },
      alternates: {
        canonical: profileUrl,
        languages: {
          'pt-PT': profileUrl,
          'pt-AO': profileUrl,
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Erro ao gerar metadata:', error);
    return {
      title: 'Perfil | Eventus',
      description: 'Veja perfis de utilizadores e organizadores no Eventus',
    };
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  
  // Buscar utilizador pela API
  const user = await getUserByUsername(decodedUsername);
  
  // Se utilizador não existir, mostrar 404
  if (!user) {
    notFound();
  }
  
  // Verificar o tipo de conta e renderizar o perfil apropriado
  const accountType = user.accountType ?? ACCOUNT_TYPE.COMMON;
  
  if (accountType === ACCOUNT_TYPE.ORGANIZER) {
    // Converter dados do utilizador para formato do OrganizerProfile
    const organizerData = mapUserToOrganizerProfile(user);
    
    // Renderizar perfil de organizador
    return (
      <OrganizerProfile 
        organizerName={user.username || user.name} 
        initialOrganizer={organizerData}
        serverResolved={true}
      />
    );
  }
  
  // Renderizar perfil comum (default)
  // Normalizar dados do utilizador para o formato esperado pelo CommonProfile
  const normalizedUser = {
    id: user.id || user.uid || '',
    username: user.username || '',
    name: user.name || '',
    email: user.email || '',
    photo: user.photo,
    accountType: 'Common' as const,
    bio: user.bio,
    phone: user.phone,
    birthDate: user.birthDate,
    instagram: user.instagram,
    facebook: user.facebook,
    tikTok: user.tikTok,
    website: user.website,
    following: user.following || 0,
    follow: user.follow || 0,
    userLocation: user.location,
    interests: [],
  };
  
  return <CommonProfile user={normalizedUser} />;
}