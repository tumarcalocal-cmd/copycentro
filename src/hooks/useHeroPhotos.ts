import { useState, useEffect } from 'react';
import { optimizeUploadedImage } from '../utils/imageOptimizer';

const STORAGE_PREFIX = 'pdp_hero_';

export function useHeroPhotos() {
  const [heroPhotos, setHeroPhotos] = useState<Record<string, string>>({
    acabadosOro: '/images/modelos/tesis4.jpg',
    portadiplomas: '/images/portadiplomas/port1.png',
  });

  useEffect(() => {
    try {
      const savedAcabados = localStorage.getItem(`${STORAGE_PREFIX}acabadosOro`);
      const savedPorta = localStorage.getItem(`${STORAGE_PREFIX}portadiplomas`);
      
      // Si el valor guardado es de IA o está corrupto, usar la foto original de tesis4.jpg
      const finalAcabados = (savedAcabados && !savedAcabados.includes('tesis_azul_oro') && !savedAcabados.includes('1791566493131')) 
        ? savedAcabados 
        : '/images/modelos/tesis4.jpg';

      // Si había guardada una imagen de IA, limpiarla del localStorage
      if (savedAcabados && (savedAcabados.includes('tesis_azul_oro') || savedAcabados.includes('1791566493131'))) {
        localStorage.removeItem(`${STORAGE_PREFIX}acabadosOro`);
      }

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
