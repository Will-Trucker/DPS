export interface FiveR {
  id: string;
  title: string;
  icon: string;
  shortInfo: string;
  longInfo: string;
  color: string;
}

export const FIVE_R: FiveR[] = [
  {
    id: '1',
    title: 'Rechazar',
    icon: '✋',
    shortInfo: 'Evita productos que generan residuos innecesarios.',
    longInfo:
      'Antes de comprar, pregúntate si realmente lo necesitas. Rechazar significa decir "no" a bolsas plásticas, envases desechables, popotes y publicidad impresa que no vas a usar. Es la primera y más poderosa de las 5R porque evita que el residuo se genere desde el principio.',
    color: '#C62828',
  },
  {
    id: '2',
    title: 'Reducir',
    icon: '📉',
    shortInfo: 'Minimiza el consumo y el desperdicio.',
    longInfo:
      'Reducir implica consumir solo lo necesario: comprar productos con menos empaque, elegir presentaciones grandes en vez de varias pequeñas, y cuidar el uso de agua, luz y materiales. Cada cosa que no consumimos de más es un residuo que nunca llegará a un basurero.',
    color: '#EF6C00',
  },
  {
    id: '3',
    title: 'Reutilizar',
    icon: '🔄',
    shortInfo: 'Dar una segunda vida a los objetos.',
    longInfo:
      'Antes de desechar algo, piensa cómo puede volver a servir. Un frasco de vidrio puede guardar especias, una playera vieja puede convertirse en trapo, una caja puede volverse organizador. Reutilizar alarga la vida útil de los productos y reduce la necesidad de fabricar nuevos.',
    color: '#F9A825',
  },
  {
    id: '4',
    title: 'Reciclar',
    icon: '♻️',
    shortInfo: 'Transformar residuos en nuevos productos.',
    longInfo:
      'Reciclar es separar correctamente papel, plástico, vidrio y metal para que puedan procesarse y convertirse en materia prima de nuevos productos. Requiere limpiar los envases y conocer los contenedores o centros de acopio de tu comunidad. Así cerramos el ciclo de vida de los materiales.',
    color: '#2E7D32',
  },
  {
    id: '5',
    title: 'Recuperar',
    icon: '⚡',
    shortInfo: 'Aprovechar materiales para generar energía u otros usos.',
    longInfo:
      'Cuando un residuo ya no puede reutilizarse ni reciclarse, aún puede recuperarse: por ejemplo, generando energía a partir de residuos orgánicos (biogás) o compostando restos de comida para producir abono. Es la última R, y evita que todo termine en un relleno sanitario.',
    color: '#1565C0',
  },
];

export const LOADING_MESSAGES = FIVE_R.map(
  (r) => `${r.title}: ${r.shortInfo}`
);