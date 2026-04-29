'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { getDashboardEventDetails, updateDashboardEventStatus, type DashboardEventDetails } from '../dashboardEventsApi';
import { formatDate } from '../format';
import { EventStatus, statusBadgeClasses, statusLabel } from '../eventStatus';
import { EventImageGallery } from './EventImageGallery';

export function EventDetailsModal({
  eventId,
  onClose,
  onStatusUpdated,
}: {
  eventId: string | null;
  onClose: () => void;
  onStatusUpdated: (id: string, status: EventStatus) => void;
}) {
  const [details, setDetails] = useState<DashboardEventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load(id: string) {
      try {
        setIsLoading(true);
        setError(null);
        setDetails(null);
        setGalleryIndex(0);

        const payload = await getDashboardEventDetails(id);
        if (!isMounted) return;

        const coverIndex = payload.imgs?.capa ?? 0;
        setDetails(payload);
        setGalleryIndex(Math.max(0, coverIndex));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao buscar detalhes do evento';
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (eventId) void load(eventId);
    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const isOpen = eventId !== null;

  const images = details?.imgs?.urls ?? [];
  const coverIndex = details?.imgs?.capa ?? 0;

  const canDecide = details?.status === EventStatus.Pending && !isLoading && !isStatusUpdating;

  const headerSubtitle = useMemo(() => {
    if (details) {
      return `${formatDate(details.data)} • ${details.inicio}${details.fim ? ` - ${details.fim}` : ''}`;
    }
    if (isLoading) return 'A carregar...';
    if (error) return 'Erro ao carregar';
    return '';
  }, [details, error, isLoading]);

  async function handleUpdateStatus(status: EventStatus) {
    if (!details) return;
    try {
      setIsStatusUpdating(true);
      await updateDashboardEventStatus(details.eventId, status);
      setDetails((prev) => (prev ? { ...prev, status } : prev));
      onStatusUpdated(details.eventId, status);
    } finally {
      setIsStatusUpdating(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-4xl rounded-xl bg-white border border-border shadow-lg overflow-hidden"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-foreground">{details?.name ?? 'Event details'}</p>
                <p className="text-xs text-muted-foreground">{headerSubtitle}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted/60 transition-colors" onClick={onClose} aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {error ? (
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              ) : null}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <EventImageGallery
                    images={images}
                    coverIndex={coverIndex}
                    activeIndex={galleryIndex}
                    onChange={setGalleryIndex}
                    isLoading={isLoading}
                  />

                  <div className="rounded-xl border border-border p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Description</p>
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                      {isLoading ? 'A carregar...' : (details?.descricao ?? '-')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Organizer</p>
                      <p className="text-sm font-semibold">{details?.userName ?? '-'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Organizer ID</p>
                      <p className="text-sm font-semibold">{details?.userId ?? '-'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Location</p>
                      <p className="text-sm font-semibold">{details?.placeName ?? '-'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Address</p>
                      <p className="text-sm font-semibold">{details ? `${details.placeAddress} • ${details.placeCity}` : '-'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Categories</p>
                      <p className="text-sm font-semibold">{details?.categories?.length ? details.categories.join(', ') : '-'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Status</p>
                      <span
                        className={`inline-flex mt-1 px-2 py-1 rounded-full text-[11px] font-bold ${statusBadgeClasses(
                          details?.status ?? -1,
                        )}`}
                      >
                        {details ? statusLabel(details.status) : '-'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Event ID</p>
                      <p className="text-sm font-semibold">{details?.eventId ?? '-'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Place ID</p>
                      <p className="text-sm font-semibold">{details?.placeId ?? '-'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Reactions</p>
                      <p className="text-sm font-semibold">{details?.reactionCount ?? 0}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Interested</p>
                      <p className="text-sm font-semibold">{details?.interestedCount ?? 0}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Comments</p>
                      <p className="text-sm font-semibold">{details?.commentCount ?? 0}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Tipo</p>
                      <p className="text-sm font-semibold">{details?.tipo ?? '-'}</p>
                    </div>
                  </div>

                  {details?.userPhotoUrl ? (
                    <div className="rounded-xl border border-border p-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Organizer photo</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={details.userPhotoUrl}
                        alt="Organizer"
                        className="mt-2 h-16 w-16 rounded-full object-cover border border-border"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg text-xs font-bold text-muted-foreground hover:bg-muted/60 transition-colors"
                onClick={onClose}
              >
                Fechar
              </button>
              <button
                type="button"
                disabled={!canDecide}
                onClick={() => handleUpdateStatus(EventStatus.Published)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-foreground text-background disabled:opacity-50 disabled:cursor-not-allowed"
                title={details?.status !== EventStatus.Pending ? 'Apenas eventos Pending podem ser publicados.' : 'Publicar'}
              >
                Publicar
              </button>
              <button
                type="button"
                disabled={!canDecide}
                onClick={() => handleUpdateStatus(EventStatus.Rejected)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                title={details?.status !== EventStatus.Pending ? 'Apenas eventos Pending podem ser rejeitados.' : 'Rejeitar'}
              >
                Rejeitar
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

