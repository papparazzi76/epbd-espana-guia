import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle2, FileText, Calendar, Euro, ClipboardList } from "lucide-react";

export const LeadMagnetSection = () => {
  const downloadGuide = () => {
    // Create PDF content (in a real app, this would be a proper PDF)
    const pdfContent = `
GUÍA GRATUITA EPBD 2024 - ADAPTA TU VIVIENDA A LA NORMATIVA 2030

CONTENIDO:
1. Las fechas clave de la normativa europea
2. Qué pasa si tu vivienda es clase F o G  
3. Qué ayudas puedes solicitar para ahorrar hasta un 80%
4. Checklist de pasos sencillos para mejorar tu casa

FECHAS CRÍTICAS:
- 2030: Clase E mínima para vender/alquilar
- 2033: Clase D mínima para vender/alquilar
- 2025: Fin de ayudas para calderas de gas

AYUDAS DISPONIBLES:
- Subvenciones: hasta 40% del coste
- Deducciones IRPF: hasta 60%
- Financiación blanda para vulnerables

CHECKLIST DE MEJORAS:
□ Certificado energético actual
□ Aislamiento térmico
□ Ventanas eficientes
□ Sistema de calefacción/refrigeración
□ Instalación solar
□ Ventilación controlada

Para más información: https://casas-eficientes.es
    `;

    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(pdfContent);
    link.download = 'Guia-Gratuita-EPBD-2024.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="guia-gratuita" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Descarga tu guía gratuita
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                En esta guía descubrirás todo lo que necesitas saber para adaptar 
                tu vivienda a la nueva normativa europea de eficiencia energética.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Las fechas clave de la normativa europea</h3>
                    <p className="text-sm text-muted-foreground">
                      Cronograma completo con todas las fechas límite hasta 2050
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Qué pasa si tu vivienda es clase F o G</h3>
                    <p className="text-sm text-muted-foreground">
                      Consecuencias legales y económicas de no cumplir la normativa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Qué ayudas puedes solicitar para ahorrar hasta un 80%</h3>
                    <p className="text-sm text-muted-foreground">
                      Subvenciones, deducciones IRPF y financiación disponible por CCAA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Checklist de pasos sencillos para mejorar tu casa</h3>
                    <p className="text-sm text-muted-foreground">
                      Guía práctica paso a paso para planificar tu rehabilitación
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={downloadGuide} size="lg" className="btn-hero group">
                <Download className="w-5 h-5" />
                <span>Descargar mi guía gratis</span>
              </Button>
            </div>

            {/* Preview Card */}
            <div className="lg:pl-8">
              <Card className="card-elevated border-2 border-primary/20">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Guía EPBD 2024</CardTitle>
                  <CardDescription>
                    Tu manual completo para adaptar tu vivienda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">Fechas clave 2025-2050</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Euro className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium">Ayudas hasta 80%</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <ClipboardList className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium">Checklist práctico</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>📄 15 páginas</span>
                      <span>⏱️ Lectura: 5 min</span>
                      <span>💡 Guía práctica</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};