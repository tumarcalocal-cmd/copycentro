import { useState, useEffect } from 'react';
import { optimizeUploadedImage } from '../utils/imageOptimizer';

const STORAGE_PREFIX = 'pdp_hero_';

export function useHeroPhotos() {
  const [heroPhotos, setHeroPhotos] = useState<Record<string, string>>({
    acabadosOro: '/images/modelos/tesis_azul_oro.jpg',
    portadiplomas: '/images/portadiplomas/port1.png',
  });

  useEffect(() => {
    try {
      const savedAcabados = localStorage.getItem(`${STORAGE_PREFIX}acabadosOro`);
      const savedPorta = localStorage.getItem(`${STORAGE_PREFIX}portadiplomas`);
      
      // Si el valor guardado es el default anterior o está vacío, usar la nueva imagen
      const finalAcabados = (savedAcabados && !savedAcabados.includes('tesis4.jpg')) 
        ? savedAcabados 
        : '/images/modelos/tesis_azul_oro.jpg';

      setHeroPhotos(prev => ({
        acabadosOro: finalAcabados,
        portadiplomas: savedPorta || prev.portadiplomas,
      }));
    } catch {
      // localStorage fallback
    }
  }, []);

  const saveHeroPhoto = async (slot: 'acabadosOro' | 'portadiplomas', file: File) => {
    // 1. Vista previa instantánea sin demora (0ms)
    try {
      const immediateUrl = URL.createObjectURL(file);
      setHeroPhotos(prev => ({ ...prev, [slot]: immediateUrl }));
    } catch {
      // fallback
    }

    // 2. Optimización y persistencia en localStorage para que no se pierda al recargar
    try {
      const optimized = await optimizeUploadedImage(file);
      if (optimized) {
        setHeroPhotos(prev => ({ ...prev, [slot]: optimized }));
        localStorage.setItem(`${STORAGE_PREFIX}${slot}`, optimized);
      }
    } catch (err) {
      console.warn('Almacenamiento local lleno o no disponible:', err);
    }
  };

  return {
    heroPhotos,
    saveHeroPhoto,
  };
}
