import React, { useState } from 'react';
import { Award, ChevronDown, Minus, Plus, X } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/mockData';
import { DiplomaConfig } from '../types';
import { DiplomaSummaryCard } from './diplomas/DiplomaSummaryCard';
import { PortadiplomasModelosView } from './diplomas/PortadiplomasModelosView';

interface PortadiplomasScreenProps {
  onNavigateToInicio: () => void;
}

export const PortadiplomasScreen: React.FC<PortadiplomasScreenProps> = () => {
  const [subTab, setSubTab] = useState<'cotizar' | 'modelos'>('cotizar');
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string } | null>(null);

  const [config, setConfig] = useState<DiplomaConfig>({
    nivel: 'Universitario (Licenciatura / Maestría)',
    material: 'Cuerina acolchada premium',
    tipoProducto: 'Portadiploma Individual',
    cantidad: 1,
    personalizacion: 'Escudo troquelado en relieve',
    diseno: 'Azul Marino Institucional',
    observaciones: '',
  });

  // Modo edición: solo visible en el entorno de desarrollo/edición (ais-dev, localhost o con ?admin=1)
  const isEditingMode = typeof window !== 'undefined' && (
    import.meta.env.DEV ||
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('ais-dev') ||
    window.location.search.includes('admin=1') ||
    window.location.search.includes('edit=1')
  );

  const handleSendWhatsApp = () => {
    let message = `Hola, quisiera solicitar información sobre este trabajo.\n\n` +
      `Servicio: Portadiplomas y Diplomas\n` +
      `Nivel: ${config.nivel}\n` +
      `Material: ${config.material}\n` +
      `Tipo de producto: ${config.tipoProducto}\n` +
      `Cantidad: ${config.cantidad} ${config.cantidad === 1 ? 'unidad' : 'unidades'}\n` +
      `Personalización: ${config.personalizacion}\n` +
      `Diseño / Color: ${config.diseno}\n`;

    if (config.observaciones?.trim()) {
      message += `Observaciones: ${config.observaciones.trim()}\n`;
    }

    message += `\nQuedo pendiente de que me confirmen el precio y disponibilidad.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WORKSHOP_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-1">
      {/* Brand Title Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-amber-50 text-[#BD944D]">
            <Award className="w-5 h-5" />
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Portadiplomas
          </h1>
        </div>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Confección para graduaciones universitarias, colegiales y reconocimientos de honor en Panamá.
        </p>
      </div>

      {/* Subtabs Selector: Cotizar | Modelos */}
      <div className="grid grid-cols-2 bg-slate-200/80 p-1 rounded-2xl mb-4 text-center">
        <button
          type="button"
          onClick={() => setSubTab('cotizar')}
          className={`min-h-[42px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'cotizar'
              ? 'bg-[#102338] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          Cotizar
        </button>

        <button
          type="button"
          onClick={() => setSubTab('modelos')}
          className={`min-h-[42px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'modelos'
              ? 'bg-[#102338] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          Modelos
        </button>
      </div>

      {/* View Mode: Modelos vs Cotizar */}
      {subTab === 'modelos' ? (
        <div className="space-y-4">
          <div className="text-center mb-2">
            <h2 className="text-sm font-bold text-slate-900">
              Muestrario de Portadiplomas
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Toca cualquier fotografía para verla ampliada en detalle.
            </p>
          </div>

          <PortadiplomasModelosView
            onOpenZoom={(url, title) => setZoomImage({ url, title })}
            isEditingMode={isEditingMode}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Hero Banner */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <img 
              src="/images/portadiplomas/port1.png" 
              alt="Portadiplomas finos en cuero azul" 
              className="w-full h-40 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3.5 bg-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#BD944D] block">
                Acabado Colegial y Universitario
              </span>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Confeccionados en percalina o cuerina acolchada, con 4 esquineros de seda dorada y mica protectora de alta transparencia.
              </p>
            </div>
          </div>

          {/* Form to collect requirements */}
          <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs shadow-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
              Configurar Solicitud de Portadiplomas
            </h3>

            {/* Nivel */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Nivel Académico / Institución</label>
              <div className="relative">
                <select 
                  value={config.nivel}
                  onChange={(e) => setConfig(prev => ({ ...prev, nivel: e.target.value }))}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#BD944D] appearance-none cursor-pointer"
                >
                  <option value="Universitario (Licenciatura / Maestría)">Universitario (Licenciatura / Maestría)</option>
                  <option value="Secundaria / Bachiller">Secundaria / Bachiller</option>
                  <option value="Colegiado / Reconocimiento Honorífico">Colegiado / Reconocimiento Honorífico</option>
                  <option value="Diplomado / Seminario Especializado">Diplomado / Seminario Especializado</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Material de Cubierta</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, material: 'Modelo Clásico' }))}
                  className={`py-2 px-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                    config.material === 'Modelo Clásico' || config.material === 'Cuerina acolchada premium'
                      ? 'border-[#BD944D] bg-[#102338] text-white font-bold shadow-xs' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Modelo Clásico
                </button>
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, material: 'Modelo Percalina' }))}
                  className={`py-2 px-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                    config.material === 'Modelo Percalina' || config.material === 'Percalina clásica con textura'
                      ? 'border-[#BD944D] bg-[#102338] text-white font-bold shadow-xs' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Modelo Percalina
                </button>
              </div>
            </div>

            {/* Personalización */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Grabado en Tapa</label>
              <div className="space-y-1.5">
                {[
                  'Escudo troquelado en relieve dorado',
                  'Nombre de la universidad + Año',
                  'Personalización completa con nombre del graduando'
                ].map((item) => (
                  <label 
                    key={item} 
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-[11px] transition-colors ${
                      config.personalizacion === item ? 'border-[#BD944D] bg-amber-50/70 font-semibold' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="personalizacion_diploma"
                      checked={config.personalizacion === item}
                      onChange={() => setConfig(prev => ({ ...prev, personalizacion: item }))}
                      className="text-[#875d14] focus:ring-[#BD944D]"
                    />
                    <span className="text-slate-800">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Cantidad Requerida</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                  <button 
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, cantidad: Math.max(1, prev.cantidad - 1) }))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 text-slate-600 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-bold text-slate-900">{config.cantidad}</span>
                  <button 
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, cantidad: prev.cantidad + 1 }))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 active:bg-slate-200 text-slate-600 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500">
                  {config.cantidad === 1 ? 'Portadiploma individual' : 'Descuentos para grupos y promociones'}
                </span>
              </div>
            </div>

            {/* Observaciones */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Notas especiales (Opcional)</label>
              <input 
                type="text" 
                value={config.observaciones || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, observaciones: e.target.value }))}
                placeholder="Ej. Promoción 2026, medidas especiales, fecha límite..."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D]"
              />
            </div>
          </div>

          {/* Resumen de tu solicitud */}
          <DiplomaSummaryCard config={config} onSendWhatsApp={handleSendWhatsApp} />
        </div>
      )}

      {/* Fullscreen Photo Lightbox Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
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
              Fotografía de modelo · Porta Diplomas Panamá
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
