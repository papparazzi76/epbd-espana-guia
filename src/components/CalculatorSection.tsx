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
    let coste_total = 0;
    let mejora_total_letras = 0;

    formData.mejoras_planeadas.forEach(mejora_id => {
      const mejora = mejoras_disponibles.find(m => m.id === mejora_id);
      if (mejora) {
        if (mejora.coste_m2) {
          coste_total += mejora.coste_m2 * formData.superficie;
        } else {
          coste_total += mejora.coste_fijo || 0;
        }
        mejora_total_letras += mejora.mejora_letras;
      }
    });

    const clase_actual_index = clases_energeticas.indexOf(formData.clase_actual);
    const mejora_aplicada = Math.max(0, Math.floor(mejora_total_letras));
    const nueva_clase_index = Math.min(clases_energeticas.length - 1, clase_actual_index + mejora_aplicada);
    const nueva_clase = clases_energeticas[nueva_clase_index];
    const mejora_real = Math.max(0, nueva_clase_index - clase_actual_index);

    // Cálculo de ayudas simplificado
    const subvencion_base = Math.min(coste_total * 0.4, 15000);
    const deduccion_irpf = mejora_total_letras >= 2 ? coste_total * 0.6 : 
                          mejora_total_letras >= 1 ? coste_total * 0.4 : 
                          coste_total * 0.2;
    const deduccion_irpf_limitada = Math.min(deduccion_irpf, mejora_total_letras >= 2 ? 15000 : 7500);

    const ahorro_anual = coste_total * 0.15; // 15% ahorro estimado
    const retorno_años = Math.round((coste_total - subvencion_base) / ahorro_anual);

    const idxE = clases_energeticas.indexOf('E');
    const idxD = clases_energeticas.indexOf('D');

    setResultado({
      coste_total,
      subvencion_estimada: subvencion_base,
      deduccion_irpf: deduccion_irpf_limitada,
      coste_neto: coste_total - subvencion_base - deduccion_irpf_limitada,
      nueva_clase,
      mejora_letras: mejora_real,
      ahorro_anual,
      retorno_años: retorno_años > 0 ? retorno_años : 1,
      cumple_2030: nueva_clase_index >= idxE, // E o mejor
      cumple_2033: nueva_clase_index >= idxD  // D o mejor
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

  return (
    <section id="calculadora" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Calculadora</span> de mejoras energéticas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calcula el coste, ayudas disponibles y retorno de inversión de las mejoras 
            energéticas para tu vivienda. Estimaciones orientativas basadas en datos oficiales.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="card-elevated p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Datos de tu vivienda
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Superficie útil (m²)
                </label>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={formData.superficie}
                  onChange={(e) => setFormData(prev => ({...prev, superficie: parseInt(e.target.value)}))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>40m²</span>
                  <span className="font-medium">{formData.superficie}m²</span>
                  <span>200m²</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Año de construcción
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({...prev, year: parseInt(e.target.value)}))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value={2020}>2020 o posterior</option>
                  <option value={2010}>2010-2019</option>
                  <option value={2000}>2000-2009</option>
                  <option value={1990}>1990-1999</option>
                  <option value={1980}>1980-1989</option>
                  <option value={1970}>1970-1979</option>
                  <option value={1960}>Anterior a 1970</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Clase energética actual
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {clases_energeticas.map(clase => (
                    <button
                      key={clase}
                      onClick={() => setFormData(prev => ({...prev, clase_actual: clase}))}
                      className={`p-2 rounded font-medium text-sm transition-colors ${
                        formData.clase_actual === clase
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {clase}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tipo de vivienda
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'piso', label: '🏢 Piso/Apartamento' },
                    { value: 'unifamiliar', label: '🏠 Unifamiliar' }
                  ].map(tipo => (
                    <button
                      key={tipo.value}
                      onClick={() => setFormData(prev => ({...prev, tipo_vivienda: tipo.value}))}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        formData.tipo_vivienda === tipo.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Mejoras que planeas realizar
                </label>
                <div className="space-y-2">
                  {mejoras_disponibles.map(mejora => (
                    <label key={mejora.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50">
                      <input
                        type="checkbox"
                        checked={formData.mejoras_planeadas.includes(mejora.id)}
                        onChange={() => toggleMejora(mejora.id)}
                        className="rounded"
                      />
                      <span className="flex-1 text-sm">{mejora.nombre}</span>
                      <span className="text-xs text-muted-foreground">
                        +{mejora.mejora_letras} letras
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={calcular}
                  disabled={formData.mejoras_planeadas.length === 0}
                  className="btn-hero flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Calculator className="w-4 h-4" />
                  Calcular
                </button>
                <button
                  onClick={resetear}
                  className="btn-hero-secondary px-4"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="card-elevated p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Resultados estimados
            </h3>

            {!resultado ? (
              <div className="text-center py-12">
                <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Selecciona las mejoras que quieres realizar y haz clic en "Calcular" 
                  para ver los resultados estimados.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Mejora de clase energética */}
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <div className="text-3xl font-bold mb-2">
                    <span className="text-muted-foreground">{formData.clase_actual}</span>
                    <span className="text-primary mx-2">→</span>
                    <span className="text-secondary">{resultado.nueva_clase}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mejora de {resultado.mejora_letras} letra{resultado.mejora_letras !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Costes e inversión */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {resultado.coste_total.toLocaleString()}€
                    </div>
                    <div className="text-sm text-muted-foreground">Coste total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      {resultado.coste_neto.toLocaleString()}€
                    </div>
                    <div className="text-sm text-muted-foreground">Coste neto</div>
                  </div>
                </div>

                {/* Ayudas disponibles */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subvención estimada:</span>
                    <span className="font-medium text-success">
                      -{resultado.subvencion_estimada.toLocaleString()}€
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Deducción IRPF:</span>
                    <span className="font-medium text-success">
                      -{resultado.deduccion_irpf.toLocaleString()}€
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-semibold">
                    <span>Total ayudas:</span>
                    <span className="text-success">
                      -{(resultado.subvencion_estimada + resultado.deduccion_irpf).toLocaleString()}€
                    </span>
                  </div>
                </div>

                {/* Retorno de inversión */}
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-lg font-semibold">
                    Retorno de inversión: {resultado.retorno_años} años
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ahorro estimado: {resultado.ahorro_anual.toLocaleString()}€/año
                  </div>
                </div>

                {/* Cumplimiento normativo */}
                <div className="space-y-2">
                  <div className={`flex items-center justify-between p-2 rounded ${
                    resultado.cumple_2030 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  }`}>
                    <span className="text-sm">¿Cumple normativa 2030?</span>
                    <span className="font-medium">
                      {resultado.cumple_2030 ? '✅ Sí (clase E+)' : '❌ No'}
                    </span>
                  </div>
                  <div className={`flex items-center justify-between p-2 rounded ${
                    resultado.cumple_2033 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    <span className="text-sm">¿Cumple normativa 2033?</span>
                    <span className="font-medium">
                      {resultado.cumple_2033 ? '✅ Sí (clase D+)' : '⚠️ No'}
                    </span>
                  </div>
                </div>

                {/* Descarga de informe */}
                <button 
                  onClick={() => {
                    const informe = `
INFORME DE MEJORAS ENERGÉTICAS

Vivienda: ${formData.superficie}m² (${formData.year})
Clase actual: ${formData.clase_actual}
Nueva clase estimada: ${resultado.nueva_clase}

INVERSIÓN:
- Coste total: ${resultado.coste_total.toLocaleString()}€
- Subvención estimada: ${resultado.subvencion_estimada.toLocaleString()}€  
- Deducción IRPF: ${resultado.deduccion_irpf.toLocaleString()}€
- Coste neto: ${resultado.coste_neto.toLocaleString()}€

RETORNO:
- Ahorro anual estimado: ${resultado.ahorro_anual.toLocaleString()}€
- Periodo de retorno: ${resultado.retorno_años} años

CUMPLIMIENTO NORMATIVO:
- 2030 (clase E): ${resultado.cumple_2030 ? 'SÍ' : 'NO'}
- 2033 (clase D): ${resultado.cumple_2033 ? 'SÍ' : 'NO'}

* Estimaciones orientativas. Consulta con profesionales para datos exactos.
                    `;
                    
                    const link = document.createElement('a');
                    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(informe);
                    link.download = 'informe-mejoras-energeticas.txt';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full btn-hero-secondary"
                >
                  <Download className="w-4 h-4" />
                  Descargar informe detallado
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            ⚠️ <strong>Importante:</strong> Estos son cálculos orientativos basados en estimaciones medias. 
            Los costes reales pueden variar según ubicación, estado de la vivienda y instalador. 
            Solicita siempre presupuestos detallados antes de tomar decisiones.
          </p>
        </div>
      </div>
    </section>
  );
};