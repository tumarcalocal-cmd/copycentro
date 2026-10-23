import { WORKSHOP_INFO } from '../data/mockData';
import { EmpastadoConfig, DiplomaConfig } from '../types';

/**
 * Encodes text and triggers WhatsApp web or app redirect safely.
 */
const isMobileDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isIpadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  return /Android|iPhone|iPad|iPod/i.test(ua) || isIpadOS;
};

const canShareFile = (file: File): boolean =>
  isMobileDevice() &&
  typeof navigator.share === 'function' &&
  typeof navigator.canShare === 'function' &&
  navigator.canShare({ files: [file] });

export const canShareFileToApps = (file: File | null): boolean => !!file && canShareFile(file);

/** Abre el menú de compartir del celular con el archivo, para mandarlo al chat de WhatsApp. */
export const shareFileToWhatsApp = (file: File): Promise<void> =>
  navigator.share({ files: [file] }).catch(() => { /* la persona cerró el menú */ });

export const openWhatsApp = (text: string, phone: string = WORKSHOP_INFO.whatsapp): void => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
};

/**
 * Builds WhatsApp message for Empastado request.
 */
export const formatEmpastadoMessage = (
  config: EmpastadoConfig,
  colorName: string,
  personalizaciones: string
): string => {
  const modalidadText = config.modalidad === 'solo_empastado' ? 'Solo empastado' : 'Impresión + Empastado';
  const papelText = config.paperType === 'bond_normal' ? 'Normal' : 'Papel algodón de tesis';

  let message = `Hola, quisiera solicitar información sobre este trabajo.\n\n` +
    `Servicio: Empastado\n` +
    `Modalidad: ${modalidadText}\n` +
    `Para retirar en: ${config.retiro || 'Por confirmar'}\n` +
    `Color: ${colorName}\n` +
    `Cantidad: ${config.copies} ${config.copies === 1 ? 'tomo' : 'tomos'}\n` +
    `Papel: ${papelText}\n` +
    `Páginas: ${config.pages}\n` +
    `Personalización: ${personalizaciones}\n`;

  if (config.uploadedFileName) {
    message += `Archivo adjunto: ${config.uploadedFileName}\n`;
  }

  if (config.observaciones?.trim()) {
    message += `Observaciones: ${config.observaciones.trim()}\n`;
  }

  message += `\nQuedo pendiente de que me confirmen el precio y disponibilidad.`;
  return message;
};

/**
 * Builds WhatsApp message for Order inquiry (Consulte su pedido).
 */
export const formatOrderInquiryMessage = (
  nombre: string,
  referencia?: string
): string => {
  const refLine = referencia && referencia.trim()
    ? `Referencia / factura: ${referencia.trim()}`
    : `No tengo el número de referencia a mano.`;

  return `Hola, quisiera consultar el estado de mi pedido.\n\n` +
    `Nombre: ${nombre.trim()}\n` +
    `${refLine}\n\n` +
    `¿Me pueden ayudar a verificarlo?`;
};

/**
 * Builds WhatsApp message for Diploma request.
 */
export const formatDiplomaMessage = (config: DiplomaConfig): string => {
  let message = `Hola Portadiplomas Panamá, deseo cotizar y solicitar el siguiente trabajo de portadiplomas:\n\n` +
    `*DETALLES DE LA SOLICITUD:*\n` +
    `• Características especiales: ${config.tipoProducto}\n` +
    `• Nivel educativo: ${config.nivel}\n` +
    `• Para retirar en: ${config.retiro || 'Por confirmar'}\n` +
    `• Material de tapa: ${config.material}\n` +
    `• Cantidad: ${config.cantidad} ${config.cantidad === 1 ? 'unidad' : 'unidades'}\n` +
    `• Color / Acabado: ${config.diseno}\n` +
    `• Personalización: ${config.personalizacion}\n`;

  if (config.observaciones?.trim()) {
    message += `• Observaciones: ${config.observaciones.trim()}\n`;
  }

  message += `\nQuedo a la espera de su cotización formal y confirmación. ¡Muchas gracias!`;
  return message;
};
