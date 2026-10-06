import { WORKSHOP_INFO } from '../data/mockData';
import { EmpastadoConfig, DiplomaConfig } from '../types';

/**
 * Encodes text and triggers WhatsApp web or app redirect safely.
 */
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
    `• Producto: ${config.tipoProducto}\n` +
    `• Nivel educativo: ${config.nivel}\n` +
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
