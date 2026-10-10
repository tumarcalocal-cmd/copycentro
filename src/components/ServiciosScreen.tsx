import React, { useState, useRef } from 'react';
import { X, UploadCloud, CheckCircle2 } from 'lucide-react';
import { MODELOS_SHOWCASES } from '../data/mockData';
import { ModeloCard } from './servicios/ModeloCard';
import { useModelosPhotos } from '../hooks/useModelosPhotos';
import { EmpastadoConfig, DesignShowcase } from '../types';

interface ServiciosScreenProps {
  onNavigateToInicio: () => void;
  onNavigateToSolicitar: (preset?: Partial<EmpastadoConfig>) => void;
  onSelectDesign?: (design: DesignShowcase) => void;
  selectedDesignId?: string;
  initialSubTab?: 'disenos' | 'rastreo';
}

export const ServiciosScreen: React.FC<ServiciosScreenProps> = ({
  onNavigateToSolicitar,
}) => {
  const [subTab, setSubTab] = useState<'solicitar' | 'disenos'>('disenos');
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string } | null>(null);
  const [uploadSuccessNotice, setUploadSuccessNotice] = useState<string | null>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const { getPhotoForModel, handleFilesUpload, savePhoto } = useModelosPhotos();

  // Modo edición: siempre habilitado para que el dueño pueda personalizar fotos reales
  const isEditingMode = true;

  const handleSubTabClick = (tab: 'solicitar' | 'disenos') => {
    setSubTab(tab);
    if (tab === 'solicitar') {
      onNavigateToSolicitar();
    }
  };

  const handleMultiUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesUpload(e.target.files);
      setUploadSuccessNotice(`${e.target.files.length} foto(s) original(es) cargada(s) con éxito`);
      setTimeout(() => setUploadSuccessNotice(null), 4000);
    }
  };

  const handleSingleReplace = async (modelId: string, file: File) => {
    await savePhoto(modelId, file);
    setUploadSuccessNotice(`Foto actualizada para este modelo`);
    setTimeout(() => setUploadSuccessNotice(null), 3000);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-1">
      {/* Hidden input for uploading original camera photos */}
      <input
        ref={multiFileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleMultiUploadChange}
      />

      {/* Sub Tabs Selector: Cotizar | Modelos */}
      <div className="grid grid-cols-2 bg-slate-200/80 p-1 rounded-2xl mb-5 text-center">
        <button
          type="button"
          onClick={() => handleSubTabClick('solicitar')}
          className={`min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'solicitar'
              ? 'bg-[#102338] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          Cotizar
        </button>

        <button
          type="button"
          onClick={() => handleSubTabClick('disenos')}
          className={`min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'disenos'
              ? 'bg-[#102338] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          Modelos
        </button>
      </div>

      {/* Section Title & Subtitle */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1 h-3.5 bg-[#a87823] rounded-full inline-block" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Modelos de Empastados
          </h2>
          <span className="w-1 h-3.5 bg-[#a87823] rounded-full inline-block" />
        </div>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
          Muestras fotográficas de los trabajos realizados por nuestro taller para las distintas universidades de Panamá.
        </p>
      </div>

      {/* Notice of success upload */}
      {uploadSuccessNotice && (
        <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadSuccessNotice}</span>
        </div>
      )}

      {/* Upload original photos bar (SOLO visible en modo edición, oculto en producción/publicación) */}
      {isEditingMode && (
        <div className="mb-6 p-3 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="min-w-0">
            <span className="text-xs font-bold text-slate-900 block truncate">
              Fotos originales de tu taller (Modo edición)
            </span>
            <span className="text-[11px] text-slate-500 block truncate">
              Visible solo mientras editas la aplicación
            </span>
          </div>

          <button
            type="button"
            onClick={() => multiFileInputRef.current?.click()}
            className="min-h-[40px] px-3.5 py-1.5 bg-[#102338] hover:bg-[#183454] active:bg-[#0b1827] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
          >
            <UploadCloud className="w-4 h-4 text-[#edbf74]" />
            <span>Subir fotos</span>
          </button>
        </div>
      )}

      {/* Portfolio Showcase Cards Grid (2 de 2 + Modelo 07 Completo al final) */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {MODELOS_SHOWCASES.filter((m) => m.id !== 'mod-07').map((modelo) => {
          const currentImage = getPhotoForModel(modelo.id, modelo.image);
          return (
            <ModeloCard
              key={modelo.id}
              modelo={modelo}
              imageSrc={currentImage}
              isFullWidth={false}
              onOpenZoom={(url, title) => setZoomImage({ url, title })}
              onReplacePhoto={isEditingMode ? handleSingleReplace : undefined}
            />
          );
        })}

        {/* Modelo 07: Al final y de tamaño completo */}
        {MODELOS_SHOWCASES.find((m) => m.id === 'mod-07') && (() => {
          const modelo07 = MODELOS_SHOWCASES.find((m) => m.id === 'mod-07')!;
          const currentImage = getPhotoForModel(modelo07.id, modelo07.image);
          return (
            <div className="col-span-2 pt-1">
              <ModeloCard
                key={modelo07.id}
                modelo={modelo07}
                imageSrc={currentImage}
                isFullWidth={true}
                onOpenZoom={(url, title) => setZoomImage({ url, title })}
                onReplacePhoto={isEditingMode ? handleSingleReplace : undefined}
              />
            </div>
          );
        })()}
      </div>

      {/* Full-Photo Lightbox Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 bg-black/50 text-white">
              <span className="text-xs font-bold truncate max-w-[260px]">
                {zoomImage.title}
              </span>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
                aria-label="Cerrar fotografía ampliada"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full max-h-[75vh] flex items-center justify-center bg-black p-1">
              <img
                src={zoomImage.url}
                alt={zoomImage.title}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-3 text-center bg-slate-900 text-[11px] text-slate-400">
              Fotografía real de producción en taller · Porta Diplomas Panamá
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
