-- Fix subscription_alerts table security - robust policy management
-- Use a more robust approach to drop existing policies
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all existing policies on subscription_alerts table
    FOR policy_record IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'subscription_alerts'
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.subscription_alerts', policy_record.policyname);
    END LOOP;
END $$;

-- Create a security definer function for subscription stats without exposing emails
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

-- Create new secure policies
-- Allow anonymous subscriptions (keeps the subscription form working)
CREATE POLICY "Allow anonymous subscriptions" 
ON public.subscription_alerts 
FOR INSERT 
WITH CHECK (true);

-- Block all authenticated user access to prevent email harvesting
CREATE POLICY "Block authenticated access to subscriptions" 
ON public.subscription_alerts 
FOR SELECT 
TO authenticated
USING (false);

-- Block updates to prevent data manipulation
CREATE POLICY "Block updates to subscriptions" 
ON public.subscription_alerts 
FOR UPDATE 
TO authenticated
USING (false)
WITH CHECK (false);

-- Block deletes to prevent data loss
CREATE POLICY "Block deletes from subscriptions" 
ON public.subscription_alerts 
FOR DELETE 
TO authenticated
USING (false);