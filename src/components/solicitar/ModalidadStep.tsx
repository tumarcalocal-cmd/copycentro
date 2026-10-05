import React from 'react';
import { BookOpen, Printer } from 'lucide-react';
import { ModalidadType } from '../../types';

interface ModalidadStepProps {
  modalidad: ModalidadType;
  onChangeModalidad: (modalidad: ModalidadType) => void;
}

export const ModalidadStep: React.FC<ModalidadStepProps> = ({
  modalidad,
  onChangeModalidad,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          A. Modalidad del Servicio
        </h2>
        <span className="text-[11px] font-semibold text-[#BD944D]">
          Paso 1 de 6
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Solo empastado */}
        <button
          type="button"
          onClick={() => onChangeModalidad('solo_empastado')}
          className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
            modalidad === 'solo_empastado'
              ? 'bg-[#102338] text-white border-[#102338] shadow-md ring-2 ring-[#BD944D]/40'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${
              modalidad === 'solo_empastado'
                ? 'bg-[#1b3452] text-[#BD944D]'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-[13px] font-bold leading-tight">
            Solo empastado
          </div>
          <p
            className={`text-[11px] mt-1 leading-snug ${
              modalidad === 'solo_empastado' ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Traes tus hojas impresas
          </p>
        </button>

        {/* Impresión + Empastado */}
        <button
          type="button"
          onClick={() => onChangeModalidad('impresion_empastado')}
          className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer relative ${
            modalidad === 'impresion_empastado'
              ? 'bg-[#102338] text-white border-[#102338] shadow-md ring-2 ring-[#BD944D]/40'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-[#785310] text-[#ffdeab] text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              Recomendado
            </span>
          </div>

          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${
              modalidad === 'impresion_empastado'
                ? 'bg-[#1b3452] text-[#BD944D]'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Printer className="w-4 h-4" />
          </div>
          <div className="text-[13px] font-bold leading-tight">
            Impresión + Empastado
          </div>
          <p
            className={`text-[11px] mt-1 leading-snug ${
              modalidad === 'impresion_empastado'
                ? 'text-slate-300'
                : 'text-slate-500'
            }`}
          >
            Servicio editorial llave en mano
          </p>
        </button>
      </div>
    </div>
  );
};
