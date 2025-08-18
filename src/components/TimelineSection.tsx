import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Calendar, Clock, AlertTriangle, CheckCircle2, Target } from "lucide-react";
import timelineData from "@/data/timeline-updated.json";
import { scrollToSection } from "@/lib/smooth-scroll";

export const TimelineSection = () => {
  const getStatusIcon = (status: string, year: string) => {
    const currentYear = new Date().getFullYear();
    const timelineYear = parseInt(year);
    
    if (timelineYear < currentYear || status === "completado") {
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    }
    if (timelineYear === currentYear) {
      return <AlertTriangle className="w-5 h-5 text-warning" />;
    }
    return <Target className="w-5 h-5 text-primary" />;
  };

  const getStatusClass = (year: string, status: string) => {
    const currentYear = new Date().getFullYear();
    const timelineYear = parseInt(year);
    
    if (timelineYear < currentYear || status === "completado") return "border-success bg-success/5";
    if (timelineYear === currentYear) return "border-warning bg-warning/5";
    return "border-primary bg-primary/5";
  };

  return (
    <HelmetProvider>
      {/* --- Optimización SEO: Metadatos específicos para esta página --- */}
      <Helmet>
        <title>Fechas Clave EPBD 2024 - Cronograma Normativa Eficiencia Energética</title>
        <meta 
          name="description" 
          content="Descubre el cronograma completo y las fechas clave de la nueva normativa EPBD 2024. Planifica la adaptación de tu vivienda y cumple los plazos." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/fechas-clave" />
      </Helmet>
      {/* --- Fin de la Optimización SEO --- */}

      <section id="timeline" className="section-padding bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              Fechas clave de la <span className="gradient-text">EPBD 2024</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Conoce todos los hitos normativos y plazos que debes cumplir. 
              Planifica con tiempo para aprovechar las ayudas disponibles.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Línea de tiempo vertical */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>
              
              <div className="space-y-8">
                {timelineData.timeline.map((item) => (
                  <div key={`${item.year}-${item.quarter}`} className="relative flex items-start">
                    <div className={`absolute left-4 top-5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${getStatusClass(item.year, item.status)}`}></div>
                    <div className={`card-elevated p-6 ml-10 w-full ${getStatusClass(item.year, item.status)}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <span className="inline-flex items-center gap-2 text-lg font-bold text-primary">
                          <Calendar className="w-5 h-5" />
                          {item.year} - {item.quarter}
                        </span>
                        <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Fecha límite: {new Date(item.deadline).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      
                      <div className="bg-background/50 rounded-lg p-3 border-l-4 border-primary">
                        <p className="text-sm font-medium text-foreground">
                          <strong>Impacto para ti:</strong> {item.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Glossary */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Glosario de términos clave
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timelineData.glossary.map((term) => (
                <div key={term.term} className="card-elevated p-4">
                  <dt className="text-sm font-semibold text-primary mb-2">
                    {term.term}
                  </dt>
                  <dd className="text-sm text-muted-foreground">
                    {term.definition}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
