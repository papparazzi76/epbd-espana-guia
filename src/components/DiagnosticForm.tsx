import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Home, Calendar, MapPin, FileText, Target, User, Mail, Phone, Thermometer, Zap, Wrench, Euro, Settings } from "lucide-react";
// FIX: Using a relative path with the file extension to ensure the bundler can resolve the module.
import { supabase } from "../../integrations/supabase/client.ts";

interface FormData {
  // 1. Información general de la vivienda
  propertyType: string;
  constructionYear: string;
  surfaceArea: string;
  floors: string;
  rooms: string;
  bathrooms: string;
  occupancy: string;
  
  // 2. Envolvente térmica
  facadeType: string;
  insulationState: string;
  windowType: string;
  thermalBridge: string;
  glassType: string;
  
  // 3. Sistemas de climatización y ACS
  heatingSystem: string;
  coolingSystem: string;
  hotWaterSystem: string;
  
  // 4. Instalaciones energéticas
  solarPanels: string;
  solarPower: string;
  battery: string;
  solarThermal: string;
  heatPump: string;
  ventilationSystem: string;
  
  // 5. Consumos energéticos
  electricConsumption: string;
  gasOilConsumption: string;
  monthlyBill: string;
  energyCertificate: string;
  
  // 6. Estado y posibilidades de reforma
  mainInterest: string;
  plannedWorks: string[];
  budget: string;
  
  // 7. Financiación y ayudas
  interestSubsidies: string;
  interestFinancing: string;
  
  // 8. Localización y Contacto
  province: string;
  city: string;
  climateZone: string;
  environment: string;
  name: string;
  email: string;
  phone: string;
}

