import { Calendar, Clock, AlertTriangle, CheckCircle2, Target } from "lucide-react";
import timelineData from "@/data/timeline-updated.json";

export const TimelineSection = () => {
  const getStatusIcon = (status: string, year: string) => {
    const currentYear = new Date().getFullYear();
    const timelineYear = parseInt(year);
    
    if (timelineYear <= currentYear) {
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    }
    if (timelineYear === currentYear + 1) {
      return <AlertTriangle className="w-5 h-5 text-warning" />;
    }
    return <Target className="w-5 h-5 text-primary" />;
  };

  const getStatusClass = (year: string) => {
    const currentYear = new Date().getFullYear();
    const timelineYear = parseInt(year);
    
    if (timelineYear <= currentYear) return "border-success bg-success/5";
    if (timelineYear === currentYear + 1) return "border-warning bg-warning/5";
    return "border-primary bg-primary/5";
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Fechas clave de la <span className="gradient-text">EPBD 2024</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conoce todos los hitos normativos y plazos que debes cumplir. 
            Planifica con tiempo para aprovechar las ayudas disponibles.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary via-secondary to-primary opacity-30"></div>
            
            {timelineData.timeline.map((item, index) => (
              <div key={item.year + item.quarter} className="timeline-item">
                <div className={`card-elevated p-6 ml-8 ${getStatusClass(item.year)}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(item.status, item.year)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          <Calendar className="w-4 h-4" />
                          {item.year} {item.quarter}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {new Date(item.deadline).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      
                      <div className="bg-white/50 rounded-lg p-3 border-l-4 border-primary">
                        <p className="text-sm font-medium text-foreground">
                          💡 <strong>Impacto para ti:</strong> {item.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            ¿No tienes claro cómo te afectan estas fechas?
          </p>
          <button className="btn-hero">
            Calcula tu plan personalizado
          </button>
        </div>
      </div>
    </section>
  );
};