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

/**
 * Ventana con 2 pasos claros:
 * 1) Abre el chat del taller con el mensaje de la solicitud.
 * 2) Envía el archivo a ese chat (en celular con el menú de compartir; en computadora se adjunta con el clip).
 */
export const sendWhatsAppWithFile = (text: string, file: File | null): void => {
  if (!file || typeof document === 'undefined') {
    openWhatsApp(text);
    return;
  }

  const mobileShare = canShareFile(file);
  const overlay = document.createElement('div');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:9999;background:rgba(7,19,34,.65);display:flex;align-items:flex-end;justify-content:center;padding:16px;font-family:Inter,system-ui,sans-serif;';

  const step2Text = mobileShare
    ? 'Toca el botón, escoge <b>WhatsApp</b> y luego el chat de <b>Porta Diplomas</b> (aparece de primero en la lista).'
    : 'En el chat de WhatsApp toca el clip 📎 (o arrastra el archivo) y adjunta <b>' + file.name.replace(/</g, '&lt;') + '</b>.';

  overlay.innerHTML = `
    <div style="background:#fff;width:100%;max-width:420px;border-radius:20px;padding:20px;box-shadow:0 20px 50px rgba(0,0,0,.3);margin-bottom:env(safe-area-inset-bottom);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <strong style="font-size:17px;color:#102338;">Envía tu solicitud en 2 pasos</strong>
        <button data-close aria-label="Cerrar" style="border:0;background:#f1f5f9;border-radius:999px;width:32px;height:32px;font-size:18px;color:#475569;cursor:pointer;">×</button>
      </div>
      <p style="font-size:13px;color:#64748b;margin:0 0 14px;">Así el taller recibe tu mensaje y tu archivo juntos.</p>

      <div data-step1 style="border:2px solid #BD944D;border-radius:14px;padding:14px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:#102338;margin-bottom:4px;">Paso 1: Envía el mensaje</div>
        <div style="font-size:13px;color:#475569;margin-bottom:10px;">Se abre WhatsApp con tu solicitud lista. Dale enviar y regresa a esta página.</div>
        <button data-btn1 style="width:100%;min-height:46px;border:0;border-radius:12px;background:#059669;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">Abrir WhatsApp</button>
      </div>

      <div data-step2 style="border:2px solid #e2e8f0;border-radius:14px;padding:14px;opacity:.55;">
        <div style="font-size:14px;font-weight:700;color:#102338;margin-bottom:4px;">Paso 2: Envía tu archivo</div>
        <div style="font-size:13px;color:#475569;margin-bottom:${mobileShare ? '10px' : '0'};">${step2Text}</div>
        ${mobileShare ? '<button data-btn2 style="width:100%;min-height:46px;border:0;border-radius:12px;background:#102338;color:#fff;font-weight:700;font-size:15px;cursor:pointer;">Enviar archivo</button>' : ''}
      </div>
      <button data-done style="display:none;width:100%;margin-top:12px;min-height:42px;border:0;border-radius:12px;background:#f1f5f9;color:#102338;font-weight:600;font-size:14px;cursor:pointer;">Listo, ya lo envié</button>
    </div>`;

  const close = () => overlay.remove();
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('[data-close]')?.addEventListener('click', close);
  overlay.querySelector('[data-done]')?.addEventListener('click', close);

  const step1 = overlay.querySelector('[data-step1]') as HTMLElement;
  const step2 = overlay.querySelector('[data-step2]') as HTMLElement;
  const done = overlay.querySelector('[data-done]') as HTMLElement;

  overlay.querySelector('[data-btn1]')?.addEventListener('click', () => {
    openWhatsApp(text);
    step1.style.borderColor = '#e2e8f0';
    step1.style.opacity = '.55';
    const b1 = overlay.querySelector('[data-btn1]') as HTMLButtonElement;
    b1.textContent = '✓ Mensaje abierto';
    b1.style.background = '#94a3b8';
    step2.style.borderColor = '#BD944D';
    step2.style.opacity = '1';
    done.style.display = 'block';
  });

  overlay.querySelector('[data-btn2]')?.addEventListener('click', () => {
    navigator.share({ files: [file] }).then(close).catch(() => { /* cerró el menú: se queda en la ventana */ });
  });

  document.body.appendChild(overlay);
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
