import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from "react";
// ... otros imports

export const B2BSection = () => {
  // ... (lógica del componente sin cambios)
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { /* ... */ };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Colabora con Nosotros - Leads Cualificados para Empresas</title>
        <meta 
          name="description" 
          content="¿Eres una empresa de reformas o constructora? Accede a leads cualificados de propietarios interesados en adaptar su vivienda a la EPBD 2024." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/empresas" />
      </Helmet>

      <section id="empresas" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Eres <span className="gradient-text">empresa de reformas</span> o constructora?
            </h1>
            {/* ... Resto del componente sin cambios ... */}
          </div>
          {/* ... Resto del componente sin cambios ... */}
        </div>
      </section>
    </HelmetProvider>
  );
};
