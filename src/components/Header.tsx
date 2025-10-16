import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { scrollToSection } from "@/lib/smooth-scroll";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (to: string, sectionId?: string) => {
    setIsMenuOpen(false);
    
    // If we're on the home page and trying to navigate to a section that exists on home
    if (location.pathname === '/' && sectionId) {
      scrollToSection(sectionId);
      return;
    }
    
    // For other cases, let React Router handle it normally
    // This will be handled by the NavLink component
  };

  const NavButton = ({ to, sectionId, children }: { 
    to: string; 
    sectionId?: string; 
    children: React.ReactNode;
  }) => {
    // If we're on home page and this nav item has a corresponding section
    if (location.pathname === '/' && sectionId) {
      return (
        <Button 
          variant="ghost"
          size="sm"
          className="font-medium w-full justify-start md:w-auto md:justify-center"
          onClick={() => handleNavigation(to, sectionId)}
        >
          {children}
        </Button>
      );
    }

    // Otherwise use normal NavLink
    return (
      <NavLink to={to} onClick={() => setIsMenuOpen(false)}>
        {({ isActive }) => (
          <Button 
            variant={isActive ? "default" : "ghost"} 
            size="sm"
            className="font-medium w-full justify-start md:w-auto md:justify-center"
          >
            {children}
          </Button>
        )}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/4590f9ea-5435-441d-a36b-d612eb82fdb4.webp" 
              alt="Casas Más Eficientes - Guía EPBD 2024" 
              className="h-21 w-auto"
            />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
          <NavButton to="/">Inicio</NavButton>
          <NavButton to="/fechas-clave">Fechas Clave</NavButton>
          <NavButton to="/obligaciones">Obligaciones</NavButton>
          <NavButton to="/ayudas-subvenciones" sectionId="guia-gratuita">Ayudas</NavButton>
          <NavButton to="/calculadora" sectionId="diagnostico">Calculadora</NavButton>
          <NavButton to="/faq" sectionId="faq">FAQ</NavButton>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
          <nav className="container py-4 space-y-2">
            <NavButton to="/">Inicio</NavButton>
            <NavButton to="/fechas-clave">Fechas Clave</NavButton>
            <NavButton to="/obligaciones">Obligaciones</NavButton>
            <NavButton to="/ayudas-subvenciones" sectionId="guia-gratuita">Ayudas</NavButton>
            <NavButton to="/calculadora" sectionId="diagnostico">Calculadora</NavButton>
            <NavButton to="/faq" sectionId="faq">FAQ</NavButton>
          </nav>
        </div>
      )}
    </header>
  );
};
