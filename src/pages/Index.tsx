import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ProfilesSection } from "@/components/ProfilesSection";
import { SubsidiesTable } from "@/components/SubsidiesTable";
import { FinancialSupportSection } from "@/components/FinancialSupportSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* SEO Meta tags handled in index.html */}
      
      {/* Structured data for the site */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Guía EPBD 2024",
            "description": "Guía completa para adaptar tu vivienda a la nueva Directiva Europea de Eficiencia Energética",
            "url": "https://guiaepbd2024.es",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://guiaepbd2024.es/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Guía EPBD 2024",
            "description": "Portal informativo sobre la nueva Directiva de Eficiencia Energética de Edificios",
            "url": "https://guiaepbd2024.es",
            "logo": "https://guiaepbd2024.es/logo.png",
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+34-XXX-XXX-XXX",
              "contactType": "customer service",
              "availableLanguage": "Spanish"
            }
          })
        }}
      />

      {/* Article structured data for the main content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guía completa EPBD 2024: Cómo adaptar tu vivienda a la nueva normativa",
            "description": "Todo lo que necesitas saber sobre la nueva Directiva Europea de Eficiencia Energética",
            "datePublished": "2024-11-25",
            "dateModified": "2024-11-25",
            "author": {
              "@type": "Organization",
              "name": "Guía EPBD 2024"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Guía EPBD 2024",
              "logo": {
                "@type": "ImageObject",
                "url": "https://guiaepbd2024.es/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://guiaepbd2024.es"
            }
          })
        }}
      />

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://guiaepbd2024.es"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "Guía EPBD 2024",
                "item": "https://guiaepbd2024.es/guia"
              }
            ]
          })
        }}
      />

      <main>
        <HeroSection />
        <TimelineSection />
        <ProfilesSection />
        <CalculatorSection />
        <FinancialSupportSection />
        <SubsidiesTable />
        <FAQSection />
        <ContactSection />
        
        {/* Footer with legal info */}
        <footer className="section-padding bg-foreground text-background">
          <div className="container-width">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Guía EPBD 2024</h3>
                <p className="text-background/80 text-sm leading-relaxed">
                  Portal informativo sobre la nueva Directiva Europea de Eficiencia 
                  Energética de Edificios y su implementación en España.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Enlaces útiles</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#fechas" className="text-background/80 hover:text-background transition-colors">Fechas clave</a></li>
                  <li><a href="#obligaciones" className="text-background/80 hover:text-background transition-colors">Obligaciones por perfil</a></li>
                  <li><a href="#ayudas" className="text-background/80 hover:text-background transition-colors">Ayudas y subvenciones</a></li>
                  <li><a href="#faq" className="text-background/80 hover:text-background transition-colors">Preguntas frecuentes</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Fuentes oficiales actualizadas</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-80664" 
                       target="_blank" rel="noopener noreferrer"
                       className="text-background/80 hover:text-background transition-colors">
                      Directiva EPBD 2024 (BOE/DOUE)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.miteco.gob.es/es/energia/eficiencia/epbd2024.html" 
                       target="_blank" rel="noopener noreferrer"
                       className="text-background/80 hover:text-background transition-colors">
                      MITECO - EPBD 2024
                    </a>
                  </li>
                  <li>
                    <a href="https://www.idae.es/ayudas-y-financiacion" 
                       target="_blank" rel="noopener noreferrer"
                       className="text-background/80 hover:text-background transition-colors">
                      IDAE - Ayudas y financiación
                    </a>
                  </li>
                  <li>
                    <a href="https://energy.ec.europa.eu/topics/energy-efficiency/energy-performance-buildings" 
                       target="_blank" rel="noopener noreferrer"
                       className="text-background/80 hover:text-background transition-colors">
                      Comisión Europea - EPBD
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-background/20 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
                <div>
                  <p>
                    <strong>Aviso legal:</strong> Esta web tiene carácter informativo y divulgativo basada en 
                    el informe oficial de la Directiva (UE) 2024/1275. No constituye asesoramiento legal 
                    ni técnico oficial. Consulta siempre con profesionales cualificados para tu caso específico.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <span>Última actualización: 25/11/2024</span>
                  <span>Basado en: EPBD 2024 oficial</span>
                  <a href="#privacidad" className="hover:text-background transition-colors">
                    Política de privacidad
                  </a>
                  <a href="#cookies" className="hover:text-background transition-colors">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;