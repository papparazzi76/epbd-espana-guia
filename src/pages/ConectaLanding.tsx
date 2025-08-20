import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleSmoothScroll } from "@/lib/smooth-scroll";

export const ConectaLanding = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "¡Gracias!",
      description: "Hemos recibido tu solicitud. Un miembro de nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para activar tus créditos gratuitos.",
    });
    
    setFormData({
      company: '',
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background font-manrope">
        <Helmet>
          <title>ConectaRehabilita 360 - Leads Cualificados para Empresas de Rehabilitación</title>
          <meta name="description" content="Accede a un flujo constante de oportunidades de negocio reales, impulsadas por la nueva normativa europea. Nosotros captamos y cualificamos los proyectos, tú te centras en cerrar los tratos." />
        </Helmet>

        {/* Header */}
        <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-foreground">
              Conecta<span className="text-primary">Rehabilita 360</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#como-funciona" 
                onClick={(e) => handleSmoothScroll(e, '#como-funciona')}
                className="text-muted-foreground font-medium hover:text-primary transition-colors"
              >
                Cómo funciona
              </a>
              <a 
                href="#beneficios" 
                onClick={(e) => handleSmoothScroll(e, '#beneficios')}
                className="text-muted-foreground font-medium hover:text-primary transition-colors"
              >
                Beneficios
              </a>
              <a 
                href="#precios" 
                onClick={(e) => handleSmoothScroll(e, '#precios')}
                className="text-muted-foreground font-medium hover:text-primary transition-colors"
              >
                Precios
              </a>
            </div>
            <a 
              href="#formulario-contacto" 
              onClick={(e) => handleSmoothScroll(e, '#formulario-contacto')}
              className="hidden md:inline-block bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Obtén 30 créditos gratis
            </a>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section id="hero" className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
                  Deja de buscar obras. Recibe <span className="text-secondary">proyectos de rehabilitación</span> cualificados.
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
                  Accede a un flujo constante de oportunidades de negocio reales, impulsadas por la nueva normativa europea. Nosotros captamos y cualificamos los proyectos, tú te centras en cerrar los tratos.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#formulario-contacto" 
                    onClick={(e) => handleSmoothScroll(e, '#formulario-contacto')}
                    className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors text-center"
                  >
                    Solicita 30 créditos gratis
                  </a>
                  <a 
                    href="#como-funciona" 
                    onClick={(e) => handleSmoothScroll(e, '#como-funciona')}
                    className="bg-muted text-muted-foreground font-bold px-8 py-4 rounded-lg hover:bg-muted/80 transition-colors text-center"
                  >
                    Descubre cómo funciona
                  </a>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-border">
                <h3 className="font-bold text-lg text-foreground">Lo esencial en 60 segundos</h3>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">→</span>
                    <div>
                      <strong className="text-foreground">Qué es:</strong> Una plataforma que te conecta con propietarios que tienen la obligación y la necesidad de rehabilitar su vivienda.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">→</span>
                    <div>
                      <strong className="text-foreground">Cómo funciona:</strong> Recibes alertas de nuevos proyectos en tu zona. Usas créditos para comprar los datos de contacto y decides tu nivel de competencia.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">→</span>
                    <div>
                      <strong className="text-foreground">La oferta:</strong> Te regalamos 30 créditos para que pruebes la plataforma sin riesgo y compruebes la calidad de nuestros leads.
                    </div>
                  </li>
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <a 
                    href="#formulario-contacto" 
                    onClick={(e) => handleSmoothScroll(e, '#formulario-contacto')}
                    className="bg-primary text-primary-foreground font-semibold py-3 rounded-lg text-center hover:bg-primary/90 transition-colors"
                  >
                    Empieza gratis
                  </a>
                  <a 
                    href="#precios" 
                    onClick={(e) => handleSmoothScroll(e, '#precios')}
                    className="bg-secondary text-secondary-foreground font-semibold py-3 rounded-lg text-center hover:bg-secondary/90 transition-colors"
                  >
                    Ver precios
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Cómo funciona Section */}
          <section id="como-funciona" className="py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tu motor de crecimiento en 3 simples pasos</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Hemos simplificado al máximo el proceso para que solo inviertas tu tiempo en lo que de verdad importa: presupuestar y ejecutar obras.</p>
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 text-secondary mx-auto text-2xl font-bold">1</div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">Regístrate y define tu zona</h3>
                  <p className="mt-2 text-muted-foreground">Crea tu perfil de empresa y selecciona las provincias y municipios donde operas. Recibirás alertas solo de las zonas que te interesan.</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 text-secondary mx-auto text-2xl font-bold">2</div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">Recibe y evalúa los leads</h3>
                  <p className="mt-2 text-muted-foreground">Te notificaremos de nuevos proyectos. Verás una ficha completa con el presupuesto estimado y los detalles técnicos para que decidas si te interesa.</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 text-secondary mx-auto text-2xl font-bold">3</div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">Usa tus créditos y contacta</h3>
                  <p className="mt-2 text-muted-foreground">Invierte tus créditos para obtener los datos del cliente. Decide si quieres el lead en exclusiva o cuánta competencia admites. ¡Así de fácil!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Beneficios Section */}
          <section id="beneficios" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Más que un portal, tu socio comercial</h2>
                <p className="mt-4 text-lg text-muted-foreground">Diseñamos una plataforma pensada por y para profesionales de la reforma, centrada en la calidad y no en la cantidad.</p>
              </div>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-foreground">Leads 100% Cualificados</h3>
                  <p className="mt-2 text-muted-foreground">No te pasamos simples contactos. Cada lead ha sido verificado por nuestro equipo. Hablarás con propietarios que tienen una necesidad real y urgente.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-foreground">Control total sobre la competencia</h3>
                  <p className="mt-2 text-muted-foreground">Tú decides. Usa tus créditos para conseguir un lead en exclusiva y ser el único en contactar, o elige un nivel de competencia menor para optimizar tu inversión.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-foreground">Sistema de Créditos Flexible</h3>
                  <p className="mt-2 text-muted-foreground">Olvídate de cuotas fijas por leads que no te interesan. Paga solo por las oportunidades que de verdad encajan con tu negocio. Tu éxito es nuestro éxito.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-foreground">Información Técnica de Valor</h3>
                  <p className="mt-2 text-muted-foreground">Cada ficha de lead incluye el CEE actual, la mejora propuesta y un presupuesto estimado. Tendrás todos los datos para preparar una oferta ganadora.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-foreground">Garantía de Contacto</h3>
                  <p className="mt-2 text-muted-foreground">Si un lead se cierra muy rápido por otra empresa y no has podido contactar, te devolvemos los créditos. Sin preguntas. Protegemos tu inversión.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-foreground">Sin Limitaciones Geográficas</h3>
                  <p className="mt-2 text-muted-foreground">Define tu área de trabajo con total libertad, desde un municipio hasta todo el territorio nacional, siempre que puedas garantizar la ejecución de la obra.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Precios Section */}
          <section id="precios" className="py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Un plan simple para empezar a crecer</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Nuestra suscripción te da acceso a la plataforma y un paquete de créditos para que empieces a captar proyectos desde el primer día.</p>
              <div className="mt-12 flex justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary max-w-md w-full">
                  <h3 className="text-2xl font-bold text-foreground">Plan Profesional</h3>
                  <p className="mt-2 text-muted-foreground">Acceso completo a la plataforma y a todas las oportunidades.</p>
                  <p className="mt-8 text-5xl font-extrabold text-foreground">3.000€<span className="text-lg font-medium text-muted-foreground">/año</span></p>
                  <ul className="mt-8 space-y-4 text-left">
                    <li className="flex items-center">
                      <span className="text-secondary font-bold mr-3">✓</span>
                      <span className="text-muted-foreground">Acceso a todos los leads de tus zonas</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-secondary font-bold mr-3">✓</span>
                      <span className="text-muted-foreground"><strong>300 créditos</strong> incluidos para empezar</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-secondary font-bold mr-3">✓</span>
                      <span className="text-muted-foreground">Opción de comprar paquetes de créditos adicionales</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-secondary font-bold mr-3">✓</span>
                      <span className="text-muted-foreground">Posibilidad de bloquear leads en exclusiva</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-secondary font-bold mr-3">✓</span>
                      <span className="text-muted-foreground">Soporte prioritario</span>
                    </li>
                  </ul>
                  <a 
                    href="#formulario-contacto" 
                    onClick={(e) => handleSmoothScroll(e, '#formulario-contacto')}
                    className="mt-10 block w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Empieza con 30 créditos gratis
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Formulario Contacto Section */}
          <section id="formulario-contacto" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-xl grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">Prueba la plataforma sin riesgo</h2>
                  <p className="mt-4 text-primary-foreground/80">Rellena el formulario y nuestro equipo se pondrá en contacto contigo para darte acceso a la plataforma y activar tu paquete de <strong>30 créditos gratuitos</strong>. Sin compromiso, sin tarjeta de crédito.</p>
                </div>
                <div>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="company-name" className="sr-only">Nombre de la empresa</label>
                      <Input
                        id="company-name"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nombre de la empresa"
                        className="w-full p-3 rounded-md bg-primary/20 border border-primary-foreground/30 placeholder:text-primary-foreground/60 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-name" className="sr-only">Persona de contacto</label>
                      <Input
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Persona de contacto"
                        className="w-full p-3 rounded-md bg-primary/20 border border-primary-foreground/30 placeholder:text-primary-foreground/60 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full p-3 rounded-md bg-primary/20 border border-primary-foreground/30 placeholder:text-primary-foreground/60 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="sr-only">Teléfono</label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Teléfono"
                        className="w-full p-3 rounded-md bg-primary/20 border border-primary-foreground/30 placeholder:text-primary-foreground/60 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-full font-bold py-3 rounded-md transition-colors"
                    >
                      Solicitar mis 30 créditos
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-background">
          <div className="container mx-auto px-6 py-12 text-center">
            <p className="text-muted text-sm">© 2025 ConectaRehabilita 360. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};