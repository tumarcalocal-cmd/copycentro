import React, { useState, useEffect, useRef } from 'react';
import { 
  ZoomIn, 
  Camera, 
  UploadCloud, 
  CheckCircle2, 
  ImageOff, 
  Pencil, 
  Trash2, 
  RotateCcw, 
  X, 
  Check 
} from 'lucide-react';
import { PORTADIPLOMAS_MODELOS } from '../../data/diplomasModels';
import { optimizeUploadedImage } from '../../utils/imageOptimizer';
import { useDiplomasModelTexts } from '../../hooks/useDiplomasModelTexts';

const STORAGE_PREFIX = 'pdp_portadiploma_photo_';

interface PortadiplomasModelosViewProps {
  onOpenZoom: (image: string, title: string) => void;
  isEditingMode?: boolean;
}

export const PortadiplomasModelosView: React.FC<PortadiplomasModelosViewProps> = ({
  onOpenZoom,
  isEditingMode = false,
}) => {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Text management hook for diploma models
  const { getModelText, updateModelText, deleteModelText, resetModelText } = useDiplomasModelTexts();

  // State for editing model text modal
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [tempCategory, setTempCategory] = useState('');
  const [tempTitle, setTempTitle] = useState('');

  useEffect(() => {
    try {
      const loaded: Record<string, string> = {};
      PORTADIPLOMAS_MODELOS.forEach((m) => {
        const saved = localStorage.getItem(`${STORAGE_PREFIX}${m.id}`);
        if (saved) {
          loaded[m.id] = saved;
        }
      });
      setCustomPhotos(loaded);
    } catch {
      // localStorage fallback
    }
  }, []);

  const savePhoto = async (id: string, fileOrDataUrl: File | string) => {
    let finalUrl = '';
    if (typeof fileOrDataUrl === 'string') {
      finalUrl = fileOrDataUrl;
    } else {
      finalUrl = await optimizeUploadedImage(fileOrDataUrl);
    }

    if (!finalUrl) return;

    // Instant state update & clear error
    setFailedImages((prev) => ({ ...prev, [id]: false }));
    setCustomPhotos((prev) => ({ ...prev, [id]: finalUrl }));
    setUploadNotice('Foto de portadiploma actualizada');
    setTimeout(() => setUploadNotice(null), 3000);

    try {
      localStorage.setItem(`${STORAGE_PREFIX}${id}`, finalUrl);
    } catch (err) {
      console.warn('Almacenamiento local lleno', err);
    }
  };

  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const targetModel = PORTADIPLOMAS_MODELOS[i % PORTADIPLOMAS_MODELOS.length];
        if (targetModel) {
          await savePhoto(targetModel.id, file);
        }
      }
      setUploadNotice(`${files.length} foto(s) cargada(s) con éxito`);
      setTimeout(() => setUploadNotice(null), 3500);
      e.target.value = '';
    }
  };

  const handleSingleCardUpload = async (id: string, file: File, e: React.ChangeEvent<HTMLInputElement>) => {
    await savePhoto(id, file);
    e.target.value = '';
  };

  // Text modal actions
  const handleOpenEditModelText = (modeloId: string) => {
    const modelo = PORTADIPLOMAS_MODELOS.find((m) => m.id === modeloId);
    if (!modelo) return;
    const current = getModelText(modelo);
    setTempCategory(current.category || '');
    setTempTitle(current.title || '');
    setEditingModelId(modeloId);
  };

  const handleSaveModelText = () => {
    if (!editingModelId) return;
    const trimmedCategory = tempCategory.trim();
    const trimmedTitle = tempTitle.trim();
    const hasContent = Boolean(trimmedCategory || trimmedTitle);

    updateModelText(editingModelId, {
      category: trimmedCategory,
      title: trimmedTitle,
      visible: hasContent,
    });
    setUploadNotice('¡Texto del modelo guardado con éxito!');
    setTimeout(() => setUploadNotice(null), 3000);
    setEditingModelId(null);
  };

  const handleDeleteModelText = () => {
    if (!editingModelId) return;
    deleteModelText(editingModelId);
    setUploadNotice('Texto eliminado. El modelo se muestra limpio sin descripción.');
    setTimeout(() => setUploadNotice(null), 3500);
    setEditingModelId(null);
  };

  const handleResetModelText = () => {
    if (!editingModelId) return;
    resetModelText(editingModelId);
    setUploadNotice('Texto restaurado a los valores originales.');
    setTimeout(() => setUploadNotice(null), 3000);
    setEditingModelId(null);
  };

  const currentEditingModel = PORTADIPLOMAS_MODELOS.find((m) => m.id === editingModelId);

  return (
    <div className="space-y-3.5 pt-1">
      {/* Hidden multi-file input for top bar */}
      <input
        ref={multiFileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleMultiUpload}
      />

      {/* Upload notice */}
      {uploadNotice && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadNotice}</span>
        </div>
      )}

      {/* Top Upload bar */}
      {isEditingMode && (
        <div className="p-3 bg-white border border-[#BD944D]/30 rounded-2xl shadow-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 block truncate">
              Gestión de Portadiplomas (Modo Editor)
            </span>
            <span className="text-[11px] text-slate-500 block truncate">
              Toca «Cambiar» para cambiar fotos o el icono ✏️ para editar/borrar texto
            </span>
          </div>

          <button
            type="button"
            onClick={() => multiFileInputRef.current?.click()}
            className="min-h-[38px] px-3.5 py-1.5 bg-[#102338] hover:bg-[#183454] active:bg-[#0b1827] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
          >
            <UploadCloud className="w-4 h-4 text-[#edbf74]" />
            <span>Subir fotos</span>
          </button>
        </div>
      )}

      {/* 7 Portadiplomas Cards Grid (2-column square layout) */}
      <div className="grid grid-cols-2 gap-3">
        {PORTADIPLOMAS_MODELOS.map((modelo) => {
          const currentImage = customPhotos[modelo.id] || modelo.image;
          const isError = failedImages[modelo.id];
          const textInfo = getModelText(modelo);
          const hasText = textInfo.visible && Boolean(textInfo.category || textInfo.title);

          return (
            <div
              key={modelo.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 transition-all hover:shadow-md flex flex-col"
            >
              <div
                className="relative aspect-square w-full bg-slate-900 overflow-hidden cursor-pointer group flex items-center justify-center"
                onClick={() => !isError && currentImage && onOpenZoom(currentImage, textInfo.title || modelo.title)}
                title="Toca para ver fotografía completa"
              >
                {currentImage && !isError ? (
                  <img
                    src={currentImage}
                    alt={textInfo.title || modelo.title}
                    onError={() => setFailedImages((prev) => ({ ...prev, [modelo.id]: true }))}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 p-2">
                    <ImageOff className="w-6 h-6 text-slate-600 mb-1" />
                    <span className="text-[10px] text-center">Espacio vacío</span>
                  </div>
                )}

                {/* Top Tag: Model number */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-[#102338]/90 backdrop-blur-xs text-[#edbf74] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md tracking-wide">
                    {modelo.number}
                  </span>
                </div>

                {/* Top Right Zoom Button */}
                {currentImage && !isError && (
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenZoom(currentImage, textInfo.title || modelo.title);
                      }}
                      className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                      title="Ver foto completa"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                )}

                {/* Bottom Overlay Actions: Cambiar foto & Editar texto (solo en edición) */}
                {isEditingMode && (
                  <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModelText(modelo.id);
                      }}
                      className="flex items-center gap-1 bg-[#0a1829]/95 hover:bg-[#071322] active:scale-95 text-white hover:text-[#edbf74] text-[10px] font-bold px-2 py-1 rounded-full shadow-md border border-[#BD944D] cursor-pointer transition-all backdrop-blur-xs"
                      title="Editar o borrar texto de este modelo"
                    >
                      <Pencil className="w-3 h-3 text-[#edbf74]" />
                      <span>{hasText ? 'Texto' : '+ Texto'}</span>
                    </button>

                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-1 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                      title="Cambiar foto de este modelo"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleSingleCardUpload(modelo.id, file, e);
                        }}
                      />
                      <Camera className="w-3 h-3 text-[#edbf74]" />
                      <span>Foto</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Card Footer Info */}
              {hasText ? (
                <div 
                  onClick={(e) => {
                    if (isEditingMode) {
                      e.stopPropagation();
                      handleOpenEditModelText(modelo.id);
                    }
                  }}
                  className={`p-2.5 bg-white transition-colors ${
                    isEditingMode 
                      ? 'cursor-pointer hover:bg-amber-50/60 relative group/footer border-t border-slate-100' 
                      : ''
                  }`}
                  title={isEditingMode ? 'Haz clic para editar o borrar el texto de este modelo' : undefined}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      {textInfo.category && (
                        <span className="text-[11px] font-bold text-slate-900 block truncate leading-tight">
                          {textInfo.category}
                        </span>
                      )}
                      {textInfo.title && (
                        <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                          {textInfo.title}
                        </span>
                      )}
                    </div>
                    {isEditingMode && (
                      <span className="opacity-60 group-hover/footer:opacity-100 p-0.5 text-[#BD944D] shrink-0">
                        <Pencil className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                isEditingMode && (
                  <div 
                    onClick={() => handleOpenEditModelText(modelo.id)}
                    className="p-2 bg-slate-50 border-t border-slate-100 flex items-center justify-center cursor-pointer hover:bg-amber-50/60 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-[#966b1a] flex items-center gap-1">
                      <Pencil className="w-3 h-3" />
                      <span>+ Añadir texto a {modelo.number}</span>
                    </span>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Modal interactivo para Editar o Borrar texto del modelo seleccionado */}
      {editingModelId && currentEditingModel && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setEditingModelId(null)}
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
                    Editar texto: {currentEditingModel.number}
                  </h3>
                  <p className="text-[10px] text-slate-400">Personaliza o borra la categoría y descripción</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingModelId(null)}
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
                  Categoría / Acabado (Línea principal):
                </label>
                <input
                  type="text"
                  value={tempCategory}
                  onChange={(e) => setTempCategory(e.target.value)}
                  placeholder="Ej: Verde Bosque con Grabado en Oro"
                  className="w-full bg-[#071322] border border-slate-700 focus:border-[#BD944D] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#edbf74] uppercase tracking-wider block mb-1.5">
                  Título / Descripción detallada:
                </label>
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  placeholder="Ej: Portadiploma Universitario en Cuerina Verde Bosque"
                  className="w-full bg-[#071322] border border-slate-700 focus:border-[#BD944D] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <p className="text-[10.5px] text-slate-400 leading-relaxed bg-[#071322]/60 p-2.5 rounded-xl border border-white/5">
                💡 Si no deseas texto en este modelo, presiona <strong className="text-red-300">«Borrar texto»</strong> y la tarjeta se mostrará únicamente con la fotografía limpia.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSaveModelText}
                className="w-full py-2.5 px-4 bg-[#BD944D] hover:bg-[#a6803e] active:scale-95 text-[#071322] font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Guardar texto</span>
              </button>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleDeleteModelText}
                  className="py-2.5 px-3 bg-red-950/70 hover:bg-red-900 active:scale-95 text-red-200 border border-red-800/80 font-bold text-[11px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  title="Elimina el texto de este modelo"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Borrar texto</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetModelText}
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
    </div>
  );
};
