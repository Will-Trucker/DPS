export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    password: string; // fines didacticos - nunca en texto plano en produccion
    fechaRegistro: string;
}

export interface Cita {
    id: string;
    paciente: string;
    doctor: string;
    especialidad: string;
    motivo: string;
    fechaISO: string; // Date.toISOString()
    usuarioId: string; // Relacion la cita con su dueño
    estado: 'pendiente' | 'confirmada' | 'cancelada';
}

export type EstadoCita = Cita['estado'];
