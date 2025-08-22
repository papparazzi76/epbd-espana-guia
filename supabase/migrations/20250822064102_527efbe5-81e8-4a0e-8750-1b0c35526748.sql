-- Ensure triggers exist for leads to auto-calculate fields and update timestamps
-- Trigger to auto-calculate lead score, clase_energetica_estimada y urgencia_nivel
DROP TRIGGER IF EXISTS leads_auto_calculate_lead_score ON public.leads;
CREATE TRIGGER leads_auto_calculate_lead_score
BEFORE INSERT OR UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.auto_calculate_lead_score();

-- Trigger to keep updated_at fresh on updates
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();