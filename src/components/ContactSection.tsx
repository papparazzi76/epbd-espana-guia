import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from "react";
// ... otros imports

export const ContactSection = () => {
  // ... (lógica del componente sin cambios)
  const handleSubmit = async (e: React.FormEvent) => { /* ... */ };
  
  return (
    <HelmetProvider>
      <Helmet>
        <title>Contacto - Asesoramiento Personalizado EPBD 2024</title>
        <meta 
          name="description" 
          content="Contacta con nuestros expertos para obtener asesoramiento gratuito y personalizado sobre cómo adaptar tu vivienda a la nueva normativa de eficiencia energética." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/contacto" />
      </Helmet>

      <section id="contacto" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              ¿Necesitas <span className="gradient-text">asesoramiento</span> personalizado?
            </h1>
             {/* ... Resto del componente sin cambios ... */}
          </div>
           {/* ... Resto del componente sin cambios ... */}
        </div>
      </section>
    </HelmetProvider>
  );
};
