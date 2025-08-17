import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Target, TrendingUp, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export const B2BSection = () => {
  const openB2BContact = () => {
    // In a real app, this would open a contact form or redirect to a B2B landing page
    window.open('mailto:empresas@casas-eficientes.es?subject=Información para empresas - Leads EPBD 2024', '_blank');
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-width">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Building2 className="w-4 h-4" />
                  Para empresas de reformas y constructoras
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-6">
                ¿Eres empresa de reformas o constructora?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Captar clientes interesados en rehabilitación energética es cada vez más caro y complejo. 
                En <strong>Casas Eficientes</strong> lo hacemos por ti: generamos leads precalificados con 
                propietarios realmente interesados en adaptar su vivienda a la normativa.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Leads precalificados</h3>
                    <p className="text-sm text-muted-foreground">
                      Propietarios que ya conocen la normativa y buscan activamente realizar mejoras
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Segmentación geográfica</h3>
                    <p className="text-sm text-muted-foreground">
                      Acceso exclusivo a leads en tu zona de trabajo y especialización
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Información completa</h3>
                    <p className="text-sm text-muted-foreground">
                      Datos del inmueble, tipo de reforma requerida y presupuesto estimado
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Modelo de suscripción</h3>
                    <p className="text-sm text-muted-foreground">
                      Por una suscripción anual tendrás acceso exclusivo a todos los leads de tu área
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/10 rounded-lg mb-8">
                <h3 className="font-semibold text-primary mb-2">👉 Ventaja competitiva</h3>
                <p className="text-sm text-muted-foreground">
                  Mientras tus competidores luchan por visibilidad en Google Ads, tú tendrás acceso 
                  directo a propietarios que ya buscan soluciones de eficiencia energética.
                </p>
              </div>

              <Button onClick={openB2BContact} size="lg" className="btn-hero group">
                <span>Quiero más información para empresas</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats & Benefits */}
            <div className="lg:pl-8">
              <Card className="card-elevated border-2 border-primary/20 mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Oportunidad de mercado</CardTitle>
                  <CardDescription>
                    7 millones de viviendas necesitan reformas antes de 2030
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">7M</div>
                      <div className="text-sm text-muted-foreground">Viviendas F/G</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Target className="w-8 h-8 text-success mx-auto mb-2" />
                      <div className="text-2xl font-bold text-success">€120K</div>
                      <div className="text-sm text-muted-foreground">Ticket medio</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-secondary">300%</div>
                      <div className="text-sm text-muted-foreground">Crecimiento sector</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Building2 className="w-8 h-8 text-warning mx-auto mb-2" />
                      <div className="text-2xl font-bold text-warning">6 años</div>
                      <div className="text-sm text-muted-foreground">Plazo normativa</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Contacto empresas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm">+34 900 123 456</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm">empresas@casas-eficientes.es</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Horario de atención: L-V 9:00-18:00
                    </p>
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