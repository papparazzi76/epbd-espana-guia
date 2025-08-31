-- Fix subscription_alerts table security vulnerability
-- Remove the overly permissive public read policy that exposes email addresses
DROP POLICY IF EXISTS "Anyone can view alerts" ON public.subscription_alerts;

-- Create secure policy for subscription alerts access
-- Only allow authenticated users (admin/company users) to read subscription data
CREATE POLICY "Authenticated users can view subscription alerts" 
ON public.subscription_alerts 
FOR SELECT 
TO authenticated
USING (true);

-- Keep the insert policy for subscription form (anonymous users can subscribe)
-- This allows the subscription form to work for website visitors
-- The "Anyone can subscribe to alerts" policy should already exist

-- Add an update policy for authenticated users to manage subscriptions
CREATE POLICY "Authenticated users can update subscription alerts" 
ON public.subscription_alerts 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);