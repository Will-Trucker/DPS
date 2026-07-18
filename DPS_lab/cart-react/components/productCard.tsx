"use client";

import { Product } from "../types/Product";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />

      <div className="product-info">
        <h3 className="product-title">
          {product.title}
        </h3>

        <p className="product-price">
          ${product.price}
        </p>

        <button
          className="add-button"
          onClick={() =>
            dispatch(addToCart(product))
          }
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}