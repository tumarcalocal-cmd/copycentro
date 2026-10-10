import React, { useState, useEffect, useRef } from 'react';
import { Award, ChevronDown, Minus, Plus, X, Check, Image as ImageIcon, Camera, Trash2, RefreshCw } from 'lucide-react';
import { WORKSHOP_INFO } from '../data/mockData';
import { DiplomaConfig } from '../types';
import { DiplomaSummaryCard } from './diplomas/DiplomaSummaryCard';
import { PortadiplomasModelosView } from './diplomas/PortadiplomasModelosView';

interface PortadiplomasScreenProps {
  onNavigateToInicio: () => void;
  initialSubTab?: 'cotizar' | 'modelos';
  onSubTabChange?: (tab: 'cotizar' | 'modelos') => void;
}

const NIVEL_OPTIONS = [
  'Universitario (Licenciatura / Maestría)',
  'Secundaria / Bachiller',
  'Colegiado / Reconocimiento Honorífico',
  'Diplomado / Seminario Especializado',
];

const GRABADO_OPTIONS = [
  'Escudo troquelado en relieve dorado',
  'Nombre de la universidad o colegio + Año',
  'Personalización completa con nombre del graduando',
];

const CARACTERISTICAS_OPCIONES = [
  'Solo Portadiploma',
  'Portadiploma y diploma',
  'Portadiploma, diploma y foto grupal',
];

const validSubTab = (val?: unknown): 'cotizar' | 'modelos' => {
  return val === 'modelos' ? 'modelos' : 'cotizar';
};

