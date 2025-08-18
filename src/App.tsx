import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { GuiaViviendaUnifamiliar } from './components/GuiaViviendaUnifamiliar';
import { GuiaComunidadPropietarios } from './components/GuiaComunidadPropietarios';
import { GuiaFuturoComprador } from './components/FuturoComprador';
import { GuiaArrendador } from './components/GuiaArrendador';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/guia-vivienda-unifamiliar" element={<GuiaViviendaUnifamiliar />} />
        <Route path="/guia-comunidad-propietarios" element={<GuiaComunidadPropietarios />} />
        <Route path="/guia-futuro-comprador" element={<GuiaFuturoComprador />} />
        <Route path="/guia-arrendador" element={<GuiaArrendador />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
