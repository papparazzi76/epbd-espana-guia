-- Fix subscription_alerts table security - properly handle existing policies
-- Remove all existing policies first
DROP POLICY IF EXISTS "Authenticated users can view subscription alerts" ON public.subscription_alerts;
DROP POLICY IF EXISTS "System level access only for subscription alerts" ON public.subscription_alerts;
DROP POLICY IF EXISTS "System level updates only for subscription alerts" ON public.subscription_alerts;
DROP POLICY IF EXISTS "Authenticated users can update subscription alerts" ON public.subscription_alerts;

-- Create a security definer function for authorized access to subscription stats
-- This allows getting aggregate stats without exposing individual emails
CREATE OR REPLACE FUNCTION public.get_subscription_stats()
RETURNS TABLE(
  total_subscriptions bigint,
  active_subscriptions bigint,
  provinces_with_subscriptions text[]
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  WITH stats AS (
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE activo = true) as active,
      ARRAY_AGG(DISTINCT provincia ORDER BY provincia) as provinces
    FROM public.subscription_alerts
  )
  SELECT 
    total,
    active,
    provinces
  FROM stats;
$$;

-- Create restrictive policies that block direct access to email addresses
-- This prevents authenticated users from harvesting email addresses
CREATE POLICY "No direct access to subscription alerts" 
ON public.subscription_alerts 
FOR SELECT 
TO authenticated
USING (false); -- Blocks all direct SELECT access

-- Block direct updates to prevent data manipulation
CREATE POLICY "No direct updates to subscription alerts" 
ON public.subscription_alerts 
FOR UPDATE 
TO authenticated
USING (false)
WITH CHECK (false);

-- Ensure the insert policy exists for the subscription form functionality
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscription_alerts' 
    AND policyname = 'Anyone can subscribe to alerts'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can subscribe to alerts" ON public.subscription_alerts FOR INSERT WITH CHECK (true)';
  END IF;
END $$;