import { WORKSHOP_INFO } from '../data/mockData';
import { EmpastadoConfig, DiplomaConfig } from '../types';

/**
 * Encodes text and triggers WhatsApp web or app redirect safely.
 */
const buildWhatsAppUrl = (text: string, phone: string = WORKSHOP_INFO.whatsapp): string =>
  `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;

/**
 * Un solo botón: si hay archivo lo sube a la nube y agrega el enlace al mensaje; luego abre el chat del taller.
 * La pestaña se abre antes de subir para que el navegador no la bloquee.
 * buildMessage recibe el enlace (o null si no hay archivo o falló la subida).
 */
export const sendWhatsAppWithUpload = async (
  buildMessage: (fileUrl: string | null) => string,
  file: File | null
): Promise<void> => {
  if (!file) {
    openWhatsApp(buildMessage(null));
    return;
  }

  const win = window.open('', '_blank');
  if (win) {
    win.document.write('<p style="font-family:sans-serif;text-align:center;margin-top:40vh">Subiendo tu archivo y abriendo WhatsApp…</p>');
  }

  const { uploadAttachment } = await import('./fileUpload');
  const url = await uploadAttachment(file);
  const waUrl = buildWhatsAppUrl(buildMessage(url));

  if (win && !win.closed) {
    win.location.href = waUrl;
  } else {
    window.location.href = waUrl;
  }
};

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
  personalizaciones: string,
  fileUrl: string | null = null
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
    message += fileUrl
      ? `Archivo adjunto: ${config.uploadedFileName}\nDescargar archivo: ${fileUrl}\n`
      : `Archivo adjunto: ${config.uploadedFileName} (lo envío por este chat)\n`;
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
