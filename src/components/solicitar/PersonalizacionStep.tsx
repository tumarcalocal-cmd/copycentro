import React from 'react';
import { Sparkles, Shield, BookMarked, Disc } from 'lucide-react';

interface PersonalizacionStepProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  selectedDesignTitle?: string;
  goldLogo: boolean;
  spineLettering: boolean;
  cdPocket: boolean;
  onNavigateToDisenos: () => void;
  onChangeGoldLogo: (val: boolean) => void;
  onChangeSpineLettering: (val: boolean) => void;
  onChangeCdPocket: (val: boolean) => void;
}

export const PersonalizacionStep: React.FC<PersonalizacionStepProps> = ({
  sectionRef,
  selectedDesignTitle,
  goldLogo,
  spineLettering,
  cdPocket,
  onNavigateToDisenos,
  onChangeGoldLogo,
  onChangeSpineLettering,
  onChangeCdPocket,
}) => {
  return (
    <div
      ref={sectionRef}
      className="bg-slate-100/70 p-4 rounded-2xl mb-5 border border-slate-200/70"
    >
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-sm">🛡️</span>
        <span className="text-xs font-bold text-slate-900">
          E. Grabado y Personalización
        </span>
      </div>

      {/* Selected Design Indicator Card */}
      <div className="mb-3.5 p-3 bg-white rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BD944D] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Diseño seleccionado:
            </span>
            <span className="text-xs font-bold text-slate-900 block truncate">
              {selectedDesignTitle || 'N.º 01 · Maestría'}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onNavigateToDisenos}
          className="text-xs font-bold text-[#875d14] hover:text-[#5c3e07] hover:underline px-3 py-2 min-h-[44px] flex items-center justify-center shrink-0 cursor-pointer"
        >
          Cambiar diseño
        </button>
      </div>

      <div className="space-y-2.5">
        {/* Checkbox 1: Escudo / Logo */}
        <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BD944D] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Escudo / Logo en dorado
              </span>
              <span className="text-[11px] text-slate-500">
                UP, UTP, UDELAS, ISAE o corporativo
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={goldLogo}
            onChange={(e) => onChangeGoldLogo(e.target.checked)}
            className="w-5 h-5 rounded-md text-[#785310] accent-[#785310] focus:ring-[#BD944D] cursor-pointer"
          />
        </label>

        {/* Checkbox 2: Grabado en lomo */}
        <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BD944D] flex items-center justify-center shrink-0">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Grabado en lomo
              </span>
              <span className="text-[11px] text-slate-500">
                Título vertical y año grabado
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={spineLettering}
            onChange={(e) => onChangeSpineLettering(e.target.checked)}
            className="w-5 h-5 rounded-md text-[#785310] accent-[#785310] focus:ring-[#BD944D] cursor-pointer"
          />
        </label>

        {/* Checkbox 3: Bolsillo porta CD/DVD */}
        <label className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <Disc className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Bolsillo porta CD/DVD con copia
              </span>
              <span className="text-[11px] text-slate-500">
                Fijado en contratapa interior
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={cdPocket}
            onChange={(e) => onChangeCdPocket(e.target.checked)}
            className="w-5 h-5 rounded-md text-[#785310] accent-[#785310] focus:ring-[#BD944D] cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
