import React from 'react';
import { Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/mockData';
import { openWhatsApp } from '../utils/whatsapp';

interface ContactoScreenProps {
  onNavigateToInicio: () => void;
}

export const ContactoScreen: React.FC<ContactoScreenProps> = () => {
  const handleWhatsApp = () => {
    openWhatsApp('Hola Porta Diplomas Panamá, deseo consultar sobre sus servicios de empastado y portadiplomas.');
  };

  const handleCall = () => {
    window.open(`tel:${WORKSHOP_INFO.phone}`, '_self');
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-1">
      {/* Brand Header */}
      <div className="text-center mb-5">
        <div className="w-14 h-14 rounded-full bg-[#102338] text-[#BD944D] flex items-center justify-center font-bold text-lg border-2 border-[#BD944D]/40 mx-auto mb-2 shadow-md">
          PDP
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Porta Diplomas Panamá
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Atención Directa y Asesoría Técnica de Taller
        </p>
      </div>

      <div className="space-y-4">
        {/* Banner */}
        <div className="bg-[#102338] text-white p-4.5 rounded-2xl relative overflow-hidden shadow-md border border-[#BD944D]/25">
          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-wider text-[#BD944D] uppercase">
              Atención Inmediata
            </span>
            <p className="text-sm font-bold mt-1 text-white">
              ¿Tienes preguntas sobre reglamentos de empastados de tu universidad?
            </p>
            <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
              Te asesoramos con los colores oficiales de UP, UTP, UDELAS, ISAE y especificaciones de márgenes, portada y lomo.
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#BD944D]/15 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Direct Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button"
            onClick={handleWhatsApp}
            className="min-h-[48px] flex items-center justify-center gap-2 p-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp Oficial</span>
          </button>
          <button 
            type="button"
            onClick={handleCall}
            className="min-h-[48px] flex items-center justify-center gap-2 p-3.5 bg-[#102338] hover:bg-[#183454] active:bg-[#071322] text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Llamar al Negocio</span>
          </button>
        </div>

        {/* Details Cards */}
        <div className="space-y-3 pt-1">
          <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <Clock className="w-5 h-5 text-[#BD944D] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900 block mb-1">
                Horario de Atención
              </span>
              <p>{WORKSHOP_INFO.hoursWeekday}</p>
              <p className="mt-0.5">{WORKSHOP_INFO.hoursSaturday}</p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1.5">
                ● Taller activo recibiendo solicitudes
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">
                Estándar de Calidad Garantizado
              </span>
              Piel sintética de alta densidad, prensado hidráulico y letras doradas al calor indelebles con resistencia permanente a la humedad.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
