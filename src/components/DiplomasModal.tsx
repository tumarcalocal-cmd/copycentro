import React, { useState } from 'react';
import { X, Award, Minus, Plus, ChevronDown } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/mockData';
import { DiplomaConfig } from '../types';
import diplomaHolderImg from '../assets/images/diploma_holder_navy_1791164973669.jpg';
import { ReturnButton } from './common/ReturnButton';
import { DiplomaSummaryCard } from './diplomas/DiplomaSummaryCard';

interface DiplomasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmpastados?: () => void;
}

export const DiplomasModal: React.FC<DiplomasModalProps> = ({ 
  isOpen, 
  onClose, 
}) => {
  const [config, setConfig] = useState<DiplomaConfig>({
    nivel: 'Universitario (Licenciatura / Maestría)',
    material: 'Cuerina acolchada premium',
    tipoProducto: 'Portadiploma Individual',
    cantidad: 1,
    personalizacion: 'Escudo troquelado en relieve',
    diseno: 'Azul Marino Institucional',
    observaciones: '',
  });

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Volver al inicio button */}
        <ReturnButton onClick={onClose} />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-[#BD944D]">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-lg leading-tight">Portadiplomas de Lujo</h3>
              <p className="text-xs text-slate-500">Graduación y reconocimientos de honor</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
            <img 
              src={diplomaHolderImg} 
              alt="Portadiplomas finos en cuero azul" 
              className="w-full h-36 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#BD944D]">Acabado Colegial y Universitario</span>
              <p className="text-xs text-slate-600 mt-1">Confeccionados en percalina o cuerina acolchada, con 4 esquineros de seda dorada y mica protectora de alta transparencia.</p>
            </div>
          </div>

          {/* Form to collect requirements */}
          <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
              Configurar Solicitud de Portadiplomas
            </h4>

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
                  <option value="Corporativo / Empresa">Corporativo / Empresa</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 flex items-center">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Material */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Material de Cubierta</label>
              <div className="grid grid-cols-2 gap-2">
                {['Cuerina acolchada premium', 'Percalina clásica'].map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, material: mat }))}
                    className={`py-2 px-2.5 rounded-xl text-center font-medium transition-all cursor-pointer ${
                      config.material === mat
                        ? 'bg-[#102338] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de Producto */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Tipo de Solicitud</label>
              <div className="grid grid-cols-2 gap-2">
                {['Portadiploma Individual', 'Paquete Graduación'].map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, tipoProducto: tipo }))}
                    className={`py-2 px-2.5 rounded-xl text-center font-medium transition-all cursor-pointer ${
                      config.tipoProducto === tipo
                        ? 'bg-[#102338] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="font-semibold text-slate-800 block">Cantidad requerida</span>
                <span className="text-[11px] text-slate-500">Unidades para entrega</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, cantidad: Math.max(1, prev.cantidad - 1) }))}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
                  disabled={config.cantidad <= 1}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-bold text-slate-900">
                  {config.cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, cantidad: prev.cantidad + 1 }))}
                  className="w-7 h-7 rounded-lg bg-[#102338] hover:bg-slate-800 text-white flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Personalización & Diseño */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Color y Diseño</label>
              <div className="relative">
                <select 
                  value={config.diseno}
                  onChange={(e) => setConfig(prev => ({ ...prev, diseno: e.target.value }))}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#BD944D] appearance-none cursor-pointer"
                >
                  <option value="Azul Marino Institucional">Azul Marino Institucional</option>
                  <option value="Vino Tinto Borgoña">Vino Tinto Borgoña</option>
                  <option value="Verde Bosque Notarial">Verde Bosque Notarial</option>
                  <option value="Negro Ébano Clásico">Negro Ébano Clásico</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 flex items-center">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Personalización</label>
              <div className="relative">
                <select 
                  value={config.personalizacion}
                  onChange={(e) => setConfig(prev => ({ ...prev, personalizacion: e.target.value }))}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#BD944D] appearance-none cursor-pointer"
                >
                  <option value="Escudo troquelado en relieve">Escudo troquelado en relieve</option>
                  <option value="Estampado en caliente con foil dorado">Estampado en caliente con foil dorado</option>
                  <option value="Logo personalizado de facultad / colegio">Logo personalizado de facultad / colegio</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 flex items-center">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Observaciones */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">Observaciones</label>
              <input
                type="text"
                value={config.observaciones || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, observaciones: e.target.value }))}
                placeholder="Ej. Nombre del colegio, fecha de ceremonia, etc."
                className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D]"
              />
            </div>
          </div>

          {/* Resumen de tu solicitud */}
          <DiplomaSummaryCard config={config} onSendWhatsApp={handleSendWhatsApp} />

          {/* Bottom thumb-friendly close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Cerrar ventana
          </button>
        </div>
      </div>
    </div>
  );
};
