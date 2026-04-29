'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function EventImageGallery({
  images,
  coverIndex,
  activeIndex,
  onChange,
  isLoading,
}: {
  images: string[];
  coverIndex: number;
  activeIndex: number;
  onChange: (idx: number) => void;
  isLoading: boolean;
}) {
  const hasImages = images.length > 0;
  const safeIndex = hasImages ? ((activeIndex % images.length) + images.length) % images.length : 0;
  const activeUrl = hasImages ? images[safeIndex] : null;

  return (
    <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
      <div className="relative aspect-video bg-black/5">
        {activeUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={activeUrl} alt="Event image" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            {isLoading ? 'A carregar imagens...' : 'Sem imagens'}
          </div>
        )}

        {hasImages ? (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
              onClick={() => onChange((safeIndex - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
              onClick={() => onChange((safeIndex + 1) % images.length)}
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : null}
      </div>

      {hasImages ? (
        <div className="p-2 flex gap-2 overflow-x-auto">
          {images.map((url, idx) => (
            <button
              key={url}
              type="button"
              className={`relative h-14 w-20 rounded-lg overflow-hidden border transition-colors ${
                idx === safeIndex ? 'border-foreground' : 'border-border'
              }`}
              onClick={() => onChange(idx)}
              aria-label={`Image ${idx + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              {coverIndex === idx ? (
                <span className="absolute left-1 top-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white">
                  Capa
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

