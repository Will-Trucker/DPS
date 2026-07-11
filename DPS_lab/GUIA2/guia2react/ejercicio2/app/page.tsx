import styles from "./page.module.css";

interface Jugador {
  id: number;
  nombre: string;
  altura: string;
  peso: string;
  foto: string;
}

interface Equipo {
  id: number;
  nombre: string;
  plantilla: Jugador[];
}

interface EquiposProps {
  equipos: Equipo[];
}

const Equipos = ({ equipos }: EquiposProps) => (
  <div className={styles.container__list}>
    <h2>Equipos de Fútbol</h2>
    {equipos.map((equipo: Equipo) => (
      <div key={equipo.id}>
        <h3>{equipo.nombre}</h3>
        <ul>
          {equipo.plantilla.map((j: Jugador) => (
          <li key={j.id} className={styles.jugador}>
            <img src={j.foto} alt={j.nombre}  className={styles.jugador__foto} />
            <div className={styles.jugador__info}>
              <strong>{j.nombre}</strong> — {j.altura}m · {j.peso}
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const equiposData: Equipo[] = [
  {
    id: 1,
    nombre: "Real Madrid",
    plantilla: [
      { id: 1, nombre: "Vinicius Jr.", altura: "1.76", peso: "73Kg" , foto:"/fotos/vinni.jpg"},
      { id: 2, nombre: "Jude Bellingham", altura: "1.86", peso: "75Kg", foto:"/fotos/Jude_Bellingham.jpg" },
      { id: 3, nombre: "Kylian Mbappé", altura: "1.78", peso: "73Kg", foto:"/fotos/mbapee.jpeg"},
    ],
  },
  {
    id: 2,
    nombre: "Barcelona",
    plantilla: [
      { id: 1, nombre: "Lamine Yamal", altura: "1.80", peso: "67Kg", foto:"/fotos/lamine.jpg"},
      { id: 2, nombre: "Robert Lewandowski", altura: "1.85", peso: "81Kg", foto:"/fotos/robert.jpg" },
      { id: 3, nombre: "Gavi", altura: "1.73", peso: "68Kg", foto:"/fotos/gavi.jpg" },
    ],
  },
  {
    id: 3,
    nombre: "Alianza FC",
    plantilla: [
      { id: 1, nombre: "Mario González", altura: "1.82", peso: "79Kg", foto:"/fotos/mario.jpg"},
      { id: 2, nombre: "Rodolfo Zelaya", altura: "1.75", peso: "72Kg", foto:"/fotos/rodolfo.jpg" },
      { id: 3, nombre: "Óscar Rodríguez", altura: "1.73", peso: "74Kg", foto:"/fotos/oscar.jpg" },
    ]
  }
];

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Mi Aplicación de Fútbol</h1>
      <Equipos equipos={equiposData} />
    </main>
  );
}