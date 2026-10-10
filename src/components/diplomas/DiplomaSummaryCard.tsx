import React, { useState } from 'react';
import { FileCheck, MessageSquare, Loader2 } from 'lucide-react';
import { DiplomaConfig } from '../../types';

interface DiplomaSummaryCardProps {
  config: DiplomaConfig;
  onSendWhatsApp: () => void;
}

export const DiplomaSummaryCard: React.FC<DiplomaSummaryCardProps> = ({
  config,
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
    <div className="bg-[#0b1c2e] text-white p-4 rounded-2xl shadow-md border border-[#BD944D]/30 space-y-2 text-xs">
      <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-[#edbf74] font-bold uppercase tracking-wider text-[11px]">
        <FileCheck className="w-4 h-4" />
        <span>Resumen de tu solicitud</span>
      </div>

      <div className="flex justify-between items-center text-slate-300">
        <span>Características:</span>
        <span className="font-semibold text-white">{config.tipoProducto}</span>
      </div>
      <div className="flex justify-between items-center text-slate-300">
        <span>Nivel:</span>
        <span className="font-semibold text-white">{config.nivel}</span>
      </div>
      <div className="flex justify-between items-center text-slate-300">
        <span>Material:</span>
        <span className="font-semibold text-white">{config.material}</span>
      </div>
      <div className="flex justify-between items-center text-slate-300">
        <span>Cantidad:</span>
        <span className="font-semibold text-white">
          {config.cantidad} {config.cantidad === 1 ? 'unidad' : 'unidades'}
        </span>
      </div>
      <div className="flex justify-between items-center text-slate-300">
        <span>Color / Diseño:</span>
        <span className="font-semibold text-white">{config.diseno}</span>
      </div>
      <div className="flex justify-between items-center text-slate-300">
        <span>Personalización:</span>
        <span className="font-semibold text-white truncate max-w-[200px] text-right">
          {config.personalizacion}
        </span>
      </div>
      {config.archivo && (
        <div className="flex justify-between items-center text-slate-300">
          <span>Foto de referencia:</span>
          <span className="font-semibold text-emerald-400 truncate max-w-[200px] text-right">
            {config.archivo}
          </span>
        </div>
      )}

      {/* Action button with feedback */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isSending}
        className={`w-full mt-3 min-h-[48px] py-3.5 px-3 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
          isSending 
            ? 'bg-[#8c6722] text-white opacity-95' 
            : 'bg-[#a67c2e] hover:bg-[#b88c38] text-white'
        }`}
      >
        {isSending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#ffdeab]" />
            <span>Abriendo WhatsApp...</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Enviar solicitud por WhatsApp</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-400 text-center pt-1">
        El taller confirmará disponibilidad, detalles y precio directamente por WhatsApp.
      </p>
    </div>
  );
};
