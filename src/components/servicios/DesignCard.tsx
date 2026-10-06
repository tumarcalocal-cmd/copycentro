import React from 'react';
import { ModeloCard } from './ModeloCard';
import { DesignShowcase } from '../../types';

interface DesignCardProps {
  design: DesignShowcase;
  isSelected?: boolean;
  onSelect?: (design: DesignShowcase) => void;
  onOpenZoom?: (image: string, title: string) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, onOpenZoom }) => {
  return <ModeloCard modelo={design} imageSrc={design.image} onOpenZoom={onOpenZoom} />;
};
