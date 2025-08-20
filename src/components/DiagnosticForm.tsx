import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Home, User, Mail, Phone } from "lucide-react";
// FIX: Reverted to alias path as it is the project's convention.
import { supabase } from "@/integrations/supabase/client";

// Interfaz para los datos del formulario
// FIX: Simplified interface to match the current form fields.
interface FormData {
  propertyType: string;
  constructionYear: string;
  province: string;
  name: string;
  email: string;
  phone: string;
  mainInterest?: string;
  energyCertificate?: string;
}

export const DiagnosticForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    constructionYear: "",
    province: "",
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [generatedReport, setGeneratedReport] = useState("");

  const totalSteps = 2; // Cuestionario + Datos de Contacto

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const provinces = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona",
    "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca",
    "Girona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva", "Huesca", "Islas Baleares",
    "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid",
    "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
    "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel",
    "Toledo", "Valencia", "Valladolid", "Bizkaia", "Zamora", "Zaragoza"
  ];

  const estimateEnergyRating = (data: FormData): string => {
    let score = 0;
    // Puntuación basada en el año de construcción
    if (data.constructionYear === 'despues_2010') score += 40;
    else if (data.constructionYear === '2000_2010') score += 30;
    else if (data.constructionYear === '1980_2000') score += 15;
    else if (data.constructionYear === 'antes_1980') score += 5;

    // Puntuación basada en el tipo de propiedad (las casas suelen ser menos eficientes que los pisos)
    if (data.propertyType === 'piso') score += 15;
    else if (data.propertyType === 'adosado') score += 10;
    else if (data.propertyType === 'unifamiliar') score += 5;

    if (score > 50) return 'D';
    if (score > 35) return 'E';
    if (score > 20) return 'F';
    return 'G';
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.province) {
      toast({
        title: "Faltan datos de contacto",
        description: "Por favor, completa tu nombre, email, teléfono y provincia.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    const estimatedRating = estimateEnergyRating(formData);
    const fullDiagnosticData = {
      ...formData,
      clase_energetica_estimada: estimatedRating,
    };
    
    // **INICIO DE LA LÓGICA DE IA Y ENVÍO**
    try {
      // 1. Preparar el prompt para Gemini
      const promptParaGemini = `
        Analiza los siguientes datos de una vivienda para un diagnóstico de eficiencia energética en España y genera un informe técnico detallado.
        El informe debe incluir:
        1. Una introducción sobre la importancia de la eficiencia energética.
        2. Un resumen del estado actual de la vivienda basado en los datos.
        3. La letra de calificación energética estimada, que para este caso es: ${estimatedRating}.
        4. Una lista de 3 a 5 recomendaciones de mejora priorizadas por impacto y rentabilidad.
        5. Una estimación del coste y el ahorro potencial para cada recomendación.
        6. Un párrafo sobre las ayudas y subvenciones aplicables en la provincia de ${formData.province}.
        7. Una conclusión motivadora para el propietario.

        Datos de la vivienda:
        ${Object.entries(formData).map(([key, value]) => `- ${key}: ${Array.isArray(value) ? value.join(', ') : value}`).join('\n')}
      `;

      // 2. (SIMULADO) Llamada a la API de Gemini
      // En una implementación real, aquí se haría la llamada fetch a la API de Google AI.
      // const apiKey = "AIzaSyBehSqNE_V-XDnidBfcLXI-12pnKa4Th_Y"; // ¡No exponer en el frontend! Usar un backend.
      // const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=\${apiKey}\`, { ... });
      // const result = await response.json();
      // const informeGenerado = result.candidates[0].content.parts[0].text;
      
      // Como la llamada es simulada, generamos un informe de ejemplo basado en la lógica.
      const informeGenerado = `
        INFORME TÉCNICO PRELIMINAR DE EFICIENCIA ENERGÉTICA
        ----------------------------------------------------
        Cliente: ${formData.name}
        Provincia: ${formData.province}

        1. INTRODUCCIÓN
        Este informe analiza el estado actual de su vivienda y proporciona recomendaciones clave para mejorar su eficiencia energética, reducir sus facturas y cumplir con la nueva normativa europea EPBD 2024.

        2. ESTADO ACTUAL DE LA VIVIENDA
        Su vivienda, un(a) ${formData.propertyType} construido/a en la época de ${formData.constructionYear}, presenta características típicas de su periodo, con un potencial de mejora significativo en aislamiento y sistemas de climatización.

        3. CALIFICACIÓN ENERGÉTICA ESTIMADA
        Basado en los datos proporcionados, su vivienda obtendría una calificación energética estimada de:
        **LETRA ${estimatedRating}**

        4. RECOMENDACIONES PRIORIZADAS
        - **Mejora de Aislamiento (Fachada/Cubierta):** Es la medida de mayor impacto para reducir la demanda de calefacción y refrigeración.
          - Coste estimado: 8.000€ - 20.000€
          - Ahorro potencial: 30-40% en climatización.
        - **Sustitución de Ventanas:** Reemplazar carpinterías antiguas por unas de PVC con doble acristalamiento bajo emisivo.
          - Coste estimado: 4.000€ - 10.000€
          - Ahorro potencial: 15-20% en climatización.
        - **Instalación de Aerotermia:** Sustituir su sistema actual por una bomba de calor para calefacción, refrigeración y ACS.
          - Coste estimado: 9.000€ - 15.000€
          - Ahorro potencial: 50-70% respecto a sistemas eléctricos o de gasoil.

        5. AYUDAS Y SUBVENCIONES EN ${formData.province}
        En su provincia, puede optar a los fondos Next Generation (Programa PREE 5000) y a deducciones fiscales en el IRPF de hasta el 60% del coste de la obra. Le recomendamos consultar la ventanilla única de su comunidad para más detalles.

        6. CONCLUSIÓN
        Adaptar su vivienda no solo es una obligación futura, sino una inversión inteligente que mejora el confort, revaloriza su propiedad y le permite ahorrar desde el primer día.

        ---
        Este es un informe generado automáticamente. Un técnico cualificado se pondrá en contacto con usted.
        diagnostico@casasmaseficientes.com
      `;
      setGeneratedReport(informeGenerado);

      // 3. (SIMULADO) Envío de correo electrónico
      console.log("Simulando envío de correo a diagnostico@casasmaseficientes.com");
      console.log("Datos enviados:", { fullDiagnosticData, informeGenerado });

      // 4. Guardar en Supabase
      const { error } = await supabase.from('leads').insert({ 
        nombre_completo: formData.name,
        email: formData.email,
        telefono: formData.phone,
        provincia: formData.province,
        localidad: formData.province, // Using province as localidad for now
        tipo_vivienda: formData.propertyType,
        año_construccion: formData.constructionYear,
        interes_principal: formData.mainInterest || 'reformar',
        certificado_energetico: formData.energyCertificate || 'no_se'
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "¡Informe Generado!",
        description: "Tu diagnóstico se ha completado.",
      });

    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      toast({
        title: "Error",
        description: "No se pudo completar el proceso. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
    // **FIN DE LA LÓGICA DE IA Y ENVÍO**
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
              <CardTitle className="text-2xl">¡Diagnóstico completado!</CardTitle>
              <CardDescription>
                Hemos analizado tu caso y generado un informe técnico completo. Un técnico se pondrá en contacto contigo en breve.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg text-left">
                  <h3 className="font-semibold text-primary mb-2">Informe Técnico Preliminar</h3>
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-white p-4 rounded-md overflow-x-auto">
                    {generatedReport}
                  </pre>
                </div>
                <Button onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  // FIX: Reset form state to match the simplified interface.
                  setFormData({
                    propertyType: "",
                    constructionYear: "",
                    province: "",
                    name: "",
                    email: "",
                    phone: "",
                  });
                }}>
                  Realizar otro diagnóstico
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="diagnostico" className="section-padding bg-muted">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Diagnóstico Técnico Completo - 100% Gratuito
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Completa el cuestionario para recibir tu informe personalizado con la calificación energética estimada, recomendaciones y ayudas disponibles.
            </p>
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {currentStep}
                  </span>
                  Paso {currentStep} de {totalSteps}
                </CardTitle>
                <div className="flex gap-1">
                  {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
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
              {/* Paso 1: Cuestionario */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Home className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Datos de tu vivienda</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>Tipo de inmueble</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => updateFormData('propertyType', value)}>
                        <SelectTrigger><SelectValue placeholder="Selecciona tipo" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="piso">Piso</SelectItem>
                          <SelectItem value="unifamiliar">Casa Unifamiliar</SelectItem>
                          <SelectItem value="adosado">Adosado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label>Año de construcción</Label>
                      <Select value={formData.constructionYear} onValueChange={(value) => updateFormData('constructionYear', value)}>
                        <SelectTrigger><SelectValue placeholder="Selecciona época" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="antes_1980">Antes de 1980</SelectItem>
                          <SelectItem value="1980_2000">1980 - 2000</SelectItem>
                          <SelectItem value="2000_2010">2000 - 2010</SelectItem>
                          <SelectItem value="despues_2010">Después de 2010</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.propertyType || !formData.constructionYear}
                    className="w-full"
                  >
                    Continuar al último paso
                  </Button>
                </div>
              )}

              {/* Paso 2: Datos de contacto */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Ya casi hemos terminado</h3>
                    <p className="text-muted-foreground">Introduce tus datos para generar y recibir tu informe técnico gratuito.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-medium">
                        <User className="w-4 h-4" />
                        Nombre y Apellidos *
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-base font-medium">
                          <Mail className="w-4 h-4" />
                          Email *
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-base font-medium">
                          <Phone className="w-4 h-4" />
                          Teléfono *
                        </Label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="600 000 000"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Provincia de residencia *</Label>
                      <Select value={formData.province} onValueChange={(value) => updateFormData('province', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu provincia" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province} value={province}>{province}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Al completar este formulario, recibirás tu informe técnico y un experto te contactará en las próximas 24h para analizar tu caso.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Generando informe..." : "Finalizar y Generar Informe"}
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
