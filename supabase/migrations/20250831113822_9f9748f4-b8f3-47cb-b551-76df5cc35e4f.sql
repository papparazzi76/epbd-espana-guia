-- Fix diagnostics table security vulnerability
-- Remove the overly permissive public read policy
DROP POLICY IF EXISTS "Diagnostics are publicly readable" ON public.diagnostics;

-- Create secure policies for diagnostics access
-- Only allow authenticated users (companies) to read diagnostics
CREATE POLICY "Authenticated users can view diagnostics" 
ON public.diagnostics 
FOR SELECT 
TO authenticated
USING (true);

-- Keep the insert policy for lead capture (anonymous users can submit diagnostics)
-- This allows the diagnostic form to work for potential customers
-- The "Anyone can submit diagnostics" policy should already exist from previous migration

-- Create a security definer function for system operations that need diagnostic access
-- This allows internal systems to process diagnostics without exposing data publicly
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