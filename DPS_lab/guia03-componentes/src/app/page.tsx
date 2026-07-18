// src/app/page.tsx 
import styles from "./page.module.css"; 

// estilos del complementario 2
import Styles from "./dashboard.module.css";

import ProfileCard from "../components/ProfileCard"; 
import ProductList from "../components/ProductList";
import RegisterForm from "../components/RegisterForm";
import ShoppingCart from "../components/ShoppingCart";
// Componente del complementario 2
import DashboardVentas from "../components/dashboardVentas";


// Reutilizamos la interface — en un proyecto real estaría en types/index.ts 
interface ProfileProps { 
  nombre: string; 
  rol: string; 
  tecnologias: string[]; 
  avatar?: string; 
 disponible?: boolean; 
} 
 
// Datos hardcoded — en ejercicios futuros vendrán de una API 
const perfiles: ProfileProps[] = [ 
  { 
    nombre: "Ana García", 
    rol: "Frontend Developer", 
    tecnologias: ["React", "TypeScript", "Next.js"], 
    disponible: true, 
  }, 
  { 
    nombre: "Carlos Mejía", 
    rol: "Full Stack Developer", 
    tecnologias: ["Node.js", "React", "PostgreSQL"], 
    disponible: false, 
  }, 
  { 
    nombre: "María Torres", 
    rol: "UI/UX Designer & Dev", 
    tecnologias: ["Figma", "React", "CSS Modules"], 
    disponible: true, 
  }, 
]; 
 
export default function Home() { 
  return ( 
    // <main className={styles.main}> 
    //   <div className={styles.container}> 
    //     <h1 className={styles.title}>Directorio de Perfiles</h1> 
    //     <p className={styles.subtitle}>Componentes reutilizables con props tipadas</p> 
    //     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}> 
    //       {perfiles.map((perfil) => ( 
    //         <ProfileCard 
    //           key={perfil.nombre} 
    //           nombre={perfil.nombre} 
    //           rol={perfil.rol} 
    //           tecnologias={perfil.tecnologias} 
    //           disponible={perfil.disponible} 
    //         /> 
    //       ))} 
    //     </div> 
    //   </div> 
    // </main> 
//     <main className={styles.main}> 
// <div className={styles.container}> 
// <h1 className={styles.title}>Tienda Online</h1> 
// <p className={styles.subtitle}>Lista de productos con filtro por categoría</p> 
// <ProductList /> 
// </div> 
// </main>

    //   <main className={styles.main}> 
    //   <div className={styles.container}> 
    //     <h1 className={styles.title}>Registro de Usuario</h1> 
    //     <p className={styles.subtitle}>Formulario con validación en tiempo real</p> 
    //     <RegisterForm /> 
    //   </div> 
    // </main> 

    //  <main className={styles.main}> 
    //   <div className={styles.container}> 
    //     <h1 className={styles.title}>Mi Tienda Tech</h1> 
    //     <p className={styles.subtitle}>Carrito de compras con composición de componentes</p> 
    //     <ShoppingCart /> 
    //   </div> 
    // </main> 

     <main className={Styles.main}>
      <div className={Styles.container}>
        <h1 className={Styles.title}>Dashboard de Estadísticas</h1>
        <p className={Styles.subtitle}>Métricas de ventas mensuales</p>
        
        <DashboardVentas />
      </div>
    </main>
  );
}