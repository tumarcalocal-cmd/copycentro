import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Package, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import { MOCK_ORDERS, WORKSHOP_INFO } from '../data/mockData';
import { OrderTrackResult } from '../types';
import { formatOrderInquiryMessage, openWhatsApp } from '../utils/whatsapp';

interface ConsultaPedidoScreenProps {
  onNavigateToInicio: () => void;
  onNavigateToSolicitar?: () => void;
}

export const ConsultaPedidoScreen: React.FC<ConsultaPedidoScreenProps> = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<OrderTrackResult | null | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  // Direct WhatsApp inquiry form
  const [nombreCliente, setNombreCliente] = useState('');
  const [referenciaPedido, setReferenciaPedido] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setHasSearched(true);
    const cleanQuery = query.trim().toLowerCase();
    
    // Search in mock data or match
    const found = Object.values(MOCK_ORDERS).find(
      order => order.orderId.toLowerCase() === cleanQuery || 
               order.customerName.toLowerCase().includes(cleanQuery)
    );

    setSearchResult(found || null);
  };

  const handleConsultarWhatsApp = () => {
    if (!nombreCliente.trim()) {
      setErrorNombre(true);
      return;
    }

    if (isSending) return;
    setIsSending(true);

    setTimeout(() => {
      const message = formatOrderInquiryMessage(nombreCliente, referenciaPedido);
      openWhatsApp(message, WORKSHOP_INFO.whatsapp);
      setTimeout(() => setIsSending(false), 1200);
    }, 300);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-1">
      {/* Brand Header */}
      <div className="text-center mb-5">
        <div className="w-13 h-13 rounded-2xl bg-[#102338] text-[#BD944D] flex items-center justify-center mx-auto mb-2.5 shadow-md border border-[#BD944D]/30">
          <Search className="w-6 h-6" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Consulte su Pedido
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
          Consulta el estado de tu trabajo, fecha estimada de entrega o contacta directamente a nuestro taller.
        </p>
      </div>

      {/* Main Order Inquiry Card */}
      <div className="space-y-4">
        {/* Fast Order Tracking by Code / Name */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-200/90 shadow-sm">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#BD944D]" />
            <span>Rastreo Rápido de Orden</span>
          </h2>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
            Ingresa tu código de pedido (ej: <span className="font-semibold text-slate-700">PED-2024-88</span>) o tu nombre completo:
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (hasSearched) setHasSearched(false);
              }}
              placeholder="Ej. PED-2024-88 o Carlos Morales"
              className="flex-1 min-h-[44px] px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D]"
            />
            <button
              type="submit"
              className="min-h-[44px] px-4 py-2 bg-[#102338] hover:bg-[#183454] active:bg-[#071322] text-white text-xs font-bold rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer shrink-0"
            >
              Consultar
            </button>
          </form>

          {/* Search Result Display */}
          {hasSearched && (
            <div className="mt-3.5 pt-3.5 border-t border-slate-100 animate-in fade-in">
              {searchResult ? (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {searchResult.customerName}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {searchResult.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    <span className="font-semibold">Servicio:</span> {searchResult.service}
                  </p>
                  <p className="text-xs text-slate-700">
                    <span className="font-semibold">Entrega estimada:</span> {searchResult.estimatedDate}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[#BD944D] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((searchResult.stepNumber / searchResult.totalSteps) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center text-xs text-slate-600">
                  <p className="font-medium text-slate-800">No encontramos una orden inmediata con ese código.</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Puedes consultar directamente al taller vía WhatsApp con tus datos a continuación.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* WhatsApp Direct Inquiry Card */}
        <div className="bg-slate-100/90 rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-[#BD944D] flex items-center justify-center mb-2 shadow-xs">
              <MessageSquare className="w-5 h-5 fill-current text-[#BD944D]" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Consulta Directa por WhatsApp
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
              Escribe tu nombre y te daremos el estado actualizado de tu encuadernación en tiempo real.
            </p>
          </div>

          <div className="space-y-3.5 mb-4">
            {/* Nombre completo */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
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
                  <span>Por favor, escribe tu nombre completo.</span>
                </div>
              )}
            </div>

            {/* Referencia o detalle */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-800">
                  Número de factura, título o referencia
                </label>
                <span className="text-[10px] text-slate-500 font-medium">(Opcional)</span>
              </div>
              <input
                type="text"
                value={referenciaPedido}
                onChange={(e) => setReferenciaPedido(e.target.value)}
                placeholder="Ej. Tesis Universidad de Panamá o Portadiploma USMA"
                className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D]"
              />
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleConsultarWhatsApp}
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
                <MessageSquare className="w-4 h-4 fill-current text-[#BD944D]" />
                <span>Consultar mi pedido por WhatsApp</span>
              </>
            )}
          </button>
        </div>

        {/* Workshop Information & Guarantees */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#BD944D] shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900 block mb-0.5">
                Tiempos Habituales de Taller
              </span>
              <p>• Empastados de Tesis: 24 a 48 horas hábiles</p>
              <p>• Portadiplomas de Graduación: 24 a 72 horas hábiles</p>
              <p>• Trabajos con entrega urgente: previa coordinación con taller</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
