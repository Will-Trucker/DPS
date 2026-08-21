export interface Planet{
    id: string;
    name: string;
    description: string;
    image: any;
    type: 'Rocoso' | 'Gaseoso' | 'Helado';
    order: number; // orden
    diameter: number; // diametro (en km)
    distanceSun: number; // Distancia 
    color: string;
    characteristics: string[]; // caracteristicas
    mass: number; // masa
}