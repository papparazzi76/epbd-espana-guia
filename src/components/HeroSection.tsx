import { ArrowRight, Calendar, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-energy-house.jpg";

export const HeroSection = () => {
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
                <Calendar className="w-4 h-4" />
                Nueva normativa EPBD 2024 en vigor
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Adapta tu vivienda a la nueva
              <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                normativa europea
              </span>
              de eficiencia energética
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Descubre qué cambios trae la EPBD 2024, cuándo te afectan y cómo adaptar 
              tu vivienda aprovechando las ayudas disponibles. Guía completa y actualizada.
            </p>

            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="btn-hero group">
                <span>Calcula tu punto de partida</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-hero-secondary">
                Ver ayudas disponibles
              </button>
            </div>

            {/* Stats rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">2033</div>
                <div className="text-sm text-white/80">Prohibido vender/alquilar clase G</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50%</div>
                <div className="text-sm text-white/80">Ayudas hasta el 50%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">2025</div>
                <div className="text-sm text-white/80">Fin ayudas calderas gas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">70%</div>
                <div className="text-sm text-white/80">Ahorro en factura</div>
              </div>
            </div>
          </div>

          {/* Quick summary card */}
          <div className="lg:ml-8">
            <div className="card-elevated p-6 bg-white/95 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Lo esencial en 60 segundos
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Qué es:</strong>
                    <p className="text-sm text-muted-foreground">
                      Nueva normativa europea que obliga a mejorar la eficiencia de todos los edificios
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Cuándo:</strong>
                    <p className="text-sm text-muted-foreground">
                      Desde 2025 no habrá ayudas para calderas de gas. Desde 2033, prohibido vender/alquilar clase G
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-sm">Oportunidad:</strong>
                    <p className="text-sm text-muted-foreground">
                      Ayudas del 30-70% para bombas de calor, aislamiento, ventanas y solar
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <button className="bg-primary text-primary-foreground hover:bg-primary-hover 
                                   px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    📅 Fechas clave
                  </button>
                  <button className="bg-secondary text-secondary-foreground hover:bg-secondary-hover 
                                   px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    💰 Ayudas por CCAA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="text-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full mb-2 flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs text-white/70">Desliza para más info</span>
        </div>
      </div>
    </section>
  );
};