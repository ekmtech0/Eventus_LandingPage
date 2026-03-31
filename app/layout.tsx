import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eventusangola.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eventus – Descubra eventos locais em Angola",
    template: "%s | Eventus",
  },
  description:
    "Encontre os melhores eventos na sua região e participe de experiências incríveis com a Eventus.",
  keywords: [
    "eventos", "Angola", "Luanda", "concertos", "festivais",
    "workshops", "conferências", "eventus",
  ],
  authors: [{ name: "Eventus" }],
  creator: "Eventus",
  openGraph: {
    title: "Eventus – Descubra eventos locais em Angola",
    description:
      "Encontre os melhores eventos na sua região e participe de experiências incríveis com a Eventus.",
    type: "website",
    locale: "pt-PT",
    siteName: "Eventus",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eventus – Descubra eventos locais em Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventus – Descubra eventos locais em Angola",
    description:
      "Encontre os melhores eventos na sua região e participe de experiências incríveis com a Eventus.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "3X96qzT02_HVMqqdl78N-PR6J6P_7KMWEOJjtyc8wAc",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
