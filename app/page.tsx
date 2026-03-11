import type { Metadata } from "next";
import { Home } from "./pages/Home";

export const metadata: Metadata = {
  title: "Home | Eventus",
  description:
    "Encontre os melhores eventos locais, explore categorias e participe de experiências incríveis com o Eventus.",
};

export default function Page() {
  return <Home />;
}
