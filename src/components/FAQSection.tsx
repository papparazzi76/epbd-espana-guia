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
    <section id="faq" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Resolvemos las dudas más comunes sobre la EPBD 2024 y cómo adaptar tu vivienda. 
            Si no encuentras la respuesta, contáctanos.
          </p>

          {/* Buscador FAQ */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Schema.org structured data */}
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
            {filteredFAQ.map((item) => {
              const isOpen = openItems.includes(item.id);
              
              return (
                <div key={item.id} className="card-elevated overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-left pr-4">
                          {item.question}
                        </h3>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    id={`faq-answer-${item.id}`}
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pl-14">
                      <div className="prose prose-sm max-w-none">
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No se encontraron preguntas que coincidan con tu búsqueda.
                <br />
                Prueba con otros términos o consulta todas las preguntas.
              </p>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="btn-hero-secondary mt-4"
              >
                Ver todas las preguntas
              </button>
            </div>
          )}
        </div>

        {/* CTA personalizada */}
        <div className="mt-16 text-center">
          <div className="card-elevated p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h3 className="text-xl font-semibold mb-3">
              ¿Tienes una duda específica sobre tu caso?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cada vivienda es única. Si necesitas asesoramiento personalizado sobre 
              cómo adaptar tu vivienda a la EPBD 2024, reserva una consulta gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('contacto')}
                className="btn-hero"
              >
                Consulta gratuita 15 min
              </button>
              <button 
                onClick={() => {
                  const guiaPDF = `
GUÍA COMPLETA EPBD 2024

📋 RESUMEN EJECUTIVO
La Directiva (UE) 2024/1275 marca un antes y después en la eficiencia energética.

🎯 FECHAS CRÍTICAS:
• 2025: Fin ayudas calderas gas/gasóleo
• 2026: Nueva escala certificados (G=15% peor)
• 2030: Prohibido vender/alquilar clase F-G
• 2033: Prohibido vender/alquilar clase E
• 2050: Todas las viviendas cero emisiones

💰 AYUDAS DISPONIBLES:
• Subvenciones: hasta 100% vulnerables
• Deducciones IRPF: 20%/40%/60%
• Préstamos ICO bonificados
• Financiación por ahorro

🔧 MEJORAS RECOMENDADAS:
1. Aislamiento térmico (máximo impacto)
2. Ventanas eficientes
3. Bomba de calor (sustitución calderas)
4. Paneles solares (obligatorio obra nueva)
5. Domótica y control

📊 IMPACTO ESPERADO:
• Ahorro energético: hasta 70%
• Revalorización vivienda: 3-7% por letra
• Retorno inversión: 5-10 años
• Confort mejorado

⚖️ MARCO LEGAL:
Basado en Directiva (UE) 2024/1275
Transposición España: mayo 2026
Fuentes: MITECO, IDAE, BOE

Más información: www.guiaepbd2024.es
                  `;
                  
                  const link = document.createElement('a');
                  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(guiaPDF);
                  link.download = 'guia-completa-epbd-2024.txt';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="btn-hero-secondary"
              >
                Descargar guía completa PDF
              </button>
            </div>
          </div>
        </div>

        {/* Enlaces relacionados */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">📅</span>
            </div>
            <h4 className="font-semibold mb-2">Fechas clave</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Revisa todos los plazos importantes
            </p>
            <button className="text-primary hover:underline text-sm font-medium">
              Ver cronograma completo →
            </button>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">💰</span>
            </div>
            <h4 className="font-semibold mb-2">Ayudas disponibles</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Encuentra subvenciones en tu zona
            </p>
            <button className="text-primary hover:underline text-sm font-medium">
              Buscar ayudas →
            </button>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🔧</span>
            </div>
            <h4 className="font-semibold mb-2">Guía práctica</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Pasos para adaptar tu vivienda
            </p>
            <button className="text-primary hover:underline text-sm font-medium">
              Ver checklist →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};