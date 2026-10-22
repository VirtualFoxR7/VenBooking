// Resumen: Definición centralizada de la interfaz para la entidad posada, permitiendo reutilizarla en toda la aplicación sin duplicar código.
export interface InnData {
  id: number;
  name: string;
  description: string;
  image_url: string;
  status: string;
  email: string;
  phone: string;
  user_id: number;
  block: number;
  quality: number;
  state: string;
  municipality: string;
  parish: string;
  category: string;
}
