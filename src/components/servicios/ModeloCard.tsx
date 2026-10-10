import React, { useState } from 'react';
import { ZoomIn, Camera, ImageOff } from 'lucide-react';
import { ModeloShowcase } from '../../types';

interface ModeloCardProps {
  modelo: ModeloShowcase;
  imageSrc: string;
  isFullWidth?: boolean;
  onOpenZoom?: (image: string, title: string) => void;
  onReplacePhoto?: (modelId: string, file: File) => void;
}

export const ModeloCard: React.FC<ModeloCardProps> = ({
  modelo,
  imageSrc,
  isFullWidth = false,
  onOpenZoom,
  onReplacePhoto,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onReplacePhoto) {
      setImgError(false);
      onReplacePhoto(modelo.id, file);
    }
  };

  if (isFullWidth) {
    // Full width clean card (Modelo 07)
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 transition-all hover:shadow-md flex flex-col">
        {/* Large Image Aspect 4:3 */}
        <div 
          className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden cursor-pointer group flex items-center justify-center"
          onClick={() => !imgError && imageSrc && onOpenZoom?.(imageSrc, modelo.title)}
          title="Toca para ver fotografía completa"
        >
          {imageSrc && !imgError ? (
            <img
              src={imageSrc}
              alt={modelo.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500 p-4">
              <ImageOff className="w-8 h-8 text-slate-600 mb-1" />
              <span className="text-[11px]">Espacio reservado para fotografía</span>
            </div>
          )}

          {/* Top Tag: Model number */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="bg-[#102338]/90 backdrop-blur-xs text-[#edbf74] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide">
              {modelo.number}
            </span>
          </div>

          {/* Top Right Zoom Button */}
          {imageSrc && !imgError && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenZoom?.(imageSrc, modelo.title);
                }}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                title="Ver foto completa"
              >
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

          {/* Camera Replace Button in Edit Mode */}
          {onReplacePhoto && (
            <div className="absolute bottom-2.5 right-2.5 z-10">
              <label
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-transform active:scale-90 shadow-md"
                title="Cargar foto original"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Camera className="w-4 h-4 text-[#edbf74]" />
              </label>
            </div>
          )}
        </div>

      </div>
    );
  }

  // 2-Column Compact Card (Modelos 01 to 06)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 transition-all hover:shadow-md flex flex-col">
      {/* Square Image */}
      <div 
        className="relative aspect-square w-full bg-slate-900 overflow-hidden cursor-pointer group flex items-center justify-center"
        onClick={() => !imgError && imageSrc && onOpenZoom?.(imageSrc, modelo.title)}
        title="Toca para ver fotografía completa"
      >
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            alt={modelo.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 p-2">
            <ImageOff className="w-6 h-6 text-slate-600 mb-1" />
            <span className="text-[10px] text-center">Sin imagen</span>
          </div>
        )}

        {/* Top Tag: Model number */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-[#102338]/90 backdrop-blur-xs text-[#edbf74] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md tracking-wide">
            {modelo.number}
          </span>
        </div>

        {/* Top Right Zoom Button */}
        {imageSrc && !imgError && (
          <div className="absolute top-2 right-2 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenZoom?.(imageSrc, modelo.title);
              }}
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-transform active:scale-90"
              title="Ver foto completa"
            >
              <ZoomIn className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        )}

        {/* Camera Replace Button in Edit Mode */}
        {onReplacePhoto && (
          <div className="absolute bottom-2 right-2 z-10">
            <label
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-transform active:scale-90 shadow-md"
              title="Cargar foto original"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Camera className="w-3.5 h-3.5 text-[#edbf74]" />
            </label>
          </div>
        )}
      </div>

    </div>
  );
};
