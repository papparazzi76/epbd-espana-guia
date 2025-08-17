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
                    {/* ... enlaces externos ... */}
                </div>
            </div>
            <div className="border-t border-background/20 pt-6">
                {/* ... resto del footer ... */}
            </div>
        </div>
    </footer>
  );
};
