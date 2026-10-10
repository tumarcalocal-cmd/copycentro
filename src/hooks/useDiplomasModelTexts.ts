import { useState, useEffect, useCallback } from 'react';
import { PORTADIPLOMAS_MODELOS, PortadiplomaModelo } from '../data/diplomasModels';

export interface ModelTextOverride {
  category: string;
  title: string;
  visible: boolean; // false if deleted by user
}

const STORAGE_KEY = 'pdp_diplomas_model_texts_v2';

export function useDiplomasModelTexts() {
  const [overrides, setOverrides] = useState<Record<string, ModelTextOverride>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading diplomas model texts:', e);
    }
    return {};
  });

  const saveOverrides = useCallback((next: Record<string, ModelTextOverride>) => {
    setOverrides(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('pdp_model_texts_updated'));
    } catch (e) {
      console.warn('Error saving diplomas model texts:', e);
    }
  }, []);

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setOverrides(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('pdp_model_texts_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('pdp_model_texts_updated', handleSync);
    };
  }, []);

  const getModelText = useCallback((modelo: PortadiplomaModelo): ModelTextOverride => {
    const custom = overrides[modelo.id];
    if (custom) {
      return custom;
    }
    return {
      category: modelo.category,
      title: modelo.title,
      visible: true,
    };
  }, [overrides]);

  const updateModelText = useCallback((id: string, partial: Partial<ModelTextOverride>) => {
    setOverrides((prev) => {
      const current = prev[id] || {
        category: PORTADIPLOMAS_MODELOS.find(m => m.id === id)?.category || '',
        title: PORTADIPLOMAS_MODELOS.find(m => m.id === id)?.title || '',
        visible: true,
      };
      const next = {
        ...prev,
        [id]: {
          ...current,
          ...partial,
        },
      };
      saveOverrides(next);
      return next;
    });
  }, [saveOverrides]);

  const deleteModelText = useCallback((id: string) => {
    setOverrides((prev) => {
      const next = {
        ...prev,
        [id]: {
          category: '',
          title: '',
          visible: false,
        },
      };
      saveOverrides(next);
      return next;
    });
  }, [saveOverrides]);

  const resetModelText = useCallback((id: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[id];
      saveOverrides(next);
      return next;
    });
  }, [saveOverrides]);

  return {
    getModelText,
    updateModelText,
    deleteModelText,
    resetModelText,
  };
}
