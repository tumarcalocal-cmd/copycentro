export interface PortadiplomaModelo {
  id: string;
  number: string;
  category: string;
  title: string;
  image: string;
}

export const PORTADIPLOMAS_MODELOS: PortadiplomaModelo[] = [
  {
    id: 'port-01',
    number: 'Modelo 01',
    category: 'Oxford International School',
    title: 'Portadiploma Azul en Cuerina con Estampado Dorado',
    image: '/images/portadiplomas/port1.jpg',
  },
  {
    id: 'port-02',
    number: 'Modelo 02',
    category: 'Centro Educativo Altos de San Francisco',
    title: 'Portadiploma Rojo Institucional con Escudo',
    image: '/images/portadiplomas/port2.jpg',
  },
  {
    id: 'port-03',
    number: 'Modelo 03',
    category: 'RECOM',
    title: 'Portadiploma Ejecutivo Negro con Insignia Tricolor',
    image: '/images/portadiplomas/port3.jpg',
  },
  {
    id: 'port-04',
    number: 'Modelo 04',
    category: 'C.E.B.G. Desmond E. Byam',
    title: 'Portadiploma Abierto con Fotografía y Certificado',
    image: '/images/portadiplomas/port4.jpg',
  },
  {
    id: 'port-05',
    number: 'Modelo 05',
    category: 'Centro Educativo Altos de San Francisco',
    title: 'Portadiploma Negro con Insignia Oficial',
    image: '/images/portadiplomas/port5.jpg',
  },
  {
    id: 'port-06',
    number: 'Modelo 06',
    category: 'C.E.B.G. Desmond E. Byam',
    title: 'Portadiploma Azul con Escudo y Cinta Dorada',
    image: '/images/portadiplomas/port6.jpg',
  },
  {
    id: 'port-07',
    number: 'Modelo 07',
    category: 'Telebásica Miguel de la Borda',
    title: 'Portadiploma Verde Bosque con Insignia Dorada',
    image: '/images/portadiplomas/port7.jpg',
  },
];
