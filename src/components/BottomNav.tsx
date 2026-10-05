import React from 'react';
import { LayoutGrid, BookOpen, Send } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg select-none">
      <div className="max-w-[480px] mx-auto grid grid-cols-3 items-center h-16 px-4">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onTabChange('enlaces')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'enlaces' ? 'text-[#875d14]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Inicio"
        >
          <div className="relative">
            <LayoutGrid className={`w-5 h-5 ${activeTab === 'enlaces' ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
            {activeTab === 'enlaces' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#875d14]" />
            )}
          </div>
          <span className={`text-[11px] mt-1 font-semibold tracking-tight ${
            activeTab === 'enlaces' ? 'text-[#875d14] font-bold' : 'text-slate-600'
          }`}>
            Inicio
          </span>
        </button>

        {/* Tab 2: Servicios */}
        <button
          onClick={() => onTabChange('servicios')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'servicios' ? 'text-[#875d14]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Servicios"
        >
          <div className="relative">
            <BookOpen className={`w-5 h-5 ${activeTab === 'servicios' ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
            {activeTab === 'servicios' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#875d14]" />
            )}
          </div>
          <span className={`text-[11px] mt-1 font-semibold tracking-tight ${
            activeTab === 'servicios' ? 'text-[#875d14] font-bold' : 'text-slate-600'
          }`}>
            Diseños
          </span>
        </button>

        {/* Tab 3: Empastados */}
        <button
          onClick={() => onTabChange('solicitar')}
          className={`flex flex-col items-center justify-center h-full min-h-[48px] transition-colors cursor-pointer ${
            activeTab === 'solicitar' ? 'text-[#875d14]' : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Empastados"
        >
          <div className="relative">
            <Send className={`w-5 h-5 ${activeTab === 'solicitar' ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
            {activeTab === 'solicitar' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#875d14]" />
            )}
          </div>
          <span className={`text-[11px] mt-1 font-semibold tracking-tight ${
            activeTab === 'solicitar' ? 'text-[#875d14] font-bold' : 'text-slate-600'
          }`}>
            Empastados
          </span>
        </button>
      </div>
    </nav>
  );
};
