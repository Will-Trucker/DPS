import type { StackNavigationProp } from 'expo-router/js-stack';
import type { RouteProp } from 'expo-router/react-navigation';

/** Texto con traducción español/inglés que devuelve la API. */
export interface TextoLocalizado {
  espanol: string;
  [key: string]: string;
}

/** Moneda asociada a un país. */
export interface Moneda {
  nombre: TextoLocalizado;
  codigo: string;
  codigo_pais: string;
}

/** Estructura de un país devuelto por la mockapi. */
export interface Pais {
  id: number;
  nombre: TextoLocalizado;
  capital: TextoLocalizado;
  region: TextoLocalizado;
  lenguaje: TextoLocalizado;
  poblacion: string;
  bandera: string;
  monedas: Moneda[];
  descripcion: TextoLocalizado;
}

/** Estructura de una maravilla devuelta por la mockapi. */
export interface Maravilla {
  id: string;
  nombre: string;
  pais: string;
  imagen: string;
  latitud: number;
  longitud: number;
  Consejos: string[];
}

/** Rutas del stack de Países y sus parámetros. */
export type PaisesStackParamList = {
  ListaPaises: undefined;
  DetallePais: { country: Pais };
};
/** Rutas del stack de Maravillas y sus parámetros. */
export type MaravillasStackParamList = {
  Maravillas: undefined;
  Consejos: { tips: Maravilla };
};

/** Props de navegación para la lista de países. */
export interface ListaPaisesProps {
  navigation: StackNavigationProp<PaisesStackParamList, 'ListaPaises'>;
}
/** Props de navegación para el detalle de país. */
export interface DetallePaisProps {
  route: RouteProp<PaisesStackParamList, 'DetallePais'>;
  navigation: StackNavigationProp<PaisesStackParamList, 'DetallePais'>;
}

/** Props de navegación para la lista de maravillas. */
export interface ListaMaravillasProps {
  navigation: StackNavigationProp<MaravillasStackParamList, 'Maravillas'>;
}

/** Props de navegación para el detalle de maravilla. */
export interface DetalleMaravillasProps {
  route: RouteProp<MaravillasStackParamList, 'Consejos'>;
  navigation: StackNavigationProp<MaravillasStackParamList, 'Consejos'>;
}