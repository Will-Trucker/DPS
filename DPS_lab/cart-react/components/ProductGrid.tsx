"use client";

import { books } from "../data/books";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

import "../styles/product-grid.css";

export default function ProductGrid() {
  const dispatch = useAppDispatch();

  return (
    <div className="product-grid">
      {books.map((book) => (
        <div
          key={book.id}
          className="product-card"
        >
          
        <img
          src={book.image}
          alt={book.title}
        />

          <div className="product-info">
            <h3 className="product-title">
              {book.title}
            </h3>

            <p className="product-price">
              ${book.price}
            </p>

            <button
              className="add-button"
              onClick={() =>
                dispatch(addToCart(book))
              }
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}