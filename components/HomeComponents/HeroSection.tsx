import Link from 'next/link';
import Image from "next/image";
import { Calendar, Search, Smartphone, Menu, X, Download } from 'lucide-react';




export const HeroSection: React.FC = () => {
  return(
<section className="hero relative overflow-hidden bg-white bg-none">
        <div className="section-container relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Smartphone className="w-4 h-4" />
              O App nº 1 de Eventos em Angola
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Descubra eventos <span className="text-primary">incríveis</span> perto de você.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              Concertos, workshops, conferências e experiências únicas acontecendo agora em Luanda e em todo o país.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/download"
                className="btn-primary w-full sm:w-auto px-8 py-4 text-lg"
              >
                <Download className="w-5 h-5" />
                Baixar Aplicativo
              </Link>
              <Link
                href="/explorar"
                className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg"
              >
                Explorar Eventos
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 grayscale opacity-50">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10">
              <div className="relative w-[300px] md:w-[350px] mx-auto aspect-[9/19] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
             
               {/* A imagem */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <p className="text-white font-bold mb-1">Festival de Jazz</p>
                    <p className="text-white/70 text-xs">Hoje às 19:00 • Baía de Luanda</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
          </div>
        </div>

      </section>
  )
      }