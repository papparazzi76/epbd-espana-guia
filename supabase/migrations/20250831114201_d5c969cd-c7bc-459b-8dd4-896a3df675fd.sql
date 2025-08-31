-- Fix diagnostics table to restrict access to authorized personnel only
-- Remove the overly broad authenticated user policy
DROP POLICY IF EXISTS "Authenticated users can view diagnostics" ON public.diagnostics;

-- Create restricted access policies for diagnostics
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

-- Policy 2: Companies can view diagnostics that have been converted to leads and assigned to them
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

-- Keep the insert policy for anonymous diagnostic submissions
-- The "Anyone can submit diagnostics" policy should already exist

-- Create a security definer function for system statistics that doesn't expose personal data
CREATE OR REPLACE FUNCTION public.get_diagnostic_summary_stats()
RETURNS TABLE(
  total_submissions bigint,
  recent_submissions bigint,
  top_provinces text[]
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  WITH stats AS (
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as recent,
      ARRAY_AGG(DISTINCT province ORDER BY province) as provinces
    FROM public.diagnostics 
    WHERE province IS NOT NULL
  )
  SELECT 
    total,
    recent,
    provinces[1:5] -- Top 5 provinces
  FROM stats;
$$;