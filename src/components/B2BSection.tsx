import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building2, Users, TrendingUp, CheckCircle, ArrowRight, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const B2BSection = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    emailContacto: '',
    telefono: '',
    provinciasInteres: [] as string[],
    tipoServicios: [] as string[],
    planSuscripcion: 'basico',
    mensaje: ''
  });

  const provinces = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Zaragoza", "Málaga"];
  const servicios = ["Rehabilitación energética", "Instalación bomba de calor", "Paneles solares", "Aislamiento térmico"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombreEmpresa || !formData.emailContacto) {
      toast({ title: "Error", description: "Completa los campos obligatorios", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('companies').insert([{
        nombre_empresa: formData.nombreEmpresa,
        email_contacto: formData.emailContacto,
        telefono: formData.telefono || null,
        provincias_interes: formData.provinciasInteres,
        tipo_servicios: formData.tipoServicios,
        plan_suscripcion: formData.planSuscripcion,
        activo: true
      }]);

      if (error) throw error;
      setIsSubmitted(true);
      toast({ title: "¡Solicitud enviada!", description: "Te contactaremos pronto" });
    } catch (error) {
      toast({ title: "Error", description: "No se pudo enviar la solicitud", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-width text-center">
          <Card className="max-w-2xl mx-auto card-elevated">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">¡Solicitud recibida!</h3>
              <p className="text-muted-foreground mb-6">Te contactaremos en 24 horas para activar tu cuenta.</p>
              <Button onClick={() => { setIsSubmitted(false); setShowForm(false); }}>Enviar otra solicitud</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="empresas" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Eres <span className="gradient-text">empresa de reformas</span> o constructora?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Captar clientes interesados en rehabilitación energética es cada vez más caro y complejo.
            En Casas Eficientes lo hacemos por ti: generamos leads precalificados con propietarios 
            realmente interesados en adaptar su vivienda a la normativa.
          </p>
        </div>

        {!showForm ? (
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="card-elevated">
                <CardHeader>
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Leads Cualificados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Propietarios que ya completaron nuestro diagnóstico</p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Segmentación Avanzada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Solo leads de tu zona y servicios</p>
                </CardContent>
              </Card>
              <Card className="card-elevated">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Mayor Conversión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Leads con scoring automático</p>
                </CardContent>
              </Card>
            </div>
            <Button size="lg" onClick={() => setShowForm(true)} className="btn-hero">
              Quiero más información para empresas <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto card-elevated">
            <CardHeader>
              <CardTitle>Solicitar información</CardTitle>
              <CardDescription>Te contactaremos para explicarte nuestra plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  placeholder="Nombre empresa *" 
                  value={formData.nombreEmpresa}
                  onChange={(e) => setFormData(prev => ({...prev, nombreEmpresa: e.target.value}))}
                  required 
                />
                <Input 
                  type="email" 
                  placeholder="Email *" 
                  value={formData.emailContacto}
                  onChange={(e) => setFormData(prev => ({...prev, emailContacto: e.target.value}))}
                  required 
                />
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Solicitar información"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};