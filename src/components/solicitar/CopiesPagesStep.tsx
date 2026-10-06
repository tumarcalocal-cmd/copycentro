import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { ModalidadType, PaperType } from '../../types';

interface CopiesPagesStepProps {
  copies: number;
  paperType: PaperType;
  pages: number;
  modalidad: ModalidadType;
  onChangeCopies: (copies: number) => void;
  onChangePaperType: (paperType: PaperType) => void;
  onChangePages: (pages: number) => void;
}

export const CopiesPagesStep: React.FC<CopiesPagesStepProps> = ({
  copies,
  paperType,
  pages,
  modalidad,
  onChangeCopies,
  onChangePaperType,
  onChangePages,
}) => {
  return (
    <>
      {/* STEP C: Cantidad de tomos */}
      <div className="bg-slate-100/70 p-4 rounded-2xl mb-5 border border-slate-200/70 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">📑</span>
            <span className="text-xs font-bold text-slate-900">
              C. Cantidad de tomos
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Mínimo 1 ejemplar oficial
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => onChangeCopies(Math.max(1, copies - 1))}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
            disabled={copies <= 1}
            aria-label="Disminuir tomos"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span className="w-8 text-center text-base font-extrabold text-slate-900">
            {copies}
          </span>
          <button
            type="button"
            onClick={() => onChangeCopies(copies + 1)}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#102338] hover:bg-slate-800 active:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Aumentar tomos"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* STEP D: Parámetros de Impresión */}
      <div className="bg-slate-100/70 p-4 rounded-2xl mb-5 border border-slate-200/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">📄</span>
            <span className="text-xs font-bold text-slate-900">
              D. Parámetros de Impresión
            </span>
          </div>
          <span className="bg-slate-200/80 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            {modalidad === 'solo_empastado' ? 'Opcional si es Solo Empastado' : 'Configuración editorial'}
          </span>
        </div>

        <p className="text-[11px] text-slate-600 font-medium mb-2">
          Soporte y gramaje:
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={() => onChangePaperType('bond_normal')}
            className={`min-h-[48px] py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer flex items-center justify-center ${
              paperType === 'bond_normal'
                ? 'bg-[#102338] text-white shadow-md ring-2 ring-[#BD944D]/50'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Normal
          </button>

          <button
            type="button"
            onClick={() => onChangePaperType('hilo_algodon')}
            className={`min-h-[48px] py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer flex items-center justify-center leading-snug ${
              paperType === 'hilo_algodon'
                ? 'bg-[#102338] text-white shadow-md ring-2 ring-[#BD944D]/50'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Imprimir en papel algodon de tesis
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-200/70">
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Páginas por ejemplar
            </span>
            <span className="text-[11px] text-slate-500">
              Total de folios a encuadernar
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="1"
              max="999"
              value={pages}
              onChange={(e) => onChangePages(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 min-h-[44px] text-center font-bold text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BD944D]"
            />
            <span className="text-xs font-semibold text-slate-500">págs</span>
          </div>
        </div>
      </div>
    </>
  );
};
