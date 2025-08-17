import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from "react";
import { Calculator, Home, Zap, TrendingUp, Download, RotateCcw } from "lucide-react";

export const CalculatorSection = () => {
  const [formData, setFormData] = useState({
    superficie: 80,
    year: 1980,
    clase_actual: 'G',
    tipo_vivienda: 'piso',
    mejoras_planeadas: [] as string[]
  });
  const [resultado, setResultado] = useState<any>(null);

  const mejoras_disponibles = [
    { id: 'aislamiento', nombre: 'Aislamiento térmico', coste_m2: 45, mejora_letras: 1.5 },
    { id: 'ventanas', nombre: 'Ventanas eficientes', coste_m2: 25, mejora_letras: 1 },
    { id: 'bomba_calor', nombre: 'Bomba de calor', coste_fijo: 5000, mejora_letras: 2 },
    { id: 'solar', nombre: 'Paneles solares', coste_fijo: 6000, mejora_letras: 1.5 },
    { id: 'domotica', nombre: 'Domótica básica', coste_fijo: 1500, mejora_letras: 0.5 }
  ];

  const clases_energeticas = ['G', 'F', 'E', 'D', 'C', 'B', 'A'];

  const calcular = () => {
    if (!formData.superficie || !formData.year) return;

    // Cálculos de coste
    let coste_total = 0;
    let mejora_letras_total = 0;

    formData.mejoras_planeadas.forEach(mejoraId => {
      const mejora = mejoras_disponibles.find(m => m.id === mejoraId);
      if (!mejora) return;

      if (mejora.coste_m2) {
        coste_total += mejora.coste_m2 * formData.superficie;
      } else if (mejora.coste_fijo) {
        coste_total += mejora.coste_fijo;
      }
      mejora_letras_total += mejora.mejora_letras;
    });

    // Calcular nueva clase energética
    const indice_actual = clases_energeticas.indexOf(formData.clase_actual);
    const nuevo_indice = Math.min(
      clases_energeticas.length - 1,
      Math.floor(indice_actual + mejora_letras_total)
    );
    const nueva_clase = clases_energeticas[nuevo_indice];

    // Ayudas disponibles
    const subvencion_base = coste_total * 0.4; // 40% base
    const deduccion_irpf = Math.min(coste_total * 0.6, 15000); // 60% hasta 15.000€

    // Ahorro energético estimado
    const factor_ahorro = mejora_letras_total * 0.15; // 15% por letra mejorada
    const ahorro_anual = formData.superficie * 12 * factor_ahorro; // 12€/m2/año base
    const ahorro_total = Math.min(ahorro_anual, formData.superficie * 25); // Máximo 25€/m2/año

    setResultado({
      coste_total,
      nueva_clase,
      letras_mejoradas: mejora_letras_total,
      subvencion_base,
      deduccion_irpf,
      ahorro_anual: ahorro_total,
      retorno_inversion: coste_total > 0 ? Math.ceil((coste_total - subvencion_base - deduccion_irpf) / ahorro_total) : 0
    });
  };

  const resetear = () => {
    setFormData({
      superficie: 80,
      year: 1980,
      clase_actual: 'G',
      tipo_vivienda: 'piso',
      mejoras_planeadas: []
    });
    setResultado(null);
  };

  const toggleMejora = (mejoraId: string) => {
    setFormData(prev => ({
      ...prev,
      mejoras_planeadas: prev.mejoras_planeadas.includes(mejoraId)
        ? prev.mejoras_planeadas.filter(id => id !== mejoraId)
        : [...prev.mejoras_planeadas, mejoraId]
    }));
  };

  const getColorClase = (clase: string) => {
    const colores = {
      'A': 'text-green-600 bg-green-100',
      'B': 'text-green-500 bg-green-50',
      'C': 'text-yellow-600 bg-yellow-100',
      'D': 'text-yellow-500 bg-yellow-50',
      'E': 'text-orange-500 bg-orange-100',
      'F': 'text-red-500 bg-red-100',
      'G': 'text-red-600 bg-red-200'
    };
    return colores[clase as keyof typeof colores] || 'text-gray-500 bg-gray-100';
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Calculadora de Mejoras Energéticas - EPBD 2024</title>
        <meta 
          name="description" 
          content="Calcula el coste, las ayudas y el ahorro que conseguirás al mejorar la eficiencia energética de tu vivienda según la normativa EPBD 2024." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/calculadora" />
      </Helmet>

      <section id="calculadora" className="section-padding bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Calculadora</span> de mejoras energéticas
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Calcula el coste, ayudas disponibles y retorno de inversión de las mejoras 
              energéticas para tu vivienda. Estimaciones orientativas basadas en datos oficiales.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Datos de tu vivienda</h2>
              </div>

              <div className="space-y-6">
                {/* Superficie */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Superficie útil (m²)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="500"
                    value={formData.superficie}
                    onChange={(e) => setFormData(prev => ({ ...prev, superficie: parseInt(e.target.value) || 80 }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Año de construcción */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Año de construcción
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2024"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) || 1980 }))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Clase energética actual */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Clase energética actual
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {clases_energeticas.map(clase => (
                      <button
                        key={clase}
                        onClick={() => setFormData(prev => ({ ...prev, clase_actual: clase }))}
                        className={`p-2 rounded text-center font-bold transition-all ${
                          formData.clase_actual === clase
                            ? `${getColorClase(clase)} ring-2 ring-primary`
                            : `${getColorClase(clase)} opacity-50 hover:opacity-100`
                        }`}
                      >
                        {clase}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tipo de vivienda */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tipo de vivienda
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'piso', nombre: 'Piso' },
                      { id: 'unifamiliar', nombre: 'Casa unifamiliar' },
                      { id: 'edificio', nombre: 'Edificio de vecinos' }
                    ].map(tipo => (
                      <button
                        key={tipo.id}
                        onClick={() => setFormData(prev => ({ ...prev, tipo_vivienda: tipo.id }))}
                        className={`p-3 rounded-lg border transition-colors ${
                          formData.tipo_vivienda === tipo.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Home className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{tipo.nombre}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mejoras planeadas */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Mejoras que quieres realizar
                  </label>
                  <div className="space-y-3">
                    {mejoras_disponibles.map(mejora => (
                      <div
                        key={mejora.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.mejoras_planeadas.includes(mejora.id)
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => toggleMejora(mejora.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{mejora.nombre}</div>
                            <div className="text-sm text-muted-foreground">
                              {mejora.coste_m2 
                                ? `${mejora.coste_m2}€/m² (~${(mejora.coste_m2 * formData.superficie).toLocaleString()}€)`
                                : `${mejora.coste_fijo?.toLocaleString()}€`
                              }
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 transition-colors ${
                            formData.mejoras_planeadas.includes(mejora.id)
                              ? 'border-primary bg-primary'
                              : 'border-gray-300'
                          }`}>
                            {formData.mejoras_planeadas.includes(mejora.id) && (
                              <Zap className="w-3 h-3 text-white m-0.5" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                  <button
                    onClick={calcular}
                    disabled={formData.mejoras_planeadas.length === 0}
                    className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Calculator className="w-4 h-4 inline mr-2" />
                    Calcular
                  </button>
                  <button
                    onClick={resetear}
                    className="bg-muted text-muted-foreground px-4 py-3 rounded-lg font-medium hover:bg-muted/80 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Resultados</h2>
              </div>

              {!resultado ? (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Selecciona las mejoras que quieres realizar y pulsa "Calcular" para ver los resultados
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Mejora energética */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Mejora energética</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Clase actual</div>
                        <div className={`inline-block px-3 py-1 rounded font-bold ${getColorClase(formData.clase_actual)}`}>
                          {formData.clase_actual}
                        </div>
                      </div>
                      <div className="text-2xl text-muted-foreground">→</div>
                      <div>
                        <div className="text-sm text-muted-foreground">Clase estimada</div>
                        <div className={`inline-block px-3 py-1 rounded font-bold ${getColorClase(resultado.nueva_clase)}`}>
                          {resultado.nueva_clase}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <div className="text-2xl font-bold text-primary">
                        +{resultado.letras_mejoradas} letras
                      </div>
                    </div>
                  </div>

                  {/* Costes */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Inversión total</h3>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {resultado.coste_total.toLocaleString()}€
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Para {formData.superficie}m² · {formData.mejoras_planeadas.length} mejora{formData.mejoras_planeadas.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Ayudas */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Ayudas disponibles</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Subvenciones (40%)</span>
                        <span className="font-medium text-success">
                          -{resultado.subvencion_base.toLocaleString()}€
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Deducción IRPF (60%)</span>
                        <span className="font-medium text-success">
                          -{resultado.deduccion_irpf.toLocaleString()}€
                        </span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Coste final</span>
                          <span className="text-primary">
                            {(resultado.coste_total - resultado.subvencion_base - resultado.deduccion_irpf).toLocaleString()}€
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ahorro */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Ahorro energético</h3>
                    <div className="text-2xl font-bold text-success mb-2">
                      {resultado.ahorro_anual.toLocaleString()}€/año
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Retorno de inversión: {resultado.retorno_inversion} años
                    </div>
                    <div className="bg-success/10 border border-success/20 rounded p-3">
                      <div className="text-sm">
                        <strong>En 10 años ahorrarás:</strong> {(resultado.ahorro_anual * 10).toLocaleString()}€
                      </div>
                    </div>
                  </div>

                  {/* Botón descargar */}
                  <button
                    onClick={() => {
                      const content = `INFORME DE MEJORAS ENERGÉTICAS
                      
Datos de la vivienda:
- Superficie: ${formData.superficie}m²
- Año construcción: ${formData.year}
- Clase actual: ${formData.clase_actual}
- Tipo: ${formData.tipo_vivienda}

Mejoras seleccionadas:
${formData.mejoras_planeadas.map(id => {
  const mejora = mejoras_disponibles.find(m => m.id === id);
  return `- ${mejora?.nombre}`;
}).join('\n')}

Resultados:
- Nueva clase energética: ${resultado.nueva_clase}
- Inversión total: ${resultado.coste_total.toLocaleString()}€
- Subvenciones: ${resultado.subvencion_base.toLocaleString()}€
- Deducción IRPF: ${resultado.deduccion_irpf.toLocaleString()}€
- Coste final: ${(resultado.coste_total - resultado.subvencion_base - resultado.deduccion_irpf).toLocaleString()}€
- Ahorro anual: ${resultado.ahorro_anual.toLocaleString()}€
- Retorno inversión: ${resultado.retorno_inversion} años`;

                      const link = document.createElement('a');
                      link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
                      link.download = 'informe-mejoras-energeticas.txt';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Descargar informe
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Aviso:</strong> Los cálculos son estimaciones orientativas basadas en datos promedio. 
              Para un presupuesto preciso, consulta con profesionales certificados.
            </p>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
