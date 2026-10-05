import React, { useState, useRef } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { DESIGN_SHOWCASES } from '../data/mockData';
import { DesignShowcase, EmpastadoConfig } from '../types';
import { ReturnButton } from './common/ReturnButton';
import { DesignCard } from './servicios/DesignCard';
import { OrderInquirySection } from './servicios/OrderInquirySection';

interface ServiciosScreenProps {
  onNavigateToInicio: () => void;
  onNavigateToSolicitar: (preset?: Partial<EmpastadoConfig>) => void;
  onSelectDesign: (design: DesignShowcase) => void;
  selectedDesignId?: string;
  initialSubTab?: 'disenos' | 'rastreo';
}

export const ServiciosScreen: React.FC<ServiciosScreenProps> = ({
  onNavigateToInicio,
  onNavigateToSolicitar,
  onSelectDesign,
  selectedDesignId,
  initialSubTab = 'disenos',
}) => {
  const [subTab, setSubTab] = useState<'solicitar' | 'disenos' | 'pedidos'>(
    initialSubTab === 'rastreo' ? 'pedidos' : 'disenos'
  );

  const rastreoSectionRef = useRef<HTMLDivElement>(null);

  const handleSubTabClick = (tab: 'solicitar' | 'disenos' | 'pedidos') => {
    setSubTab(tab);
    if (tab === 'solicitar') {
      onNavigateToSolicitar();
    } else if (tab === 'pedidos') {
      rastreoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-1">
      {/* Top Volver al inicio button */}
      <ReturnButton onClick={onNavigateToInicio} />

      {/* Sub Tabs Selector */}
      <div className="grid grid-cols-3 bg-slate-200/80 p-1 rounded-2xl mb-5 text-center">
        <button
          type="button"
          onClick={() => handleSubTabClick('solicitar')}
          className={`min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'solicitar'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Solicitar
        </button>

        <button
          type="button"
          onClick={() => handleSubTabClick('disenos')}
          className={`min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'disenos'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Diseños
        </button>

        <button
          type="button"
          onClick={() => handleSubTabClick('pedidos')}
          className={`min-h-[44px] py-2 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center ${
            subTab === 'pedidos'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Consulte su pedido
        </button>
      </div>

      {/* Brand Banner */}
      <div className="bg-[#102338] text-white p-4 rounded-2xl shadow-md mb-6 flex items-center gap-3.5 border border-[#BD944D]/25">
        <div className="w-10 h-10 rounded-full bg-[#bd944d] text-[#102338] flex items-center justify-center shrink-0 font-bold shadow-inner">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-wider text-[#edbf74] uppercase block">
            PORTADIPLOMAS PANAMÁ
          </span>
          <p className="text-xs text-slate-200 leading-snug mt-0.5">
            Acabados de lujo, caligrafía reglamentaria y foliación oficial en Panamá.
          </p>
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center mb-5">
        <div className="flex items-center justify-center gap-2">
          <span className="w-1 h-3.5 bg-[#a87823] rounded-full inline-block" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Diseños de Empastados
          </h2>
          <span className="w-1 h-3.5 bg-[#a87823] rounded-full inline-block" />
        </div>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
          Espacios preparados para visualizar los trabajos directos de nuestro equipo. Seleccione su modelo preferido para aplicarlo a su solicitud.
        </p>
      </div>

      {/* Quick Visual Hint */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 mb-5 flex items-start gap-2.5 text-xs text-amber-900 shadow-xs">
        <Sparkles className="w-4 h-4 text-[#BD944D] shrink-0 mt-0.5" />
        <p className="leading-snug">
          <span className="font-bold">Pista:</span> Al tocar <span className="font-semibold text-[#875d14]">«Elegir este diseño»</span> en cualquiera de los modelos, se vinculará de inmediato a tu solicitud de empastado.
        </p>
      </div>

      {/* Showcase Cards List */}
      <div className="space-y-6 mb-8">
        {DESIGN_SHOWCASES.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            isSelected={selectedDesignId === design.id}
            onSelect={onSelectDesign}
          />
        ))}
      </div>

      {/* Order Inquiry Section */}
      <OrderInquirySection sectionRef={rastreoSectionRef} />
    </div>
  );
};
