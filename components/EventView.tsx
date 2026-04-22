
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import { Event } from "@/types/Eventtype";
import Image from "next/image";

type pageProps = {
  event: Event
}

export default function EventView({ event }: pageProps) {

  const capaUrl = event.imgs?.urls?.[event.imgs?.capa ?? 0];
  const userPhotoUrl = event.userPhotoUrl

  return (
    <div>
      <div>
        <h2 className="text-primary text-2xl font-bold pt-2">
          Visualização no feed
        </h2>
      </div>

      <div className="rounded-2xl mt-1 py-4 border border-gray-300 bg-white shadow">
        <div className="py-4 w-full flex flex-col rounded-xl bg-white">

          {/* Header */}
          <div className="px-4">
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">
                {userPhotoUrl ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={userPhotoUrl}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div
                    aria-label="User"
                    className="h-10 w-10 rounded-full border-2 border-primary bg-slate-200"
                  />
                )}

                <div>
                  <div className="flex gap-2 items-center">
                    <span className="font-bold text-[18px]">
                      {event.userName}
                    </span>
                    <span className="text-[8px] px-2 py-0.5 bg-gray-200 rounded-xl text-gray-500">
                      organizador
                    </span>
                  </div>

                  <p className="text-[12px] text-gray-500">
                    {event.placeCity}, {event.placeAddress}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-primary cursor-pointer">
                  seguir
                </span>
                <MoreHorizontal size={22} />
              </div>
            </div>

            {/* Descrição */}
            <p className="text-lg mt-3">
              {event.descricao}
            </p>
          </div>

          {/* Imagem */}
          {capaUrl && (
            <div className="relative w-full mt-4 h-[400px]">
              <Image
                src={capaUrl}
                alt="Capa do evento"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={false}
              />

              <div className="absolute top-3 right-3 bg-black/40 rounded-full p-3">
                <Bookmark size={20} color="white" />
              </div>
            </div>
          )}

          {/* Info Evento */}
          <div className="px-4 mt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-2xl">
                {event.name}
              </h3>

              <div className="text-right">
                <p className="font-bold text-lg">
                  {new Date(event.data).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {event.inicio}
                </p>
              </div>
            </div>

            <div className="flex items-center mt-2 gap-2">
              <span className="text-primary text-lg">
                {event.placeName}
              </span>
            </div>

            <p className="text-primary/60 text-xs">
              {event.placeCity}, {event.placeAddress}
            </p>
          </div>

          {/* Ações */}
          <div className="px-4 mt-4 flex justify-between items-center">
            <div className="flex gap-8">
              <div className="flex gap-2 items-center">
                <Heart size={22} />
                <span>{event.reactionCount}</span>
              </div>

              <div className="flex gap-2 items-center">
                <MessageCircle size={22} />
                <span>{event.commentCount}</span>
              </div>

              <div className="flex gap-2 items-center">
                <Share2 size={22} />
                <span>{event.shareCount}</span>
              </div>
            </div>

            <button className="bg-primary px-3 py-1.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition">
              Participar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}