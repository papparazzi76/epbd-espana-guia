-- Fix company data security exposure
-- Drop the existing overly permissive policies
DROP POLICY IF EXISTS "Companies can be viewed publicly" ON public.companies;
DROP POLICY IF EXISTS "Companies can insert themselves" ON public.companies;

-- Create secure policies for company access
-- Companies can view their own data when authenticated
CREATE POLICY "Companies can view their own data" 
ON public.companies 
FOR SELECT 
TO authenticated
USING (email_contacto = (auth.jwt() ->> 'email'));

-- Companies can update their own data when authenticated  
CREATE POLICY "Companies can update their own data"
ON public.companies
FOR UPDATE
TO authenticated
USING (email_contacto = (auth.jwt() ->> 'email'))
WITH CHECK (email_contacto = (auth.jwt() ->> 'email'));

-- Allow companies to register themselves (insert)
CREATE POLICY "Companies can register themselves"
ON public.companies
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create a security definer function for lead assignment matching
-- This allows the lead assignment system to work without exposing company details
CREATE OR REPLACE FUNCTION public.get_matching_companies_for_lead(
  lead_provincia text
)
RETURNS TABLE(company_id uuid, company_email text)
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT id, email_contacto
  FROM public.companies 
  WHERE activo = true 
    AND lead_provincia = ANY(provincias_interes);
$$;