import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useState } from "react";
import { Euro, Calendar, FileText, Calculator, Info, ExternalLink, CheckCircle } from "lucide-react";
import financialData from "@/data/financial-support.json";

export const FinancialSupportSection = () => {
  const [activeTab, setActiveTab] = useState("deductions");

  return (
    <HelmetProvider>
      <Helmet>
        <title>Ayudas y Financiación para Eficiencia Energética - Guía EPBD 2024</title>
        <meta 
          name="description" 
          content="Descubre todas las ayudas, subvenciones y deducciones fiscales disponibles en España para adaptar tu vivienda a la normativa EPBD 2024." 
        />
        <link rel="canonical" href="https://guiaepbd2024.es/ayudas-subvenciones" />
      </Helmet>

      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Ayudas y financiación</span> actualizada
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Con el informe oficial de la EPBD 2024, se han ampliado significativamente 
              las ayudas disponibles. Descubre todas las opciones de financiación.
            </p>
          </div>

          {/* Tabs de navegación */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab("deductions")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "deductions"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              💰 Deducciones IRPF
            </button>
            <button
              onClick={() => setActiveTab("financial")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "financial"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              💳 Financiación blanda
            </button>
            <button
              onClick={() => setActiveTab("innovation")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "innovation"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              🔮 Novedades 2025-2026
            </button>
          </div>

          {/* Contenido de las tabs */}
          {activeTab === "deductions" && (
            <div className="space-y-8">
              <div className="bg-background rounded-lg p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <Euro className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">{financialData.deductions.title}</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Vigencia: {financialData.deductions.vigencia}
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {financialData.deductions.tipos.map((tipo, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-primary mb-2">{tipo.porcentaje}%</div>
                        <h3 className="font-semibold capitalize">{tipo.nivel}</h3>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong>Límite:</strong> {tipo.limite}
                        </div>
                        <div>
                          <strong>Requisito:</strong> {tipo.requisito}
                        </div>
                        <div className="text-muted-foreground">
                          {tipo.descripción}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      Compatible con
                    </h3>
                    <ul className="space-y-2">
                      {financialData.deductions.compatible_con.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Procedimiento
                    </h3>
                    <ol className="space-y-2">
                      {financialData.deductions.procedimiento.map((paso, index) => (
                        <li key={index} className="flex gap-3 text-sm">
                          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {index + 1}
                          </span>
                          {paso}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "financial" && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-background rounded-lg p-6 border">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Euro className="w-5 h-5 text-primary" />
                    Hogares vulnerables
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-success mb-2">
                        {financialData.financial_support.vulnerable_households.cobertura}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cobertura máxima de rehabilitación
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Requisitos:</h4>
                      <ul className="space-y-1">
                        {financialData.financial_support.vulnerable_households.requisitos.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-success" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Trámite:</strong> {financialData.financial_support.vulnerable_households.tramite}
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-6 border">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Préstamos ICO
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-primary">
                          {financialData.financial_support.soft_financing.prestamos_ico.tipo_interes}
                        </div>
                        <div className="text-xs text-muted-foreground">Tipo interés</div>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-primary">
                          {financialData.financial_support.soft_financing.prestamos_ico.plazo_maximo}
                        </div>
                        <div className="text-xs text-muted-foreground">Plazo máximo</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Importe máximo:</strong> {financialData.financial_support.soft_financing.prestamos_ico.importe_maximo}
                      </div>
                      <div>
                        <strong>Carencia:</strong> {financialData.financial_support.soft_financing.prestamos_ico.carencia}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Pago por ahorro energético
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      {financialData.financial_support.soft_financing.pago_por_ahorro.descripción}
                    </p>
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                      <strong className="text-success">Ventaja:</strong> {financialData.financial_support.soft_financing.pago_por_ahorro.ventaja}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Disponibilidad</h4>
                    <p className="text-sm text-muted-foreground">
                      {financialData.financial_support.soft_financing.pago_por_ahorro.disponible}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  Ventanillas únicas (One-Stop-Shops)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Función</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {financialData.financial_support.ventanillas_unicas.función}
                    </p>
                    <div className="text-sm">
                      <strong>Despliegue:</strong> {financialData.financial_support.ventanillas_unicas.despliegue}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Servicios incluidos</h4>
                    <ul className="space-y-1">
                      {financialData.financial_support.ventanillas_unicas.servicios.map((servicio, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {servicio}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "innovation" && (
            <div className="space-y-8">
              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Pasaporte de renovación
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                      <div className="text-lg font-bold text-primary mb-1">
                        {financialData.innovation_tools.pasaporte_renovacion.disponibilidad}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {financialData.innovation_tools.pasaporte_renovacion.función}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Vigencia:</strong> {financialData.innovation_tools.pasaporte_renovacion.vigencia}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Contenido del pasaporte</h4>
                    <ul className="space-y-1">
                      {financialData.innovation_tools.pasaporte_renovacion.contenido.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Nueva escala de certificados energéticos
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
                      <div className="text-lg font-bold text-warning mb-1">
                        {financialData.innovation_tools.nueva_escala_certificados.calendario}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Entrada en vigor de la nueva escala
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Cambio principal</h4>
                      <p className="text-sm text-muted-foreground">
                        {financialData.innovation_tools.nueva_escala_certificados.cambio}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Impacto</h4>
                      <p className="text-sm text-muted-foreground">
                        {financialData.innovation_tools.nueva_escala_certificados.impacto}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Validez reducida</h4>
                      <p className="text-sm text-muted-foreground">
                        {financialData.innovation_tools.nueva_escala_certificados.validez_reducida}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Datos estructurados */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Ayudas y Financiación EPBD 2024",
                "description": "Guía completa de ayudas, subvenciones y deducciones fiscales para eficiencia energética",
                "url": "https://guiaepbd2024.es/ayudas-subvenciones",
                "mainEntity": {
                  "@type": "GovernmentService",
                  "name": "Ayudas para Eficiencia Energética",
                  "description": "Subvenciones, deducciones IRPF y financiación para mejorar la eficiencia energética",
                  "serviceType": "Financial Support",
                  "provider": {
                    "@type": "GovernmentOrganization",
                    "name": "Gobierno de España"
                  }
                }
              })
            }}
          />
        </div>
      </section>
    </HelmetProvider>
  );
};
