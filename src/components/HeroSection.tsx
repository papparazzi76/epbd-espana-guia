import { useState } from "react";
import { ArrowRight, Calculator, Download, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-energy-house.webp";
import { scrollToSection } from "@/lib/smooth-scroll";

export const HeroSection = () => {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const downloadGuide = () => {
    // Simular descarga de guía PDF
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Guía EPBD 2024 - Contenido de ejemplo';
    link.download = 'Guia-EPBD-2024-Completa.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Casa moderna con eficiencia energética, paneles solares y sistemas sostenibles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent"></div>
      </div>

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                             px-4 py-2 rounded-full text-sm font-medium">
                ✅ Nueva normativa EPBD 2024 en vigor desde mayo
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.4] md:leading-[1.4] lg:leading-[1.4]">
              En 2030 tu vivienda necesitará al menos
              <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                clase energética E
              </span>
              para poder venderse o alquilarse
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Descubre cómo afectará la nueva normativa europea de eficiencia energética a tu hogar 
              y qué ayudas públicas puedes obtener para adaptarlo a tiempo.
            </p>

            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => scrollToSection('diagnostico')}
                className="btn-hero group"
              >
                <Calculator className="w-5 h-5" />
                <span>Calcula tu situación ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => window.location.href = '/ayudas-subvenciones'}
                className="btn-hero-secondary"
              >
                Ver ayudas disponibles
              </button>
            </div>

            {/* Acciones rápidas desplegables */}
            <div className="mb-12">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm"
              >
                <span>Acciones rápidas</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showQuickActions ? 'rotate-180' : ''}`} />
              </button>
              
              {showQuickActions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button 
                    onClick={downloadGuide}
                    className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Descargar guía PDF
                  </button>
                  <button 
                    onClick={() => window.location.href = '/fechas-clave'}
                    className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm"
                  >
                    📅 Ver fechas clave
                  </button>
                  <button 
                    onClick={() => window.location.href = '/obligaciones'}
                    className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm"
                  >
                    📋 Mis obligaciones
                  </button>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm"
                  >
                    ❓ FAQ
                  </button>
                </div>
              )}
            </div>

            {/* Stats rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">2030</div>
                <div className="text-sm text-white/80">Clase E mínima</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">60%</div>
                <div className="text-sm text-white/80">Deducción IRPF máx.</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">2025</div>
                <div className="text-sm text-white/80">Fin ayudas calderas gas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">100%</div>
                <div className="text-sm text-white/80">Ayuda vulnerables</div>
              </div>
            </div>
          </div>

          {/* Quick summary card - ahora funcional */}
          <div className="lg:ml-8">
            <div className="card-elevated p-6 bg-white/95 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Lo esencial en 60 segundos
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-sm">Qué es:</strong>
                    <p className="text-sm text-muted-foreground">
                      Nueva Directiva (UE) 2024/1275 que obliga a mejorar la eficiencia de todos los edificios
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-sm">Cuándo te afecta:</strong>
                    <p className="text-sm text-muted-foreground">
                      2030: mínimo clase E • 2033: mínimo clase D • 2025: fin ayudas calderas gas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-sm">Tu oportunidad:</strong>
                    <p className="text-sm text-muted-foreground">
                      Ayudas hasta 100% + deducciones IRPF hasta 60% para mejoras energéticas
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <button 
                    onClick={() => window.location.href = '/fechas-clave'}
                    className="bg-primary text-primary-foreground hover:bg-primary-hover 
                             px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    📅 Fechas clave
                  </button>
                  <button 
                    onClick={() => window.location.href = '/ayudas-subvenciones'}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary-hover 
                             px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    💰 Ayudas por CCAA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator funcional */}
      <button 
        onClick={() => scrollToSection('diagnostico')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-secondary transition-colors"
      >
        <div className="text-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mb-2 flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs text-white/70">Descubre más</span>
        </div>
      </button>
    </section>
  );
};
