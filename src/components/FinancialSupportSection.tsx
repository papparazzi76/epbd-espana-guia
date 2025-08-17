import { useState } from "react";
import { Euro, Calendar, FileText, Calculator, Info, ExternalLink, CheckCircle } from "lucide-react";
import financialData from "@/data/financial-support.json";

export const FinancialSupportSection = () => {
  const [activeTab, setActiveTab] = useState("deductions");

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Ayudas y financiación</span> actualizada
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Con el informe oficial de la EPBD 2024, se han ampliado significativamente 
            las ayudas disponibles. Descubre todas las opciones de financiación.
          </p>
        </div>

        {/* Tabs de navegación */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "deductions", label: "Deducciones IRPF", icon: FileText },
            { id: "vulnerable", label: "Hogares vulnerables", icon: CheckCircle },
            { id: "financing", label: "Financiación blanda", icon: Euro },
            { id: "tools", label: "Nuevas herramientas", icon: Calculator }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Contenido de tabs */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "deductions" && (
            <div className="space-y-6">
              <div className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Deducciones IRPF por mejoras energéticas
                </h3>
                <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
                  <p className="text-sm">
                    <strong>¡Prorrogadas hasta 2025!</strong> Las deducciones fiscales se han 
                    extendido 2 años adicionales según la información oficial más reciente.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {financialData.deductions.tipos.map((tipo, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-primary mb-1">
                          {tipo.porcentaje}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Hasta {tipo.limite}
                        </div>
                      </div>
                      
                      <h4 className="font-semibold mb-2 capitalize">{tipo.nivel}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {tipo.descripción}
                      </p>
                      
                      <div className="text-xs bg-muted p-2 rounded">
                        <strong>Requisito:</strong> {tipo.requisito}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <h4 className="font-medium mb-2">💡 Compatibilidad total</h4>
                  <p className="text-sm text-muted-foreground">
                    Las deducciones IRPF son compatibles con: {financialData.deductions.compatible_con.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vulnerable" && (
            <div className="space-y-6">
              <div className="card-elevated p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Cobertura especial para hogares vulnerables
                </h3>
                
                <div className="bg-success/10 border border-success/20 rounded-lg p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-success mb-2">100%</div>
                    <p className="text-sm">Cobertura total del coste de rehabilitación</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    {financialData.financial_support.vulnerable_households.requisitos.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">¿Cómo solicitarlo?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {financialData.financial_support.vulnerable_households.tramite}
                    </p>
                    <button className="btn-hero w-full">
                      Localizar oficina municipal
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Protección para inquilinos</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Límites a subidas de alquiler tras obras</li>
                      <li>• Topes si ha habido ayudas públicas</li>
                      <li>• Garantía de no desalojo por obras</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "financing" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Euro className="w-5 h-5 text-primary" />
                    Préstamos ICO bonificados
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(financialData.financial_support.soft_financing.prestamos_ico).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace('_', ' ')}:
                        </span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn-hero w-full mt-4">
                    Ver condiciones ICO
                  </button>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    💡 Pago por ahorro
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {financialData.financial_support.soft_financing.pago_por_ahorro.descripción}
                  </p>
                  
                  <div className="bg-primary/10 p-3 rounded-lg mb-4">
                    <p className="text-sm">
                      <strong>Ventaja:</strong> {financialData.financial_support.soft_financing.pago_por_ahorro.ventaja}
                    </p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Disponible en: {financialData.financial_support.soft_financing.pago_por_ahorro.disponible}
                  </p>
                </div>
              </div>

              <div className="card-elevated p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                <h3 className="text-lg font-semibold mb-3">
                  🏢 Ventanillas únicas de asesoramiento
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Servicios gratuitos</h4>
                    <ul className="text-sm space-y-1">
                      {financialData.financial_support.ventanillas_unicas.servicios.map((servicio, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-success" />
                          {servicio}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Despliegue</h4>
                    <p className="text-sm text-muted-foreground">
                      {financialData.financial_support.ventanillas_unicas.despliegue}
                    </p>
                    <button className="btn-hero-secondary mt-3">
                      Buscar oficina cercana
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tools" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    Pasaporte de Renovación
                  </h3>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-secondary/10 text-secondary px-2 py-1 rounded text-xs font-medium">
                      Disponible desde 2026
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {financialData.innovation_tools.pasaporte_renovacion.función}
                  </p>
                  
                  <h4 className="font-medium mb-2">Incluye:</h4>
                  <ul className="text-sm space-y-1 mb-4">
                    {financialData.innovation_tools.pasaporte_renovacion.contenido.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-xs bg-muted p-2 rounded">
                    {financialData.innovation_tools.pasaporte_renovacion.vigencia}
                  </div>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-warning" />
                    Nueva escala de certificados
                  </h3>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-warning/10 text-warning px-2 py-1 rounded text-xs font-medium">
                      {financialData.innovation_tools.nueva_escala_certificados.calendario}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Principal cambio:</h4>
                      <p className="text-sm text-muted-foreground">
                        {financialData.innovation_tools.nueva_escala_certificados.cambio}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm">Impacto esperado:</h4>
                      <p className="text-sm text-muted-foreground">
                        {financialData.innovation_tools.nueva_escala_certificados.impacto}
                      </p>
                    </div>
                    
                    <div className="bg-warning/10 p-3 rounded-lg">
                      <p className="text-xs">
                        <strong>Importante:</strong> {financialData.innovation_tools.nueva_escala_certificados.validez_reducida}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA final */}
        <div className="text-center mt-12">
          <div className="card-elevated p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h3 className="text-xl font-semibold mb-3">
              ¿Necesitas asesoramiento personalizado?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Con tantas opciones de ayudas y financiación disponibles, te ayudamos 
              a encontrar la combinación óptima para tu caso específico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">
                Consulta gratuita 15 min
              </button>
              <button className="btn-hero-secondary">
                Calculadora de ayudas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};