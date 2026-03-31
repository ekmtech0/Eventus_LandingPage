import Link from 'next/link';
import Image from "next/image";
import { Download, Star, Users, Calendar, ArrowRight, Heart, MessageCircle, Share2 , Smartphone, MoreHorizontal, MapPin, Bookmark} from "lucide-react";




export const FeedPreview: React.FC = () => {
  const events = [
    {
      userPhotoUrl: "https://picsum.photos/40/40?random=1",
      userName: "João Silva",
      municipio: "São Paulo, SP",
      descricao: "Acabei de chegar no Festival de Jazz! A vibe está incrível e o som está impecável. 🎷✨",
      capaUrl: "https://picsum.photos/800/400?random=2",
      eventName: "Festival de Jazz",
      data: "2026-03-15",
      inicio: "20:00",
      nomeLocal: "Teatro Municipal",
      likes: "1.2k",
      comments: "260",
      shares: "30"
    },
    {
      userPhotoUrl: "https://picsum.photos/40/40?random=3",
      userName: "Maria Santos",
      municipio: "Rio de Janeiro, RJ",
      descricao: "Preparando tudo para o show de rock amanhã!",
      capaUrl: "https://picsum.photos/800/400?random=4",
      eventName: "Show de Rock",
      data: "2026-03-16",
      inicio: "21:00",
      nomeLocal: "Arena RJ",
      likes: "800",
      comments: "150",
      shares: "20"
    }
  ];

  return(
 <section className="bg-white">
        <div className="section-container px-0 md:px-16 py-8">
          <div className="max-w-5xl mx-auto px-0">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Sinta a Energia da Comunidade</h2>
              <p className="text-slate-600 text-lg">Veja o que está acontecendo agora no feed do Eventus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {events.map((event, index) => (
                <div key={index} className="py-3 w-full flex flex-col border border-gray-300 bg-white rounded-lg shadow-sm">
                  {/* Header */}
                  <div className="px-3 md:px-4">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-3 md:gap-4">
                        <Image
                          src={event.userPhotoUrl}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-purple-700"
                          alt="User photo"
                        />
                        <div>
                          <div className="flex flex-row gap-2 items-center">
                            <p className="font-bold text-lg md:text-xl">{event.userName}</p>
                            <p className="text-xs px-2 py-0.5 bg-gray-200 rounded-xl text-gray-500">organizador</p>
                          </div>
                          <p className="text-sm text-gray-500">{event.municipio}</p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-3 md:gap-4">
                        <button className="text-purple-700 hover:text-purple-800 transition-colors">seguir</button>
                        <button className="hover:bg-gray-100 rounded-full p-1 transition-colors">
                          <MoreHorizontal className="w-6 h-6 text-purple-700" />
                        </button>
                      </div>
                    </div>
                    {/* Descrição */}
                    <p className="text-lg mt-2">{event.descricao}</p>
                  </div>
                  {/* Imagem do evento */}
                  {event.capaUrl && (
                    <div className="w-full mt-2 relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                      <Image
                        src={event.capaUrl}
                        fill
                        className="object-cover"
                        alt="Event image"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                      />
                      <div className="absolute top-3 right-3 bg-black/40 rounded-full p-3">
                        <Bookmark className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  {/* Info do evento */}
                  <div className="px-2 md:px-4 mt-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <p className="font-bold text-xl md:text-2xl">{event.eventName}</p>
                      <div className="text-left md:text-right">
                        <p className="font-bold text-lg">{event.data}</p>
                        <p className="text-sm text-gray-600">{event.inicio}</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                      <MapPin className="w-6 h-6 text-purple-700" />
                      <div className="ml-2">
                        <p className="text-purple-700 text-lg">{event.nomeLocal}</p>
                        <p className="text-purple-400 text-xs">{event.municipio}</p>
                      </div>
                    </div>
                  </div>
                  {/* Ações */}
                  <div className="px-4 mt-4 flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-6 md:gap-8">
                      <div className="flex flex-row gap-2 items-center">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm">{event.likes}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <MessageCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">{event.comments}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Share2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{event.shares}</span>
                      </div>
                    </div>
                    <button className="bg-purple-700 hover:bg-purple-800 px-3 py-1.5 rounded-xl transition-colors">
                      <span className="text-white text-xs font-bold">Participar</span>
                    </button>
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