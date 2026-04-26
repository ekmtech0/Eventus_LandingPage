import { Metadata } from 'next';
import OrganizerProfile from '../Profile/OrganizerProfile'; // Ajusta o caminho
import { getOrganizerProfileBySlug } from '@/services/organizerProfile';

// Esta função garante que o Google veja o Nome, Descrição e Imagem sem precisar de JS
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const organizer = await getOrganizerProfileBySlug(params.slug);

  if (!organizer) {
    return { title: 'Organizador não encontrado | Eventus' };
  }

  return {
    title: `${organizer.name} | Perfil do Organizador no Eventus`,
    description: organizer.descripcion || `Veja todos os eventos organizados por ${organizer.name} no Eventus Angola.`,
    openGraph: {
      title: `${organizer.name} - Eventus`,
      description: organizer.descripcion,
      url: `https://eventusangola.com/organizer/${params.slug}`,
      siteName: 'Eventus Angola',
      images: [
        {
          url: organizer.photo || '/default-share-image.png',
          width: 1200,
          height: 630,
          alt: `Foto de perfil de ${organizer.name}`,
        },
      ],
      locale: 'pt_AO',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: organizer.name,
      description: organizer.descripcion,
      images: [organizer.photo || '/default-share-image.png'],
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