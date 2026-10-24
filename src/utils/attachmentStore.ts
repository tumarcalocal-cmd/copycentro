// Guarda los archivos reales que el cliente adjunta (PDF, Word o fotos) para poder
// subirlos y enviarlos por WhatsApp. No van en el estado porque un File no se puede serializar.
type Key = 'empastado' | 'diploma';
const store: Record<Key, File[]> = { empastado: [], diploma: [] };

export const setAttachment = (key: Key, file: File | null) => {
  store[key] = file ? [file] : [];
};

export const addAttachments = (key: Key, files: File[]) => {
  store[key] = [...store[key], ...files];
  return store[key];
};

export const removeAttachment = (key: Key, index: number) => {
  store[key] = store[key].filter((_, i) => i !== index);
  return store[key];
};

export const getAttachments = (key: Key): File[] => store[key];
