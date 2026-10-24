import React from 'react';
import { ENTREGA_OPTIONS } from '../../data/mockData';
import { UploadCloud, Check, Info, MessageSquareText, X, FileText, Plus } from 'lucide-react';

interface DocumentUploadStepProps {
  fileNames: string[];
  onRemoveFile: (index: number) => void;
  fileSize: string | null;
  detectedPages: number | null;
  observaciones?: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeObservaciones: (text: string) => void;
  entrega?: string;
  onChangeEntrega: (entrega: string) => void;
}

export const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  fileNames,
  onRemoveFile,
  fileSize,
  detectedPages,
  observaciones = '',
  onFileUpload,
  onChangeObservaciones,
  entrega,
  onChangeEntrega,
}) => {
  return (
    <>
      {/* STEP F: Documento para Revisión y Portada */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-sm">📎</span>
          <h2 className="text-xs font-bold text-slate-900">
            G. Documento para Revisión y Portada
          </h2>
        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-slate-300 hover:border-[#BD944D] bg-slate-50/80 rounded-2xl p-5 text-center transition-colors relative">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,image/*"
            onChange={onFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Seleccionar archivos"
          />

          <div className="w-12 h-12 rounded-full bg-amber-100/90 text-[#a87823] flex items-center justify-center mx-auto mb-3 shadow-xs">
            {fileNames.length ? <Plus className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
          </div>

          <p className="text-xs font-bold text-slate-800">
            {fileNames.length
              ? 'Toca aquí para agregar otro archivo'
              : 'Toca aquí para adjuntar tu tesis, documento o fotos (opcional)'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Puedes subir varios: PDF, Word (.doc, .docx) o fotos
          </p>
        </div>

        {fileNames.length > 0 && (
          <div className="mt-2.5 space-y-2">
            {fileNames.map((name, i) => (
              <div key={`${name}-${i}`} className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#BD944D] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 truncate flex-1">{name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveFile(i)}
                  aria-label={`Quitar ${name}`}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 px-1">
              <Check className="w-3.5 h-3.5" />
              <span>
                {fileNames.length} {fileNames.length === 1 ? 'archivo listo' : 'archivos listos'}
                {fileSize ? ` · ${fileSize}` : ''}
                {detectedPages ? ` · ${detectedPages} páginas aprox.` : ''}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-start gap-1.5 text-[11px] font-semibold text-red-600 mt-2 px-1">
          <Info className="w-3.5 h-3.5 text-red-500 shrink-0 mt-px" />
          <span>Obligatorio si desea una cotización exacta de Impresión + Empastado.</span>
        </div>
      </div>

      {/* STEP H: Tiempo de entrega */}
      <div className="bg-slate-100/70 p-3.5 sm:p-4 rounded-2xl mb-5 border border-slate-200/70">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-sm">⏱️</span>
          <h2 className="text-xs font-bold text-slate-900">H. Tiempo de entrega</h2>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {ENTREGA_OPTIONS.map((item) => {
            const isSelected = (entrega || ENTREGA_OPTIONS[0]) === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onChangeEntrega(item)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#BD944D] bg-[#102338] text-white font-semibold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                }`}
              >
                <span className="pr-2">{item}</span>
                {isSelected && <Check className="w-4 h-4 text-[#edbf74] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP G: Observaciones adicionales */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <MessageSquareText className="w-3.5 h-3.5 text-[#BD944D]" />
          <h2 className="text-xs font-bold text-slate-900">
            Observaciones o requerimientos especiales
          </h2>
        </div>
        <textarea
          rows={2}
          value={observaciones}
          onChange={(e) => onChangeObservaciones(e.target.value)}
          placeholder="Ej. Tipo de letra para el lomo, carrera universitaria, fecha de entrega esperada, etc."
          enterKeyHint="done"
          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D] leading-relaxed"
        />
      </div>
    </>
  );
};
