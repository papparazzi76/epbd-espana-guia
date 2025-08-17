import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, CheckCircle2 } from "lucide-react";

export const SubscriptionAlerts = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const provinces = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona",
    "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca",
    "Girona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva", "Huesca", "Islas Baleares",
    "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid",
    "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
    "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel",
    "Toledo", "Valencia", "Valladolid", "Bizkaia", "Zamora", "Zaragoza"
  ];

  const handleSubscribe = () => {
    if (!email || !province) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa tu email y provincia",
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with your email marketing platform
    console.log("Subscription data:", { email, province, timestamp: new Date() });
    
    setSubscribed(true);
    toast({
      title: "¡Suscrito correctamente!",
      description: "Te avisaremos cuando salgan nuevas ayudas en tu comunidad",
    });
  };

  if (subscribed) {
    return (
      <Card className="max-w-md mx-auto border-2 border-success/20 bg-success/5">
        <CardContent className="p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="font-bold text-success mb-2">¡Suscripción activada!</h3>
          <p className="text-sm text-muted-foreground">
            Te avisaremos por email cuando salgan nuevas ayudas en <strong>{province}</strong>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto card-elevated border-2 border-primary/20">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <Bell className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-lg">Alertas de nuevas ayudas</CardTitle>
        <CardDescription>
          Recibe por email un aviso cuando salga una nueva ayuda en tu comunidad
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="alert-email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="alert-email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Comunidad Autónoma</Label>
          <Select value={province} onValueChange={setProvince}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tu provincia" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((prov) => (
                <SelectItem key={prov} value={prov}>{prov}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSubscribe} className="w-full">
          Suscribirme a alertas
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          No spam. Solo te avisaremos de ayudas relevantes para tu zona.
        </p>
      </CardContent>
    </Card>
  );
};