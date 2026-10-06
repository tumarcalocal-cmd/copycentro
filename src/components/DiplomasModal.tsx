import React, { useState } from 'react';
import { X, Award } from 'lucide-react';
import { PortadiplomasScreen } from './PortadiplomasScreen';

interface DiplomasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmpastados?: () => void;
}

export const DiplomasModal: React.FC<DiplomasModalProps> = ({ 
  isOpen, 
  onClose, 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-[#BD944D]">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Portadiplomas Panamá</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <PortadiplomasScreen onNavigateToInicio={onClose} />
        </div>
      </div>
    </div>
  );
};
