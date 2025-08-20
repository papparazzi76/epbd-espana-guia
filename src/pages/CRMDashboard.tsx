import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Users, Building, TrendingUp, Calendar, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  tipo_vivienda: string;
  interes_principal: string;
  lead_score: number;
  urgencia_nivel: number;
  created_at: string;
}

export const CRMDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    highPriorityLeads: 0,
    conversionRate: 0,
    monthlyGrowth: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
    calculateStats();
  }, []);

  const fetchLeads = async () => {
    try {
      // Mock data for now since diagnostic_submissions table doesn't exist yet
      const mockLeads: Lead[] = [
        {
          id: '1',
          nombre: 'Juan García',
          email: 'juan@email.com',
          telefono: '600123456',
          tipo_vivienda: 'unifamiliar',
          interes_principal: 'reformar',
          lead_score: 85,
          urgencia_nivel: 4,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          nombre: 'María López',
          email: 'maria@email.com',
          telefono: '600789123',
          tipo_vivienda: 'piso',
          interes_principal: 'subvencion',
          lead_score: 72,
          urgencia_nivel: 3,
          created_at: new Date().toISOString()
        }
      ];
      setLeads(mockLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los leads",
        variant: "destructive"
      });
    }
  };

  const calculateStats = async () => {
    try {
      setStats({
        totalLeads: 142,
        highPriorityLeads: 24,
        conversionRate: 24.5,
        monthlyGrowth: 18.2
      });
    } catch (error) {
      console.error('Error calculating stats:', error);
    }
  };

  const getUrgencyBadge = (nivel: number) => {
    const colors = {
      5: 'bg-red-100 text-red-800',
      4: 'bg-orange-100 text-orange-800',
      3: 'bg-yellow-100 text-yellow-800',
      2: 'bg-blue-100 text-blue-800',
      1: 'bg-gray-100 text-gray-800'
    };
    return colors[nivel as keyof typeof colors] || colors[1];
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CRM Dashboard - Conecta Rehabilita 360</title>
        <meta name="description" content="Dashboard de gestión de leads para empresas de reformas" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Conecta Rehabilita 360</h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLeads}</div>
                <p className="text-xs text-muted-foreground">Leads generados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alta Prioridad</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.highPriorityLeads}</div>
                <p className="text-xs text-muted-foreground">Requieren atención</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversión</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">Tasa de conversión</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">+{stats.monthlyGrowth}%</div>
                <p className="text-xs text-muted-foreground">Mensual</p>
              </CardContent>
            </Card>
          </div>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Leads Recientes</CardTitle>
              <CardDescription>
                Últimos leads generados desde la plataforma EPBD 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Nombre</th>
                      <th className="text-left p-2">Contacto</th>
                      <th className="text-left p-2">Tipo Vivienda</th>
                      <th className="text-left p-2">Interés</th>
                      <th className="text-left p-2">Score</th>
                      <th className="text-left p-2">Urgencia</th>
                      <th className="text-left p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{lead.nombre}</td>
                        <td className="p-2">
                          <div className="text-sm">
                            <div>{lead.email}</div>
                            <div className="text-muted-foreground">{lead.telefono}</div>
                          </div>
                        </td>
                        <td className="p-2 capitalize">{lead.tipo_vivienda}</td>
                        <td className="p-2 capitalize">{lead.interes_principal}</td>
                        <td className="p-2">
                          <span className="font-bold text-primary">{lead.lead_score}</span>
                        </td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyBadge(lead.urgencia_nivel)}`}>
                            Nivel {lead.urgencia_nivel}
                          </span>
                        </td>
                        <td className="p-2 text-sm text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </HelmetProvider>
  );
};