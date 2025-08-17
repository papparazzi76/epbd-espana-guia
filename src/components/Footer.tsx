import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="section-padding bg-foreground text-background">
        <div className="container-width">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Guía EPBD 2024</h3>
                    <p className="text-background/80 text-sm leading-relaxed">
                        Portal informativo sobre la nueva Directiva Europea de Eficiencia 
                        Energética de Edificios y su implementación en España.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Enlaces útiles</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/fechas-clave" className="text-background/80 hover:text-background transition-colors">Fechas clave</Link></li>
                        <li><Link to="/obligaciones" className="text-background/80 hover:text-background transition-colors">Obligaciones por perfil</Link></li>
                        <li><Link to="/ayudas-subvenciones" className="text-background/80 hover:text-background transition-colors">Ayudas y subvenciones</Link></li>
                        <li><Link to="/faq" className="text-background/80 hover:text-background transition-colors">Preguntas frecuentes</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Fuentes oficiales</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a 
                                href="https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficient-buildings/energy-performance-buildings-directive_en" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-background/80 hover:text-background transition-colors"
                            >
                                Directiva EPBD - Comisión Europea
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://www.miteco.gob.es/es/cambio-climatico/temas/mitigacion-politicas-y-medidas/plan-nacional-integrado-energia-clima.html" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-background/80 hover:text-background transition-colors"
                            >
                                PNIEC - MITECO
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://www.idae.es/ayudas-y-financiacion/para-viviendas" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-background/80 hover:text-background transition-colors"
                            >
                                Ayudas IDAE
                            </a>
                        </li>
                        <li>
                            <a 
                                href="https://www.boe.es/buscar/doc.php?id=BOE-A-2021-10233" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-background/80 hover:text-background transition-colors"
                            >
                                Real Decreto 390/2021 - BOE
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-background/20 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/60">
                    <p>&copy; 2024 Guía EPBD. Portal informativo sobre eficiencia energética.</p>
                    <p className="mt-2 md:mt-0">
                        Información actualizada según la normativa vigente
                    </p>
                </div>
            </div>
        </div>
    </footer>
  );
};
