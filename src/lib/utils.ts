import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Función auxiliar para combinar clases CSS
// Utiliza clsx y tailwind-merge para optimizar estilos
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
