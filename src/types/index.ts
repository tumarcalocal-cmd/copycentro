export type TabType = 'enlaces' | 'servicios' | 'solicitar' | 'diplomas' | 'rastreo' | 'contacto';

export type SubTabServicios = 'solicitar' | 'disenos' | 'rastreo';

export type ModalidadType = 'solo_empastado' | 'impresion_empastado';

export interface CoverColor {
  id: string;
  name: string;
  hex: string;
  textColor?: string;
  university?: string;
}

export type PaperType = 'bond_normal' | 'hilo_algodon';

export interface EmpastadoConfig {
  modalidad: ModalidadType;
  colorId: string;
  copies: number;
  paperType: PaperType;
  pages: number;
  goldLogo: boolean;
  spineLettering: boolean;
  cdPocket: boolean;
  uploadedFileName: string | null;
  uploadedFileSize: string | null;
  detectedPages: number | null;
  observaciones?: string;
  customerName?: string;
  customerPhone?: string;
  institution?: string;
  selectedDesignId?: string;
  selectedDesignTitle?: string;
}

export interface DiplomaConfig {
  nivel: string;
  material: string;
  tipoProducto: string;
  caracteristicasEspeciales?: string;
  cantidad: number;
  personalizacion: string;
  diseno: string;
  archivo?: string;
  observaciones?: string;
}

export interface ModeloShowcase {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  colorHex?: string;
  colorName?: string;
  colorId?: string;
  university?: string;
}

export type DesignShowcase = ModeloShowcase;

export interface OrderTrackResult {
  orderId: string;
  customerName: string;
  service: string;
  status: 'recibido' | 'foliacion' | 'prensado' | 'estampado' | 'listo';
  statusLabel: string;
  stepNumber: number;
  totalSteps: number;
  estimatedDate: string;
  notes: string;
}
