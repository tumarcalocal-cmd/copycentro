import React, { useState } from 'react';
import { User, X, CheckCircle2, BookMarked, Phone, ArrowLeft } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  onOpenContact: () => void;
  activeTab?: TabType;
  onNavigateToInicio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenContact, 
  activeTab = 'enlaces', 
  onNavigateToInicio 
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <header className="w-full flex items-center justify-between px-4 sm:px-5 pt-3 pb-1 select-none">
        {/* Back button on non-home screens */}
        {activeTab !== 'enlaces' && onNavigateToInicio ? (
          <button
            type="button"
            onClick={onNavigateToInicio}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-bold text-white bg-[#102338] hover:bg-[#183454] active:bg-[#071322] rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer"
            aria-label="Volver a la pantalla de Inicio"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Inicio</span>
          </button>
        ) : (
          <div className="w-10" />
        )}

        {/* Profile / info button */}
        <button
          type="button"
          onClick={() => setShowProfileModal(true)}
          className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-[#000c1d] hover:bg-[#102338] active:bg-[#071322] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
          title="Perfil y Normativas"
          aria-label="Perfil y opciones del taller"
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* Profile & Info Sheet Modal */}
      {showProfileModal && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowProfileModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#000c1d] text-[#BD944D] flex items-center justify-center font-bold text-sm border-2 border-[#BD944D]">
                  PDP
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Portadiplomas Panamá</h3>
                  <p className="text-[11px] text-slate-500">República de Panamá</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex items-center justify-between text-slate-800 font-semibold">
                  <span>Normativa Universitaria</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Actualizada 2026</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Cumplimos con las regulaciones de empaste de la Universidad de Panamá (UP), UTP, UDELAS, ISAE y USMA (letras doradas de 14pt, márgenes de 3.5cm para encuadernación y lomos reglamentarios).
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#BD944D] shrink-0" />
                  <span>Entrega express en 24 a 48 horas hábiles.</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <BookMarked className="w-4 h-4 text-[#BD944D] shrink-0" />
                  <span>Revisión gratuita de foliación antes de estampar.</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Phone className="w-4 h-4 text-[#BD944D] shrink-0" />
                  <span>Atención directa y pedidos por WhatsApp.</span>
                </div>
              </div>
            </div>

            {/* Bottom thumb-friendly action buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowProfileModal(false);
                  onOpenContact();
                }}
                className="w-full min-h-[46px] py-3 px-4 bg-[#102338] text-white rounded-xl text-xs font-semibold hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Phone className="w-4 h-4 text-[#BD944D]" />
                <span>Ver Datos de Contacto</span>
              </button>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="w-full min-h-[44px] py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
