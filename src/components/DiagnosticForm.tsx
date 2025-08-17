import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Home, Calendar, MapPin, FileText, Target, User, Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  propertyType: string;
  constructionYear: string;
  province: string;
  city: string;
  hasEnergyLabel: string;
  interest: string;
  name: string;
  email: string;
  phone: string;
}

export const DiagnosticForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    constructionYear: "",
    province: "",
    city: "",
    hasEnergyLabel: "",
    interest: "",
    name: "",
    email: "",
    phone: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateGuide = () => {
    const guideContent = `GUÍA RÁPIDA: ADAPTA TU VIVIENDA A LA NORMATIVA EPBD 2030

📋 FECHAS CLAVE QUE DEBES CONOCER:
• 2030: Obligatorio clase E mínima para vender o alquilar
• 2033: Obligatorio clase D mínima 
• Actualización constante de normativas

🏠 SI TU VIVIENDA ES CLASE F O G:
✓ Necesitas mejoras urgentes antes de 2030
✓ Sin mejoras, no podrás vender o alquilar
✓ El valor de tu propiedad puede reducirse significativamente

💰 AYUDAS DISPONIBLES (HASTA 80% DE DESCUENTO):
✓ Plan de Recuperación, Transformación y Resiliencia
✓ Ayudas autonómicas por comunidad
✓ Subvenciones municipales específicas
✓ Deducciones fiscales por eficiencia energética

✅ CHECKLIST DE MEJORAS PRIORITARIAS:
1. Aislamiento térmico de fachadas y cubiertas
2. Cambio de ventanas por doble acristalamiento
3. Instalación de bomba de calor aerotérmica
4. Paneles solares fotovoltaicos
5. Sistema de ventilación mecánica controlada
6. Iluminación LED en toda la vivienda

🎯 PRÓXIMOS PASOS RECOMENDADOS:
1. Solicita certificado energético actualizado
2. Identifica las mejoras más rentables
3. Consulta ayudas disponibles en tu zona
4. Contacta con empresas especializadas
5. Planifica las obras con suficiente antelación

📞 ¿NECESITAS AYUDA PERSONALIZADA?
Nuestro equipo puede conectarte con empresas especializadas en tu zona.

---
Documento generado por casas-eficientes.es
Fecha: ${new Date().toLocaleDateString('es-ES')}
Datos del diagnóstico:
- Tipo de vivienda: ${formData.propertyType}
- Año construcción: ${formData.constructionYear}
- Ubicación: ${formData.city}, ${formData.province}
- Certificado energético: ${formData.hasEnergyLabel}
- Interés principal: ${formData.interest}
`;

    const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guia-personalizada-epbd-2030.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Faltan datos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Map form data to database schema
      const leadData = {
        nombre_completo: formData.name,
        email: formData.email,
        telefono: formData.phone,
        tipo_vivienda: formData.propertyType,
        año_construccion: formData.constructionYear,
        provincia: formData.province,
        localidad: formData.city,
        certificado_energetico: formData.hasEnergyLabel,
        interes_principal: formData.interest
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select();

      if (error) {
        console.error('Error saving lead:', error);
        toast({
          title: "Error",
          description: "No se pudo enviar el formulario. Inténtalo de nuevo.",
          variant: "destructive"
        });
        return;
      }

      console.log("Lead saved successfully:", data);
      
      setSubmitted(true);
      toast({
        title: "¡Gracias!",
        description: "En breve recibirás tu guía personalizada por email",
      });

      // Auto-download the guide
      setTimeout(() => {
        generateGuide();
      }, 1000);

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "Error inesperado. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="diagnostico" className="section-padding bg-muted">
        <div className="container-width">
          <Card className="max-w-2xl mx-auto text-center card-elevated">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl">¡Gracias! Ya hemos registrado tu caso</CardTitle>
              <CardDescription>
                En breve recibirás en tu email la <strong>Guía rápida para adaptar tu vivienda a la normativa 2030</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">📧 Revisa tu email</h3>
                  <p className="text-sm text-muted-foreground">
                    Hemos enviado tu guía personalizada a <strong>{formData.email}</strong>
                  </p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <h3 className="font-semibold text-secondary mb-2">📞 Próximo paso</h3>
                  <p className="text-sm text-muted-foreground">
                    En las próximas 24h un experto te contactará para analizar tu caso específico
                  </p>
                </div>
                <Button onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    propertyType: "",
                    constructionYear: "",
                    province: "",
                    city: "",
                    hasEnergyLabel: "",
                    interest: "",
                    name: "",
                    email: "",
                    phone: ""
                  });
                }}>
                  Hacer otro diagnóstico
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const provinces = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona",
    "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca",
    "Girona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva", "Huesca", "Islas Baleares",
    "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid",
    "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
    "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel",
    "Toledo", "Valencia", "Valladolid", "Bizkaia", "Zamora", "Zaragoza"
  ];

  return (
    <section id="diagnostico" className="section-padding bg-muted">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Haz tu diagnóstico gratuito en 1 minuto
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Responde a estas preguntas rápidas y te diremos si tu vivienda está en riesgo de no poder 
              venderse o alquilarse a partir de 2030. Además, te mostraremos qué ayudas puedes solicitar.
            </p>
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {currentStep}
                  </span>
                  Paso {currentStep} de 3
                </CardTitle>
                <div className="flex gap-1">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-medium">
                      <Home className="w-4 h-4" />
                      Tipo de vivienda
                    </Label>
                    <RadioGroup
                      value={formData.propertyType}
                      onValueChange={(value) => updateFormData('propertyType', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="unifamiliar" id="unifamiliar" />
                        <Label htmlFor="unifamiliar">Unifamiliar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="piso" id="piso" />
                        <Label htmlFor="piso">Piso en bloque</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comunidad" id="comunidad" />
                        <Label htmlFor="comunidad">Comunidad de vecinos</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-medium">
                      <Calendar className="w-4 h-4" />
                      Año aproximado de construcción
                    </Label>
                    <Select value={formData.constructionYear} onValueChange={(value) => updateFormData('constructionYear', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona década" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="antes_1980">Antes de 1980</SelectItem>
                        <SelectItem value="1980_1990">1980-1990</SelectItem>
                        <SelectItem value="1990_2000">1990-2000</SelectItem>
                        <SelectItem value="2000_2010">2000-2010</SelectItem>
                        <SelectItem value="despues_2010">Después de 2010</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.propertyType || !formData.constructionYear}
                    className="w-full"
                  >
                    Continuar
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-medium">
                        <MapPin className="w-4 h-4" />
                        Provincia
                      </Label>
                      <Select value={formData.province} onValueChange={(value) => updateFormData('province', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province} value={province}>{province}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="city" className="text-base font-medium">Localidad</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData('city', e.target.value)}
                        placeholder="Ej: Madrid, Barcelona..."
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-medium">
                      <FileText className="w-4 h-4" />
                      ¿Dispones de certificado energético?
                    </Label>
                    <RadioGroup
                      value={formData.hasEnergyLabel}
                      onValueChange={(value) => updateFormData('hasEnergyLabel', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id="si" />
                        <Label htmlFor="si">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no_se" id="no-se" />
                        <Label htmlFor="no-se">No lo sé</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-medium">
                      <Target className="w-4 h-4" />
                      ¿Qué te interesa más?
                    </Label>
                    <RadioGroup
                      value={formData.interest}
                      onValueChange={(value) => updateFormData('interest', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="reformar" id="reformar" />
                        <Label htmlFor="reformar">Reformar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="subvencion" id="subvencion" />
                        <Label htmlFor="subvencion">Solicitar subvención</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vender_alquilar" id="vender-alquilar" />
                        <Label htmlFor="vender-alquilar">Vender/Alquilar</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      disabled={!formData.province || !formData.city || !formData.hasEnergyLabel || !formData.interest}
                      className="flex-1"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="flex items-center gap-2 text-base font-medium">
                        <User className="w-4 h-4" />
                        Nombre completo *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="flex items-center gap-2 text-base font-medium">
                        <Mail className="w-4 h-4" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="phone" className="flex items-center gap-2 text-base font-medium">
                        <Phone className="w-4 h-4" />
                        Teléfono *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="600 123 456"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Al enviar este formulario, recibirás tu guía personalizada por email y 
                      aceptas que un experto en eficiencia energética te contacte para analizar tu caso.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Atrás
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar diagnóstico"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};