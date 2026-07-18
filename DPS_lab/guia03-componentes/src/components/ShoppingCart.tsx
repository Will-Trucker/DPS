"use client";

import {useState} from "react";

// Interfaces
interface Producto{
    id: number;
    nombre: string;
    precio: number;
    emoji: string;
}

interface ItemCarrito extends Producto { 
  cantidad: number; // extiende Producto agregando cantidad 
} 
 
// Props de los sub-componentes 
interface ProductItemProps { 
  producto: Producto; 
  onAgregar: (producto: Producto) => void; // función como prop 
} 

interface CartSummaryProps {
    carrito: ItemCarrito[];
    onEliminar: (id: number) => void;
    onLimpiar: () => void;
}

// Catalogo de Productos
const catalogo: Producto[] = [ 
  { id: 1, nombre: "Laptop Pro",       precio: 1299, emoji: "💻" }, 
  { id: 2, nombre: "Mouse Gamer",      precio: 55,   emoji: "🖱️"  }, 
  { id: 3, nombre: "Teclado Mecánico", precio: 95,   emoji: "⌨️"  }, 
  { id: 4, nombre: "Monitor 4K",       precio: 480,  emoji: "🖥️"  }, 
  { id: 5, nombre: "Auriculares BT",   precio: 79,   emoji: "🎧" }, 
  { id: 6, nombre: "Webcam HD",        precio: 65,   emoji: "📷" }, 
]; 

// ── Sub-componente: tarjeta de producto ─────────────────────── 
const ProductItem = ({ producto, onAgregar }: ProductItemProps): JSX.Element => ( 
  <div style={{ 
    background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', 
    padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,63,127,.06)' 
  }}> 
    <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{producto.emoji}</div> 
    <h4 style={{ margin: '0 0 6px', color: '#001f3f', fontSize: '.9rem' 
}}>{producto.nombre}</h4> 
    <p style={{ color: '#003f7f', fontWeight: 800, margin: '0 0 12px' }}> 
      ${producto.precio.toLocaleString()} 
    </p> 
    {/* Al hacer clic, llama a la función del padre pasando este producto */} 
    <button 
      onClick={() => onAgregar(producto)} 
      style={{ 
        width: '100%', padding: '7px', background: '#003f7f', color: '#fff', 
        border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: 
'.85rem' 
      }}
       > 
      + Agregar 
    </button> 
  </div> 
); 

// Subcomponente: resumen del carrito
const CartSummary = ({ carrito, onEliminar, onLimpiar }: CartSummaryProps): JSX.Element => { 
  // .reduce() para calcular el total 
  const total: number = carrito.reduce( 
    (acc: number, item: ItemCarrito) => acc + item.precio * item.cantidad, 0 
  ); 
  const totalItems: number = carrito.reduce((acc, item) => acc + item.cantidad, 0); 
 
  if (carrito.length === 0) { 
    return ( 
      <div style={{ textAlign: 'center', padding: '32px', color: '#5a6a7e' }}> 
        <p style={{ fontSize: '2rem' }}>🛒</p> 
        <p>El carrito está vacío</p> 
      </div> 
    ); 
  }

  return ( 
    <div> 
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
marginBottom: '16px' }}> 
        <h3 style={{ margin: 0, color: '#001f3f' }}>Tu carrito ({totalItems} items)</h3> 
        <button onClick={onLimpiar} 
          style={{ padding: '4px 14px', background: '#fdf0ee', color: '#c0392b', border: '1px solid #c0392b', borderRadius: '6px', cursor: 'pointer', fontSize: '.8rem', fontWeight: 600 }}> 
          Vaciar 
        </button> 
      </div> 
 
      {carrito.map((item: ItemCarrito) => ( 
        <div key={item.id} style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', 
          padding: '10px 0', borderBottom: '1px solid #e2e8f0' 
        }}> 
          <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span> 
          <div style={{ flex: 1 }}> 
            <p style={{ margin: 0, fontWeight: 600, fontSize: '.88rem', color: '#1a2332' 
}}>{item.nombre}</p> 
            <p style={{ margin: 0, fontSize: '.78rem', color: '#5a6a7e' }}> 
              ${item.precio} × {item.cantidad} = <strong>${(item.precio * 
item.cantidad).toLocaleString()}</strong> 
            </p> 
          </div> 
          <button onClick={() => onEliminar(item.id)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', 
fontSize: '1.1rem' }}> 
 ✕ 
          </button> 
        </div> 
      ))}
    
   <div style={{ marginTop: '16px', padding: '14px', background: '#e6f1fb', borderRadius: 
'8px' }}> 
        <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
          <span style={{ fontWeight: 700, color: '#001f3f' }}>Total:</span> 
          <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#003f7f' }}> 
            ${total.toLocaleString()} 
          </span> 
        </div> 
        <button style={{ 
          width: '100%', marginTop: '12px', padding: '10px', 
          background: '#00a651', color: '#fff', border: 'none', 
          borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '.95rem' 
        }}> 
          Proceder al pago → 
        </button> 
      </div> 
    </div> 
  ); 
};     

// Componente padre - gestiona el estado del carrito
export default function ShoppingCart(): JSX.Element { 
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]); 
 
  // Agregar producto: si ya existe, incrementa cantidad; si no, lo agrega 
  const agregarAlCarrito = (producto: Producto): void => { 
    setCarrito((prev: ItemCarrito[]) => { 
      const existe = prev.find(item => item.id === producto.id); 
      if (existe) { 
        // spread operator — crea nuevo arreglo actualizando solo la cantidad 
        return prev.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item 
        ); 
      } 
      // Si no existe, lo agrega con cantidad 1 
      return [...prev, { ...producto, cantidad: 1 }]; 
    }); 
  }; 
 
  // Eliminar producto del carrito 
  const eliminarDelCarrito = (id: number): void => { 
    setCarrito((prev: ItemCarrito[]) => prev.filter(item => item.id !== id)); 
  }; 

  // vaciar todo el carrito
   const limpiarCarrito = (): void => setCarrito([]); 
 
  return ( 
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 
'start' }}> 
      {/* Catálogo */} 
      <div> 
        <h2 style={{ color: '#001f3f', marginBottom: '16px' }}>Catálogo</h2> 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}> 
          {catalogo.map((producto: Producto) => ( 
            <ProductItem 
              key={producto.id} 
              producto={producto} 
              onAgregar={agregarAlCarrito} // pasamos la función al hijo 
            /> 
          ))} 
        </div> 
      </div> 
 
      {/* Carrito */} 
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', 
padding: '20px', boxShadow: '0 2px 10px rgba(0,63,127,.08)' }}> 
        <CartSummary 
          carrito={carrito} 
          onEliminar={eliminarDelCarrito} 
          onLimpiar={limpiarCarrito} 
        /> 
      </div> 
    </div> 
  ); 
}
