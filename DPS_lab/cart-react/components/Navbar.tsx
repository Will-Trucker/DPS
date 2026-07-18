"use client";

import { useState } from "react";
import Link from "next/link";

import { clearCart, removeFromCart } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import "../styles/navbar.css";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);

  const cart = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <nav className="navbar">

      <div className="nav-links">
        <Link href="/">Inicio</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>

      <div className="cart-container">
        <button
          className="cart-button"
          onClick={() =>
            setShowCart(!showCart)
          }
        >
          🛒 Carrito ({totalItems})
        </button>

        {showCart && (
          <div className="cart-dropdown">
            {cart.length === 0 ? (
              <p className="empty-cart">
                El carrito está vacío
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item"
                  >
                    <button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>
                    Eliminar
                    </button>
                    
 <img
      src={item.image}
      alt={item.title}
      className="cart-image"
    />

                    <div className="cart-info">
                      <p>{item.title}</p>

                      <p>
                        Cantidad:
                        {" "}
                        {item.quantity}
                      </p>

                      <strong>
                        $
                        {item.price *
                          item.quantity}
                      </strong>
                    </div>
                  </div>
                ))}

                <div className="cart-total">
                  <strong>
                    Total: ${total}
                  </strong>
                </div>

                <button
                  className="clear-button"
                  onClick={() =>
                    dispatch(clearCart())
                  }
                >
                  Vaciar carrito
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}