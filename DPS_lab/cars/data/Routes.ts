import { Route } from "../types/Route";

export const routes: Route[] = [
  {
    id: "1",
    name: "Ruta de Las Flores",
    description:
      "Recorrido por pueblos pintorescos, cafetales, artesanías y gastronomía típica.",
    image: require("../assets/img/ruta1.jpg"),
  },
  {
    id: "2",
    name: "Ruta Arqueológica",
    description:
      "Explora sitios históricos y vestigios de antiguas civilizaciones prehispánicas.",
    image: require("../assets/img/ruta2.jpg"),
  },
  {
    id: "3",
    name: "Ruta Complejo de los Volcanes",
    description:
      "Aventura entre volcanes, senderos naturales y miradores espectaculares.",
    image: require("../assets/img/ruta3.jpg"),
  },
  {
    id: "4",
    name: "Ruta Sol y Playa",
    description:
      "Disfruta de playas, surf, paisajes costeros y actividades al aire libre.",
    image: require("../assets/img/ruta4.jpg"),
  },
];
