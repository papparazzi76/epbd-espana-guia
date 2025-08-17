import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center">
        <nav className="flex items-center space-x-2 lg:space-x-3">
          <NavLink to="/">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm"
                className="font-medium"
              >
                Inicio
              </Button>
            )}
          </NavLink>
          <NavLink to="/fechas-clave">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm"
                className="font-medium"
              >
                Fechas Clave
              </Button>
            )}
          </NavLink>
          <NavLink to="/obligaciones">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm"
                className="font-medium"
              >
                Obligaciones
              </Button>
            )}
          </NavLink>
          <NavLink to="/ayudas-subvenciones">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm"
                className="font-medium"
              >
                Ayudas
              </Button>
            )}
          </NavLink>
          <NavLink to="/calculadora">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm"
                className="font-medium"
              >
                Calculadora
              </Button>
            )}
          </NavLink>
          <NavLink to="/faq">
            {({ isActive }) => (
              <Button 
                variant={isActive ? "default" : "ghost"} 
                size="sm"
                className="font-medium"
              >
                FAQ
              </Button>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