export const PortadiplomasScreen: React.FC<PortadiplomasScreenProps> = ({
  initialSubTab = 'cotizar',
  onSubTabChange,
}) => {
  const [subTab, setSubTab] = useState<'cotizar' | 'modelos'>(() => validSubTab(initialSubTab));
  const [zoomImage, setZoomImage] = useState<{ url: string; title: string } | null>(null);

  // Acordeón interactivo: todas las tarjetas inician cerradas y se abren únicamente al tocarlas
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Foto de referencia (Paso 6)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Cámara en vivo con visualizador real
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [config, setConfig] = useState<DiplomaConfig>({
    nivel: 'Universitario (Licenciatura / Maestría)',
    material: 'Modelo Clásico',
    tipoProducto: 'Solo Portadiploma',
    caracteristicasEspeciales: 'Solo Portadiploma',
    cantidad: 1,
    personalizacion: 'Escudo troquelado en relieve dorado',
    diseno: 'Azul Marino Institucional',
    observaciones: '',
  });

  useEffect(() => {
    setSubTab(validSubTab(initialSubTab));
  }, [initialSubTab]);

  const handleSubTabSwitch = (tab: 'cotizar' | 'modelos') => {
    setSubTab(tab);
    onSubTabChange?.(tab);
  };

  const toggleCard = (cardNum: number) => {
    setActiveCard(prev => (prev === cardNum ? null : cardNum));
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleStartCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        cameraInputRef.current?.click();
        return;
      }
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('getUserMedia error, cayendo al input nativo:', err);
      stopCamera();
      setIsCameraActive(false);
      cameraInputRef.current?.click();
    }
  };

  const handleFlipCamera = async () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: nextMode } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      // fallback
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPhotoPreview(dataUrl);
        const fileName = `foto_camara_${Date.now().toString().slice(-6)}.jpg`;
        setConfig(prev => ({ ...prev, archivo: fileName }));
      }
    }
    stopCamera();
    setIsCameraActive(false);
  };

  const handleCloseCamera = () => {
    stopCamera();
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
        setConfig(prev => ({ ...prev, archivo: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setConfig(prev => ({ ...prev, archivo: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Modo edición: siempre habilitado para que el dueño pueda personalizar las fotos de los modelos
  const isEditingMode = true;

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

    if (config.archivo) {
      message += `Foto de referencia: ${config.archivo} (la adjunto en esta conversación)\n`;
    }

    message += `\nQuedo pendiente de que me confirmen el precio y disponibilidad.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WORKSHOP_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-1">
      {/* Hidden file & camera inputs for Step 6 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handlePhotoUpload}
      />

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
          onClick={() => handleSubTabSwitch('cotizar')}
          className={`min-h-[44px] py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'cotizar'
              ? 'bg-[#102338] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium'
          }`}
          style={subTab === 'cotizar' ? { backgroundColor: '#102338', color: '#ffffff' } : undefined}
        >
          Cotizar
        </button>

        <button
          type="button"
          onClick={() => handleSubTabSwitch('modelos')}
          className={`min-h-[44px] py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'modelos'
              ? 'bg-[#102338] text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 font-medium'
          }`}
          style={subTab === 'modelos' ? { backgroundColor: '#102338', color: '#ffffff' } : undefined}
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

          {/* Tarjetas desplegables numeradas (Acordeón Interactivo) */}
          <div className="space-y-3">
            {/* TARJETA 1: Nivel Académico / Institución */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleCard(1)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
                aria-expanded={activeCard === 1}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    activeCard === 1 ? 'bg-[#102338] text-[#edbf74]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    1
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 block tracking-tight">
                      Nivel Académico / Institución
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BD944D] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#875d14] truncate">
                        {config.nivel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    activeCard === 1 ? 'rotate-180 text-slate-700' : ''
                  }`} />
                </div>
              </button>

              {activeCard === 1 && (
                <div className="p-3.5 sm:p-4 pt-1 border-t border-slate-100 bg-slate-50/40 animate-in fade-in">
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {NIVEL_OPTIONS.map((item) => {
                      const isSelected = config.nivel === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setConfig(prev => ({ ...prev, nivel: item }));
                          }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[#BD944D] bg-[#102338] text-white font-semibold shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                          }`}
                        >
                          <span className="truncate pr-2">{item}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#edbf74] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* TARJETA 2: Material de Cubierta */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleCard(2)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
                aria-expanded={activeCard === 2}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    activeCard === 2 ? 'bg-[#102338] text-[#edbf74]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    2
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 block tracking-tight">
                      Material de Cubierta
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BD944D] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#875d14] truncate">
                        {config.material}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    activeCard === 2 ? 'rotate-180 text-slate-700' : ''
                  }`} />
                </div>
              </button>

              {activeCard === 2 && (
                <div className="p-3.5 sm:p-4 pt-1 border-t border-slate-100 bg-slate-50/40 animate-in fade-in">
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setConfig(prev => ({ ...prev, material: 'Modelo Clásico' }));
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        config.material === 'Modelo Clásico' || config.material === 'Cuerina acolchada premium'
                          ? 'border-[#BD944D] bg-[#102338] text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-bold text-xs">Modelo Clásico</span>
                        {(config.material === 'Modelo Clásico' || config.material === 'Cuerina acolchada premium') && (
                          <Check className="w-3.5 h-3.5 text-[#edbf74]" />
                        )}
                      </div>
                      <span className={`text-[10px] ${
                        config.material === 'Modelo Clásico' || config.material === 'Cuerina acolchada premium'
                          ? 'text-slate-300'
                          : 'text-slate-500'
                      }`}>
                        Cuerina acolchada premium
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setConfig(prev => ({ ...prev, material: 'Modelo Percalina' }));
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        config.material === 'Modelo Percalina' || config.material === 'Percalina clásica con textura'
                          ? 'border-[#BD944D] bg-[#102338] text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-bold text-xs">Modelo Percalina</span>
                        {(config.material === 'Modelo Percalina' || config.material === 'Percalina clásica con textura') && (
                          <Check className="w-3.5 h-3.5 text-[#edbf74]" />
                        )}
                      </div>
                      <span className={`text-[10px] ${
                        config.material === 'Modelo Percalina' || config.material === 'Percalina clásica con textura'
                          ? 'text-slate-300'
                          : 'text-slate-500'
                      }`}>
                        Percalina clásica con textura
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* TARJETA 3: Grabado en Tapa */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleCard(3)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
                aria-expanded={activeCard === 3}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    activeCard === 3 ? 'bg-[#102338] text-[#edbf74]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    3
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 block tracking-tight">
                      Grabado en Tapa
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BD944D] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#875d14] truncate">
                        {config.personalizacion}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    activeCard === 3 ? 'rotate-180 text-slate-700' : ''
                  }`} />
                </div>
              </button>

              {activeCard === 3 && (
                <div className="p-3.5 sm:p-4 pt-1 border-t border-slate-100 bg-slate-50/40 animate-in fade-in">
                  <div className="space-y-2 pt-2">
                    {GRABADO_OPTIONS.map((item) => {
                      const isSelected = config.personalizacion === item;
                      return (
                        <label 
                          key={item} 
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                            isSelected 
                              ? 'border-[#BD944D] bg-amber-50/70 font-semibold text-slate-900 shadow-xs' 
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input 
                              type="radio" 
                              name="personalizacion_diploma"
                              checked={isSelected}
                              onChange={() => {
                                setConfig(prev => ({ ...prev, personalizacion: item }));
                              }}
                              className="text-[#875d14] focus:ring-[#BD944D] cursor-pointer"
                            />
                            <span>{item}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#BD944D] shrink-0" />}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* TARJETA 4: Cantidad Requerida */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleCard(4)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
                aria-expanded={activeCard === 4}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    activeCard === 4 ? 'bg-[#102338] text-[#edbf74]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    4
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 block tracking-tight">
                      Cantidad Requerida
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BD944D] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#875d14] truncate">
                        {config.cantidad} {config.cantidad === 1 ? 'unidad' : 'unidades'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    activeCard === 4 ? 'rotate-180 text-slate-700' : ''
                  }`} />
                </div>
              </button>

              {activeCard === 4 && (
                <div className="p-3.5 sm:p-4 pt-1 border-t border-slate-100 bg-slate-50/40 animate-in fade-in">
                  <div className="pt-2">
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                      <div className="flex flex-col pr-2">
                        <span className="text-xs font-semibold text-slate-900">Unidades a confeccionar</span>
                        <span className="text-[11px] text-slate-500 mt-0.5">
                          {config.cantidad === 1 ? 'Portadiploma individual' : 'Descuentos para grupos y promociones'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-xs shrink-0">
                        <button 
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, cantidad: Math.max(1, prev.cantidad - 1) }))}
                          disabled={config.cantidad <= 1}
                          className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-700 disabled:opacity-40 cursor-pointer"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-extrabold text-slate-900 text-sm">
                          {config.cantidad}
                        </span>
                        <button 
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, cantidad: prev.cantidad + 1 }))}
                          className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#102338] text-white hover:bg-[#183454] cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* TARJETA 5: Características Especiales */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleCard(5)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
                aria-expanded={activeCard === 5}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    activeCard === 5 ? 'bg-[#102338] text-[#edbf74]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    5
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 block tracking-tight">
                      Características Especiales
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BD944D] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#875d14] truncate">
                        {config.tipoProducto}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    activeCard === 5 ? 'rotate-180 text-slate-700' : ''
                  }`} />
                </div>
              </button>

              {activeCard === 5 && (
                <div className="p-3.5 sm:p-4 pt-1 border-t border-slate-100 bg-slate-50/40 animate-in fade-in">
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {CARACTERISTICAS_OPCIONES.map((item) => {
                      const isSelected = config.tipoProducto === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setConfig(prev => ({ 
                              ...prev, 
                              tipoProducto: item,
                              caracteristicasEspeciales: item 
                            }));
                            setActiveCard(6);
                          }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[#BD944D] bg-[#102338] text-white font-semibold shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                          }`}
                        >
                          <span className="truncate pr-2">{item}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#edbf74] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 mt-3">
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Nota o especificación adicional <span className="text-slate-400 font-normal">(Opcional)</span>
                    </label>
                    <input 
                      type="text" 
                      value={config.observaciones || ''}
                      onChange={(e) => setConfig(prev => ({ ...prev, observaciones: e.target.value }))}
                      placeholder="Ej. Promoción 2026, medidas especiales, fecha límite..."
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BD944D]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* TARJETA 6: Foto de referencia */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleCard(6)}
                className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
                aria-expanded={activeCard === 6}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    activeCard === 6 ? 'bg-[#102338] text-[#edbf74]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    6
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 block tracking-tight">
                      Foto de referencia
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                      {config.archivo ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="text-[11px] font-semibold text-emerald-700 truncate">
                            {config.archivo}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                          <span className="text-[11px] font-semibold text-slate-400 truncate">
                            No adjuntada (Opcional)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    activeCard === 6 ? 'rotate-180 text-slate-700' : ''
                  }`} />
                </div>
              </button>

              {activeCard === 6 && (
                <div className="p-3.5 sm:p-4 pt-1 border-t border-slate-100 bg-white animate-in fade-in">
                  <p className="text-xs text-slate-600 mb-3 pt-2 leading-relaxed">
                    Adjunta una foto de un modelo o trabajo anterior si ya tienes una referencia.
                  </p>

                  {/* Área punteada para la foto */}
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 mb-3 bg-slate-50/50 flex flex-col items-center justify-center text-center transition-colors">
                    {photoPreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={photoPreview}
                          alt="Foto de referencia cargada"
                          className="w-24 h-24 object-cover rounded-xl border border-slate-200 shadow-sm"
                        />
                        <span className="text-xs font-semibold text-slate-800 truncate max-w-[200px]">
                          {config.archivo}
                        </span>
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="text-[11px] text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer pt-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Quitar foto</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1.5 py-2">
                        <ImageIcon className="w-9 h-9 text-slate-400 stroke-[1.4]" />
                        <span className="text-xs text-slate-400 font-medium">
                          No hay foto adjuntada
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Botones de acción: Adjuntar foto | Tomar foto */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="min-h-[44px] py-2.5 px-3 bg-[#102338] hover:bg-[#183454] active:bg-[#071322] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-xs"
                    >
                      <ImageIcon className="w-4 h-4 text-white" />
                      <span>Adjuntar foto</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStartCamera}
                      className="min-h-[44px] py-2.5 px-3 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-xs"
                    >
                      <Camera className="w-4 h-4 text-slate-700" />
                      <span>Tomar foto</span>
                    </button>
                  </div>
                </div>
              )}
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

      {/* Live Camera Viewfinder Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 z-70 bg-black flex flex-col animate-in fade-in">
          {/* Camera Header */}
          <div className="flex items-center justify-between p-4 bg-black/70 text-white z-10">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#edbf74]" />
              <span className="text-sm font-bold tracking-tight">Cámara en vivo</span>
            </div>
            <button
              type="button"
              onClick={handleCloseCamera}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-transform active:scale-90"
              aria-label="Cerrar cámara"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video stream viewport */}
          <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Target alignment frame */}
            <div className="absolute inset-8 border-2 border-white/40 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <span className="w-4 h-4 border-t-2 border-l-2 border-[#edbf74]" />
                <span className="w-4 h-4 border-t-2 border-r-2 border-[#edbf74]" />
              </div>
              <span className="text-center text-xs text-white/80 bg-black/50 backdrop-blur-xs py-1 px-3 rounded-full mx-auto font-medium">
                Enfoca tu portadiploma o referencia
              </span>
              <div className="flex justify-between">
                <span className="w-4 h-4 border-b-2 border-l-2 border-[#edbf74]" />
                <span className="w-4 h-4 border-b-2 border-r-2 border-[#edbf74]" />
              </div>
            </div>
          </div>

          {/* Bottom camera controls */}
          <div className="p-6 bg-black flex items-center justify-around z-10 pb-8">
            <button
              type="button"
              onClick={handleFlipCamera}
              className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center cursor-pointer transition-all"
              title="Girar cámara"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Shutter button */}
            <button
              type="button"
              onClick={handleCapturePhoto}
              className="w-20 h-20 rounded-full bg-white border-4 border-slate-400 p-1 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-2xl"
              aria-label="Capturar foto"
            >
              <div className="w-full h-full rounded-full bg-white border-2 border-slate-900 flex items-center justify-center">
                <Camera className="w-7 h-7 text-slate-900" />
              </div>
            </button>

            <button
              type="button"
              onClick={handleCloseCamera}
              className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center cursor-pointer transition-all"
              title="Cancelar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
