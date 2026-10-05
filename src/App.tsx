/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, EmpastadoConfig, DesignShowcase } from './types';
import { Header } from './components/Header';
import { EnlacesScreen } from './components/EnlacesScreen';
import { SolicitarScreen } from './components/SolicitarScreen';
import { ServiciosScreen } from './components/ServiciosScreen';
import { BottomNav } from './components/BottomNav';
import { ContactModal } from './components/ContactModal';
import { DiplomasModal } from './components/DiplomasModal';
import { Smartphone, Monitor, WifiOff } from 'lucide-react';
import { useOnlineStatus } from './hooks/useOnlineStatus';

export default function App() {
  const isOnline = useOnlineStatus();
  const [activeTab, setActiveTab] = useState<TabType>('enlaces');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDiplomasOpen, setIsDiplomasOpen] = useState(false);
  const [serviciosSubTab, setServiciosSubTab] = useState<'disenos' | 'rastreo'>('disenos');
  const [empastadoConfig, setEmpastadoConfig] = useState<EmpastadoConfig>({
    modalidad: 'solo_empastado',
    colorId: 'wine',
    copies: 1,
    paperType: 'bond_normal',
    pages: 80,
    goldLogo: true,
    spineLettering: true,
    cdPocket: false,
    uploadedFileName: 'documento_tesis_final.pdf',
    uploadedFileSize: '4.8 MB',
    detectedPages: 80,
    observaciones: '',
    selectedDesignId: 'des-01',
    selectedDesignTitle: 'N.º 01 · Maestría',
  });
  const [shouldScrollToDesign, setShouldScrollToDesign] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Navigation handlers
  const handleGoToInicio = () => {
    setActiveTab('enlaces');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToSolicitar = (preset?: Partial<EmpastadoConfig>) => {
    if (preset) {
      setEmpastadoConfig(prev => ({ ...prev, ...preset }));
    }
    setActiveTab('solicitar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDesign = (design: DesignShowcase) => {
    setEmpastadoConfig(prev => ({
      ...prev,
      selectedDesignId: design.id,
      selectedDesignTitle: `${design.number.replace('º', '.º')} · ${design.category}`,
      colorId: design.colorId || prev.colorId,
    }));
    setShouldScrollToDesign(true);
    setActiveTab('solicitar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToServicios = (subTab: 'disenos' | 'rastreo' = 'disenos') => {
    setServiciosSubTab(subTab);
    setActiveTab('servicios');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#eceff3] text-[#102338] flex flex-col items-center justify-start antialiased font-sans selection:bg-[#BD944D]/25">
      {/* Desktop view switcher affordance */}
      <div className="hidden lg:flex items-center gap-2 fixed top-3 left-4 z-50 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs text-xs text-slate-600 font-medium">
        <span>Modo de visualización:</span>
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
            isMobileFrame ? 'bg-[#102338] text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Móvil (390px)</span>
        </button>
        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
            !isMobileFrame ? 'bg-[#102338] text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Fluido</span>
        </button>
      </div>

      {/* Main App Container */}
      <div 
        className={`w-full min-h-screen bg-[#f9f9f9] shadow-2xl relative transition-all duration-300 flex flex-col ${
          isMobileFrame 
            ? 'max-w-[440px] my-0 sm:my-4 sm:rounded-3xl sm:border sm:border-slate-300/80 sm:min-h-[92vh] overflow-hidden' 
            : 'max-w-2xl'
        }`}
      >
        {/* Internet Connection Banner */}
        {!isOnline && (
          <div className="bg-amber-800 text-white text-[11px] font-medium py-1.5 px-3 text-center flex items-center justify-center gap-1.5 z-50 animate-in slide-in-from-top">
            <WifiOff className="w-3.5 h-3.5 text-amber-200" />
            <span>Estás sin conexión a internet. Las consultas por WhatsApp se abrirán al recuperar la señal.</span>
          </div>
        )}

        {/* Top Header with Back Button and Profile Icon */}
        <Header 
          onOpenContact={() => setIsContactOpen(true)} 
          activeTab={activeTab}
          onNavigateToInicio={handleGoToInicio}
        />

        {/* Tab Views */}
        <main className="flex-1 w-full overflow-y-auto">
          {activeTab === 'enlaces' && (
            <EnlacesScreen
              onNavigateToSolicitar={() => handleGoToSolicitar({ modalidad: 'solo_empastado' })}
              onNavigateToServicios={() => handleGoToServicios('disenos')}
              onOpenDiplomas={() => setIsDiplomasOpen(true)}
              onOpenContacto={() => setIsContactOpen(true)}
            />
          )}

          {activeTab === 'solicitar' && (
            <SolicitarScreen
              config={empastadoConfig}
              setConfig={setEmpastadoConfig}
              onNavigateToInicio={handleGoToInicio}
              onNavigateToDisenos={() => handleGoToServicios('disenos')}
              onNavigateToRastreo={() => handleGoToServicios('rastreo')}
              shouldScrollToDesign={shouldScrollToDesign}
              onClearScrollToDesign={() => setShouldScrollToDesign(false)}
            />
          )}

          {activeTab === 'servicios' && (
            <ServiciosScreen
              initialSubTab={serviciosSubTab}
              onNavigateToInicio={handleGoToInicio}
              onNavigateToSolicitar={handleGoToSolicitar}
              onSelectDesign={handleSelectDesign}
              selectedDesignId={empastadoConfig.selectedDesignId}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />

        {/* Interactive Modals */}
        <ContactModal 
          isOpen={isContactOpen} 
          onClose={() => setIsContactOpen(false)} 
        />

        <DiplomasModal 
          isOpen={isDiplomasOpen} 
          onClose={() => setIsDiplomasOpen(false)}
          onSelectEmpastados={() => {
            setIsDiplomasOpen(false);
            handleGoToSolicitar({ colorId: 'navy' });
          }}
        />
      </div>
    </div>
  );
}
