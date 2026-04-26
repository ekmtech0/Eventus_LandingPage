import { Metadata } from 'next';
import OrganizerProfile from '../Profile/OrganizerProfile'; // Ajusta o caminho
import { getOrganizerProfileBySlug } from '@/services/organizerProfile';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eventusangola.com';

function resolveImageUrl(imageUrl?: string): string {
  if (!imageUrl) {
    return `${BASE_URL}/og-image.svg`;
  }
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }
  const normalizedPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${BASE_URL}${normalizedPath}`;
}

// Esta função garante que o Google veja o Nome, Descrição e Imagem sem precisar de JS

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const organizer = await getOrganizerProfileBySlug(params.slug);

  if (!organizer) {
    return {
      metadataBase: new URL(BASE_URL),
      title: 'Organizador não encontrado | Eventus',
      description: 'Este organizador não existe no Eventus.',
      robots: 'noindex, nofollow',
    };
  }

  const organizerPhoto = resolveImageUrl(organizer.photo);
  const organizerUrl = `${BASE_URL}/organizer/${encodeURIComponent(params.slug)}`;
  
  // Adicionar estatísticas do organizador no card SEO
  const statsInfo = `${organizer.qtdEvent || 0} eventos · ${organizer.followers || 0} seguidores`;
  const description = organizer.descripcion 
    ? `${organizer.descripcion} · ${statsInfo}`
    : `Veja todos os eventos organizados por ${organizer.name} no Eventus Angola · ${statsInfo}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: `${organizer.name} | Perfil do Organizador no Eventus`,
    description,
    openGraph: {
      title: `${organizer.name} - Eventus`,
      description,
      url: organizerUrl,
      siteName: 'Eventus',
      type: 'website',
      locale: 'pt_AO',
      images: [
        {
          url: organizerPhoto,
          width: 1200,
          height: 630,
          alt: `Foto de perfil de ${organizer.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: organizer.name,
      description,
      images: [organizerPhoto],
    },
  };

}

export default async function Page({ params }: { params: { slug: string } }) {
  const organizer = await getOrganizerProfileBySlug(params.slug);

  return (
    <OrganizerProfile 
      organizerName={params.slug} 
      initialOrganizer={organizer} 
      serverResolved={true} 
    />
  );
}
