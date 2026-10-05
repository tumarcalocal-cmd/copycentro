import React from 'react';
import { Check } from 'lucide-react';
import { COVER_COLORS } from '../../data/mockData';
import { CoverColor } from '../../types';

interface ColorStepProps {
  selectedColorId: string;
  onChangeColor: (colorId: string) => void;
}

export const ColorStep: React.FC<ColorStepProps> = ({
  selectedColorId,
  onChangeColor,
}) => {
  const selectedColor: CoverColor =
    COVER_COLORS.find(c => c.id === selectedColorId) || COVER_COLORS[4];

  return (
    <div className="bg-slate-100/70 p-3.5 sm:p-4 rounded-2xl mb-5 border border-slate-200/70">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🎨</span>
          <span className="text-xs font-bold text-slate-900">
            B. Color de Cubierta
          </span>
        </div>
        <span className="bg-[#ffdeab] text-[#5f4100] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          {selectedColor.name}
        </span>
      </div>

      {/* Compact, refined color swatches */}
      <div className="flex items-center justify-between w-full px-1 py-1">
        {COVER_COLORS.map(color => {
          const isSelected = color.id === selectedColorId;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onChangeColor(color.id)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-1 rounded-full cursor-pointer transition-transform active:scale-90 focus:outline-none"
              title={color.name}
              aria-label={color.name}
            >
              <div
                style={{ backgroundColor: color.hex }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-xs ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-[#BD944D] scale-110'
                    : 'opacity-90 hover:opacity-100'
                }`}
              >
                {isSelected && (
                  <Check className="w-4 h-4 text-white drop-shadow-sm stroke-[3]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-500 mt-2 text-right">
        Alineado con especificaciones UP, UTP, UDELAS, ISAE
      </p>
    </div>
  );
};
