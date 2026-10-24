import React from 'react';
import { Shield, BookMarked, Disc } from 'lucide-react';

interface PersonalizacionStepProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  selectedDesignTitle?: string;
  goldLogo: boolean;
  spineLettering: boolean;
  cdPocket: boolean;
  onNavigateToDisenos?: () => void;
  onChangeGoldLogo: (val: boolean) => void;
  onChangeSpineLettering: (val: boolean) => void;
  onChangeCdPocket: (val: boolean) => void;
}

export const PersonalizacionStep: React.FC<PersonalizacionStepProps> = ({
  sectionRef,
  goldLogo,
  spineLettering,
  cdPocket,
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
        <h2 className="text-xs font-bold text-slate-900">
          F. Grabado y Personalización
        </h2>
        <span className="text-[11px] font-semibold text-[#875d14] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full ml-1">
          Costo adicional
        </span>
      </div>

      <div className="space-y-2.5">
        {/* Checkbox 1: Escudo / Logo */}
        <label className="flex items-center justify-between p-3.5 min-h-[56px] bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BD944D] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Logo <span className="text-[#875d14]">$5.00</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Escudo de UP, UTP, UDELAS, ISAE o corporativo en dorado
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
        <label className="flex items-center justify-between p-3.5 min-h-[56px] bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BD944D] flex items-center justify-center shrink-0">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Lomo <span className="text-[#875d14]">$4.00</span>
              </span>
              <span className="text-[11px] text-slate-500 block">
                Título vertical y año grabado
              </span>
              <span className="text-[11px] font-semibold text-red-600 block">
                Importante: solo para tesis de más de 100 páginas
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
        <label className="flex items-center justify-between p-3.5 min-h-[56px] bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BD944D] flex items-center justify-center shrink-0">
              <Disc className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Grabado en CD y rotulado <span className="text-[#875d14]">$5.00</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Tu documento grabado en CD con etiqueta impresa
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
