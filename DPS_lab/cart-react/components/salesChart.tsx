"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useAppSelector } from "../redux/hooks";

export default function SalesChart() {

  const cart = useAppSelector(
    (state) => state.cart
  );

  const data = cart.map(
    (item) => ({
      nombre: item.title,
      cantidad: item.quantity,
    })
  );

  return (
    <div className="chart-card">

      <div
        style={{
          width: "100%",
          height: "400px",
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="nombre"
              angle={-20}
              textAnchor="end"
              height={70}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="cantidad"
              fill="#008cba"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}