import React from 'react';
import { Camera, Check } from 'lucide-react';
import { DesignShowcase } from '../../types';

interface DesignCardProps {
  design: DesignShowcase;
  isSelected: boolean;
  onSelect: (design: DesignShowcase) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({
  design,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-md border transition-all hover:shadow-lg ${
        isSelected ? 'border-[#BD944D] ring-2 ring-[#BD944D]/30' : 'border-slate-200/80'
      }`}
    >
      {/* Image with Tag & Camera Indicator */}
      <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Top Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
            {design.number} · {design.category}
          </span>
        </div>

        {/* Selection Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 z-10 animate-in fade-in">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Seleccionado</span>
          </div>
        )}

        {/* Photo watermark indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/90 pointer-events-none drop-shadow-md">
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center mb-1">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold">Foto del trabajo</span>
          <span className="text-[10px] text-white/80">Registro fotográfico de producción</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug mb-2">
          {design.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {design.description}
        </p>

        {/* Action Button: Elegir este diseño */}
        <button
          type="button"
          onClick={() => onSelect(design)}
          className={`w-full min-h-[46px] py-3 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.985] cursor-pointer ${
            isSelected
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-[#102338] hover:bg-[#19324e] text-white'
          }`}
          aria-label={`Elegir diseño ${design.title}`}
        >
          <Check className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#BD944D]'}`} />
          <span>{isSelected ? 'Diseño seleccionado (Aplicado)' : 'Elegir este diseño'}</span>
        </button>
      </div>
    </div>
  );
};
