import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Award,
  Send,
  Palette,
  FileSearch,
} from 'lucide-react';
import { COVER_COLORS } from '../data/mockData';
import { EmpastadoConfig } from '../types';
import { ReturnButton } from './common/ReturnButton';
import { ModalidadStep } from './solicitar/ModalidadStep';
import { ColorStep } from './solicitar/ColorStep';
import { CopiesPagesStep } from './solicitar/CopiesPagesStep';
import { PersonalizacionStep } from './solicitar/PersonalizacionStep';
import { DocumentUploadStep } from './solicitar/DocumentUploadStep';
import { SolicitudSummaryCard } from './solicitar/SolicitudSummaryCard';
import { useFileUpload } from '../hooks/useFileUpload';
import { formatEmpastadoMessage, openWhatsApp } from '../utils/whatsapp';

interface SolicitarScreenProps {
  config: EmpastadoConfig;
  setConfig: React.Dispatch<React.SetStateAction<EmpastadoConfig>>;
  onNavigateToInicio: () => void;
  onNavigateToDisenos: () => void;
  onNavigateToRastreo: () => void;
  shouldScrollToDesign?: boolean;
  onClearScrollToDesign?: () => void;
}

export const SolicitarScreen: React.FC<SolicitarScreenProps> = ({
  config,
  setConfig,
  onNavigateToInicio,
  onNavigateToDisenos,
  onNavigateToRastreo,
  shouldScrollToDesign,
  onClearScrollToDesign,
}) => {
  const pasoDisenoRef = useRef<HTMLDivElement>(null);
  const [activeSubTab, setActiveSubTab] = useState<'solicitar' | 'disenos' | 'pedidos'>('solicitar');

  const { handleFileUpload } = useFileUpload(setConfig);

  useEffect(() => {
    if (shouldScrollToDesign && pasoDisenoRef.current) {
      setTimeout(() => {
        pasoDisenoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        onClearScrollToDesign?.();
      }, 100);
    }
  }, [shouldScrollToDesign, onClearScrollToDesign]);

  const selectedColor = COVER_COLORS.find(c => c.id === config.colorId) || COVER_COLORS[4];

  const personalizacionesList = [
    config.goldLogo ? 'Logo en dorado' : null,
    config.spineLettering ? 'Grabado en lomo' : null,
    config.cdPocket ? 'Bolsillo CD' : null,
  ].filter(Boolean).join(' + ') || 'Sin extras';

  const handleSendWhatsApp = () => {
    const message = formatEmpastadoMessage(config, selectedColor.name, personalizacionesList);
    openWhatsApp(message);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-1">
      {/* Top Volver al inicio button */}
      <ReturnButton onClick={onNavigateToInicio} />

      {/* Screen Title & Badge */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#BD944D] uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENCUADERNACIÓN EDITORIAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102338] tracking-tight">
            Empastados
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-[#BD944D] flex items-center justify-center shrink-0 shadow-xs">
          <Award className="w-5 h-5" />
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-4">
        Confección artesanal en tapa dura con acabado institucional, letras doradas al calor y estándares universitarios de Panamá.
      </p>

      {/* Top Segmented Subtabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/70 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => setActiveSubTab('solicitar')}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'solicitar'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Send className="w-3.5 h-3.5 text-[#BD944D]" />
          <span>Solicitar</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('disenos');
            onNavigateToDisenos();
          }}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'disenos'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-slate-500" />
          <span>Diseños</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('pedidos');
            onNavigateToRastreo();
          }}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeSubTab === 'pedidos'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSearch className="w-3.5 h-3.5 text-slate-500" />
          <span>Consulte su pedido</span>
        </button>
      </div>

      {/* STEP A: Modalidad del Servicio */}
      <ModalidadStep
        modalidad={config.modalidad}
        onChangeModalidad={(modalidad) => setConfig(prev => ({ ...prev, modalidad }))}
      />

      {/* STEP B: Color de Cubierta */}
      <ColorStep
        selectedColorId={config.colorId}
        onChangeColor={(colorId) => setConfig(prev => ({ ...prev, colorId }))}
      />

      {/* STEP C & D: Cantidad de tomos y Páginas */}
      <CopiesPagesStep
        copies={config.copies}
        paperType={config.paperType}
        pages={config.pages}
        modalidad={config.modalidad}
        onChangeCopies={(copies) => setConfig(prev => ({ ...prev, copies }))}
        onChangePaperType={(paperType) => setConfig(prev => ({ ...prev, paperType }))}
        onChangePages={(pages) => setConfig(prev => ({ ...prev, pages }))}
      />

      {/* STEP E: Grabado y Personalización */}
      <PersonalizacionStep
        sectionRef={pasoDisenoRef}
        selectedDesignTitle={config.selectedDesignTitle}
        goldLogo={config.goldLogo}
        spineLettering={config.spineLettering}
        cdPocket={config.cdPocket}
        onNavigateToDisenos={onNavigateToDisenos}
        onChangeGoldLogo={(goldLogo) => setConfig(prev => ({ ...prev, goldLogo }))}
        onChangeSpineLettering={(spineLettering) => setConfig(prev => ({ ...prev, spineLettering }))}
        onChangeCdPocket={(cdPocket) => setConfig(prev => ({ ...prev, cdPocket }))}
      />

      {/* STEP F & G: Documento y Observaciones */}
      <DocumentUploadStep
        fileName={config.uploadedFileName}
        fileSize={config.uploadedFileSize}
        detectedPages={config.detectedPages}
        observaciones={config.observaciones}
        onFileUpload={handleFileUpload}
        onChangeObservaciones={(observaciones) => setConfig(prev => ({ ...prev, observaciones }))}
      />

      {/* SUMMARY CARD: Resumen de tu solicitud */}
      <SolicitudSummaryCard
        config={config}
        colorName={selectedColor.name}
        personalizacionesList={personalizacionesList}
        onSendWhatsApp={handleSendWhatsApp}
      />
    </div>
  );
};
