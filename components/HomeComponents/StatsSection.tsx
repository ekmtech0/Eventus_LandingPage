import Link from 'next/link';
import Image from "next/image";
import { Calendar, Search, Smartphone, Menu, X, Download, Users, Star } from 'lucide-react';





export const StatsSection: React.FC = () => {
      const stats = [
    { label: "Eventos Publicados", value: "+120", icon: Calendar },
    { label: "Participantes Ativos", value: "+3.500", icon: Users },
    { label: "Organizadores", value: "+80", icon: Star },
  ];
  return(
      <section className="bg-slate-50 border-y border-slate-200 mt-12">
        <div className="section-container p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-4xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
      }






