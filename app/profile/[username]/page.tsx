import CommonProfile from '@/components/Users/Common/Profile/CommonProfile';

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  return {
    title: `${username} | Perfil Eventus`,
    description: `Veja o perfil de @${username} no Eventus - descubra eventos e interesses`,
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  
  // Aqui depois vais buscar os dados reais do utilizador
  // const user = await getUserByUsername(username);
  
  return <CommonProfile />;
}