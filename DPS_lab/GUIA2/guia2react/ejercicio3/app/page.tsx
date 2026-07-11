"use client";
import { useState } from "react";
import styles from "./page.module.css";

type Operacion = "suma" | "resta" | "multi" | "div" | "pot" | "raiz";

const ETIQUETAS: Record<Operacion, string> = {
  suma: "+",
  resta: "-",
  multi: "×",
  div: "÷",
  pot: "Xʸ",
  raiz: "√x"
};

export default function Home() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [resultado, setResultado] = useState<string | null>(null);
  const [operacion, setOperacion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const SegundoNumero = (op : Operacion) => op !== "raiz";

  const calcular = (op: Operacion): void => {
    setError(null);
    setResultado(null);

    if(num1.trim() === ""){
      setError("Ingrese el Primer Número");
      return;
    }
    const a = parseFloat(num1);
    if(isNaN(a)){
      setError("El primer número no es Válido");
      return;
    }

    let  b = NaN;
    if(SegundoNumero(op)){
      if(num2.trim() === ""){
        setError("Ingrese el segundo número");
        return
      }
      b = parseFloat(num2);
      if(isNaN(b)){
        setError("El Segundo Número no es valido");
        return;
      }
    }

    
    if (isNaN(a) || (isNaN(b) && op !== "raiz")) {
      setError("Ingrese números válidos"); return;
    }
    if (op === "div" && b === 0) {
      setError("Error: no se puede dividir entre cero");
      return;
    }
    if (op === "raiz" && a < 0) {
      setError("Error: no existe raíz real de un número negativo");
      return;
    }
    // Evita bases negativas con exponentes fraccionarios -> resultado NaN
    if (op === "pot" && a < 0 && !Number.isInteger(b)) {
      setError("Error: potencia no definida en los reales para esta base y exponente");
      return;
    }

    const resultados: Record<Operacion, number> = {
      suma:  a + b,
      resta: a - b,
      multi: a * b,
      div:   a / b,
      pot:   Math.pow(a, b),
      raiz:  Math.sqrt(a),
    };

    const valor = resultados[op];

    if(!isFinite(valor)){
      setError("Error: el resultado no es un número válido");
      return;
    }

    setOperacion(ETIQUETAS[op]);
    setResultado(String(Math.round(valor * 1e10) / 1e10));

    setResultado(String(Math.round(resultados[op] * 1e10) / 1e10));
  };

  const limpiar = (): void => {
    setNum1("");
    setNum2("");
    setResultado(null);
    setOperacion(null);
    setError(null);
  }

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
          placeholder="Número 2 (No Aplica para Raiz)"
        />
        {(["suma", "resta", "multi", "div", "pot", "raiz"] as Operacion[]).map((op) => (
          <button key={op} onClick={() => calcular(op)}>{ETIQUETAS[op]}</button>
        ))}
        {/* <button onClick={() => { setNum1(""); setNum2(""); setResultado(null); setError(null); }}>
          Limpiar
        </button> */}
        <button onClick={limpiar}>Limpiar</button>
        {resultado !== null && ( <p>Resultado: {resultado}</p>)}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </main>
  );
}