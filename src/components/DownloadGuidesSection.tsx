import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

export const DownloadGuidesSection = () => {
  const handleDownload = (fileName: string, displayName: string) => {
    const link = document.createElement('a');
    link.href = `/guides/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Descargando ${displayName}`);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Documentación Completa
          </h2>
          <p className="text-lg text-muted-foreground">
            Descarga la normativa oficial y nuestra guía de síntesis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tarjeta izquierda - Normativa completa */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <CardTitle className="text-xl mb-2">
                    Conoce a fondo la directiva europea de eficiencia energética en edificios (UE) 2024/175
                  </CardTitle>
                  <CardDescription>
                    Texto original completo de la normativa oficial
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleDownload('OJ_L_202401275_ES_TXT.pdf', 'normativa completa')}
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar Normativa Completa
              </Button>
            </CardContent>
          </Card>

          {/* Tarjeta derecha - Guía de síntesis */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <CardTitle className="text-xl mb-2">
                    Todos los puntos claves, fechas y síntesis general para que entiendas lo que dice la normativa
                  </CardTitle>
                  <CardDescription>
                    Guía práctica con los aspectos más importantes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleDownload('Directiva_UE_20241275_Sintesis.pdf', 'guía de síntesis')}
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar Guía de Síntesis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
