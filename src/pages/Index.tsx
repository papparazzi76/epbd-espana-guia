import { HeroSection } from "@/components/HeroSection";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { DownloadGuidesSection } from "@/components/DownloadGuidesSection";
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
            "url": "https://casasmaseficientes.com",
          })
        }}
      />
      <HeroSection />
      <DiagnosticForm />
      <DownloadGuidesSection />
      <FAQSection />
    </>
  );
};

export default Index;
