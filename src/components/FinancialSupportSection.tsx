import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from "react";
import { Euro, Calendar, FileText, Calculator, Info, ExternalLink, CheckCircle } from "lucide-react";
import financialData from "@/data/financial-support.json";

export const FinancialSupportSection = () => {
  const [activeTab, setActiveTab] = useState("deductions");

  return (
    <HelmetProvider>
      <Helmet>
        <title>Ayudas y Financiación para Eficiencia Energética - Guía EPBD 2024</title>
        <meta 
          name="description" 
          content="Descubre todas las ayudas, subvenciones y deducciones fiscales disponibles en España para adaptar tu vivienda a la normativa EPBD 2024." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/ayudas-subvenciones" />
      </Helmet>

      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Ayudas y financiación</span> actualizada
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Con el informe oficial de la EPBD 2024, se han ampliado significativamente 
              las ayudas disponibles. Descubre todas las opciones de financiación.
            </p>
          </div>

          {/* ... Resto del componente sin cambios (Tabs, contenido, etc.) ... */}
          
        </div>
      </section>
    </HelmetProvider>
  );
};
