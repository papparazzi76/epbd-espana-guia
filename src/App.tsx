import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Importa las secciones como si fueran páginas
import { TimelineSection } from "@/components/TimelineSection";
import { ProfilesSection } from "@/components/ProfilesSection";
import { MarketImpactSection } from "@/components/MarketImpactSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { FinancialSupportSection } from "@/components/FinancialSupportSection";
import { FAQSection } from "@/components/FAQSection";
import { B2BSection } from "@/components/B2BSection";
import { ContactSection } from "@/components/ContactSection";
import { Header } from "@/components/Header"; // Componente a crear
import { Footer } from "@/components/Footer"; // Componente a crear
import { GuiaViviendaUnifamiliar } from "@/components/GuiaViviendaUnifamiliar";

const queryClient = new QueryClient();

// Layout principal que incluye Header y Footer
const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet /> {/* Aquí se renderizará el contenido de la ruta hija */}
    </main>
    <Footer />
    <Toaster />
    <Sonner />
  </>
);


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/fechas-clave" element={<TimelineSection />} />
            <Route path="/obligaciones" element={<ProfilesSection />} />
            <Route path="/impacto-mercado" element={<MarketImpactSection />} />
            <Route path="/calculadora" element={<CalculatorSection />} />
            <Route path="/ayudas-subvenciones" element={<FinancialSupportSection />} />
            <Route path="/faq" element={<FAQSection />} />
            <Route path="/empresas" element={<B2BSection />} />
            <Route path="/contacto" element={<ContactSection />} />
            <Route path="/guia-vivienda-unifamiliar" element={<GuiaViviendaUnifamiliar />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
