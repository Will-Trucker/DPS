"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [numero, setNumero] = useState<number>(1);
  const [limite, setLimite]  = useState<number>(10);
  const [tabla, setTabla]    = useState<string[]>([]);

  const generarTabla = (): void => {
    const resultado = Array.from(
      { length: limite },
      (_, i) => `${numero} × ${i + 1} = ${numero * (i + 1)}`
    );
    setTabla(resultado);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Tabla de Multiplicar</h2>

        <div className={styles.controls}>
          <label>
            Número:
            <input
              type="number"
              value={numero}
              onChange={(e) => setNumero(parseInt(e.target.value) || 1)}
            />
          </label>
          <label>
            Límite:
            <input
              type="number"
              value={limite}
              onChange={(e) => setLimite(parseInt(e.target.value) || 10)}
            />
          </label>
          <button onClick={generarTabla}>Generar Tabla</button>
        </div>

        <ul>
          {tabla.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}