export const DiagnosticForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "", constructionYear: "", surfaceArea: "", floors: "", rooms: "",
    bathrooms: "", occupancy: "", facadeType: "", insulationState: "", windowType: "",
    thermalBridge: "", glassType: "", heatingSystem: "", coolingSystem: "", hotWaterSystem: "",
    solarPanels: "", solarPower: "", battery: "", solarThermal: "", heatPump: "",
    ventilationSystem: "", electricConsumption: "", gasOilConsumption: "", monthlyBill: "",
    energyCertificate: "", mainInterest: "", plannedWorks: [], budget: "",
    interestSubsidies: "", interestFinancing: "", province: "", city: "", climateZone: "",
    environment: "", name: "", email: "", phone: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [generatedReport, setGeneratedReport] = useState("");

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    const currentArray = (formData[field] as string[]) || [];
    if (checked) {
      updateFormData(field, [...currentArray, value]);
    } else {
      updateFormData(field, currentArray.filter(item => item !== value));
    }
  };

  const estimateEnergyRating = (data: FormData): string => {
    let score = 0;
    if (data.constructionYear === 'despues_2010') score += 30;
    else if (data.constructionYear === '2000_2010') score += 20;
    else if (data.constructionYear === '1980_2000') score += 10;

    if (data.insulationState === 'completo_exterior' || data.insulationState === 'completo_interior') score += 20;
    if (data.windowType === 'pvc' && data.thermalBridge === 'si') score += 15;
    if (data.heatingSystem === 'aerotermia') score += 20;
    if (data.solarPanels === 'si') score += 15;

    if (score > 80) return 'A';
    if (score > 70) return 'B';
    if (score > 55) return 'C';
    if (score > 40) return 'D';
    if (score > 25) return 'E';
    if (score > 10) return 'F';
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
    const fullDiagnosticData = { ...formData, clase_energetica_estimada: estimatedRating };

    try {
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

      // SIMULACIÓN DE LLAMADA A GEMINI Y ENVÍO DE CORREO
      const informeGenerado = `
        INFORME TÉCNICO PRELIMINAR DE EFICIENCIA ENERGÉTICA
        ----------------------------------------------------
        Cliente: ${formData.name}
        Provincia: ${formData.province}

        1. INTRODUCCIÓN
        Este informe analiza el estado actual de su vivienda y proporciona recomendaciones clave para mejorar su eficiencia energética, reducir sus facturas y cumplir con la nueva normativa europea EPBD 2024.

        2. ESTADO ACTUAL DE LA VIVIENDA
        Su vivienda, un(a) ${formData.propertyType} construido/a en la época de ${formData.constructionYear}, presenta características típicas de su periodo, con un potencial de mejora significativo.

        3. CALIFICACIÓN ENERGÉTICA ESTIMADA: **LETRA ${estimatedRating}**

        4. RECOMENDACIONES PRIORIZADAS
        - **Mejora de Aislamiento:** Es la medida de mayor impacto. Coste estimado: 8.000€ - 20.000€. Ahorro potencial: 30-40% en climatización.
        - **Sustitución de Ventanas:** Reemplazar por PVC con doble acristalamiento bajo emisivo. Coste estimado: 4.000€ - 10.000€. Ahorro potencial: 15-20% en climatización.
        - **Instalación de Aerotermia:** Para calefacción, refrigeración y ACS. Coste estimado: 9.000€ - 15.000€. Ahorro potencial: 50-70% respecto a sistemas convencionales.

        5. AYUDAS Y SUBVENCIONES EN ${formData.province}
        Puede optar a los fondos Next Generation (Programa PREE 5000) y a deducciones fiscales en el IRPF de hasta el 60% del coste de la obra.

        6. CONCLUSIÓN
        Adaptar su vivienda es una inversión inteligente que mejora el confort, revaloriza su propiedad y le permite ahorrar.

        ---
        Informe generado por IA. Un técnico cualificado se pondrá en contacto con usted.
        diagnostico@casasmaseficientes.com
      `;
      setGeneratedReport(informeGenerado);

      console.log("Simulando envío de correo a diagnostico@casasmaseficientes.com");
      console.log("Datos enviados:", { fullDiagnosticData, informeGenerado });

      const { error } = await supabase.from('leads').insert([{ 
        nombre_completo: formData.name, email: formData.email, telefono: formData.phone, provincia: formData.province,
        tipo_vivienda: formData.propertyType, año_construccion: formData.constructionYear,
        interes_principal: formData.mainInterest || 'reformar', certificado_energetico: formData.energyCertificate || 'no_se'
      }]);

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "¡Informe Generado!", description: "Tu diagnóstico se ha completado." });

    } catch (error) {
      console.error("Error en el proceso de envío:", error);
      toast({ title: "Error", description: "No se pudo completar el proceso.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
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
                  setFormData({
                    propertyType: "", constructionYear: "", surfaceArea: "", floors: "", rooms: "",
                    bathrooms: "", occupancy: "", facadeType: "", insulationState: "", windowType: "",
                    thermalBridge: "", glassType: "", heatingSystem: "", coolingSystem: "", hotWaterSystem: "",
                    solarPanels: "", solarPower: "", battery: "", solarThermal: "", heatPump: "",
                    ventilationSystem: "", electricConsumption: "", gasOilConsumption: "", monthlyBill: "",
                    energyCertificate: "", mainInterest: "", plannedWorks: [], budget: "",
                    interestSubsidies: "", interestFinancing: "", province: "", city: "", climateZone: "",
                    environment: "", name: "", email: "", phone: ""
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

  const totalSteps = 8;

  return (
    <section id="diagnostico" className="section-padding bg-muted">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Diagnóstico Técnico Completo - 100% Gratuito
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Completa este formulario técnico para recibir un informe personalizado con las mejoras más rentables 
              para tu vivienda y todas las ayudas disponibles en tu zona.
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
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6"><Home className="w-12 h-12 mx-auto mb-3 text-primary" /><h3 className="text-xl font-semibold">Información general de la vivienda</h3></div>
                  {/* Fields for Step 1 */}
                  <Button onClick={() => setCurrentStep(2)} className="w-full">Continuar</Button>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6"><Thermometer className="w-12 h-12 mx-auto mb-3 text-primary" /><h3 className="text-xl font-semibold">Envolvente térmica</h3></div>
                  {/* Fields for Step 2 */}
                  <div className="flex gap-3 mt-4"><Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">Atrás</Button><Button onClick={() => setCurrentStep(3)} className="flex-1">Continuar</Button></div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6"><Settings className="w-12 h-12 mx-auto mb-3 text-primary" /><h3 className="text-xl font-semibold">Sistemas de climatización y ACS</h3></div>
                  {/* Fields for Step 3 */}
                  <div className="flex gap-3 mt-4"><Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">Atrás</Button><Button onClick={() => setCurrentStep(4)} className="flex-1">Continuar</Button></div>
                </div>
              )}
               {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6"><Zap className="w-12 h-12 mx-auto mb-3 text-primary" /><h3 className="text-xl font-semibold">Instalaciones energéticas</h3></div>
                  {/* Fields for Step 4 */}
                  <div className="flex gap-3 mt-4"><Button variant="outline" onClick={() => setCurrentStep(3)} className="flex-1">Atrás</Button><Button onClick={() => setCurrentStep(5)} className="flex-1">Continuar</Button></div>
                </div>
              )}
               {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-6"><FileText className="w-12 h-12 mx-auto mb-3 text-primary" /><h3 className="text-xl font-semibold">Consumos energéticos</h3></div>
                  {/* Fields for Step 5 */}
                  <div className="flex gap-3 mt-4"><Button variant="outline" onClick={() => setCurrentStep(4)} className="flex-1">Atrás</Button><Button onClick={() => setCurrentStep(6)} className="flex-1">Continuar</Button></div>
                </div>
              )}
               {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center mb-6"><Wrench className="w-12 h-12 mx-auto mb-3 text-primary" /><h3 className="text-xl font-semibold">Posibilidades de reforma</h3></div>
                  {/* Fields for Step 6 */}
                  <div className="flex gap-3 mt-4"><Button variant="outline" onClick={() => setCurrentStep(5)} className="flex-1">Atrás</Button><Button onClick={() => setCurrentStep(7)} className="flex-1">Continuar</Button></div>
                </div>
              )}
               {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="text-center mb-6"><Euro className="w-12 h-12 mx-auto mb-3 text-primary" /><h3 className="text-xl font-semibold">Financiación y ayudas</h3></div>
                  {/* Fields for Step 7 */}
                  <div className="flex gap-3 mt-4"><Button variant="outline" onClick={() => setCurrentStep(6)} className="flex-1">Atrás</Button><Button onClick={() => setCurrentStep(8)} className="flex-1">Continuar</Button></div>
                </div>
              )}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Ya casi hemos terminado</h3>
                    <p className="text-muted-foreground">Introduce tus datos para generar y recibir tu informe técnico gratuito.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-medium">
                        <User className="w-4 h-4" /> Nombre y Apellidos *
                      </Label>
                      <Input value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} placeholder="Tu nombre completo" required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-base font-medium">
                          <Mail className="w-4 h-4" /> Email *
                        </Label>
                        <Input type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} placeholder="tu@email.com" required />
                      </div>
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-base font-medium">
                          <Phone className="w-4 h-4" /> Teléfono *
                        </Label>
                        <Input type="tel" value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} placeholder="600 000 000" required />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Provincia de residencia *</Label>
                      <Select value={formData.province} onValueChange={(value) => updateFormData('province', value as string)}>
                        <SelectTrigger><SelectValue placeholder="Selecciona tu provincia" /></SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (<SelectItem key={province} value={province}>{province}</SelectItem>))}
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
                    <Button variant="outline" onClick={() => setCurrentStep(7)} className="flex-1">Atrás</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
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
