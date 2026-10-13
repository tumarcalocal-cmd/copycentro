import { CoverColor, DesignShowcase, OrderTrackResult } from '../types';

export const HERO_IMAGES = {
  acabadosOro: '/images/inicio_empastados.jpg',
  portadiplomas: '/images/inicio_portadiplomas.jpg',
};

export const COVER_COLORS: CoverColor[] = [
  { id: 'wine', name: 'Vino institucional', hex: '#541525', university: 'UP Oficial' },
  { id: 'navy', name: 'Azul Marino Clásico', hex: '#0B2341', university: 'UP / UTP' },
  { id: 'cyan', name: 'Azul Royal Eléctrico', hex: '#0284C7', university: 'UTP' },
  { id: 'red', name: 'Rojo Carmesí', hex: '#DC2626', university: 'ISAE' },
  { id: 'gold', name: 'Dorado Ocre', hex: '#D97706', university: 'Especial' },
  { id: 'slate', name: 'Gris Grafito Plomo', hex: '#475569', university: 'Corporativo' },
  { id: 'green', name: 'Verde Bosque Notarial', hex: '#14532D', university: 'UDELAS' },
];

export const MODELOS_SHOWCASES: DesignShowcase[] = [
  {
    id: 'mod-01',
    number: 'Modelo 01',
    category: 'Vino Institucional',
    title: 'Empastado en Vino Institucional con Grabado Dorado',
    description: 'Encuadernación oficial en cuerina vinotinto con letras doradas al calor y funda de protección individual.',
    image: '/images/modelos/tesis4.jpg',
    colorHex: '#541525',
    colorName: 'Vino Institucional',
    colorId: 'wine',
    university: 'Universidad de Panamá (UP)',
  },
  {
    id: 'mod-02',
    number: 'Modelo 02',
    category: 'Rojo Carmesí',
    title: 'Empastado Rojo Carmesí con Escudo Institucional',
    description: 'Encuadernación de lujo en tapa dura roja con escudo universitario troquelado y pan de oro reglamentario.',
    image: '/images/modelos/tesis.jpg',
    colorHex: '#DC2626',
    colorName: 'Rojo Carmesí',
    colorId: 'red',
    university: 'USMA · Derecho y Ciencias Políticas',
  },
  {
    id: 'mod-03',
    number: 'Modelo 03',
    category: 'Azul Marino · Universidad de Panamá',
    title: 'Empastado Azul Marino e Informe de Práctica Profesional',
    description: 'Presentación en azul clásico para Universidad de Panamá con rotulación nítida en portada y lomo.',
    image: '/images/modelos/tesis7.jpg',
    colorHex: '#0B2341',
    colorName: 'Azul Marino',
    colorId: 'navy',
    university: 'Universidad de Panamá (UP)',
  },
  {
    id: 'mod-04',
    number: 'Modelo 04',
    category: 'Morado en Percalina · UIP',
    title: 'Empastado Púrpura Texturizado en Percalina',
    description: 'Acabado en tela percalina púrpura de alta resistencia con grabado dorado milimétrico.',
    image: '/images/modelos/tesis2.jpg',
    colorHex: '#6B21A8',
    colorName: 'Púrpura / Morado',
    colorId: 'slate',
    university: 'Universidad Interamericana (UIP)',
  },
  {
    id: 'mod-05',
    number: 'Modelo 05',
    category: 'Amarillo Ocre',
    title: 'Empastado en Amarillo Ocre Oficial',
    description: 'Tono representativo con tipografía dorada indeleble y estándares universitarios de alta calidad.',
    image: '/images/modelos/tesis3.jpg',
    colorHex: '#D97706',
    colorName: 'Amarillo Ocre',
    colorId: 'gold',
    university: 'Facultad de Arquitectura · UP',
  },
  {
    id: 'mod-06',
    number: 'Modelo 06',
    category: 'Azul Noche · CTP',
    title: 'Empastados Oscuros con Logo CTP',
    description: 'Producción en serie para centro educativo con sellado térmico y protección plástica para conservación.',
    image: '/images/modelos/tesis5.jpg',
    colorHex: '#0A1829',
    colorName: 'Azul Noche',
    colorId: 'navy',
    university: 'Centro Tecnológico de Panamá (CTP)',
  },
  {
    id: 'mod-07',
    number: 'Modelo 07',
    category: 'Dúo Azul Oscuro y Azul Claro',
    title: 'Empastados en Azul Oscuro y Azul Claro',
    description: 'Presentación frontal impecable con márgenes de encuadernación reglamentarios y estampado en oro de 14 pt.',
    image: '/images/modelos/tesis6.jpg',
    colorHex: '#0284C7',
    colorName: 'Azul Royal Eléctrico',
    colorId: 'cyan',
    university: 'Facultad de Economía · UP',
  },
];

export const DESIGN_SHOWCASES = MODELOS_SHOWCASES;

export const MOCK_ORDERS: Record<string, OrderTrackResult> = {
  'ped-2024-88': {
    orderId: 'PED-2024-88',
    customerName: 'Carlos Morales',
    service: 'Empastado Universitario (Vino Institucional, 3 tomos)',
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
    service: 'Empastado Universitario (Vino Institucional, 3 tomos)',
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
};

export const WORKSHOP_INFO = {
  name: 'Empastados y Portadiplomas Panamá',
  phone: '+50764960006',
  whatsapp: '50764960006',
  displayPhone: '+507 6496-0006',
  address: 'Panamá',
  hoursWeekday: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
  hoursSaturday: 'Sábados: 8:00 AM - 1:00 PM',
  email: 'contacto@empastadospty.com',
};


// Opciones de retiro / entrega del pedido
export const RETIRO_OPTIONS = [
  'Local Panamá',
  'Local Santiago',
  'Envío a otras provincias',
];
