import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baixar App",
  description:
    "Baixe o aplicativo Eventus para Android ou iOS e tenha acesso rápido aos melhores eventos em Angola.",
  keywords: [
    "baixar app eventus", "eventus android", "eventus ios",
    "app de eventos Angola", "google play eventus", "app store eventus",
  ],
  alternates: {
    canonical: "https://eventusangola.com/download",
  },
  openGraph: {
    title: "Baixar App Eventus – Android & iOS",
    description:
      "Baixe o aplicativo Eventus para Android ou iOS e tenha acesso rápido aos melhores eventos em Angola.",
    url: "https://eventusangola.com/download",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Baixar App Eventus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baixar App Eventus – Android & iOS",
    description:
      "Baixe o aplicativo Eventus para Android ou iOS e tenha acesso rápido aos melhores eventos em Angola.",
    images: ["/og-image.png"],
  },
};

export default function DownloadPage() {
  return (
    <div className="section-container py-20">
      <h1 className="text-4xl font-black text-slate-900 mb-6">Baixar App</h1>
      <p className="text-slate-600 mb-8 max-w-2xl">
        Em breve teremos downloads diretos para Android e iOS. Enquanto isso, conecte-se com a nossa plataforma pelo navegador ou inscreva-se para receber novidades.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Android</h2>
          <p className="text-slate-600 mb-6">
            Em breve disponível na Google Play Store. Fique de olho no lançamento e receba notificações do nosso app.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90"
          >
            Em breve
          </a>
        </div>
        <div className="rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">iOS</h2>
          <p className="text-slate-600 mb-6">
            Em breve disponível na App Store. Ative as notificações para ser avisado quando o app estiver disponível.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90"
          >
            Em breve
          </a>
        </div>
      </div>
    </div>
  );
}
