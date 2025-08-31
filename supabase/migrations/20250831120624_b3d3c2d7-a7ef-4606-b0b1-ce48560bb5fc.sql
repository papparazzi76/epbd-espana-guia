-- Fix lead_assignments table security - properly handle existing policies
-- Use robust approach to drop all existing policies
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all existing policies on lead_assignments table
    FOR policy_record IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'lead_assignments'
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.lead_assignments', policy_record.policyname);
    END LOOP;
END $$;

-- Create secure policy that allows companies to only see their own assignments
CREATE POLICY "Companies can view their own lead assignments" 
ON public.lead_assignments 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.companies c 
    WHERE c.id = lead_assignments.company_id
      AND c.email_contacto = (auth.jwt() ->> 'email'::text)
      AND c.activo = true
  )
);

-- Allow companies to update their own assignment status and notes
CREATE POLICY "Companies can update their own lead assignments" 
ON public.lead_assignments 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.companies c 
    WHERE c.id = lead_assignments.company_id
      AND c.email_contacto = (auth.jwt() ->> 'email'::text)
      AND c.activo = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.companies c 
    WHERE c.id = lead_assignments.company_id
      AND c.email_contacto = (auth.jwt() ->> 'email'::text)
      AND c.activo = true
  )
);

-- Allow system-level creation of lead assignments (for automated assignment processes)
CREATE POLICY "System can create lead assignments" 
ON public.lead_assignments 
FOR INSERT 
WITH CHECK (true);

-- Create a security definer function for system statistics without exposing sensitive data
CREATE OR REPLACE FUNCTION public.get_lead_assignment_stats()
RETURNS TABLE(
  total_assignments bigint,
  recent_assignments bigint,
  active_companies bigint
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  WITH stats AS (
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE asignado_fecha >= NOW() - INTERVAL '30 days') as recent,
      COUNT(DISTINCT company_id) as active_companies
    FROM public.lead_assignments la
    JOIN public.companies c ON la.company_id = c.id
    WHERE c.activo = true
  )
  SELECT 
    total,
    recent,
    active_companies
  FROM stats;
$$;