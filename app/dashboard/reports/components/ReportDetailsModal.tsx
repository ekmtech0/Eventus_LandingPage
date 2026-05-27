'use client';

import React, { useState } from 'react';
import { X, User, ShieldAlert, Calendar, Image as ImageIcon, Loader2, Flag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReportedEvent, AdminReportAction } from '@/types/DashBoardTypes';
import { formatDate } from '../../events/format';

export function ReportDetailsModal({
  event,
  onClose,
  onIgnoreAll,
  onSuspendEvent,
}: {
  event: ReportedEvent | null;
  onClose: () => void;
  onIgnoreAll: (eventId: string) => Promise<void>;
  onSuspendEvent: (eventId: string) => Promise<void>;
}) {
  const [isActionLoading, setIsActionLoading] = useState(false);

  const isOpen = event !== null;
  const reportCount = event?.reports.length ?? 0;

  const handleIgnoreAll = async () => {
    if (!event) return;
    setIsActionLoading(true);
    try {
      await onIgnoreAll(event.eventId);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleSuspendEvent = async () => {
    if (!event) return;
    const confirmed = window.confirm('Deseja suspender este evento e encerrar todas as denúncias associadas?');
    if (!confirmed) return;

    setIsActionLoading(true);
    try {
      await onSuspendEvent(event.eventId);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-5xl rounded-[24px] bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.97, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- HEADER --- */}
            <div className="flex-shrink-0 px-8 py-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  <ShieldAlert className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Análise de Denúncias</h2>
                  <p className="text-sm font-medium text-slate-500">
                    {reportCount} {reportCount === 1 ? 'denúncia aguarda' : 'denúncias aguardam'} revisão
                  </p>
                </div>
              </div>
              <button
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* --- BODY (GRID COM SCROLL INDEPENDENTE) --- */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2">
              
              {/* LADO ESQUERDO: EVENTO (Scroll Independente se precisar) */}
              <div className="p-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Card Minimalista do Evento */}
                  <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
                    {event?.eventImageUrl ? (
                      <img src={event.eventImageUrl} alt={event.eventName} className="w-full h-52 object-cover" />
                    ) : (
                      <div className="w-full h-52 bg-slate-50 flex flex-col items-center justify-center border-b border-slate-100">
                        <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                        <span className="text-xs font-medium text-slate-400">Sem imagem de capa</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{event?.eventName}</h3>
                      <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>ID do Evento: <span className="font-mono text-slate-400">{event?.eventId.split('-')[0]}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Informação do Organizador Limpa */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Organizador</p>
                      <p className="text-sm font-bold text-slate-900">{event?.organizerName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LADO DIREITO: FEED DE DENÚNCIAS (Scroll Integrado e Fundo Subtil) */}
              <div className="p-8 bg-slate-50/50 border-l border-slate-100 overflow-y-auto">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-5 flex items-center gap-2">
                  <Flag className="w-4 h-4" /> Histórico de Denúncias
                </h4>

                <div className="space-y-4">
                  {event?.reports.map((report) => (
                    <div key={report.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                            {report.reporterAvatarUrl ? (
                              <img src={report.reporterAvatarUrl} alt={report.reporterName} className="h-full w-full rounded-full object-cover" />
                            ) : (
                              <User className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{report.reporterName}</p>
                            <p className="text-[11px] font-medium text-slate-400">{formatDate(report.reportedAt)}</p>
                          </div>
                        </div>
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                          {report.reason}
                        </span>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4 text-sm leading-6 text-slate-700 border border-slate-100">
                        {report.details ? report.details : <span className="text-slate-400 italic">Sem detalhes adicionais fornecidos.</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- FOOTER DE AÇÕES --- */}
            <div className="flex-shrink-0 px-8 py-5 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto h-11 px-6 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors disabled:opacity-50"
                disabled={isActionLoading}
              >
                Cancelar
              </button>
              
              <button
                type="button"
                onClick={handleIgnoreAll}
                disabled={isActionLoading}
                className="w-full sm:w-auto h-11 px-6 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {isActionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Ignorar Denúncias
              </button>
              
              <button
                type="button"
                onClick={handleSuspendEvent}
                disabled={isActionLoading}
                className="w-full sm:w-auto h-11 px-6 rounded-xl text-sm font-bold bg-red-600 border-red-600 text-white hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {isActionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Suspender Evento
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
} 