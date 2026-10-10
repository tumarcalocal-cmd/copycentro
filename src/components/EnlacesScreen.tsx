import React, { useState, useRef } from 'react';
import { 
  FileText, 
  GraduationCap, 
  Phone, 
  ChevronRight, 
  Award,
  Search,
  Upload,
  Camera,
  CheckCircle2,
  Pencil,
  Trash2,
  RotateCcw,
  X,
  Check
} from 'lucide-react';
import { useHeroPhotos } from '../hooks/useHeroPhotos';
import { useEditorMode } from '../hooks/useEditorMode';
import { useCardTexts } from '../hooks/useCardTexts';

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
  const isEditorMode = useEditorMode();
  const { cardTexts, updateCardText, deleteCardText, resetCardText } = useCardTexts();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Estado para el modal de edición/borrado de texto (Solo modo editor)
  const [editingCardKey, setEditingCardKey] = useState<'card1' | 'card2' | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempSubtitle, setTempSubtitle] = useState('');

  const handleOpenEditModal = (key: 'card1' | 'card2') => {
    setEditingCardKey(key);
    setTempTitle(cardTexts[key]?.title || '');
    setTempSubtitle(cardTexts[key]?.subtitle || '');
  };

  const handleSaveCardText = () => {
    if (!editingCardKey) return;
    const hasContent = Boolean(tempTitle.trim() || tempSubtitle.trim());
    updateCardText(editingCardKey, {
      title: tempTitle.trim(),
      subtitle: tempSubtitle.trim(),
      visible: hasContent,
    });
    setToastMsg('¡Texto de la foto actualizado con éxito!');
    setTimeout(() => setToastMsg(null), 3500);
    setEditingCardKey(null);
  };

  const handleDeleteCardText = () => {
    if (!editingCardKey) return;
    deleteCardText(editingCardKey);
    setToastMsg('Texto eliminado. Ahora se muestra únicamente la fotografía limpia.');
    setTimeout(() => setToastMsg(null), 3500);
    setEditingCardKey(null);
  };

  const handleResetCardText = () => {
    if (!editingCardKey) return;
    resetCardText(editingCardKey);
    setToastMsg('Texto restaurado al original.');
    setTimeout(() => setToastMsg(null), 3000);
    setEditingCardKey(null);
  };

  const fileInputOroRef = useRef<HTMLInputElement>(null);
  const fileInputPortaRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (slot: 'acabadosOro' | 'portadiplomas', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      saveHeroPhoto(slot, file);
      setToastMsg('¡Foto subida con éxito!');
      setTimeout(() => setToastMsg(null), 3500);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-5 pb-28 pt-2">
      {/* Aviso de confirmación de subida */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0a1829] text-[#edbf74] px-4 py-2 rounded-full border border-[#BD944D] shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}



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

      {/* Two Showcase Cards Side-by-Side con botón directo de Subir foto y Editar/Borrar texto */}
      <div className="grid grid-cols-2 gap-3 w-full mb-3">
        {/* Card 1: Empastados de Tesis */}
        <div 
          onClick={() => {
            if (isEditorMode) {
              handleOpenEditModal('card1');
              return;
            }
            onNavigateToServicios();
          }}
          className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-md text-left select-none transition-transform hover:shadow-lg cursor-pointer"
        >
          <img
            src={heroPhotos.acabadosOro}
            alt={cardTexts.card1?.title || 'Empastados de tesis'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Botón directo para subir foto (SOLO visible en el editor, oculto al público) */}
          {isEditorMode && (
            <>
              <label
                htmlFor="subir-foto-acabados-oro"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute top-2 right-2 z-30 flex items-center gap-1.5 bg-[#0a1829]/95 hover:bg-[#071322] active:scale-95 text-white hover:text-[#edbf74] text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-xl border border-[#BD944D] cursor-pointer transition-all backdrop-blur-xs select-none"
                title="Subir foto para esta imagen (Solo editor)"
              >
                <Camera className="w-3.5 h-3.5 text-[#edbf74] shrink-0" />
                <span>Subir foto</span>
              </label>
              <input
                id="subir-foto-acabados-oro"
                ref={fileInputOroRef}
                type="file"
                accept="image/*"
                className="hidden"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleFileChange('acabadosOro', e)}
              />

              {/* Botón destacado para editar o borrar texto */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEditModal('card1');
                }}
                className="absolute bottom-2 left-2 z-30 flex items-center gap-1.5 bg-[#0a1829]/95 hover:bg-[#071322] active:scale-95 text-white hover:text-[#edbf74] text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-xl border border-[#BD944D] cursor-pointer transition-all backdrop-blur-xs select-none"
                title="Editar o borrar el texto de esta foto"
              >
                <Pencil className="w-3 h-3 text-[#edbf74]" />
                <span>{cardTexts.card1?.visible && (cardTexts.card1?.title || cardTexts.card1?.subtitle) ? 'Editar texto' : '+ Texto'}</span>
              </button>
            </>
          )}

          {/* Etiqueta de la tarjeta (Si el usuario la borró, se oculta por completo para dejar la foto limpia) */}
          {cardTexts.card1?.visible && (cardTexts.card1?.title || cardTexts.card1?.subtitle) && (
            <div 
              onClick={(e) => {
                if (isEditorMode) {
                  e.stopPropagation();
                  handleOpenEditModal('card1');
                }
              }}
              className={`absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent ${
                isEditorMode ? 'cursor-pointer hover:from-black pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {cardTexts.card1?.title && (
                <span className="text-white text-[11px] sm:text-xs font-bold block truncate drop-shadow-sm leading-tight">
                  {cardTexts.card1.title}
                </span>
              )}
              {cardTexts.card1?.subtitle && (
                <span className="text-[#edbf74] text-[9.5px] font-medium block truncate drop-shadow-xs mt-0.5">
                  {cardTexts.card1.subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card 2: Portadiplomas Finos */}
        <div 
          onClick={() => {
            if (isEditorMode) {
              handleOpenEditModal('card2');
              return;
            }
            onOpenDiplomas();
          }}
          className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 shadow-md text-left select-none transition-transform hover:shadow-lg cursor-pointer"
        >
          <img
            src={heroPhotos.portadiplomas}
            alt={cardTexts.card2?.title || 'Portadiplomas finos'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Botón directo para subir foto (SOLO visible en el editor, oculto al público) */}
          {isEditorMode && (
            <>
              <label
                htmlFor="subir-foto-portadiplomas"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute top-2 right-2 z-30 flex items-center gap-1.5 bg-[#0a1829]/95 hover:bg-[#071322] active:scale-95 text-white hover:text-[#edbf74] text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-xl border border-[#BD944D] cursor-pointer transition-all backdrop-blur-xs select-none"
                title="Subir foto para esta imagen (Solo editor)"
              >
                <Camera className="w-3.5 h-3.5 text-[#edbf74] shrink-0" />
                <span>Subir foto</span>
              </label>
              <input
                id="subir-foto-portadiplomas"
                ref={fileInputPortaRef}
                type="file"
                accept="image/*"
                className="hidden"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleFileChange('portadiplomas', e)}
              />

              {/* Botón destacado para editar o borrar texto */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEditModal('card2');
                }}
                className="absolute bottom-2 left-2 z-30 flex items-center gap-1.5 bg-[#0a1829]/95 hover:bg-[#071322] active:scale-95 text-white hover:text-[#edbf74] text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-xl border border-[#BD944D] cursor-pointer transition-all backdrop-blur-xs select-none"
                title="Editar o borrar el texto de esta foto"
              >
                <Pencil className="w-3 h-3 text-[#edbf74]" />
                <span>{cardTexts.card2?.visible && (cardTexts.card2?.title || cardTexts.card2?.subtitle) ? 'Editar texto' : '+ Texto'}</span>
              </button>
            </>
          )}

          {/* Etiqueta de la tarjeta (Si el usuario la borró, se oculta por completo para dejar la foto limpia) */}
          {cardTexts.card2?.visible && (cardTexts.card2?.title || cardTexts.card2?.subtitle) && (
            <div 
              onClick={(e) => {
                if (isEditorMode) {
                  e.stopPropagation();
                  handleOpenEditModal('card2');
                }
              }}
              className={`absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent ${
                isEditorMode ? 'cursor-pointer hover:from-black pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {cardTexts.card2?.title && (
                <span className="text-white text-[11px] sm:text-xs font-bold block truncate drop-shadow-sm leading-tight">
                  {cardTexts.card2.title}
                </span>
              )}
              {cardTexts.card2?.subtitle && (
                <span className="text-[#edbf74] text-[9.5px] font-medium block truncate drop-shadow-xs mt-0.5">
                  {cardTexts.card2.subtitle}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Barra de ayuda en modo editor */}
      {isEditorMode && (
        <div className="w-full mb-4 px-3 py-2 bg-amber-50/80 border border-[#BD944D]/30 rounded-xl flex items-center justify-between text-[11px] text-[#966b1a]">
          <span className="flex items-center gap-1.5">
            <Pencil className="w-3.5 h-3.5 text-[#BD944D] shrink-0" />
            <span><strong>Modo Editor habilitado:</strong> Toca «Editar texto» o el texto de cualquier foto para modificarlo o borrarlo.</span>
          </span>
        </div>
      )}

      {/* Modal interactivo para Editar o Borrar texto (SOLO en modo editor) */}
      {isEditorMode && editingCardKey && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setEditingCardKey(null)}
        >
          <div 
            className="w-full max-w-sm bg-[#0d1f33] border border-[#BD944D]/50 rounded-3xl shadow-2xl p-5 text-white animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#BD944D]/20 text-[#edbf74] flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white leading-tight">
                    {editingCardKey === 'card1' ? 'Foto 1: Empastados' : 'Foto 2: Portadiplomas'}
                  </h3>
                  <p className="text-[10px] text-slate-400">Edita o borra el texto superpuesto</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingCardKey(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inputs de texto */}
            <div className="space-y-3.5 mb-5">
              <div>
                <label className="text-[11px] font-bold text-[#edbf74] uppercase tracking-wider block mb-1.5">
                  Título principal:
                </label>
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  placeholder="Ej: Empastados de Tesis (o déjalo vacío)"
                  className="w-full bg-[#071322] border border-slate-700 focus:border-[#BD944D] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#edbf74] uppercase tracking-wider block mb-1.5">
                  Subtítulo / descripción:
                </label>
                <input
                  type="text"
                  value={tempSubtitle}
                  onChange={(e) => setTempSubtitle(e.target.value)}
                  placeholder="Ej: Tapa dura y letras en oro"
                  className="w-full bg-[#071322] border border-slate-700 focus:border-[#BD944D] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <p className="text-[10.5px] text-slate-400 leading-relaxed bg-[#071322]/60 p-2.5 rounded-xl border border-white/5">
                💡 Si no quieres ningún texto sobre la imagen, haz clic en <strong className="text-red-300">«Borrar texto»</strong> y la foto se verá completamente limpia.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSaveCardText}
                className="w-full py-2.5 px-4 bg-[#BD944D] hover:bg-[#a6803e] active:scale-95 text-[#071322] font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Guardar texto</span>
              </button>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleDeleteCardText}
                  className="py-2.5 px-3 bg-red-950/70 hover:bg-red-900 active:scale-95 text-red-200 border border-red-800/80 font-bold text-[11px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  title="Elimina el texto de esta foto"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Borrar texto</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCardText}
                  className="py-2.5 px-3 bg-white/10 hover:bg-white/15 active:scale-95 text-slate-300 font-semibold text-[11px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Restaurar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
