import { useState, useEffect } from 'react';

export interface CardTextConfig {
  title: string;
  subtitle: string;
  visible: boolean;
}

export const DEFAULT_CARD_TEXTS: Record<'card1' | 'card2', CardTextConfig> = {
  card1: {
    title: '',
    subtitle: '',
    visible: false,
  },
  card2: {
    title: '',
    subtitle: '',
    visible: false,
  },
};

const STORAGE_KEY = 'pdp_showcase_card_texts_v3';

export function useCardTexts() {
  const [cardTexts, setCardTexts] = useState<Record<'card1' | 'card2', CardTextConfig>>(() => {
    if (typeof window === 'undefined') return DEFAULT_CARD_TEXTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CARD_TEXTS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Error reading card texts:', e);
    }
    return DEFAULT_CARD_TEXTS;
  });

  const updateCardText = (key: 'card1' | 'card2', data: Partial<CardTextConfig>) => {
    setCardTexts((prev) => {
      const next = {
        ...prev,
        [key]: {
          ...prev[key],
          ...data,
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Error saving card texts:', e);
      }
      return next;
    });
  };

  const deleteCardText = (key: 'card1' | 'card2') => {
    updateCardText(key, { visible: false, title: '', subtitle: '' });
  };

  const resetCardText = (key: 'card1' | 'card2') => {
    updateCardText(key, DEFAULT_CARD_TEXTS[key]);
  };

  return {
    cardTexts,
    updateCardText,
    deleteCardText,
    resetCardText,
  };
}
