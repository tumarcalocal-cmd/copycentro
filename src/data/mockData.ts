import { CoverColor, DesignShowcase, OrderTrackResult } from '../types';

import bookGoldImg from '../assets/images/book_gold_embossing_1791164963344.jpg';
import diplomaHolderImg from '../assets/images/diploma_holder_navy_1791164973669.jpg';
import thesisMaestriaImg from '../assets/images/thesis_sample_maestria_1791164982546.jpg';
import thesisLicenciaturaImg from '../assets/images/thesis_sample_licenciatura_1791164992654.jpg';
import thesisPercalinaImg from '../assets/images/thesis_sample_percalina_1791165001473.jpg';

export const HERO_IMAGES = {
  acabadosOro: bookGoldImg,
  portadiplomas: diplomaHolderImg,
};

export const COVER_COLORS: CoverColor[] = [
  { id: 'navy', name: 'Azul Marino Clásico', hex: '#0B2341', university: 'UP / UTP' },
  { id: 'cyan', name: 'Azul Royal Eléctrico', hex: '#0284C7', university: 'UTP' },
  { id: 'red', name: 'Rojo Carmesí', hex: '#DC2626', university: 'ISAE' },
  { id: 'gold', name: 'Dorado Ocre', hex: '#D97706', university: 'Especial' },
  { id: 'wine', name: 'Vino institucional', hex: '#541525', university: 'UP Oficial' },
  { id: 'slate', name: 'Gris Grafito Plomo', hex: '#475569', university: 'Corporativo' },
  { id: 'green', name: 'Verde Bosque Notarial', hex: '#14532D', university: 'UDELAS' },
];

export const DESIGN_SHOWCASES: DesignShowcase[] = [
  {
    id: 'des-01',
    number: 'Nº 01',
    category: 'Maestría',
    title: 'Empastado Tesis Maestría en Cuero Azul Marino con Grabado Dorado',
    description: 'Piel sintética de alta densidad, letras estampadas al calor y cintillo separador de seda.',
    image: thesisMaestriaImg,
    colorHex: '#0B2341',
    colorName: 'Azul Marino',
    colorId: 'navy',
  },
  {
    id: 'des-02',
    number: 'Nº 02',
    category: 'Licenciatura',
    title: 'Empastado Licenciatura Vinotinto con Logo Troquelado y Lomo Personalizado',
    description: 'Alineado con especificaciones UTP, UP y UDILAS. Tipografía dorada indeleble de alta duración.',
    image: thesisLicenciaturaImg,
    colorHex: '#541525',
    colorName: 'Vino Institucional',
    colorId: 'wine',
  },
  {
    id: 'des-03',
    number: 'Nº 03',
    category: 'Tomo Doble',
    title: 'Empastado Tomo Doble Verde Oscuro con Acabado Percalina',
    description: 'Textura de tejido premium de alta resistencia, apto para protocolos notariales y proyectos extensos.',
    image: thesisPercalinaImg,
    colorHex: '#14532D',
    colorName: 'Verde Bosque',
    colorId: 'green',
  },
];

export const MOCK_ORDERS: Record<string, OrderTrackResult> = {
  'ped-2024-88': {
    orderId: 'PED-2024-88',
    customerName: 'Carlos Morales',
    service: 'Empastado Tesis Licenciatura (Vino Institucional, 3 tomos)',
    status: 'estampado',
    statusLabel: 'Grabado al calor en oro',
    stepNumber: 4,
    totalSteps: 5,
    estimatedDate: 'Hoy a las 4:30 PM',
    notes: 'Escudo UP troquelado y grabado de lomo listo. En proceso de enfriado y control de calidad.',
  },
  'carlos morales': {
    orderId: 'PED-2024-88',
    customerName: 'Carlos Morales',
    service: 'Empastado Tesis Licenciatura (Vino Institucional, 3 tomos)',
    status: 'estampado',
    statusLabel: 'Grabado al calor en oro',
    stepNumber: 4,
    totalSteps: 5,
    estimatedDate: 'Hoy a las 4:30 PM',
    notes: 'Escudo UP troquelado y grabado de lomo listo. En proceso de enfriado y control de calidad.',
  },
  'ped-2024-92': {
    orderId: 'PED-2024-92',
    customerName: 'Lic. Ana Chen',
    service: 'Portadiplomas Finos Azul Marino con Escudo Dorado (2 unidades)',
    status: 'listo',
    statusLabel: 'Listo para entrega',
    stepNumber: 5,
    totalSteps: 5,
    estimatedDate: 'Disponible inmediatamente',
    notes: 'Empacado con funda protectora. Listo para entrega o despacho.',
  },
  'ana chen': {
    orderId: 'PED-2024-92',
    customerName: 'Lic. Ana Chen',
    service: 'Portadiplomas Finos Azul Marino con Escudo Dorado (2 unidades)',
    status: 'listo',
    statusLabel: 'Listo para entrega',
    stepNumber: 5,
    totalSteps: 5,
    estimatedDate: 'Disponible inmediatamente',
    notes: 'Empacado con funda protectora. Listo para entrega o despacho.',
  },
  'ped-2024-95': {
    orderId: 'PED-2024-95',
    customerName: 'Roberto Villarreal',
    service: 'Empastado Tomo Doble Notarial Verde Bosque',
    status: 'foliacion',
    statusLabel: 'Foliación y prensado de pliegos',
    stepNumber: 2,
    totalSteps: 5,
    estimatedDate: 'Mañana 11:00 AM',
    notes: 'Revisión de márgenes y encuadernación de pliegos en prensa hidráulica.',
  },
};

export const WORKSHOP_INFO = {
  name: 'Portadiplomas Panamá',
  slogan: 'Empastados y Portadiplomas',
  motto: '“Una presentación a la altura de tu esfuerzo.”',
  phone: '+507 6496-0006',
  phoneDisplay: '(+507) 6496-0006',
  whatsapp: '50764960006',
  hoursWeekday: 'Lunes a Viernes: 8:00 AM - 5:30 PM',
  hoursSaturday: 'Sábados: 8:00 AM - 1:00 PM',
};
