// Guarda los archivos reales que el cliente adjunta (PDF o foto) para poder
// enviarlos por WhatsApp. No se guardan en el estado porque un File no se puede serializar.
const store: Record<string, File | null> = {};

export const setAttachment = (key: 'empastado' | 'diploma', file: File | null) => {
  store[key] = file;
};

export const getAttachment = (key: 'empastado' | 'diploma'): File | null => store[key] || null;
