import { useState } from "react";
import { Search, Filter, ExternalLink, Calendar, MapPin, Euro, TrendingUp, AlertCircle } from "lucide-react";
import subsidiesData from "@/data/subsidies.json";

export const SubsidiesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCCAA, setSelectedCCAA] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const ccaas = [...new Set(subsidiesData.subsidies.map(s => s.ccaa))].sort();
  const types = [...new Set(subsidiesData.subsidies.map(s => s.tipo_actuacion))].sort();

  const filteredSubsidies = subsidiesData.subsidies.filter(subsidy => {
    const matchesSearch = subsidy.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subsidy.descripcion_corta.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCCAA = !selectedCCAA || subsidy.ccaa === selectedCCAA;
    const matchesStatus = !selectedStatus || subsidy.estado === selectedStatus;
    const matchesType = !selectedType || subsidy.tipo_actuacion === selectedType;
    
    return matchesSearch && matchesCCAA && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'abierta':
        return <span className="status-open">Abierta</span>;
      case 'cerrada':
        return <span className="status-closed">Cerrada</span>;
      case 'próxima':
        return <span className="status-soon">Próxima</span>;
      default:
        return <span className="status-open">{status}</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'climatización': return '🔥';
      case 'envolvente': return '🏠';
      case 'fotovoltaica': return '☀️';
      case 'ventanas': return '🪟';
      case 'domotica': return '🔌';
      default: return '⚡';
    }
  };

  return (
    <section id="ayudas" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Ayudas y <span className="gradient-text">subvenciones</span> disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Repositorio actualizado de todas las ayudas públicas para mejorar la eficiencia 
            energética de tu vivienda. Filtra por tu comunidad y tipo de actuación.
          </p>
        </div>

        {/* Filtros */}
        <div className="card-elevated p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Búsqueda */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar ayudas..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filtro CCAA */}
            <select
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedCCAA}
              onChange={(e) => setSelectedCCAA(e.target.value)}
            >
              <option value="">Todas las CCAA</option>
              {ccaas.map(ccaa => (
                <option key={ccaa} value={ccaa}>{ccaa}</option>
              ))}
            </select>

            {/* Filtro Estado */}
            <select
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="abierta">Abierta</option>
              <option value="cerrada">Cerrada</option>
              <option value="próxima">Próxima</option>
            </select>

            {/* Filtro Tipo */}
            <select
              className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Tipo de actuación</option>
              {types.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>{filteredSubsidies.length} ayudas encontradas</span>
            {filteredSubsidies.filter(s => s.estado === 'abierta').length > 0 && (
              <span className="text-success">
                • {filteredSubsidies.filter(s => s.estado === 'abierta').length} abiertas ahora
              </span>
            )}
          </div>
        </div>

        {/* Alertas importantes */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <span className="font-medium text-warning">Ayudas próximas a cerrar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredSubsidies.filter(s => s.estado === 'abierta' && 
                new Date(s.plazo_cierre) < new Date(Date.now() + 60*24*60*60*1000)
              ).length} ayudas cierran en los próximos 60 días
            </p>
          </div>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="font-medium text-success">Próximas convocatorias</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredSubsidies.filter(s => s.estado === 'próxima').length} ayudas 
              se abrirán próximamente
            </p>
          </div>
        </div>

        {/* Tabla de ayudas */}
        <div className="space-y-4">
          {filteredSubsidies.map((subsidy) => (
            <div key={subsidy.id} className="card-elevated">
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{getTypeIcon(subsidy.tipo_actuacion)}</span>
                      <h3 className="text-lg font-semibold">{subsidy.titulo}</h3>
                      {getStatusBadge(subsidy.estado)}
                    </div>
                    <p className="text-muted-foreground mb-3">{subsidy.descripcion_corta}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {subsidy.porcentaje_subvencion}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Hasta {subsidy.importe_maximo.toLocaleString()}€
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalles */}
                <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{subsidy.ccaa}</span>
                    <span className="text-muted-foreground">({subsidy.ambito})</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {subsidy.estado === 'abierta' ? 'Cierra: ' : 'Abre: '}
                      {new Date(subsidy.estado === 'abierta' ? subsidy.plazo_cierre : subsidy.plazo_apertura)
                        .toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-muted-foreground" />
                    <span>Para {subsidy.beneficiario}s</span>
                  </div>
                </div>

                {/* Documentación requerida */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Documentación requerida:</h4>
                  <div className="flex flex-wrap gap-2">
                    {subsidy.documentacion_requerida.map((doc, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Actualizado: {new Date(subsidy.ultima_actualizacion).toLocaleDateString('es-ES')} • 
                    Contacto: {subsidy.contacto}
                  </div>
                  
                  <a
                    href={subsidy.enlace_oficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground 
                             hover:bg-primary-hover px-4 py-2 rounded-lg text-sm font-medium 
                             transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Solicitar ayuda
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubsidies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron ayudas con los filtros seleccionados.
              <br />
              Prueba a ampliar los criterios de búsqueda.
            </p>
          </div>
        )}

        {/* CTA suscripción */}
        <div className="mt-12 text-center">
          <div className="card-elevated p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h3 className="text-xl font-semibold mb-3">
              ¿No quieres perderte ninguna ayuda?
            </h3>
            <p className="text-muted-foreground mb-6">
              Suscríbete y te avisaremos cuando abran nuevas convocatorias en tu comunidad
            </p>
            <button className="btn-hero">
              Suscribirme a alertas de ayudas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};