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
    category: 'Azul Marino con Esquineros de Oro',
    title: 'Portadiploma Universitario en Cuerina Azul Marino',
    image: '/images/portadiplomas/port1.png',
  },
  {
    id: 'port-02',
    number: 'Modelo 02',
    category: 'Vino / Rojo Carmesí Académico',
    title: 'Portadiploma en Cuerina con Escudo en Relieve Dorado',
    image: '/images/portadiplomas/port2.png',
  },
  {
    id: 'port-03',
    number: 'Modelo 03',
    category: 'Negro Ejecutivo Notarial',
    title: 'Portadiploma en Cuerina Negra con Grabado en Oro',
    image: '/images/portadiplomas/port3.png',
  },
  {
    id: 'port-04',
    number: 'Modelo 04',
    category: 'Verde Bosque con Grabado en Oro',
    title: 'Portadiploma Universitario en Cuerina Verde Bosque',
    image: '/images/portadiplomas/port4.png',
  },
  {
    id: 'port-05',
    number: 'Modelo 05',
    category: 'Negro Mate',
    title: 'Portadiploma en Negro Mate',
    image: '/images/portadiplomas/port5.png',
  },
  {
    id: 'port-06',
    number: 'Modelo 06',
    category: 'Azul Royal Eléctrico',
    title: 'Portadiploma en Azul Royal Brillante',
    image: '/images/portadiplomas/port6.png',
  },
  {
    id: 'port-07',
    number: 'Modelo 07',
    category: 'Blanco Marfil / Oro',
    title: 'Portadiploma Ceremonial en Blanco Marfil y Oro',
    image: '/images/portadiplomas/port7.png',
  },
];
