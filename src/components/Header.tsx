import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => (
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

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold text-lg">EPBD 2024</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
          <NavButton to="/">Inicio</NavButton>
          <NavButton to="/fechas-clave">Fechas Clave</NavButton>
          <NavButton to="/obligaciones">Obligaciones</NavButton>
          <NavButton to="/ayudas-subvenciones">Ayudas</NavButton>
          <NavButton to="/calculadora">Calculadora</NavButton>
          <NavButton to="/faq">FAQ</NavButton>
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
            <NavButton to="/ayudas-subvenciones">Ayudas</NavButton>
            <NavButton to="/calculadora">Calculadora</NavButton>
            <NavButton to="/faq">FAQ</NavButton>
          </nav>
        </div>
      )}
    </header>
  );
};
