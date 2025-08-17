-- Fix function search path security warnings
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix auto_calculate_lead_score function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;