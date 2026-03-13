import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baixar App | Eventus",
  description: "Baixe o aplicativo Eventus e tenha acesso rápido aos melhores eventos na sua região.",
  openGraph: {
    title: "Baixar App | Eventus",
    description: "Baixe o aplicativo Eventus e tenha acesso rápido aos melhores eventos na sua região.",
    type: "website",
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
