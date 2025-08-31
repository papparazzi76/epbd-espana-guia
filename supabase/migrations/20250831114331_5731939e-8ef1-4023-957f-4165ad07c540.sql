-- Fix subscription_alerts table to prevent email harvesting
-- Remove the overly broad authenticated user policy
DROP POLICY IF EXISTS "Authenticated users can view subscription alerts" ON public.subscription_alerts;

-- Since subscription_alerts doesn't have user_id (it's for anonymous subscriptions),
-- we need to restrict access to authorized personnel only
-- For now, we'll create a function-based approach for system access

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

-- Create a restrictive policy that only allows system-level access
-- This prevents regular authenticated users from accessing email addresses
-- Only specific authorized roles should be able to access this data
CREATE POLICY "System level access only for subscription alerts" 
ON public.subscription_alerts 
FOR SELECT 
TO authenticated
USING (false); -- This effectively blocks all direct access

-- Keep the insert policy for anonymous subscriptions (the subscription form)
-- The "Anyone can subscribe to alerts" policy should already exist

-- Add update policy for system-level management only
CREATE POLICY "System level updates only for subscription alerts" 
ON public.subscription_alerts 
FOR UPDATE 
TO authenticated
USING (false)  -- Blocks all direct updates
WITH CHECK (false);