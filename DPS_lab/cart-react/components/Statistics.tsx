"use client";

import { useAppSelector } from "../redux/hooks";

export default function Statistics() {
  const cart = useAppSelector(
    state => state.cart
  );

  const totalProductos = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalVentas = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <span>📚</span>
        <h3>Productos</h3>
        <p>{totalProductos}</p>
      </div>

      <div className="stat-card">
        <span>💰</span>
        <h3>Ventas</h3>
        <p>${totalVentas}</p>
      </div>

      <div className="stat-card">
        <span>🛒</span>
        <h3>Distintos</h3>
        <p>{cart.length}</p>
      </div>

    </div>
  );
}