"use client";

import {useState} from "react";

// Interfaces
interface MonthlySales {
    mes: string;
    trimestre: "T1" | "T2" | "T3" | "T4";
    ventas: number;
}

type Orden = "asc" | "desc";

// JSON
const SalesData: MonthlySales[] = [
  { mes: "Enero",      trimestre: "T1", ventas: 12500 },
  { mes: "Febrero",    trimestre: "T1", ventas: 9800  },
  { mes: "Marzo",      trimestre: "T1", ventas: 15200 },
  { mes: "Abril",      trimestre: "T2", ventas: 18400 },
  { mes: "Mayo",       trimestre: "T2", ventas: 21000 },
  { mes: "Junio",      trimestre: "T2", ventas: 17600 },
  { mes: "Julio",      trimestre: "T3", ventas: 23100 },
  { mes: "Agosto",     trimestre: "T3", ventas: 19950 },
  { mes: "Septiembre", trimestre: "T3", ventas: 20800 },
  { mes: "Octubre",    trimestre: "T4", ventas: 24700 },
  { mes: "Noviembre",  trimestre: "T4", ventas: 27300 },
  { mes: "Diciembre",  trimestre: "T4", ventas: 31200 },
];

const periodos: string[] = ["todos", ...Array.from(new Set(SalesData.map((v) => v.trimestre)))];

export default function DashboardVentas(): JSX.Element{
    const [periodoActivo, setPeriodoActivo] = useState<string>("todos");

    const [ordenVentas, setOrdenVentas] = useState<Orden>("desc");

    const VentasFiltradas: MonthlySales[] = periodoActivo === "todos" ? SalesData : SalesData.filter((v: MonthlySales) => v.trimestre == periodoActivo);

    const totalVentas: number = VentasFiltradas.reduce(
    (acc: number, v: MonthlySales) => acc + v.ventas,
    0
  );
 
  const promedioVentas: number =
    VentasFiltradas.length > 0 ? totalVentas / VentasFiltradas.length : 0;
 
  const mejorMes: MonthlySales | null = VentasFiltradas.reduce(
    (mejor: MonthlySales | null, actual: MonthlySales) =>
      !mejor || actual.ventas > mejor.ventas ? actual : mejor,
    null
  );
   const ventasOrdenadas: MonthlySales[] = [...VentasFiltradas].sort((a, b) =>
    ordenVentas === "asc" ? a.ventas - b.ventas : b.ventas - a.ventas
  );
 
  const toggleOrden = (): void => {
    setOrdenVentas((prev: Orden) => (prev === "asc" ? "desc" : "asc"));
  };
 
  return (
    <div>
      <h2 style={{ color: "#001f3f", marginBottom: "16px" }}>Dashboard de Ventas</h2>
 
      {/* Selector de período */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        {periodos.map((periodo: string) => (
          <button
            key={periodo}
            onClick={() => setPeriodoActivo(periodo)}
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              border: "2px solid #003f7f",
              background: periodoActivo === periodo ? "#003f7f" : "transparent",
              color: periodoActivo === periodo ? "#fff" : "#003f7f",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all .2s",
            }}
          >
            {periodo}
          </button>
        ))}
      </div>
 
      {/* Tarjetas de resumen */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "18px",
            boxShadow: "0 2px 6px rgba(0,63,127,.06)",
          }}
        >
          <p style={{ margin: "0 0 6px", fontSize: ".78rem", color: "#5a6a7e", fontWeight: 600 }}>
            TOTAL DE VENTAS
          </p>
          <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#003f7f" }}>
            ${totalVentas.toLocaleString()}
          </p>
        </div>
 
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "18px",
            boxShadow: "0 2px 6px rgba(0,63,127,.06)",
          }}
        >
          <p style={{ margin: "0 0 6px", fontSize: ".78rem", color: "#5a6a7e", fontWeight: 600 }}>
            PROMEDIO MENSUAL
          </p>
          <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#003f7f" }}>
            ${promedioVentas.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
 
        <div
          style={{
            background: "#edfaf3",
            border: "1px solid #00a651",
            borderRadius: "10px",
            padding: "18px",
            boxShadow: "0 2px 6px rgba(0,63,127,.06)",
          }}
        >
          <p style={{ margin: "0 0 6px", fontSize: ".78rem", color: "#007a3d", fontWeight: 600 }}>
            MEJOR MES
          </p>
          <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#007a3d" }}>
            {mejorMes ? `${mejorMes.mes} — $${mejorMes.ventas.toLocaleString()}` : "—"}
          </p>
        </div>
      </div>
 
      {/* Tabla ordenable */}
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ background: "#e6f1fb" }}>
            <th style={{ textAlign: "left", padding: "10px 14px", color: "#001f3f" }}>Mes</th>
            <th style={{ textAlign: "left", padding: "10px 14px", color: "#001f3f" }}>
              Trimestre
            </th>
            <th
              onClick={toggleOrden}
              style={{
                textAlign: "right",
                padding: "10px 14px",
                color: "#001f3f",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Ventas {ordenVentas === "asc" ? "▲" : "▼"}
            </th>
          </tr>
        </thead>
        <tbody>
          {ventasOrdenadas.map((v: MonthlySales) => (
            <tr key={v.mes} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "10px 14px", color: "#1a2332" }}>{v.mes}</td>
              <td style={{ padding: "10px 14px", color: "#5a6a7e" }}>{v.trimestre}</td>
              <td
                style={{
                  padding: "10px 14px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "#003f7f",
                }}
              >
                ${v.ventas.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

