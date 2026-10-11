import React, { useState } from 'react';
import { Check, Palette, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { COVER_COLORS } from '../../data/mockData';

interface ColorStepProps {
  selectedColorId: string;
  onChangeColor: (colorId: string) => void;
}

export const FULL_COVER_PALETTE = [
  // Signature / Vino institucional first
  { id: 'wine', name: 'Vino institucional', hex: '#541525', group: 'Firmas' },
  { id: 'navy', name: 'Azul Marino Clásico', hex: '#0B2341', group: 'Firmas' },
  { id: 'red', name: 'Rojo Carmesí', hex: '#DC2626', group: 'Firmas' },
  { id: 'gold', name: 'Dorado Ocre', hex: '#D97706', group: 'Firmas' },
  { id: 'slate', name: 'Gris Grafito Plomo', hex: '#475569', group: 'Firmas' },
  { id: 'green', name: 'Verde Bosque Notarial', hex: '#14532D', group: 'Firmas' },
  { id: 'cyan', name: 'Azul Royal Eléctrico', hex: '#0284C7', group: 'Firmas' },
  
  // Vinos y Borgoñas
  { id: 'burgundy', name: 'Borgoña Oscuro', hex: '#3B0914', group: 'Vinos y Rojos' },
  { id: 'ruby', name: 'Rojo Rubí', hex: '#991B1B', group: 'Vinos y Rojos' },
  { id: 'rose', name: 'Rosa Antiguo', hex: '#9F1239', group: 'Vinos y Rojos' },
  { id: 'magenta', name: 'Magenta Ceremonial', hex: '#831843', group: 'Vinos y Rojos' },

  // Azules y Celestes
  { id: 'royal', name: 'Azul Rey Profundo', hex: '#1D4ED8', group: 'Azules' },
  { id: 'azure', name: 'Azul Azur', hex: '#2563EB', group: 'Azules' },
  { id: 'lightblue', name: 'Celeste Institucional', hex: '#38BDF8', group: 'Azules' },
  { id: 'midnight', name: 'Azul Noche', hex: '#030712', group: 'Azules' },
  { id: 'teal', name: 'Azulado Petrolero', hex: '#0F766E', group: 'Azules' },

  // Verdes
  { id: 'emerald', name: 'Verde Esmeralda', hex: '#047857', group: 'Verdes' },
  { id: 'olive', name: 'Verde Oliva Académico', hex: '#4D7C0F', group: 'Verdes' },
  { id: 'mint', name: 'Verde Menta Fino', hex: '#059669', group: 'Verdes' },
  { id: 'forest', name: 'Verde Bosque Oscuro', hex: '#064E3B', group: 'Verdes' },

  // Dorados y Marrones
  { id: 'brightgold', name: 'Oro Brillante', hex: '#B45309', group: 'Dorados y Marrones' },
  { id: 'copper', name: 'Cobre Antiguo', hex: '#9A3412', group: 'Dorados y Marrones' },
  { id: 'chocolate', name: 'Marrón Chocolate', hex: '#451A03', group: 'Dorados y Marrones' },
  { id: 'mahogany', name: 'Caoba Fino', hex: '#78350F', group: 'Dorados y Marrones' },
  { id: 'bronze', name: 'Bronce Metálico', hex: '#854D0E', group: 'Dorados y Marrones' },

  // Grises y Negros
  { id: 'executive', name: 'Negro Ejecutivo Mate', hex: '#0F172A', group: 'Grises y Negros' },
  { id: 'silver', name: 'Gris Plata', hex: '#94A3B8', group: 'Grises y Negros' },
  { id: 'charcoal', name: 'Gris Carbón', hex: '#334155', group: 'Grises y Negros' },
  { id: 'ivory', name: 'Blanco Marfil Ceremonial', hex: '#F8FAFC', group: 'Grises y Negros' },

  // Morados y Violetas
  { id: 'purple', name: 'Morado Académico', hex: '#581C87', group: 'Morados' },
  { id: 'violet', name: 'Violeta Real', hex: '#7C3AED', group: 'Morados' },
  { id: 'plum', name: 'Ciruela Ceremonial', hex: '#6B21A8', group: 'Morados' },
  { id: 'orchid', name: 'Orquídea Fina', hex: '#86198F', group: 'Morados' }
];

export const ColorStep: React.FC<ColorStepProps> = ({
  selectedColorId,
  onChangeColor,
}) => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const selectedColor =
    FULL_COVER_PALETTE.find(c => c.id === selectedColorId) ||
    COVER_COLORS.find(c => c.id === selectedColorId) ||
    { id: selectedColorId, name: selectedColorId.startsWith('#') ? 'Color personalizado' : selectedColorId, hex: selectedColorId.startsWith('#') ? selectedColorId : '#541525' };

  return (
    <div className="bg-slate-100/70 p-3.5 sm:p-4 rounded-2xl mb-5 border border-slate-200/70 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🎨</span>
          <span className="text-xs font-bold text-slate-900">
            B. Escoge el color de tu Cubierta
          </span>
        </div>
      </div>

      {/* Botón principal para abrir/cerrar el panel de colores */}
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setIsPaletteOpen(!isPaletteOpen)}
          className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-[#102338] border border-slate-300/80 rounded-xl text-xs font-bold flex items-center justify-between shadow-2xs transition-all cursor-pointer active:scale-[0.99]"
        >
          <div className="flex items-center gap-2">
            <div 
              style={{ backgroundColor: selectedColor.hex }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-xs shrink-0 border border-black/10"
            >
              <Palette className="w-3.5 h-3.5 text-white drop-shadow-sm" />
            </div>
            <span className="truncate">
              {selectedColorId ? selectedColor.name : 'Clic aqui para escoger el color'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-semibold text-[11px] shrink-0 ml-2">
            <span>{isPaletteOpen ? 'Ocultar' : 'Mostrar'}</span>
            {isPaletteOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Panel desplegable con la paleta completa y círculos ajustados */}
        {isPaletteOpen && (
          <div className="mt-3 p-3 bg-white border border-[#BD944D]/40 rounded-2xl shadow-md animate-in fade-in slide-in-from-top-2 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#BD944D]" />
                <span className="text-[11px] font-extrabold text-[#102338] uppercase tracking-wider">
                  Selecciona cualquier tonalidad de cubierta
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {FULL_COVER_PALETTE.length} opciones
              </span>
            </div>

            {/* Grid de círculos de colores de tamaño optimizado y ajustado para que no se corten */}
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 sm:gap-2 py-1 max-h-56 overflow-y-auto pr-1">
              {FULL_COVER_PALETTE.map(color => {
                const isSelected = selectedColorId === color.id || selectedColor.hex === color.hex;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => {
                      onChangeColor(color.id);
                    }}
                    className="group relative flex flex-col items-center gap-1 p-0.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                    title={color.name}
                  >
                    <div
                      style={{ backgroundColor: color.hex }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-xs transition-all group-hover:scale-105 shrink-0 ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[#BD944D] scale-110 shadow-md'
                          : 'border border-black/10'
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-white drop-shadow-sm stroke-[3]" />
                      )}
                    </div>
                    <span className="text-[8.5px] font-medium text-slate-600 text-center leading-tight truncate w-full">
                      {color.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selector de color personalizado RGB / Hex */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <span className="text-[11px] font-semibold text-slate-600">
                ¿Buscas un color exacto personalizado?
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedColor.hex.startsWith('#') ? selectedColor.hex : '#541525'}
                  onChange={(e) => {
                    onChangeColor(e.target.value);
                  }}
                  className="w-7 h-7 rounded-lg cursor-pointer border border-slate-300 p-0.5 bg-white"
                  title="Elegir color personalizado"
                />
                <span className="text-[10px] font-mono font-bold text-slate-700 uppercase">
                  {selectedColor.hex}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
