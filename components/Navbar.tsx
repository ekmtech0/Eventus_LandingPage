'use client';

import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { Calendar, Search, Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Explorar', path: '/explorar', icon: Search },
    { name: 'Eventos', path: '/events', icon: Calendar },
  ];

  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(path + '/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Calendar className="text-white w-6 h-6" />
                 <Image
                             src={''}
                             alt="Logo Eventus"
                             width={150}
                             height={40}
                             className="h-10 w-auto"
                           />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Eventus
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-semibold transition-colors hover:text-primary flex items-center gap-2 ${
                  isActive(link.path) ? 'text-primary' : 'text-slate-600'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
            <Link href="/download" className="btn-primary py-2 px-5 text-sm">
              <Download className="w-4 h-4" />
              Baixar App
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden bg-white border-b border-slate-200 transition-all ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setIsOpen(false)}
            className="block w-full btn-primary mt-4"
          >
            Baixar App
          </Link>
        </div>
      </div>
    </nav>
  );
};
