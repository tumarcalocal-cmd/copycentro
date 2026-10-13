import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { RETIRO_OPTIONS } from '../../data/mockData';

interface RetiroStepProps {
  retiro?: string;
  onChangeRetiro: (retiro: string) => void;
}

export const RetiroStep: React.FC<RetiroStepProps> = ({ retiro, onChangeRetiro }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-100/70 p-3.5 sm:p-4 rounded-2xl mb-5 border border-slate-200/70 transition-all">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-sm">📍</span>
        <span className="text-xs font-bold text-slate-900">B. Para retirar en</span>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-[#102338] border border-slate-300/80 rounded-xl text-xs font-bold flex items-center justify-between shadow-2xs transition-all cursor-pointer active:scale-[0.99]"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#102338] flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#edbf74]" />
          </div>
          <span className="truncate">{retiro || 'Toca para escoger dónde retirar'}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500 font-semibold text-[11px] shrink-0 ml-2">
          <span>{isOpen ? 'Ocultar' : 'Mostrar'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 grid grid-cols-1 gap-2 animate-in fade-in">
          {RETIRO_OPTIONS.map((item) => {
            const isSelected = retiro === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => { onChangeRetiro(item); setIsOpen(false); }}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#BD944D] bg-[#102338] text-white font-semibold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <span className="truncate pr-2">{item}</span>
                {isSelected && <Check className="w-4 h-4 text-[#edbf74] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
