/// <reference types="vite/client" />

// Añade estas líneas para declarar las librerías PDF globalmente
declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}
