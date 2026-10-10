import React, { useState, useRef } from 'react';
import { 
  FileText, 
  GraduationCap, 
  Phone, 
  ChevronRight, 
  Award,
  Search,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { useHeroPhotos } from '../hooks/useHeroPhotos';

interface EnlacesScreenProps {
  onNavigateToSolicitar: () => void;
  onNavigateToServicios: () => void;
  onOpenDiplomas: () => void;
  onOpenRastreo?: () => void;
  onOpenContacto: () => void;
}

export const EnlacesScreen: React.FC<EnlacesScreenProps> = ({
  onNavigateToSolicitar,
  onNavigateToServicios,
  onOpenDiplomas,
  onOpenRastreo,
  onOpenContacto,
}) => {
  const { heroPhotos, saveHeroPhoto } = useHeroPhotos();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fileInputOroRef = useRef<HTMLInputElement>(null);
  const fileInputPortaRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (slot: 'acabadosOro' | 'portadiplomas', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      saveHeroPhoto(slot, file);
      setToastMsg(`✅ Foto de ${slot === 'acabadosOro' ? 'Acabados en Oro' : 'Portadiplomas'} actualizada con éxito.`);
      setTimeout(() => setToastMsg(null), 4000);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-5 pb-28 pt-2">
      {/* Toast de confirmación al subir foto */}
      {toastMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 text-white px-4 py-2.5 rounded-full shadow-2xl border border-emerald-500/80 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hidden file inputs con refs directos para máxima compatibilidad móvil */}
      <input
        ref={fileInputOroRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange('acabadosOro', e)}
      />
      <input
        ref={fileInputPortaRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange('portadiplomas', e)}
      />

      {/* Brand Emblem / Avatar */}
      <div className="relative mb-3 flex items-center justify-center">
        <div className="w-22 h-22 rounded-full bg-[#0a1829] flex items-center justify-center shadow-lg border-[3px] border-[#BD944D]/80 p-1">
          <div className="w-full h-full rounded-full border border-[#BD944D]/40 flex items-center justify-center bg-[#071322]">
            <span className="font-serif-brand text-2xl font-bold tracking-wider text-[#BD944D]">
              PDP
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Titles */}
      <div className="text-center mb-5">
        <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#102338] uppercase">
          PORTA DIPLOMAS
        </h1>
        <h2 className="text-base font-bold tracking-widest text-[#102338] uppercase mt-0.5">
          PANAMÁ
        </h2>
        
        <p className="text-[12px] font-bold tracking-wider text-[#966b1a] uppercase mt-3">
          EMPASTADOS Y PORTADIPLOMAS
        </p>
        
        <p className="font-serif-brand italic text-xs text-slate-600 mt-1 max-w-xs mx-auto">
          “Una presentación a la altura de tu esfuerzo.”
        </p>
      </div>

      {/* Two Showcase Cards Side-by-Side */}
      <div className="grid grid-cols-2 gap-3 w-full mb-5">
        {/* Card 1: Acabados en Oro */}
        <div 
          onClick={onNavigateToServicios}
          className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-md text-left select-none transition-transform hover:shadow-lg cursor-pointer"
        >
          <img
            src={heroPhotos.acabadosOro}
            alt="Tesis con acabados en oro"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Botón flotante para cambiar foto */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              fileInputOroRef.current?.click();
            }}
            className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/75 hover:bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md border border-[#BD944D]/60 active:scale-95 cursor-pointer backdrop-blur-xs"
            title="Cambiar foto"
          >
            <Camera className="w-3 h-3 text-[#edbf74]" />
            <span>Cambiar foto</span>
          </button>
        </div>

        {/* Card 2: Portadiplomas Finos */}
        <div 
          onClick={onOpenDiplomas}
          className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-md text-left select-none transition-transform hover:shadow-lg cursor-pointer"
        >
          <img
            src={heroPhotos.portadiplomas}
            alt="Portadiplomas finos institucionales"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Botón flotante para cambiar foto */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              fileInputPortaRef.current?.click();
            }}
            className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/75 hover:bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md border border-[#BD944D]/60 active:scale-95 cursor-pointer backdrop-blur-xs"
            title="Cambiar foto"
          >
            <Camera className="w-3 h-3 text-[#edbf74]" />
            <span>Cambiar foto</span>
          </button>
        </div>
      </div>

      {/* Primary Action Links Stack */}
      <div className="w-full space-y-3 mb-6">
        {/* Item 1: Empastados */}
        <button
          onClick={onNavigateToSolicitar}
          className="w-full bg-[#0d1f33] hover:bg-[#122842] text-white p-3.5 sm:p-4 rounded-2xl shadow-md transition-all active:scale-[0.985] flex items-center justify-between text-left cursor-pointer border border-[#BD944D]/20 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#162e49] flex items-center justify-center shrink-0 border border-[#BD944D]/30 text-[#BD944D]">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-white tracking-tight">
                  Cotizar Empastado
                </span>
                <span className="bg-[#24354b] text-[#edbf74] text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase">
                  TESIS
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Calcula tu pedido y envía por WhatsApp
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#1b3452] flex items-center justify-center shrink-0 text-slate-300 group-hover:text-white group-hover:bg-[#254366] transition-colors ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Item 2: Diplomas */}
        <button
          onClick={onOpenDiplomas}
          className="w-full bg-[#0d1f33] hover:bg-[#122842] text-white p-3.5 sm:p-4 rounded-2xl shadow-md transition-all active:scale-[0.985] flex items-center justify-between text-left cursor-pointer border border-[#BD944D]/20 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#162e49] flex items-center justify-center shrink-0 border border-[#BD944D]/30 text-[#BD944D]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-white tracking-tight">
                  Diplomas
                </span>
                <span className="bg-[#24354b] text-[#edbf74] text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase">
                  GRADUACIÓN
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Portadiplomas y paquetes
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#1b3452] flex items-center justify-center shrink-0 text-slate-300 group-hover:text-white group-hover:bg-[#254366] transition-colors ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Item 3: Consulte su pedido (Debajo de Diplomas) */}
        <button
          onClick={onOpenRastreo || onNavigateToServicios}
          className="w-full bg-[#0d1f33] hover:bg-[#122842] text-white p-3.5 sm:p-4 rounded-2xl shadow-md transition-all active:scale-[0.985] flex items-center justify-between text-left cursor-pointer border border-[#BD944D]/20 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#162e49] flex items-center justify-center shrink-0 border border-[#BD944D]/30 text-[#BD944D]">
              <Search className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-white tracking-tight">
                  Consulte su pedido
                </span>
                <span className="bg-[#24354b] text-[#edbf74] text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase">
                  ESTADO
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Rastreo y estado de producción en taller
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#1b3452] flex items-center justify-center shrink-0 text-slate-300 group-hover:text-white group-hover:bg-[#254366] transition-colors ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Item 4: Contacto */}
        <button
          onClick={onOpenContacto}
          className="w-full bg-[#0d1f33] hover:bg-[#122842] text-white p-3.5 sm:p-4 rounded-2xl shadow-md transition-all active:scale-[0.985] flex items-center justify-between text-left cursor-pointer border border-[#BD944D]/20 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#162e49] flex items-center justify-center shrink-0 border border-[#BD944D]/30 text-[#BD944D]">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-white tracking-tight">
                  Contacto
                </span>
                <span className="inline-flex items-center gap-1 bg-[#24354b] text-[#edbf74] text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#edbf74] animate-pulse" />
                  DIRECTO
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Horario, WhatsApp y atención directa
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#1b3452] flex items-center justify-center shrink-0 text-slate-300 group-hover:text-white group-hover:bg-[#254366] transition-colors ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Institutional Guarantee Card */}
      <div 
        onClick={onNavigateToServicios}
        className="w-full bg-slate-100 hover:bg-slate-200/80 transition-colors p-4 rounded-2xl flex items-center gap-3.5 cursor-pointer border border-slate-200/70 shadow-xs"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
            Calidad Institucional Garantizada
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Tesis, tesinas, tomos de jurisprudencia
          </p>
        </div>
      </div>
    </div>
  );
};
