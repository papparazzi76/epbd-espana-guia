import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, Home, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/smooth-scroll";

export const MarketImpactSection = () => {

  return (
    <HelmetProvider>
      <Helmet>
        <title>Impacto en el Mercado Inmobiliario - EPBD 2024</title>
        <meta 
          name="description" 
          content="Analizamos cómo la nueva directiva de eficiencia energética afectará al valor de tu vivienda. Descubre los riesgos y oportunidades." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/impacto-mercado" />
      </Helmet>

      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              ¿Cómo afectará la normativa al valor de tu vivienda?
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              La nueva normativa EPBD 2024 creará tres categorías de viviendas en el mercado inmobiliario. 
              Descubre en cuál está la tuya y qué impacto tendrá en su valor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="card-elevated border-2 border-success/20 hover:border-success/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-xl text-success">Viviendas eficientes</CardTitle>
                <CardDescription className="font-medium">Clases A, B y C</CardDescription>
              </CardHeader>
              <CardContent>
                {/* ... Contenido sin cambios ... */}
              </CardContent>
            </Card>

            <Card className="card-elevated border-2 border-warning/20 hover:border-warning/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mb-4">
                  <Home className="w-6 h-6 text-warning" />
                </div>
                <CardTitle className="text-xl text-warning">Viviendas intermedias</CardTitle>
                <CardDescription className="font-medium">Clases D y E</CardDescription>
              </CardHeader>
              <CardContent>
                {/* ... Contenido sin cambios ... */}
              </CardContent>
            </Card>

            <Card className="card-elevated border-2 border-destructive/20 hover:border-destructive/40 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center mb-4">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
                <CardTitle className="text-xl text-destructive">Viviendas ineficientes</CardTitle>
                <CardDescription className="font-medium">Clases F y G</CardDescription>
              </CardHeader>
              <CardContent>
                {/* ... Contenido sin cambios ... */}
              </CardContent>
            </Card>
          </div>
          
          <Card className="max-w-4xl mx-auto border-2 border-warning/30 bg-warning/5">
            <CardContent className="p-6">
                {/* ... Contenido sin cambios ... */}
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* ... Contenido sin cambios ... */}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
