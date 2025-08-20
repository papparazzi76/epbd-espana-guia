import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ArrowRight, Users, TrendingUp, Shield, Star, CheckCircle, Building, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-energy-house.jpg';

export const ConectaLanding = () => {
  const [formData, setFormData] = useState({
    empresa: '',
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Solicitud enviada",
      description: "Te contactaremos pronto para activar tus 30 créditos gratuitos.",
    });
    
    setFormData({
      empresa: '',
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Conecta Rehabilita 360 - CRM para Empresas de Reformas</title>
        <meta name="description" content="Plataforma CRM especializada en leads de rehabilitación energética. Consigue más clientes cualificados para tu empresa de reformas." />
        <meta name="keywords" content="CRM reformas, leads rehabilitación, empresas constructoras, EPBD 2024" />
        <link rel="canonical" href="https://conectarehabilita360.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Conecta Rehabilita 360</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">Iniciar Sesión</Button>
                <Button size="sm">Registrarse</Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Multiplica tus clientes de <span className="text-primary">rehabilitación energética</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  CRM especializado que te conecta con propietarios que necesitan reformas para cumplir la normativa EPBD 2024.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg">
                    <Star className="w-5 h-5 mr-2" />
                    Prueba 30 Créditos Gratis
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg">
                    Ver Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Rehabilitación energética de viviendas" 
                  className="rounded-lg shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border">
                  <div className="text-2xl font-bold text-primary">+2,500</div>
                  <div className="text-sm text-muted-foreground">Leads mensuales</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                ¿Por qué elegir Conecta Rehabilita 360?
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                La única plataforma que te conecta directamente con propietarios motivados por la nueva normativa europea
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Leads Cualificados</CardTitle>
                  <CardDescription>
                    Propietarios con necesidades reales de rehabilitación energética
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Scoring automático de leads
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Datos de contacto verificados
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Segmentación por urgencia
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>ROI Garantizado</CardTitle>
                  <CardDescription>
                    Invierte solo en leads que se convierten en proyectos rentables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Tasa de conversión del 25%
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Ticket medio 15.000€
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      ROI promedio 400%
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Gestión Integral</CardTitle>
                  <CardDescription>
                    CRM completo con todas las herramientas para tu negocio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Dashboard en tiempo real
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Seguimiento automático
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Reportes detallados
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Solicita tus 30 créditos gratuitos
                </h3>
                <p className="text-xl text-muted-foreground">
                  Prueba la plataforma sin compromiso y comprueba la calidad de nuestros leads
                </p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre de la empresa *</label>
                        <Input
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          placeholder="Construcciones ABC S.L."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Persona de contacto *</label>
                        <Input
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="contacto@empresa.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Teléfono *</label>
                        <Input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="600 123 456"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Mensaje (opcional)</label>
                      <Textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos sobre tu empresa y objetivos..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg">
                      <Star className="w-5 h-5 mr-2" />
                      Solicitar 30 Créditos Gratuitos
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building className="w-6 h-6 text-primary" />
                  <span className="font-bold text-foreground">Conecta Rehabilita 360</span>
                </div>
                <p className="text-muted-foreground">
                  La plataforma CRM líder para empresas de rehabilitación energética.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>info@conectarehabilita360.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>900 123 456</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Enlaces</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div>Política de Privacidad</div>
                  <div>Términos de Uso</div>
                  <div>Soporte Técnico</div>
                </div>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 Conecta Rehabilita 360. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};