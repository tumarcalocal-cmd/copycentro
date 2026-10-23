// Subida de archivos (PDF / fotos) a Supabase Storage para enviarlos como enlace por WhatsApp.
// La "publishable key" está hecha para usarse en páginas públicas: solo permite subir a la carpeta "solicitudes".
const SUPABASE_URL = 'https://ofxmwpcrqwdxcloaqnpt.supabase.co';
const SUPABASE_KEY = 'sb_publishable__KRu-75grv7ptNUipO171A_rJE36M-H';
const BUCKET = 'solicitudes';

const safeName = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .slice(-80) || 'archivo';

/** Sube el archivo y devuelve el enlace público para descargarlo, o null si falla. */
export const uploadAttachment = async (file: File): Promise<string | null> => {
  try {
    const day = new Date().toISOString().slice(0, 10);
    const path = `${day}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${safeName(file.name)}`;
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': file.type || 'application/octet-stream',
        'x-upsert': 'false',
      },
      body: file,
    });
    if (!res.ok) {
      console.warn('No se pudo subir el archivo', res.status, await res.text().catch(() => ''));
      return null;
    }
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
  } catch (err) {
    console.warn('No se pudo subir el archivo', err);
    return null;
  }
};
