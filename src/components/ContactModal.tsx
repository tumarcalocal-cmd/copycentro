import React from 'react';
import { X, Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/mockData';
import { ReturnButton } from './common/ReturnButton';
import { openWhatsApp } from '../utils/whatsapp';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    openWhatsApp('Hola Portadiplomas Panamá, deseo consultar sobre sus servicios de empastado y portadiplomas.');
  };

  const handleCall = () => {
    window.open(`tel:${WORKSHOP_INFO.phone}`, '_self');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Volver al inicio button */}
        <ReturnButton onClick={onClose} />

        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#102338] text-[#BD944D] flex items-center justify-center font-bold text-sm border border-[#BD944D]/30">
              PDP
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg leading-tight">Porta Diplomas Panamá</h3>
              <p className="text-xs text-slate-500">Atención Directa</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div className="bg-[#102338] text-white p-4 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-semibold tracking-wider text-[#BD944D] uppercase">Atención Inmediata</span>
              <p className="text-sm font-medium mt-1">¿Tienes preguntas sobre reglamentos de empastados de tu universidad?</p>
              <p className="text-xs text-slate-300 mt-1">Te asesoramos con los colores oficiales de UP, UTP, UDELAS, ISAE y especificaciones de margen y lomo.</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#BD944D]/10 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Direct contact buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={handleWhatsApp}
              className="min-h-[46px] flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-semibold text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              WhatsApp Oficial
            </button>
            <button 
              type="button"
              onClick={handleCall}
              className="min-h-[46px] flex items-center justify-center gap-2 p-3 bg-[#102338] hover:bg-[#183454] active:bg-[#071322] text-white rounded-xl font-semibold text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              Llamar al Negocio
            </button>
          </div>

          {/* Details - NO PHYSICAL ADDRESS, NO MAPS, NO WAZE */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Clock className="w-4 h-4 text-[#BD944D] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-900 block mb-0.5">Horario de Atención</span>
                <p>{WORKSHOP_INFO.hoursWeekday}</p>
                <p>{WORKSHOP_INFO.hoursSaturday}</p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">● Equipo activo y recibiendo archivos</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-100">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700">
                <span className="font-semibold text-slate-900 block mb-0.5">Estándar de Calidad</span>
                Piel sintética de 1.2mm, prensado hidráulico y letras doradas al calor indelebles resistentes a la humedad.
              </div>
            </div>
          </div>
        </div>

        <button 
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors mt-2 cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
