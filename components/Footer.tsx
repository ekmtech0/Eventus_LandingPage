import Link from 'next/link';
import React from 'react';
import { Calendar, Twitter, Instagram, Facebook, MapPin, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
               
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Eventus
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed">
              A maior plataforma de descoberta e promoção de eventos locais em Angola. Conectando pessoas através de experiências únicas.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/explorar" className="text-slate-500 hover:text-primary transition-colors">
                  Explorar Eventos
                </Link>
              </li>
              <li>
                <Link href="/explorar" className="text-slate-500 hover:text-primary transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-slate-500 hover:text-primary transition-colors">
                  Baixar Aplicativo
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                  Para Organizadores
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Suporte</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                  Centro de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Instale o App</h4>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-all">
                <Smartphone className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[8px] uppercase font-bold opacity-60 leading-none">Download on the</p>
                  <p className="text-sm font-bold leading-tight">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-all">
                <Smartphone className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[8px] uppercase font-bold opacity-60 leading-none">Get it on</p>
                  <p className="text-sm font-bold leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">© 2026 Eventus. Todos os direitos reservados.</p>
        
        </div>
      </div>
    </footer>
  );
};
