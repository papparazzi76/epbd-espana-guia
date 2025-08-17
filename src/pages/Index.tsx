import { HeroSection } from "@/components/HeroSection";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { MarketImpactSection } from "@/components/MarketImpactSection";
import { FAQSection } from "@/components/FAQSection";

const Index = () => {
  return (
    <>
      {/* Mantener los datos estructurados principales aquí */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Guía EPBD 2024",
            "description": "Guía completa para adaptar tu vivienda a la nueva Directiva Europea de Eficiencia Energética",
            "url": "https://guiaepbd2024.es",
          })
        }}
      />
      <HeroSection />
      <DiagnosticForm />
      <LeadMagnetSection />
      <MarketImpactSection />
      <FAQSection />
    </>
  );
};

export default Index;
