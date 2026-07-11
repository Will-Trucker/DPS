"use client"; // necesario para useState

import {useState} from "react";

// Interfaces tipadas
interface Producto {
      id: number; 
  nombre: string; 
  precio: number; 
  categoria: string; 
  enStock: boolean; 
}

// Datos hardcoded 
const productosData: Producto[] = [ 
  { id: 1, nombre: "Laptop Pro 15",      precio: 1299, categoria: "electronica", enStock: true  
}, 
  { id: 2, nombre: "Mouse Inalámbrico",  precio: 35,   categoria: "electronica", enStock: true  
}, 
  { id: 3, nombre: "Camiseta Básica",    precio: 18,   categoria: "ropa",        enStock: true  
}, 
  { id: 4, nombre: "Jeans Slim",         precio: 45,   categoria: "ropa",        enStock: false 
}, 
  { id: 5, nombre: "Silla Ergonómica",   precio: 280,  categoria: "muebles",     enStock: true  
}, 
  { id: 6, nombre: "Escritorio Standing",precio: 450,  categoria: "muebles",     enStock: false 
}, 
  { id: 7, nombre: "Teclado Mecánico",   precio: 95,   categoria: "electronica", enStock: true  
}, 
  { id: 8, nombre: "Audífonos BT",       precio: 79,   categoria: "electronica", enStock: true  
}, 
]; 

// Categorías únicas derivadas de los datos 
const categorias: string[] = ["todas", ...Array.from(new Set(productosData.map(p => 
p.categoria)))]; 
 
export default function ProductList(): JSX.Element { 
  // Estado del filtro — string tipado 
  const [categoriaActiva, setCategoriaActiva] = useState<string>("todas"); 
 
  // Filtrado derivado del estado — no necesita otro useState 
  const productosFiltrados: Producto[] = categoriaActiva === "todas" 
    ? productosData 
    : productosData.filter((p: Producto) => p.categoria === categoriaActiva); 
 
     return (
    <div>
      <h2 style={{ color: '#001f3f', marginBottom: '16px' }}>Catálogo de Productos</h2>

      {/* Botones de filtro */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {categorias.map((cat: string) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{
              padding: '6px 18px', borderRadius: '20px', border: '2px solid #003f7f',
              background: categoriaActiva === cat ? '#003f7f' : 'transparent',
              color: categoriaActiva === cat ? '#fff' : '#003f7f',
              fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
              transition: 'all .2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Contador de resultados */}
      <p style={{ color: '#5a6a7e', fontSize: '.88rem', marginBottom: '16px' }}>
        Mostrando <strong>{productosFiltrados.length}</strong> producto(s)
      </p>

      {/* Grid de productos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {productosFiltrados.map((producto: Producto) => (
          <div key={producto.id} style={{
            background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
            padding: '18px', boxShadow: '0 2px 6px rgba(0,63,127,.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{
                background: '#e6f1fb', color: '#003f7f',
                padding: '2px 8px', borderRadius: '4px', fontSize: '.7rem', fontWeight: 700,
                textTransform: 'capitalize'
              }}>
                {producto.categoria}
              </span>
              <span style={{
                fontSize: '.7rem', fontWeight: 700,
                color: producto.enStock ? '#007a3d' : '#c0392b'
              }}>
                {producto.enStock ? '● En stock' : '○ Agotado'}
              </span>
            </div>
            <h4 style={{ margin: '12px 0 6px', color: '#1a2332', fontSize: '.95rem' }}>
              {producto.nombre}
            </h4>
            <p style={{ color: '#003f7f', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>
              ${producto.precio.toLocaleString("es-SV")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}