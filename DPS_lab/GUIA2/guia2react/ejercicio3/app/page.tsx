"use client";
import { useState } from "react";
import styles from "./page.module.css";

type Operacion = "suma" | "resta" | "multi" | "div" | "pot" | "raiz";

export default function Home() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [resultado, setResultado] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calcular = (op: Operacion): void => {
    setError(null);
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || (isNaN(b) && op !== "raiz")) {
      setError("Ingrese números válidos"); return;
    }
    if (op === "div" && b === 0) {
      setError("Error: División por cero no permitida"); return;
    }
    if (op === "raiz" && a < 0) {
      setError("Error: Raíz de número negativo"); return;
    }

    const resultados: Record<Operacion, number> = {
      suma:  a + b,
      resta: a - b,
      multi: a * b,
      div:   a / b,
      pot:   Math.pow(a, b),
      raiz:  Math.sqrt(a),
    };

    setResultado(String(Math.round(resultados[op] * 1e10) / 1e10));
  };

  return (
    <main className={styles.main}>
      <div className={styles.calculadora}>
        <h2>Calculadora</h2>
        <input
          type="number"
          value={num1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum1(e.target.value)}
          placeholder="Número 1"
        />
        <input
          type="number"
          value={num2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum2(e.target.value)}
          placeholder="Número 2"
        />
        {(["suma", "resta", "multi", "div", "pot", "raiz"] as Operacion[]).map((op) => (
          <button key={op} onClick={() => calcular(op)}>{op}</button>
        ))}
        <button onClick={() => { setNum1(""); setNum2(""); setResultado(null); setError(null); }}>
          Limpiar
        </button>
        {resultado && <p>Resultado: {resultado}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>
  );
}