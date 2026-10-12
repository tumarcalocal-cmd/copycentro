import { useState, useEffect } from 'react';
import { optimizeUploadedImage } from '../utils/imageOptimizer';

const STORAGE_PREFIX = 'pdp_hero_';

export function useHeroPhotos() {
  const [heroPhotos, setHeroPhotos] = useState<Record<string, string>>({
    acabadosOro: '/images/inicio_empastados.jpg',
    portadiplomas: '/images/inicio_portadiplomas.jpg',
  });

  useEffect(() => {
    try {
      // Limpiar cualquier residuo de imágenes de IA
      localStorage.removeItem(`${STORAGE_PREFIX}acabadosOro`);
      localStorage.removeItem(`${STORAGE_PREFIX}portadiplomas`);
      localStorage.removeItem('pdp_hero_acabadosOro');
      localStorage.removeItem('pdp_hero_portadiplomas');

      // Cargar foto subida por el usuario si existe, o usar la foto original de taller
      const customOro = localStorage.getItem('pdp_hero_custom_acabadosOro');
      const customPorta = localStorage.getItem('pdp_hero_custom_portadiplomas');

      setHeroPhotos({
        acabadosOro: customOro || '/images/inicio_empastados.jpg',
        portadiplomas: customPorta || '/images/inicio_portadiplomas.jpg',
      });
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

    // 2. Optimización y guardado persistente
    try {
      const optimized = await optimizeUploadedImage(file);
      if (optimized) {
        setHeroPhotos(prev => ({ ...prev, [slot]: optimized }));
        localStorage.setItem(`pdp_hero_custom_${slot}`, optimized);
      }
    } catch (err) {
      console.warn('Almacenamiento local:', err);
    }
  };

  return {
    heroPhotos,
    saveHeroPhoto,
  };
}
