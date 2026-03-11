import Link from 'next/link';
import Image from "next/image";
import { Calendar, Search, Smartphone, Menu, X, Download } from 'lucide-react';




export const FinalCTA: React.FC = () => {
  return(
 <section className="bg-primary py-24 relative overflow-hidden">
        <div className="section-container relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Nunca mais perca um evento <br className="hidden md:block" /> na sua cidade.
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão descobrindo as melhores experiências de Angola todos os dias.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all active:scale-95 shadow-xl"
            >
              Baixar Agora
            </Link>
            <div className="flex gap-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </section>
  )
      }