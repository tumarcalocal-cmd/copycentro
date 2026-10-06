import { useState, useEffect } from 'react';
import { optimizeUploadedImage } from '../utils/imageOptimizer';

const STORAGE_PREFIX = 'pdp_modelo_photo_';

// Mapping from model ID to expected original filename
export const MODELO_FILE_MAP: Record<string, string> = {
  'mod-01': 'tesis4.jpg',
  'mod-02': 'tesis.jpg',
  'mod-03': 'tesis7.jpg',
  'mod-04': 'tesis2.jpg',
  'mod-05': 'tesis3.jpg',
  'mod-06': 'tesis5.jpg',
  'mod-07': 'tesis6.jpg',
};

export function useModelosPhotos() {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const loaded: Record<string, string> = {};
      Object.keys(MODELO_FILE_MAP).forEach((modelId) => {
        const saved = localStorage.getItem(`${STORAGE_PREFIX}${modelId}`);
        if (saved) {
          loaded[modelId] = saved;
        }
      });
      setCustomPhotos(loaded);
    } catch {
      // localStorage fallback
    }
  }, []);

  const savePhoto = async (modelId: string, dataUrlOrFile: string | File) => {
    let finalUrl = '';
    if (typeof dataUrlOrFile === 'string') {
      finalUrl = dataUrlOrFile;
    } else {
      finalUrl = await optimizeUploadedImage(dataUrlOrFile);
    }

    if (!finalUrl) return;

    // Update state immediately so the image shows right away!
    setCustomPhotos((prev) => ({ ...prev, [modelId]: finalUrl }));

    try {
      localStorage.setItem(`${STORAGE_PREFIX}${modelId}`, finalUrl);
    } catch (err) {
      console.warn('Almacenamiento local lleno, manteniéndose en memoria de sesión', err);
    }
  };

  const handleFilesUpload = (files: FileList | File[]) => {
    Array.from(files).forEach(async (file) => {
      const name = file.name.toLowerCase();
      let targetId: string | null = null;
      if (name.includes('tesis4')) targetId = 'mod-01';
      else if (name.includes('tesis.') || name === 'tesis.jpg' || name === 'tesis.png' || name === 'tesis.jpeg') targetId = 'mod-02';
      else if (name.includes('tesis7')) targetId = 'mod-03';
      else if (name.includes('tesis2')) targetId = 'mod-04';
      else if (name.includes('tesis3')) targetId = 'mod-05';
      else if (name.includes('tesis5')) targetId = 'mod-06';
      else if (name.includes('tesis6')) targetId = 'mod-07';

      if (targetId) {
        await savePhoto(targetId, file);
      }
    });
  };

  const getPhotoForModel = (modelId: string, fallbackUrl: string) => {
    if (customPhotos[modelId]) {
      return customPhotos[modelId];
    }
    const fileName = MODELO_FILE_MAP[modelId];
    if (fileName) {
      return `/images/modelos/${fileName}`;
    }
    return fallbackUrl;
  };

  return {
    customPhotos,
    savePhoto,
    handleFilesUpload,
    getPhotoForModel,
  };
}
