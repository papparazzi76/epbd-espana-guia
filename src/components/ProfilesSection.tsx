import { Home, Building, Key, Search, ChevronRight, Calendar, CheckCircle, XCircle } from "lucide-react";
import profilesData from "@/data/profiles.json";
import { scrollToSection } from "@/lib/smooth-scroll";

const iconMap = {
  Home,
  Building, 
  Key,
  Search
};

export const ProfilesSection = () => {
  return (
    <section id="obligaciones" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ¿Qué obligaciones tienes según tu <span className="gradient-text">perfil</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            La EPBD 2024 afecta de forma diferente según seas propietario, arrendador, 
            comprador o administres una comunidad. Descubre qué debes hacer y cuándo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {profilesData.profiles.map((profile) => {
            const IconComponent = iconMap[profile.icon as keyof typeof iconMap];
            
            return (
              <div key={profile.id} className="card-elevated p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{profile.title}</h3>
                    <p className="text-muted-foreground">{profile.description}</p>
                  </div>
                </div>

                {/* Timeline específica */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Fechas clave para ti
                  </h4>
                  <div className="space-y-2">
                    {profile.timeline.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <span className="text-primary font-medium min-w-[80px]">
                          {new Date(item.date).getFullYear()}
                        </span>
                        <span className="text-muted-foreground">{item.action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Obligaciones principales */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Tus obligaciones principales</h4>
                  <ul className="space-y-2">
                    {profile.obligations.slice(0, 3).map((obligation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{obligation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Do's and Don'ts preview */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h5 className="text-sm font-medium text-success mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Recomendado
                    </h5>
                    <ul className="space-y-1">
                      {profile.dos.slice(0, 2).map((item, index) => (
                        <li key={index} className="text-xs text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-destructive mb-2 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Evita
                    </h5>
                    <ul className="space-y-1">
                      {profile.donts.slice(0, 2).map((item, index) => (
                        <li key={index} className="text-xs text-muted-foreground">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA específico */}
                <button 
                  onClick={() => scrollToSection('calculadora')}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-hover 
                                   py-2 px-4 rounded-lg font-medium text-sm transition-colors"
                >
                  Ver guía completa para {profile.title.toLowerCase()}
                </button>
              </div>
            );
          })}
        </div>

        {/* Resumen general */}
        <div className="mt-12 card-elevated p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-l-4 border-primary">
          <h3 className="text-lg font-semibold mb-3">
            📌 En resumen: Lo que debes saber sea cual sea tu perfil
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-primary">Desde 2025:</strong> 
              <span className="text-muted-foreground ml-1">
                Fin de ayudas para calderas de gas/gasóleo
              </span>
            </div>
            <div>
              <strong className="text-warning">Desde 2033:</strong>
              <span className="text-muted-foreground ml-1">
                Prohibido vender/alquilar viviendas clase G
              </span>
            </div>
            <div>
              <strong className="text-destructive">Desde 2035:</strong>
              <span className="text-muted-foreground ml-1">
                También prohibido para viviendas clase F
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};