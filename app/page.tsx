import type { Metadata } from "next";
import { Home } from "./pages/Home";

// Revalidate a cada 1 hora para a home (ISR)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Descubra eventos incríveis perto de você",
  description:
    "Encontre os melhores eventos locais, explore categorias e participe de experiências incríveis com o Eventus.",
  keywords: [
    "eventos em Angola", "eventos em Luanda", "o que fazer em Luanda",
    "concertos Angola", "festivais Angola", "eventus",
  ],
  alternates: {
    canonical: "https://eventusangola.com",
  },
  openGraph: {
    title: "Descubra eventos incríveis perto de você – Eventus",
    description:
      "Encontre os melhores eventos locais, explore categorias e participe de experiências incríveis com o Eventus.",
    url: "https://eventusangola.com",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Eventus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Descubra eventos incríveis perto de você – Eventus",
    description:
      "Encontre os melhores eventos locais, explore categorias e participe de experiências incríveis com o Eventus.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <Home />;
}
