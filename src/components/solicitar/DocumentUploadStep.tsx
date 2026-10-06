import React from 'react';
import { UploadCloud, Check, Info, MessageSquareText } from 'lucide-react';

interface DocumentUploadStepProps {
  fileName: string | null;
  fileSize: string | null;
  detectedPages: number | null;
  observaciones?: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeObservaciones: (text: string) => void;
}

export const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  fileName,
  fileSize,
  detectedPages,
  observaciones = '',
  onFileUpload,
  onChangeObservaciones,
}) => {
  return (
    <>
      {/* STEP F: Documento para Revisión y Portada */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-sm">📎</span>
          <h2 className="text-xs font-bold text-slate-900">
            F. Documento para Revisión y Portada
          </h2>
        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-slate-300 hover:border-[#BD944D] bg-slate-50/80 rounded-2xl p-5 text-center transition-colors relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Seleccionar archivo"
          />

          <div className="w-12 h-12 rounded-full bg-amber-100/90 text-[#a87823] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>

          {fileName ? (
            <>
              <p className="text-xs font-bold text-slate-900 truncate max-w-xs mx-auto">
                {fileName}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {fileSize ? `Tamaño: ${fileSize}` : ''} {detectedPages ? `· ${detectedPages} páginas detectadas` : ''}
              </p>

              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-2.5">
                <Check className="w-3.5 h-3.5" />
                <span>Archivo listo para vinculación</span>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-bold text-slate-800">
                Toca aquí para adjuntar tu tesis o documento (opcional)
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Formatos permitidos: PDF o Word (.doc, .docx)
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2 px-1">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>El documento se compartirá directamente con el taller al confirmar la solicitud.</span>
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
