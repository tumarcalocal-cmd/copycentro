import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ReturnButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export const ReturnButton: React.FC<ReturnButtonProps> = ({
  onClick,
  label = 'Volver al inicio',
  className = 'mb-3',
}) => {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2.5 bg-[#102338] hover:bg-[#183454] active:bg-[#0b1827] text-white rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
        aria-label={label}
      >
        <ArrowLeft className="w-4 h-4 text-white" />
        <span>{label}</span>
      </button>
    </div>
  );
};
