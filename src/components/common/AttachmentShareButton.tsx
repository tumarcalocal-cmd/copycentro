import React from 'react';
import { Paperclip } from 'lucide-react';
import { canShareFileToApps, shareFileToWhatsApp } from '../../utils/whatsapp';

interface AttachmentShareButtonProps {
  file: File | null;
  fileName?: string | null;
}

/** Botón extra que solo aparece cuando el cliente adjuntó un archivo. */
export const AttachmentShareButton: React.FC<AttachmentShareButtonProps> = ({ file, fileName }) => {
  if (!fileName) return null;

  if (file && canShareFileToApps(file)) {
    return (
      <div className="mt-3">
        <button
          type="button"
          onClick={() => shareFileToWhatsApp(file)}
          className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-md transition-all active:scale-[0.99] cursor-pointer"
        >
          <Paperclip className="w-5 h-5" />
          <span>Enviar archivo por WhatsApp</span>
        </button>
        <p className="text-[11px] text-slate-400 text-center mt-2">
          Después de enviar tu solicitud, toca aquí para mandar <span className="text-[#edbf74] font-semibold">{fileName}</span> al mismo chat.
        </p>
      </div>
    );
  }

  return (
    <p className="text-[11px] text-[#edbf74] text-center mt-3 flex items-center justify-center gap-1.5">
      <Paperclip className="w-3.5 h-3.5 shrink-0" />
      <span>Al abrirse WhatsApp, adjunta tu archivo con el clip 📎 antes de enviar.</span>
    </p>
  );
};
