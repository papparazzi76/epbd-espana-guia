import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Home, Calendar, MapPin, FileText, Target, User, Mail, Phone, Thermometer, Zap, Wrench, Euro, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  
  // 8. Localización
  province: string;
  city: string;
  climateZone: string;
  environment: string;
  
  // Datos de contacto
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
    surfaceArea: "",
    floors: "",
    rooms: "",
    bathrooms: "",
    occupancy: "",
    facadeType: "",
    insulationState: "",
    windowType: "",
    thermalBridge: "",
    glassType: "",
    heatingSystem: "",
    coolingSystem: "",
    hotWaterSystem: "",
    solarPanels: "",
    solarPower: "",
    battery: "",
    solarThermal: "",
    heatPump: "",
    ventilationSystem: "",
    electricConsumption: "",
    gasOilConsumption: "",
    monthlyBill: "",
    energyCertificate: "",
    mainInterest: "",
    plannedWorks: [],
    budget: "",
    interestSubsidies: "",
    interestFinancing: "",
    province: "",
    city: "",
    climateZone: "",
    environment: "",
    name: "",
    email: "",
    phone: ""
  });

  const [submitted, setSubmitted] = useState(false);

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

  const generateComprehensiveGuide = () => {
    const guideContent = `INFORME TÉCNICO PERSONALIZADO - REHABILITACIÓN ENERGÉTICA
====================================================================

🏠 DATOS DE TU VIVIENDA
--------------------------------------------------------------------
Tipo de inmueble: ${formData.propertyType}
Año de construcción: ${formData.constructionYear}
Superficie: ${formData.surfaceArea} m²
Plantas: ${formData.floors}
Habitaciones: ${formData.rooms}
Baños: ${formData.bathrooms}
Uso: ${formData.occupancy}

🌡️ ENVOLVENTE TÉRMICA
--------------------------------------------------------------------
Tipo de fachada: ${formData.facadeType}
Estado del aislamiento: ${formData.insulationState}
Carpinterías: ${formData.windowType}
Puente térmico: ${formData.thermalBridge}
Tipo de vidrio: ${formData.glassType}

🔥 SISTEMAS DE CLIMATIZACIÓN
--------------------------------------------------------------------
Calefacción: ${formData.heatingSystem}
Refrigeración: ${formData.coolingSystem}
Agua caliente sanitaria: ${formData.hotWaterSystem}

⚡ INSTALACIONES ENERGÉTICAS
--------------------------------------------------------------------
Paneles solares fotovoltaicos: ${formData.solarPanels}
${formData.solarPower ? `Potencia instalada: ${formData.solarPower} kWp` : ''}
Batería: ${formData.battery}
Solar térmica: ${formData.solarThermal}
Bomba de calor: ${formData.heatPump}
Ventilación mecánica: ${formData.ventilationSystem}

💡 CONSUMOS ENERGÉTICOS
--------------------------------------------------------------------
Consumo eléctrico anual: ${formData.electricConsumption} kWh
Consumo gas/gasoil: ${formData.gasOilConsumption}
Factura mensual: ${formData.monthlyBill}€
Certificado energético: ${formData.energyCertificate}

🎯 OBJETIVOS Y PRESUPUESTO
--------------------------------------------------------------------
Interés principal: ${formData.mainInterest}
Obras previstas: ${formData.plannedWorks.join(', ')}
Presupuesto disponible: ${formData.budget}

📍 UBICACIÓN
--------------------------------------------------------------------
Provincia: ${formData.province}
Localidad: ${formData.city}
Zona climática: ${formData.climateZone}
Entorno: ${formData.environment}

💰 RECOMENDACIONES ESPECÍFICAS
--------------------------------------------------------------------
${getPersonalizedRecommendations(formData)}

📞 CONTACTO
--------------------------------------------------------------------
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}

---
Informe generado el ${new Date().toLocaleDateString('es-ES')}
Por casas-eficientes.es - Especialistas en rehabilitación energética
`;

    const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'informe-tecnico-personalizado.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getPersonalizedRecommendations = (data: FormData) => {
    let recommendations = [];
    
    if (data.insulationState === 'sin_aislamiento') {
      recommendations.push('🔥 PRIORIDAD ALTA: Instalación de aislamiento térmico en fachada y cubierta');
    }
    
    if (data.windowType === 'madera' || data.thermalBridge === 'no') {
      recommendations.push('🪟 Sustitución de ventanas por PVC con rotura de puente térmico');
    }
    
    if (data.heatingSystem === 'electrico' || data.heatingSystem === 'gasoil') {
      recommendations.push('♨️ Cambio a bomba de calor aerotérmica para mayor eficiencia');
    }
    
    if (data.solarPanels === 'no') {
      recommendations.push('☀️ Instalación de paneles solares fotovoltaicos');
    }
    
    if (data.energyCertificate === 'F' || data.energyCertificate === 'G') {
      recommendations.push('⚠️ URGENTE: Tu vivienda necesita mejoras antes de 2030');
    }
    
    return recommendations.length > 0 ? recommendations.join('\n') : 'Analizaremos tu caso específico para darte recomendaciones personalizadas.';
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
      // Prepare technical data as JSON for storage in the database
      const technicalData = {
        // General property info
        superficie: formData.surfaceArea,
        plantas: formData.floors,
        habitaciones: formData.rooms,
        baños: formData.bathrooms,
        uso_vivienda: formData.occupancy,
        
        // Thermal envelope
        tipo_fachada: formData.facadeType,
        estado_aislamiento: formData.insulationState,
        tipo_ventanas: formData.windowType,
        puente_termico: formData.thermalBridge,
        tipo_vidrio: formData.glassType,
        
        // Climate systems
        sistema_calefaccion: formData.heatingSystem,
        sistema_refrigeracion: formData.coolingSystem,
        sistema_acs: formData.hotWaterSystem,
        
        // Energy installations
        paneles_solares: formData.solarPanels,
        potencia_solar: formData.solarPower,
        bateria: formData.battery,
        solar_termica: formData.solarThermal,
        bomba_calor: formData.heatPump,
        ventilacion_mecanica: formData.ventilationSystem,
        
        // Energy consumption
        consumo_electrico: formData.electricConsumption,
        consumo_gas_gasoil: formData.gasOilConsumption,
        factura_mensual: formData.monthlyBill,
        
        // Renovation plans
        obras_previstas: formData.plannedWorks,
        presupuesto: formData.budget,
        interes_subvenciones: formData.interestSubsidies,
        interes_financiacion: formData.interestFinancing,
        
        // Location details
        zona_climatica: formData.climateZone,
        entorno: formData.environment
      };

      // Insert lead data matching the actual database schema
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          nombre_completo: formData.name,
          email: formData.email,
          telefono: formData.phone,
          tipo_vivienda: formData.propertyType,
          año_construccion: formData.constructionYear,
          provincia: formData.province,
          localidad: formData.city,
          certificado_energetico: formData.energyCertificate || 'no_se',
          interes_principal: formData.mainInterest
        }])
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
        title: "¡Perfecto!",
        description: "Tu informe técnico personalizado se está generando",
      });

      // Auto-download the comprehensive guide
      setTimeout(() => {
        generateComprehensiveGuide();
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
              <CardTitle className="text-2xl">¡Perfecto! Tu caso está siendo analizado</CardTitle>
              <CardDescription>
                Tu <strong>Informe Técnico Personalizado</strong> está listo para descargar.
                Un experto analizará toda la información para ofrecerte las mejores soluciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">📋 Informe descargado</h3>
                  <p className="text-sm text-muted-foreground">
                    Tu informe técnico con todas las recomendaciones específicas para <strong>{formData.propertyType}</strong> en <strong>{formData.city}</strong>
                  </p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <h3 className="font-semibold text-secondary mb-2">🎯 Próximo paso</h3>
                  <p className="text-sm text-muted-foreground">
                    En 24h recibirás una llamada de un técnico especializado para analizar tu caso específico y las ayudas disponibles
                  </p>
                </div>
                <Button onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  // Reset form data
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
                  Hacer otro diagnóstico
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
              {/* Paso 1: Información general de la vivienda */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Home className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Información general de la vivienda</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Tipo de inmueble</Label>
                      <RadioGroup value={formData.propertyType} onValueChange={(value) => updateFormData('propertyType', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="chalet_independiente" id="chalet" />
                          <Label htmlFor="chalet">Chalet independiente</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="adosado_pareado" id="adosado" />
                          <Label htmlFor="adosado">Adosado / Pareado</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="piso_edificio" id="piso" />
                          <Label htmlFor="piso">Piso en edificio</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="duplex_atico" id="duplex" />
                          <Label htmlFor="duplex">Dúplex / Ático</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="casa_rural" id="rural" />
                          <Label htmlFor="rural">Casa rural / Vivienda tradicional</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label>Año de construcción</Label>
                        <Select value={formData.constructionYear} onValueChange={(value) => updateFormData('constructionYear', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona década" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="antes_1960">Antes de 1960</SelectItem>
                            <SelectItem value="1960_1980">1960-1980</SelectItem>
                            <SelectItem value="1980_2000">1980-2000</SelectItem>
                            <SelectItem value="2000_2010">2000-2010</SelectItem>
                            <SelectItem value="despues_2010">Después de 2010</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Superficie construida (m²)</Label>
                        <Input
                          value={formData.surfaceArea}
                          onChange={(e) => updateFormData('surfaceArea', e.target.value)}
                          placeholder="Ej: 120"
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <Label>Número de plantas</Label>
                        <Select value={formData.floors} onValueChange={(value) => updateFormData('floors', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Plantas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 planta</SelectItem>
                            <SelectItem value="2">2 plantas</SelectItem>
                            <SelectItem value="3">3 plantas</SelectItem>
                            <SelectItem value="mas_3">Más de 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Número de habitaciones</Label>
                        <Select value={formData.rooms} onValueChange={(value) => updateFormData('rooms', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Habitaciones" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="mas_4">Más de 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Número de baños</Label>
                        <Select value={formData.bathrooms} onValueChange={(value) => updateFormData('bathrooms', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Baños" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="mas_3">Más de 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Ocupación habitual</Label>
                      <RadioGroup value={formData.occupancy} onValueChange={(value) => updateFormData('occupancy', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="principal" id="principal" />
                          <Label htmlFor="principal">Vivienda principal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="segunda" id="segunda" />
                          <Label htmlFor="segunda">Segunda residencia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="alquiler" id="alquiler" />
                          <Label htmlFor="alquiler">Alquiler</Label>
                        </div>
                      </RadioGroup>
                    </div>
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

              {/* Paso 2: Envolvente térmica */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Thermometer className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Envolvente térmica (Aislamiento)</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Tipo de fachada</Label>
                      <RadioGroup value={formData.facadeType} onValueChange={(value) => updateFormData('facadeType', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ladrillo_macizo" id="ladrillo" />
                          <Label htmlFor="ladrillo">Ladrillo macizo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bloque_hormigon" id="hormigon" />
                          <Label htmlFor="hormigon">Bloque hormigón</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fachada_ventilada" id="ventilada" />
                          <Label htmlFor="ventilada">Fachada ventilada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sate" id="sate" />
                          <Label htmlFor="sate">SATE u otro aislamiento exterior</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Estado del aislamiento</Label>
                      <RadioGroup value={formData.insulationState} onValueChange={(value) => updateFormData('insulationState', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sin_aislamiento" id="sin" />
                          <Label htmlFor="sin">Sin aislamiento</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="parcial" id="parcial" />
                          <Label htmlFor="parcial">Aislamiento parcial</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="completo_exterior" id="exterior" />
                          <Label htmlFor="exterior">Aislamiento completo exterior</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="completo_interior" id="interior" />
                          <Label htmlFor="interior">Aislamiento completo interior</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Carpinterías</Label>
                      <RadioGroup value={formData.windowType} onValueChange={(value) => updateFormData('windowType', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="madera" id="madera" />
                          <Label htmlFor="madera">Madera</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aluminio" id="aluminio" />
                          <Label htmlFor="aluminio">Aluminio</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pvc" id="pvc" />
                          <Label htmlFor="pvc">PVC</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Con rotura de puente térmico</Label>
                      <RadioGroup value={formData.thermalBridge} onValueChange={(value) => updateFormData('thermalBridge', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="puente_si" />
                          <Label htmlFor="puente_si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="puente_no" />
                          <Label htmlFor="puente_no">No</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no_se_puente" id="puente_nose" />
                          <Label htmlFor="puente_nose">No lo sé</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Vidrios</Label>
                      <RadioGroup value={formData.glassType} onValueChange={(value) => updateFormData('glassType', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sencillo" id="sencillo" />
                          <Label htmlFor="sencillo">Sencillo</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="doble" id="doble" />
                          <Label htmlFor="doble">Doble</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="triple" id="triple" />
                          <Label htmlFor="triple">Triple</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bajo_emisivo" id="emisivo" />
                          <Label htmlFor="emisivo">Bajo emisivo / Control solar</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      disabled={!formData.facadeType || !formData.insulationState}
                      className="flex-1"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 3: Sistemas de climatización y ACS */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Settings className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Sistemas de climatización y ACS</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Sistema de calefacción principal</Label>
                      <RadioGroup value={formData.heatingSystem} onValueChange={(value) => updateFormData('heatingSystem', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gas_natural" id="gas" />
                          <Label htmlFor="gas">Gas natural</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gasoil" id="gasoil" />
                          <Label htmlFor="gasoil">Gasoil</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="electrico" id="electrico" />
                          <Label htmlFor="electrico">Eléctrico (radiadores, acumuladores)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="biomasa" id="biomasa" />
                          <Label htmlFor="biomasa">Biomasa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aerotermia" id="aerotermia" />
                          <Label htmlFor="aerotermia">Aerotermia / Geotermia</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Sistema de refrigeración</Label>
                      <RadioGroup value={formData.coolingSystem} onValueChange={(value) => updateFormData('coolingSystem', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ninguno" id="frio_ninguno" />
                          <Label htmlFor="frio_ninguno">Ninguno</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aire_individual" id="individual" />
                          <Label htmlFor="individual">Aire acondicionado individual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multisplit" id="multisplit" />
                          <Label htmlFor="multisplit">Sistema multisplit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="conductos" id="conductos" />
                          <Label htmlFor="conductos">Conductos</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Producción de ACS (agua caliente)</Label>
                      <RadioGroup value={formData.hotWaterSystem} onValueChange={(value) => updateFormData('hotWaterSystem', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="caldera_mixta" id="mixta" />
                          <Label htmlFor="mixta">Caldera mixta</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="termo_electrico" id="termo" />
                          <Label htmlFor="termo">Termo eléctrico</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="solar_termico" id="solar_termico" />
                          <Label htmlFor="solar_termico">Paneles solares térmicos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bomba_calor_acs" id="bomba_acs" />
                          <Label htmlFor="bomba_acs">Bomba de calor</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(4)}
                      disabled={!formData.heatingSystem || !formData.coolingSystem || !formData.hotWaterSystem}
                      className="flex-1"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 4: Instalaciones energéticas */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Zap className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Instalaciones energéticas</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">¿Tienes placas solares fotovoltaicas?</Label>
                      <RadioGroup value={formData.solarPanels} onValueChange={(value) => updateFormData('solarPanels', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="placas_si" />
                          <Label htmlFor="placas_si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="placas_no" />
                          <Label htmlFor="placas_no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.solarPanels === 'si' && (
                      <>
                        <div className="space-y-3">
                          <Label>Potencia instalada (kWp)</Label>
                          <Input
                            value={formData.solarPower}
                            onChange={(e) => updateFormData('solarPower', e.target.value)}
                            placeholder="Ej: 5.5"
                            type="number"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base font-medium">¿Con batería?</Label>
                          <RadioGroup value={formData.battery} onValueChange={(value) => updateFormData('battery', value)}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="si" id="bateria_si" />
                              <Label htmlFor="bateria_si">Sí</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="bateria_no" />
                              <Label htmlFor="bateria_no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </>
                    )}

                    <div className="space-y-3">
                      <Label className="text-base font-medium">¿Tienes solar térmica?</Label>
                      <RadioGroup value={formData.solarThermal} onValueChange={(value) => updateFormData('solarThermal', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="termica_si" />
                          <Label htmlFor="termica_si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="termica_no" />
                          <Label htmlFor="termica_no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">¿Tienes aerotermia o geotermia?</Label>
                      <RadioGroup value={formData.heatPump} onValueChange={(value) => updateFormData('heatPump', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="bomba_si" />
                          <Label htmlFor="bomba_si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="bomba_no" />
                          <Label htmlFor="bomba_no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">¿Sistema de ventilación mecánica con recuperación de calor?</Label>
                      <RadioGroup value={formData.ventilationSystem} onValueChange={(value) => updateFormData('ventilationSystem', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="ventilacion_si" />
                          <Label htmlFor="ventilacion_si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="ventilacion_no" />
                          <Label htmlFor="ventilacion_no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(3)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(5)}
                      disabled={!formData.solarPanels || !formData.solarThermal || !formData.heatPump || !formData.ventilationSystem}
                      className="flex-1"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 5: Consumos energéticos actuales */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Consumos energéticos actuales</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Consumo eléctrico anual (kWh)</Label>
                      <Input
                        value={formData.electricConsumption}
                        onChange={(e) => updateFormData('electricConsumption', e.target.value)}
                        placeholder="Ej: 4500"
                        type="number"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Consumo de gas/gasoil anual</Label>
                      <Input
                        value={formData.gasOilConsumption}
                        onChange={(e) => updateFormData('gasOilConsumption', e.target.value)}
                        placeholder="Ej: 2000 litros o 15000 kWh"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Factura energética mensual aproximada (€)</Label>
                      <Input
                        value={formData.monthlyBill}
                        onChange={(e) => updateFormData('monthlyBill', e.target.value)}
                        placeholder="Ej: 150"
                        type="number"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Certificado energético actual</Label>
                      <Select value={formData.energyCertificate} onValueChange={(value) => updateFormData('energyCertificate', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la clase energética" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Clase A</SelectItem>
                          <SelectItem value="B">Clase B</SelectItem>
                          <SelectItem value="C">Clase C</SelectItem>
                          <SelectItem value="D">Clase D</SelectItem>
                          <SelectItem value="E">Clase E</SelectItem>
                          <SelectItem value="F">Clase F</SelectItem>
                          <SelectItem value="G">Clase G</SelectItem>
                          <SelectItem value="no_tengo">No tengo certificado</SelectItem>
                          <SelectItem value="no_se">No lo sé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(4)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(6)}
                      disabled={!formData.monthlyBill || !formData.energyCertificate}
                      className="flex-1"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 6: Estado y posibilidades de reforma */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Wrench className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Estado y posibilidades de reforma</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">¿Qué te interesa más?</Label>
                      <RadioGroup value={formData.mainInterest} onValueChange={(value) => updateFormData('mainInterest', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ahorro_factura" id="ahorro" />
                          <Label htmlFor="ahorro">Ahorro en factura energética</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="revalorizacion" id="valor" />
                          <Label htmlFor="valor">Revalorización de la vivienda</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="confort" id="confort" />
                          <Label htmlFor="confort">Confort térmico</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="normativo" id="normativo" />
                          <Label htmlFor="normativo">Cumplimiento normativo (EPBD 2024)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Obras previstas (puedes seleccionar varias)</Label>
                      <div className="space-y-2">
                        {[
                          { id: 'integral', label: 'Rehabilitación integral' },
                          { id: 'fachada_cubierta', label: 'Mejora de fachada y cubiertas' },
                          { id: 'ventanas', label: 'Sustitución de ventanas' },
                          { id: 'climatizacion', label: 'Cambio de sistema de climatización' },
                          { id: 'renovables', label: 'Instalación de renovables' }
                        ].map((work) => (
                          <div key={work.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={work.id}
                              checked={formData.plannedWorks.includes(work.id)}
                              onCheckedChange={(checked) => handleCheckboxChange('plannedWorks', work.id, checked as boolean)}
                            />
                            <Label htmlFor={work.id}>{work.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Disponibilidad de presupuesto</Label>
                      <RadioGroup value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="menos_10k" id="10k" />
                          <Label htmlFor="10k">Menos de 10.000€</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="10k_30k" id="30k" />
                          <Label htmlFor="30k">10.000€ - 30.000€</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="30k_60k" id="60k" />
                          <Label htmlFor="60k">30.000€ - 60.000€</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mas_60k" id="mas60k" />
                          <Label htmlFor="mas60k">Más de 60.000€</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(5)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(7)}
                      disabled={!formData.mainInterest || formData.plannedWorks.length === 0 || !formData.budget}
                      className="flex-1"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 7: Financiación y ayudas */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Euro className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Financiación y ayudas</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">¿Te interesa solicitar subvenciones / programas PREE 5000?</Label>
                      <RadioGroup value={formData.interestSubsidies} onValueChange={(value) => updateFormData('interestSubsidies', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="sub_si" />
                          <Label htmlFor="sub_si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="sub_no" />
                          <Label htmlFor="sub_no">No</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="informacion" id="sub_info" />
                          <Label htmlFor="sub_info">Necesito más información</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">¿Te interesa financiación privada (crédito verde, hipoteca eficiente)?</Label>
                      <RadioGroup value={formData.interestFinancing} onValueChange={(value) => updateFormData('interestFinancing', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="fin_si" />
                          <Label htmlFor="fin_si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="fin_no" />
                          <Label htmlFor="fin_no">No</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="informacion_fin" id="fin_info" />
                          <Label htmlFor="fin_info">Necesito más información</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label>Provincia</Label>
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
                        <Label>Municipio</Label>
                        <Input
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          placeholder="Ej: Madrid, Barcelona..."
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Entorno</Label>
                      <RadioGroup value={formData.environment} onValueChange={(value) => updateFormData('environment', value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urbano" id="urbano" />
                          <Label htmlFor="urbano">Urbano</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="periurbano" id="periurbano" />
                          <Label htmlFor="periurbano">Periurbano</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rural" id="rural_env" />
                          <Label htmlFor="rural_env">Rural</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(6)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(8)}
                      disabled={!formData.interestSubsidies || !formData.interestFinancing || !formData.province || !formData.city}
                      className="flex-1"
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Paso 8: Datos de contacto */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h3 className="text-xl font-semibold">Datos de contacto</h3>
                    <p className="text-muted-foreground">Para enviarte tu informe técnico personalizado</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-medium">
                        <User className="w-4 h-4" />
                        Nombre completo *
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>

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

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Al completar este formulario, recibirás un informe técnico personalizado 
                        y un experto te contactará en las próximas 24h para analizar tu caso específico.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(7)} className="flex-1">
                      Atrás
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={!formData.name || !formData.email || !formData.phone || isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Generando informe..." : "Generar informe técnico"}
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