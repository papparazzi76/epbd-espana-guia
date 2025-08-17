import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, Home, ArrowRight } from "lucide-react";

export const MarketImpactSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ¿Cómo afectará la normativa al valor de tu vivienda?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            La nueva normativa EPBD 2024 creará tres categorías de viviendas en el mercado inmobiliario. 
            Descubre en cuál está la tuya y qué impacto tendrá en su valor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Viviendas eficientes */}
          <Card className="card-elevated border-2 border-success/20 hover:border-success/40 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-xl text-success">Viviendas eficientes</CardTitle>
              <CardDescription className="font-medium">Clases A, B y C</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-success/10 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">✅ Ventajas competitivas</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Se revalorizan en el mercado</li>
                    <li>• Consumen menos energía</li>
                    <li>• Se venden más rápido</li>
                    <li>• Mayor demanda de compradores</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">+15%</div>
                  <div className="text-sm text-muted-foreground">Revalorización estimada</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Viviendas intermedias */}
          <Card className="card-elevated border-2 border-warning/20 hover:border-warning/40 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-warning" />
              </div>
              <CardTitle className="text-xl text-warning">Viviendas intermedias</CardTitle>
              <CardDescription className="font-medium">Clases D y E</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-warning/10 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">⚠️ Acción requerida</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Deberán mejorar antes de 2033</li>
                    <li>• Inversión en eficiencia necesaria</li>
                    <li>• Oportunidad de aprovech ayudas</li>
                    <li>• Tiempo límite hasta 2030-2033</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">2030-2033</div>
                  <div className="text-sm text-muted-foreground">Fechas límite cumplimiento</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Viviendas ineficientes */}
          <Card className="card-elevated border-2 border-destructive/20 hover:border-destructive/40 transition-colors">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-xl text-destructive">Viviendas ineficientes</CardTitle>
              <CardDescription className="font-medium">Clases F y G</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-destructive/10 rounded-lg">
                  <h4 className="font-semibold text-destructive mb-2">🚨 Riesgo alto</h4>
                  <ul className="text-sm space-y-1">
                    <li>• No se podrán vender desde 2030</li>
                    <li>• Prohibido alquilar desde 2030</li>
                    <li>• Devaluación progresiva</li>
                    <li>• Reforma obligatoria urgente</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">-25%</div>
                  <div className="text-sm text-muted-foreground">Pérdida de valor estimada</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert box */}
        <Card className="max-w-4xl mx-auto border-2 border-warning/30 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-warning flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">⏰ ¿Tu vivienda está en riesgo?</h3>
                <p className="text-muted-foreground mb-4">
                  Si tu vivienda es anterior a 2010 y no has hecho reformas de eficiencia energética, 
                  es muy probable que se encuentre en clase F o G. Esto significa que desde 2030 
                  <strong> no podrás venderla ni alquilarla</strong> sin antes mejorar su calificación.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button 
                    onClick={() => scrollToSection('diagnostico')}
                    className="btn-hero group"
                  >
                    <span>Calcula tu situación</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => scrollToSection('ayudas')}
                    className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                  >
                    Ver ayudas disponibles
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">7M</div>
            <div className="text-sm text-muted-foreground">Viviendas afectadas en España</div>
          </div>
          <div className="text-center p-6 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-success mb-2">80%</div>
            <div className="text-sm text-muted-foreground">Máximo de ayudas disponibles</div>
          </div>
          <div className="text-center p-6 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-warning mb-2">2030</div>
            <div className="text-sm text-muted-foreground">Fecha límite clase E</div>
          </div>
          <div className="text-center p-6 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-secondary mb-2">€15K</div>
            <div className="text-sm text-muted-foreground">Ahorro medio en facturas</div>
          </div>
        </div>
      </div>
    </section>
  );
};