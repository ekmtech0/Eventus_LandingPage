import Link from 'next/link';
import Image from "next/image";
import { Calendar, Search, Smartphone, Menu, X, Download } from 'lucide-react';




export const HowItWork: React.FC = () => {
     const steps = [
        {
          title: "Descubra Eventos",
          desc: "Explore o que está acontecendo na sua cidade através de um feed inteligente.",
          icon: "🔍",
        },
        {
          title: "Participe",
          desc: "Confirme sua presença, convide amigos e receba lembretes em tempo real.",
          icon: "🎟️",
        },
        {
          title: "Crie o Seu",
          desc: "Organize seus próprios eventos e alcance milhares de pessoas locais.",
          icon: "✨",
        },
      ];
  return(
 <section className="bg-slate-900 text-white overflow-hidden">
        <div className="section-container relative p-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Como o Eventus Funciona</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tudo o que você precisa para viver experiências memoráveis na palma da sua mão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <div className="text-4xl mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
        </div>
      </section>
  )
      }