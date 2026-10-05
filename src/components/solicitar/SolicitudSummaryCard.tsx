import React, { useState } from 'react';
import { FileCheck, MessageCircle, Shield, Loader2 } from 'lucide-react';
import { EmpastadoConfig } from '../../types';

interface SolicitudSummaryCardProps {
  config: EmpastadoConfig;
  colorName: string;
  personalizacionesList: string;
  onSendWhatsApp: () => void;
}

export const SolicitudSummaryCard: React.FC<SolicitudSummaryCardProps> = ({
  config,
  colorName,
  personalizacionesList,
  onSendWhatsApp,
}) => {
  const [isSending, setIsSending] = useState(false);

  const handleClick = () => {
    if (isSending) return;
    setIsSending(true);
    setTimeout(() => {
      onSendWhatsApp();
      setTimeout(() => setIsSending(false), 1200);
    }, 350);
  };

  return (
    <div className="bg-[#0b1c2e] text-white rounded-2xl p-5 shadow-xl border border-[#BD944D]/30 relative overflow-hidden">
      <div className="flex items-center pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md bg-[#162e49] text-[#BD944D]">
            <FileCheck className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Resumen de tu solicitud
          </span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center text-slate-300">
          <span>Modalidad:</span>
          <span className="font-semibold text-white">
            {config.modalidad === 'solo_empastado' ? 'Solo empastado' : 'Impresión + Empastado'}
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span>Color de cubierta:</span>
          <span className="font-semibold text-white">{colorName}</span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span>Cantidad:</span>
          <span className="font-semibold text-white">
            {config.copies} {config.copies === 1 ? 'tomo' : 'tomos'}
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span>Papel:</span>
          <span className="font-semibold text-white">
            {config.paperType === 'bond_normal' ? 'Bond Normal' : 'Hilo / Algodón'}
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span>Páginas:</span>
          <span className="font-semibold text-white">{config.pages} págs</span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span>Personalizaciones:</span>
          <span className="font-semibold text-white truncate max-w-[200px] text-right">
            {personalizacionesList}
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span>Diseño seleccionado:</span>
          <span className="font-semibold text-[#edbf74] truncate max-w-[200px] text-right">
            {config.selectedDesignTitle || 'N.º 01 · Maestría'}
          </span>
        </div>

        <div className="flex justify-between items-center text-slate-300">
          <span>Archivo adjunto:</span>
          <span className="font-semibold text-[#edbf74] truncate max-w-[190px]">
            {config.uploadedFileName}
          </span>
        </div>

        {config.observaciones?.trim() && (
          <div className="pt-2 border-t border-white/10 text-slate-300">
            <span className="text-[11px] block text-slate-400">Observaciones:</span>
            <span className="text-white text-[11px] line-clamp-2 italic">
              “{config.observaciones.trim()}”
            </span>
          </div>
        )}
      </div>

      {/* Big WhatsApp CTA Button with instant tactile feedback */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isSending}
        className={`w-full mt-4 min-h-[48px] py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer ${
          isSending 
            ? 'bg-[#8c6722] text-white opacity-95' 
            : 'bg-[#a67c2e] hover:bg-[#b88c38] text-white'
        }`}
      >
        {isSending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-[#ffdeab]" />
            <span>Abriendo WhatsApp...</span>
          </>
        ) : (
          <>
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Enviar solicitud por WhatsApp</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-slate-400 text-center mt-2.5 flex items-center justify-center gap-1">
        <Shield className="w-3 h-3 text-[#BD944D]" />
        <span>El taller confirmará disponibilidad, detalles y precio directamente por WhatsApp.</span>
      </p>
    </div>
  );
};
