import React, { useState } from 'react';
import { MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { formatOrderInquiryMessage, openWhatsApp } from '../../utils/whatsapp';

interface OrderInquirySectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const OrderInquirySection: React.FC<OrderInquirySectionProps> = ({ sectionRef }) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [referenciaPedido, setReferenciaPedido] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleConsultarPedidoWhatsApp = () => {
    if (!nombreCliente.trim()) {
      setErrorNombre(true);
      return;
    }

    if (isSending) return;
    setIsSending(true);

    setTimeout(() => {
      const message = formatOrderInquiryMessage(nombreCliente, referenciaPedido);
      openWhatsApp(message, '50764960006');
      setTimeout(() => setIsSending(false), 1200);
    }, 350);
  };

  return (
    <div ref={sectionRef} className="pt-2">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-1 h-3.5 bg-[#a87823] rounded-full inline-block" />
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Consulte su pedido
        </h2>
        <span className="w-1 h-3.5 bg-[#a87823] rounded-full inline-block" />
      </div>

      {/* Card */}
      <div className="bg-slate-100/90 rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#BD944D] flex items-center justify-center mb-2.5 shadow-xs">
            <MessageSquare className="w-6 h-6 fill-current text-[#BD944D]" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Consulte su pedido
          </h3>
          <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
            ¿Quieres saber cómo va tu pedido? Déjanos tus datos y consulta directamente por WhatsApp.
          </p>
        </div>

        <div className="space-y-4 mb-5">
          {/* Nombre completo */}
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="text"
              autoComplete="name"
              autoCapitalize="words"
              value={nombreCliente}
              onChange={(e) => {
                setNombreCliente(e.target.value);
                if (errorNombre && e.target.value.trim()) setErrorNombre(false);
              }}
              placeholder="Ej. Carlos Morales"
              className={`w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D] transition-colors ${
                errorNombre ? 'border-red-400 ring-2 ring-red-400/20 bg-red-50/20' : 'border-slate-300'
              }`}
            />
            {errorNombre && (
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Por favor, escribe tu nombre completo para que podamos verificar tu pedido en WhatsApp.</span>
              </div>
            )}
          </div>

          {/* Número de pedido, factura o referencia */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-800">
                Número de pedido, factura o referencia
              </label>
              <span className="text-[10px] text-slate-500 font-medium">(Opcional)</span>
            </div>
            <input
              type="text"
              inputMode="text"
              value={referenciaPedido}
              onChange={(e) => setReferenciaPedido(e.target.value)}
              placeholder="Ej.: número de factura o referencia, si la tienes"
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D]"
            />
          </div>
        </div>

        {/* Action button: Consultar mi pedido por WhatsApp */}
        <button
          type="button"
          onClick={handleConsultarPedidoWhatsApp}
          disabled={isSending}
          className={`w-full min-h-[48px] py-3.5 px-4 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-[0.985] cursor-pointer ${
            isSending 
              ? 'bg-[#183454] text-white opacity-95' 
              : 'bg-[#102338] hover:bg-[#183454] text-white'
          }`}
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#BD944D]" />
              <span>Abriendo WhatsApp...</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4 text-[#BD944D] fill-current" />
              <span>Consultar mi pedido por WhatsApp</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
