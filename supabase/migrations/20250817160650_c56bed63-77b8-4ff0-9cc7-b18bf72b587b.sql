-- Create leads table for diagnostic form responses
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  tipo_vivienda TEXT NOT NULL CHECK (tipo_vivienda IN ('unifamiliar', 'piso', 'comunidad')),
  año_construccion TEXT NOT NULL,
  provincia TEXT NOT NULL,
  localidad TEXT NOT NULL,
  certificado_energetico TEXT NOT NULL CHECK (certificado_energetico IN ('si', 'no', 'no_se')),
  interes_principal TEXT NOT NULL CHECK (interes_principal IN ('reformar', 'subvencion', 'vender_alquilar')),
  lead_score INTEGER DEFAULT 0,
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'contactado', 'asignado', 'cerrado')),
  clase_energetica_estimada TEXT,
  urgencia_nivel INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscription alerts table
CREATE TABLE public.subscription_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  provincia TEXT NOT NULL,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create companies table for B2B subscriptions
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_empresa TEXT NOT NULL,
  email_contacto TEXT NOT NULL,
  telefono TEXT,
  provincias_interes TEXT[] NOT NULL,
  tipo_servicios TEXT[] NOT NULL,
  plan_suscripcion TEXT DEFAULT 'basico' CHECK (plan_suscripcion IN ('basico', 'premium', 'enterprise')),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead assignments table
CREATE TABLE public.lead_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  asignado_fecha TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  estado TEXT DEFAULT 'asignado' CHECK (estado IN ('asignado', 'contactado', 'cerrado')),
  notas TEXT
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a lead generation site)
CREATE POLICY "Anyone can insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view their own leads" ON public.leads FOR SELECT USING (true);

CREATE POLICY "Anyone can subscribe to alerts" ON public.subscription_alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view alerts" ON public.subscription_alerts FOR SELECT USING (true);

CREATE POLICY "Companies can be viewed publicly" ON public.companies FOR SELECT USING (activo = true);
CREATE POLICY "Companies can insert themselves" ON public.companies FOR INSERT WITH CHECK (true);

CREATE POLICY "Lead assignments viewable by all" ON public.lead_assignments FOR SELECT USING (true);
CREATE POLICY "Lead assignments can be created" ON public.lead_assignments FOR INSERT WITH CHECK (true);

-- Create function to calculate lead score
CREATE OR REPLACE FUNCTION public.calculate_lead_score(
  tipo_vivienda TEXT,
  año_construccion TEXT,
  certificado_energetico TEXT,
  interes_principal TEXT
) RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Base score by housing type
  CASE tipo_vivienda
    WHEN 'unifamiliar' THEN score := score + 30;
    WHEN 'piso' THEN score := score + 20;
    WHEN 'comunidad' THEN score := score + 40;
  END CASE;

  -- Score by construction year (older = more likely to need renovation)
  CASE año_construccion
    WHEN 'antes_1980' THEN score := score + 40;
    WHEN '1980_1990' THEN score := score + 35;
    WHEN '1990_2000' THEN score := score + 30;
    WHEN '2000_2010' THEN score := score + 15;
    WHEN 'despues_2010' THEN score := score + 5;
  END CASE;

  -- Score by energy certificate knowledge
  CASE certificado_energetico
    WHEN 'no' THEN score := score + 25;
    WHEN 'no_se' THEN score := score + 20;
    WHEN 'si' THEN score := score + 10;
  END CASE;

  -- Score by main interest
  CASE interes_principal
    WHEN 'reformar' THEN score := score + 30;
    WHEN 'subvencion' THEN score := score + 25;
    WHEN 'vender_alquilar' THEN score := score + 35;
  END CASE;

  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-calculate lead score
CREATE OR REPLACE FUNCTION public.auto_calculate_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_score := public.calculate_lead_score(
    NEW.tipo_vivienda,
    NEW.año_construccion,
    NEW.certificado_energetico,
    NEW.interes_principal
  );

  -- Estimate energy class based on construction year
  NEW.clase_energetica_estimada := CASE NEW.año_construccion
    WHEN 'antes_1980' THEN 'G'
    WHEN '1980_1990' THEN 'F'
    WHEN '1990_2000' THEN 'E'
    WHEN '2000_2010' THEN 'D'
    WHEN 'despues_2010' THEN 'C'
  END;

  -- Set urgency level based on score
  NEW.urgencia_nivel := CASE
    WHEN NEW.lead_score >= 100 THEN 5
    WHEN NEW.lead_score >= 80 THEN 4
    WHEN NEW.lead_score >= 60 THEN 3
    WHEN NEW.lead_score >= 40 THEN 2
    ELSE 1
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_lead_score_trigger
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_calculate_lead_score();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();