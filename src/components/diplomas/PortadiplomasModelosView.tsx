import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, Camera, UploadCloud, CheckCircle2, ImageOff } from 'lucide-react';
import { PORTADIPLOMAS_MODELOS } from '../../data/diplomasModels';
import { optimizeUploadedImage } from '../../utils/imageOptimizer';

const STORAGE_PREFIX = 'pdp_portadiploma_photo_';

interface PortadiplomasModelosViewProps {
  onOpenZoom: (image: string, title: string) => void;
  isEditingMode?: boolean;
}

export const PortadiplomasModelosView: React.FC<PortadiplomasModelosViewProps> = ({
  onOpenZoom,
  isEditingMode = true,
}) => {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

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
        <div className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 block truncate">
              Fotos de portadiplomas
            </span>
            <span className="text-[11px] text-slate-500 block truncate">
              Toca «Subir fotos» o el botón «Cambiar» en cada imagen
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

          return (
            <div
              key={modelo.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 transition-all hover:shadow-md flex flex-col"
            >
              <div
                className="relative aspect-square w-full bg-slate-900 overflow-hidden cursor-pointer group flex items-center justify-center"
                onClick={() => !isError && currentImage && onOpenZoom(currentImage, modelo.title)}
                title="Toca para ver fotografía completa"
              >
                {currentImage && !isError ? (
                  <img
                    src={currentImage}
                    alt={modelo.title}
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
                        onOpenZoom(currentImage, modelo.title);
                      }}
                      className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                      title="Ver foto completa"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                )}

                {/* Bottom Overlay Action: Cambiar foto (solo en edición) */}
                {isEditingMode && (
                  <div className="absolute bottom-2 right-2 z-10">
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
                      <span>Cambiar</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Card Footer Info */}
              <div className="p-2.5 bg-white">
                <span className="text-[11px] font-bold text-slate-900 block truncate leading-tight">
                  {modelo.category}
                </span>
                <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                  {modelo.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
