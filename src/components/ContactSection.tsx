import { useState } from "react";
import { Mail, Phone, Calendar, CheckCircle, ArrowRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo_consulta: '',
    mensaje: '',
    acepta_privacidad: false,
    quiere_newsletter: false
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acepta_privacidad) {
      toast({
        title: "Error",
        description: "Debes aceptar la política de privacidad para continuar",
        variant: "destructive"
      });
      return;
    }

    if (!formData.nombre || !formData.email || !formData.tipo_consulta) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save contact form as a special type of lead
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            nombre_completo: formData.nombre,
            email: formData.email,
            telefono: formData.telefono || null,
            tipo_vivienda: 'consulta', // Special value for contact form
            año_construccion: 'no_especificado',
            provincia: 'no_especificado',
            localidad: 'no_especificado',
            certificado_energetico: 'no_especificado',
            interes_principal: formData.tipo_consulta,
            // We could add a notes field to store the message and newsletter preference
          }
        ])
        .select();

      if (error) {
        console.error('Error saving contact form:', error);
        toast({
          title: "Error",
          description: "No se pudo enviar el formulario. Inténtalo de nuevo.",
          variant: "destructive"
        });
        return;
      }

      console.log("Contact form saved successfully:", data);

      // If they want newsletter, also subscribe them to alerts (we'll use Madrid as default)
      if (formData.quiere_newsletter) {
        await supabase
          .from('subscription_alerts')
          .insert([
            {
              email: formData.email.toLowerCase().trim(),
              provincia: 'Madrid', // Default province for newsletter
              activo: true
            }
          ]);
      }

      setIsSubmitted(true);
      toast({
        title: "¡Solicitud enviada!",
        description: "Te contactaremos en las próximas 24 horas laborables",
      });

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

  const downloadChecklist = () => {
    const checklist = `
CHECKLIST ADAPTACIÓN EPBD 2024

□ DIAGNÓSTICO INICIAL
  □ Solicitar certificado energético actualizado
  □ Identificar letra actual (A-G)
  □ Revisar recomendaciones del certificador
  □ Evaluar potencial de mejora

□ EVALUACIÓN ECONÓMICA  
  □ Definir presupuesto disponible
  □ Consultar ayudas en tu CCAA
  □ Solicitar 3 presupuestos
  □ Calcular retorno de inversión

□ MEJORAS PRIORITARIAS
  □ Aislamiento térmico (máximo impacto)
  □ Ventanas eficientes
  □ Bomba de calor
  □ Paneles solares
  □ Domótica básica

□ GESTIÓN ADMINISTRATIVA
  □ Licencias de obras
  □ Solicitud de ayudas
  □ Contratación empresas certificadas
  □ Nuevo certificado post-mejoras

Descarga la versión completa en nuestra web.
    `;
    
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(checklist);
    link.download = 'checklist-epbd-2024.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isSubmitted) {
    return (
      <section id="contacto" className="section-padding">
        <div className="container-width">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card-elevated p-8">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold mb-4">¡Solicitud enviada correctamente!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Te contactaremos en las próximas 24 horas laborables para ofrecerte asesoramiento personalizado.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    tipo_consulta: '',
                    mensaje: '',
                    acepta_privacidad: false,
                    quiere_newsletter: false
                  });
                  setStep(1);
                }}
                className="btn-hero-secondary"
              >
                Enviar otra consulta
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas <span className="gradient-text">asesoramiento</span> personalizado?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cada vivienda es única. Te ofrecemos consulta gratuita de 15 minutos 
            para orientarte sobre tu caso específico y las mejores opciones para tu situación.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="card-elevated p-6">
            <h3 className="text-xl font-semibold mb-6">
              Solicita tu consulta gratuita
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData(prev => ({...prev, nombre: e.target.value}))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Juan Pérez"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="juan@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData(prev => ({...prev, telefono: e.target.value}))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="600 123 456"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tipo de consulta *
                    </label>
                    <select
                      required
                      value={formData.tipo_consulta}
                      onChange={(e) => setFormData(prev => ({...prev, tipo_consulta: e.target.value}))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={isSubmitting}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="reformar">Diagnóstico inicial de mi vivienda</option>
                      <option value="subvencion">Información sobre ayudas disponibles</option>
                      <option value="vender_alquilar">Qué mejoras necesito hacer</option>
                      <option value="reformar">Estimación de costes</option>
                      <option value="subvencion">Ayuda con trámites</option>
                      <option value="comunidad">Consulta para comunidad de propietarios</option>
                      <option value="reformar">Otra consulta</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.nombre || !formData.email || !formData.tipo_consulta || isSubmitting}
                    className="w-full btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cuéntanos tu situación
                    </label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => setFormData(prev => ({...prev, mensaje: e.target.value}))}
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ej: Tengo un piso de 1985 con calificación F, quiero saber qué mejoras hacer para cumplir la normativa..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.acepta_privacidad}
                        onChange={(e) => setFormData(prev => ({...prev, acepta_privacidad: e.target.checked}))}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                       <span className="text-sm">
                         Acepto la <a href="#privacidad" onClick={(e) => { e.preventDefault(); const element = document.getElementById('privacidad'); if (element) element.scrollIntoView({ behavior: 'smooth' }); }} className="text-primary hover:underline">política de privacidad</a> y 
                         el tratamiento de mis datos para responder a mi consulta *
                      </span>
                    </label>

                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.quiere_newsletter}
                        onChange={(e) => setFormData(prev => ({...prev, quiere_newsletter: e.target.checked}))}
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm">
                        Quiero recibir información sobre nuevas ayudas y actualizaciones normativas
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-hero-secondary"
                      disabled={isSubmitting}
                    >
                      Atrás
                    </button>
                    <button
                      type="submit"
                      className="btn-hero flex-1"
                      disabled={isSubmitting}
                    >
                      <Calendar className="w-4 h-4" />
                      {isSubmitting ? "Enviando..." : "Solicitar consulta gratuita"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Información y recursos */}
          <div className="space-y-6">
            {/* Información de contacto */}
            <div className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">
                Otras formas de contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">info@guiaepbd2024.es</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Teléfono</div>
                    <div className="text-sm text-muted-foreground">900 123 456 (gratuito)</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Horario</div>
                    <div className="text-sm text-muted-foreground">L-V 9:00-18:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recursos descargables */}
            <div className="card-elevated p-6">
              <h3 className="text-lg font-semibold mb-4">
                Recursos gratuitos
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={downloadChecklist}
                  className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div className="text-left">
                      <div className="font-medium">Checklist EPBD 2024</div>
                      <div className="text-sm text-muted-foreground">Pasos para adaptar tu vivienda</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => {
                    const guia = `
GUÍA RÁPIDA EPBD 2024

🎯 OBJETIVOS CLAVE:
- 2030: Viviendas mínimo clase E
- 2033: Viviendas mínimo clase D  
- 2050: Todas las viviendas cero emisiones

💰 AYUDAS DISPONIBLES:
- Subvenciones: hasta 100% para vulnerables
- Deducciones IRPF: hasta 60%
- Préstamos ICO bonificados
- Financiación por ahorro

🔧 MEJORAS PRIORITARIAS:
1. Aislamiento térmico
2. Ventanas eficientes
3. Bomba de calor
4. Paneles solares
5. Domótica básica

📅 FECHAS CLAVE:
- 2025: Fin ayudas calderas gas
- 2026: Nueva escala certificados
- 2030: Prohibido vender/alquilar clase F-G
- 2033: Prohibido vender/alquilar clase E

Más información: www.guiaepbd2024.es
                    `;
                    
                    const link = document.createElement('a');
                    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(guia);
                    link.download = 'guia-rapida-epbd-2024.txt';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Guía rápida PDF</div>
                      <div className="text-sm text-muted-foreground">Resumen ejecutivo</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Compromiso */}
            <div className="card-elevated p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
              <h3 className="text-lg font-semibold mb-3">
                Nuestro compromiso
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Información actualizada y contrastada
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Asesoramiento neutral e independiente
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Sin compromiso de compra
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Respuesta en 24h laborables
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};