import OrganizerProfile from '@/components/Users/Organizer/Profile/OrganizerProfile';

interface PageProps {
  params: Promise<{
    organizerName: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { organizerName } = await params;
  return {
    title: `${organizerName} | Organizador de Eventos | Eventus`,
    description: `Veja os eventos de ${organizerName} no Eventus`,
  };
}

export default async function OrganizerPage({ params }: PageProps) {
  const { organizerName } = await params;
  
  return <OrganizerProfile organizerName={organizerName} />;
}