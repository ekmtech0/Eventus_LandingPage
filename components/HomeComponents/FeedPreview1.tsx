import Link from 'next/link';
import Image from "next/image";
import { Download, Star, Users, Calendar, ArrowRight, Heart, MessageCircle, Share2 , Smartphone} from "lucide-react";




export const FeedPreview: React.FC = () => {
  return(
 <section className="bg-white">
        <div className="section-container p-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Sinta a Energia da Comunidade</h2>
              <p className="text-slate-600">Veja o que está acontecendo agora no feed do Eventus.</p>
            </div>

            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200" />
                      <div>
                        <p className="text-sm font-bold">Usuário Eventus</p>
                        <p className="text-xs text-slate-500">há 2 horas</p>
                      </div>
                    </div>
                    <Link href="/download" className="text-slate-400 hover:text-primary">
                      <Star className="w-5 h-5" />
                    </Link>
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-slate-700 mb-4">
                      Acabei de chegar no Festival de Jazz! A vibe está incrível e o som está impecável. 🎷✨
                    </p>
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                      <Image
                        src="/placeholder.svg"
                        alt="Imagem de exemplo"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                    </div>
                    <div className="flex items-center gap-6">
                      <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-xs font-bold">24</span>
                      </button>
                      <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs font-bold">8</span>
                      </button>
                      <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/download" className="btn-secondary">
                Ver mais no aplicativo
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
      }