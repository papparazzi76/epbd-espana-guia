import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import faqData from "@/data/faq.json";
import { scrollToSection } from "@/lib/smooth-scroll";

export const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQ = faqData.faq.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre la EPBD 2024 y cómo afecta a tu vivienda
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": faqData.faq.map(item => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": item.answer
                    }
                  }))
                })
              }}
            />
            
            <div className="space-y-4">
              {filteredFAQ.map((item) => (
                <div key={item.id} className="border border-border rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform ${
                        openItems.includes(item.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openItems.includes(item.id) && (
                    <div className="px-6 pb-4">
                      <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No se encontraron preguntas que coincidan con tu búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
