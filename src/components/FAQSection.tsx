import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import faqData from "@/data/faq.json";
import { scrollToSection } from "@/lib/smooth-scroll";

export const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  // ... (lógica del componente sin cambios)
  const filteredFAQ = faqData.faq.filter(/* ... */);
  const toggleItem = (id: string) => { /* ... */ };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Preguntas Frecuentes (FAQ) sobre la EPBD 2024</title>
        <meta 
          name="description" 
          content="Resolvemos todas tus dudas sobre la nueva directiva de eficiencia energética: clases energéticas, calderas de gas, ayudas, plazos y más." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/faq" />
      </Helmet>

      <section id="faq" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              Preguntas <span className="gradient-text">frecuentes</span>
            </h1>
            {/* ... Resto del componente sin cambios ... */}
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Datos estructurados FAQ (ya estaba bien) */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ /* ... */ }}
            />
            {/* ... Resto del componente sin cambios ... */}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
