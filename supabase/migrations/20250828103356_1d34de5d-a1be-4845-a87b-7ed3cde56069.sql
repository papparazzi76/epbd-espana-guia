-- Fix security issue: Restrict leads table access to authorized companies only
-- Remove the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view their own leads" ON public.leads;

-- Create proper RLS policies for leads table
-- Companies can only view leads that are:
-- 1. Assigned to them, OR 
-- 2. Unassigned leads in their provinces of interest
CREATE POLICY "Companies can view assigned or relevant leads" 
ON public.leads 
FOR SELECT 
USING (
  -- Check if lead is assigned to the requesting company (through lead_assignments)
  EXISTS (
    SELECT 1 FROM public.lead_assignments la 
    JOIN public.companies c ON la.company_id = c.id 
    WHERE la.lead_id = leads.id 
    AND c.email_contacto = auth.jwt() ->> 'email'
  )
  OR
  -- Check if lead is unassigned and in company's provinces of interest
  (
    NOT EXISTS (SELECT 1 FROM public.lead_assignments WHERE lead_id = leads.id)
    AND EXISTS (
      SELECT 1 FROM public.companies c 
      WHERE c.email_contacto = auth.jwt() ->> 'email'
      AND leads.provincia = ANY(c.provincias_interes)
      AND c.activo = true
    )
  )
);

-- Allow companies to update leads they have access to (for status updates)
CREATE POLICY "Companies can update accessible leads" 
ON public.leads 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.lead_assignments la 
    JOIN public.companies c ON la.company_id = c.id 
    WHERE la.lead_id = leads.id 
    AND c.email_contacto = auth.jwt() ->> 'email'
  )
);

-- Keep the insert policy for the public form to work
-- The existing "Anyone can insert leads" policy remains unchanged