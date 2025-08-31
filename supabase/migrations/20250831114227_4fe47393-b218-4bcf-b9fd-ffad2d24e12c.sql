-- Fix diagnostics table security - properly handle existing policies
-- Remove all existing policies first
DROP POLICY IF EXISTS "Authenticated users can view diagnostics" ON public.diagnostics;
DROP POLICY IF EXISTS "Companies can view diagnostics in their service areas" ON public.diagnostics;
DROP POLICY IF EXISTS "Companies can view diagnostics for assigned leads" ON public.diagnostics;
DROP POLICY IF EXISTS "Diagnostics are publicly readable" ON public.diagnostics;

-- Create secure, restrictive access policies for diagnostics
-- Policy 1: Companies can only view diagnostics from provinces they serve
CREATE POLICY "Companies can view diagnostics in their service areas" 
ON public.diagnostics 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.companies c 
    WHERE c.email_contacto = (auth.jwt() ->> 'email'::text)
      AND c.activo = true
      AND diagnostics.province = ANY(c.provincias_interes)
  )
);

-- Policy 2: Companies can view diagnostics converted to assigned leads
CREATE POLICY "Companies can view diagnostics for assigned leads" 
ON public.diagnostics 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.leads l
    JOIN public.lead_assignments la ON l.id = la.lead_id
    JOIN public.companies c ON la.company_id = c.id
    WHERE c.email_contacto = (auth.jwt() ->> 'email'::text)
      AND l.email = diagnostics.email
      AND l.nombre_completo = diagnostics.name
  )
);

-- Ensure anonymous users can still submit diagnostics (keep existing functionality)
-- Check if insert policy exists, if not create it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'diagnostics' 
    AND policyname = 'Anyone can submit diagnostics'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can submit diagnostics" ON public.diagnostics FOR INSERT WITH CHECK (true)';
  END IF;
END $$;