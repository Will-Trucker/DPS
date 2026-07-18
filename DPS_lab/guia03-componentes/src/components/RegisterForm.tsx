"use client"; 
import { useState } from "react"; 
 
// type de unión — los únicos valores válidos para identificar un campo 
type Campo = "nombre" | "email" | "password" | "confirmar"; 
 
// Tipos para el estado del formulario y los errores 
type FormData   = Record<Campo, string>; 
type FormErrors = Record<Campo, string>; 
 
// Estado inicial tipado — vacío pero con todas las claves 
const initialData: FormData = { nombre: "", email: "", password: "", confirmar: "" }; 
const initialErrors: FormErrors = { nombre: "", email: "", password: "", confirmar: "" }; 

// ── Función de validación pura (fuera del componente) ──────── 
function validarCampo(campo: Campo, valor: string, formData: FormData): string {
    switch(campo){
        case "nombre":
            if(!valor.trim()) return "El nombre es obligatorio";
            if(valor.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
            return "";
        case "email":
            if(!valor.trim()) return "El email es obligatorio";
            if(!!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Ingresa un email valido";
            return "";
        case "password":
            if(!valor) return "La Contraseña es obligatoria";
            if(valor.length < 8) return "Minimo 8 caracteres";
            if(!/[A-Z]/.test(valor)) return "Debe incluir al menos una mayúscula";
            if(!/[0-9]/.test(valor)) return "Debe incluir al menos un números";
            return "";
        case "confirmar":
            if(!valor) return "Confirma tu contraseña";
            if(valor !== formData.password) return "Las contraseñas no coinciden";
            return "";
        default:
            return "";
    }
}

export default function RegisterForm(): JSX.Element{
    const [formData, setFormData] = useState<FormData>(initialData);
    const [errores, setErrores] = useState<FormErrors>(initialErrors);
    const [exito, setExito] = useState<boolean>(false);

    // Actualiza un campo y valida en tiempo real
    const handleChange = (campo:  Campo, valor: string): void => {
        const nuevoFormData: FormData = {...formData, [campo]:valor};
        setFormData(nuevoFormData);
        setErrores(prev => ({...prev, [campo]: validarCampo(campo, valor, nuevoFormData)}));
    };

    // Valida  todo los campos antes del submit
    const handleSubmit = (): void => {
        const nuevosErrores: FormErrors = {
            nombre:    validarCampo("nombre",    formData.nombre,    formData), 
            email:     validarCampo("email",     formData.email,     formData), 
            password:  validarCampo("password",  formData.password,  formData), 
            confirmar: validarCampo("confirmar", formData.confirmar, formData), 
        };
        setErrores(nuevosErrores);

        const sinErrores = Object.values(nuevosErrores).every(e => e === ""); 
        if (sinErrores) setExito(true); 
    };

    // Estilos Reutilizables
     const inputStyle = (campo: Campo): React.CSSProperties => ({ 
    width: '100%', padding: '10px 14px', borderRadius: '8px', 
    border: `2px solid ${errores[campo] ? '#c0392b' : formData[campo] ? '#00a651' : '#e2e8f0'}`, 
    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', marginTop: '6px', 
    transition: 'border-color .2s' 
    }); 

     
  if (exito) { 
    return ( 
      <div style={{ background: '#edfaf3', border: '2px solid #00a651', borderRadius: '12px', padding: '32px', textAlign: 'center' }}> 
        <p style={{ fontSize: '2rem', margin: '0 0 12px' }}>✅</p> 
        <h3 style={{ color: '#007a3d', margin: '0 0 8px' }}>¡Registro exitoso!</h3> 
        <p style={{ color: '#5a6a7e' }}>Bienvenido/a, <strong>{formData.nombre}</strong></p> 
        <button onClick={() => { setFormData(initialData); setErrores(initialErrors); 
    setExito(false); }}
 style={{ marginTop: '16px', padding: '8px 24px', background: '#003f7f', color: '#fff', 
border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}> 
          Nuevo registro 
        </button> 
      </div> 
    );
    }

     return ( 
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', 
padding: '32px', maxWidth: '460px', boxShadow: '0 2px 12px rgba(0,63,127,.08)' }}> 
      <h2 style={{ color: '#001f3f', marginBottom: '24px' }}>Crear cuenta</h2> 
 
      {/* Campo Nombre */} 
      <div style={{ marginBottom: '18px' }}> 
        <label style={{ fontWeight: 600, color: '#1a2332', fontSize: '.9rem' }}>Nombre 
completo</label> 
        <input 
          type="text" 
          value={formData.nombre} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("nombre", 
e.target.value)} 
          placeholder="Ana García" 
          style={inputStyle("nombre")} 
        /> 
        {errores.nombre && <p style={{ color: '#c0392b', fontSize: '.78rem', margin: '4px 0 0' 
}}>⚠ {errores.nombre}</p>} 
      </div> 
 
      {/* Campo Email */} 
      <div style={{ marginBottom: '18px' }}> 
        <label style={{ fontWeight: 600, color: '#1a2332', fontSize: '.9rem' }}>Email</label> 
        <input 
          type="email" 
          value={formData.email} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", 
e.target.value)} 
          placeholder="ana@email.com" 
          style={inputStyle("email")} 
        /> 
        {errores.email && <p style={{ color: '#c0392b', fontSize: '.78rem', margin: '4px 0 0' 
}}>⚠ {errores.email}</p>} 
      </div>
        {/* Campo Password */} 
      <div style={{ marginBottom: '18px' }}> 
        <label style={{ fontWeight: 600, color: '#1a2332', fontSize: '.9rem' 
}}>Contraseña</label> 
 <input 
          type="password" 
          value={formData.password} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)} 
          placeholder="Mínimo 8 caracteres" 
          style={inputStyle("password")} 
        /> 
        {errores.password && <p style={{ color: '#c0392b', fontSize: '.78rem', margin: '4px 0 0' 
}}>⚠ {errores.password}</p>} 
      </div>
 {/* Confirmar Password */} 
      <div style={{ marginBottom: '24px' }}> 
        <label style={{ fontWeight: 600, color: '#1a2332', fontSize: '.9rem' }}>Confirmar 
contraseña</label> 
        <input 
          type="password" 
          value={formData.confirmar} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("confirmar", 
e.target.value)} 
          placeholder="Repite tu contraseña" 
          style={inputStyle("confirmar")} 
        /> 
        {errores.confirmar && <p style={{ color: '#c0392b', fontSize: '.78rem', margin: '4px 0 0' }}>⚠ {errores.confirmar}</p>} 
      </div>

       <button 
        onClick={handleSubmit} 
        style={{ width: '100%', padding: '12px', background: '#003f7f', color: '#fff', border: 
'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }} 
      > 
        Registrarse 
      </button> 
    </div> 
      ); 
} 