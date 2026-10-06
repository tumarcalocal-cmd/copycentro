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
      setHeroPhotos(prev => ({
        acabadosOro: savedAcabados || prev.acabadosOro,
        portadiplomas: savedPorta || prev.portadiplomas,
      }));
    } catch {
      // localStorage fallback
    }
  }, []);

  const saveHeroPhoto = async (slot: 'acabadosOro' | 'portadiplomas', file: File) => {
    const optimized = await optimizeUploadedImage(file);
    if (!optimized) return;

    setHeroPhotos(prev => ({ ...prev, [slot]: optimized }));
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${slot}`, optimized);
    } catch (err) {
      console.warn('Almacenamiento local lleno', err);
    }
  };

  return {
    heroPhotos,
    saveHeroPhoto,
  };
}
