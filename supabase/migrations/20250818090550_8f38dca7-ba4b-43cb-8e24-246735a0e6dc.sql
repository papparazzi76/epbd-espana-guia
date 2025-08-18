-- Create storage buckets for each guide type
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES 
  ('guia-propietario-vivienda', 'guia-propietario-vivienda', true, 52428800, '{"application/pdf","image/png","image/jpeg"}'),
  ('guia-comunidad-propietarios', 'guia-comunidad-propietarios', true, 52428800, '{"application/pdf","image/png","image/jpeg"}'),
  ('guia-arrendador', 'guia-arrendador', true, 52428800, '{"application/pdf","image/png","image/jpeg"}'),
  ('guia-comprador', 'guia-comprador', true, 52428800, '{"application/pdf","image/png","image/jpeg"}');

-- Create RLS policies for public read access to all guide buckets
CREATE POLICY "Public read access for guide buckets" 
ON storage.objects 
FOR SELECT 
USING (bucket_id IN (
  'guia-propietario-vivienda', 
  'guia-comunidad-propietarios', 
  'guia-arrendador', 
  'guia-comprador'
));

-- Create RLS policies for authenticated users to upload guides
CREATE POLICY "Authenticated users can upload guides" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated' AND 
  bucket_id IN (
    'guia-propietario-vivienda', 
    'guia-comunidad-propietarios', 
    'guia-arrendador', 
    'guia-comprador'
  )
);

-- Create RLS policies for authenticated users to update guides
CREATE POLICY "Authenticated users can update guides" 
ON storage.objects 
FOR UPDATE 
USING (
  auth.role() = 'authenticated' AND 
  bucket_id IN (
    'guia-propietario-vivienda', 
    'guia-comunidad-propietarios', 
    'guia-arrendador', 
    'guia-comprador'
  )
);

-- Create RLS policies for authenticated users to delete guides
CREATE POLICY "Authenticated users can delete guides" 
ON storage.objects 
FOR DELETE 
USING (
  auth.role() = 'authenticated' AND 
  bucket_id IN (
    'guia-propietario-vivienda', 
    'guia-comunidad-propietarios', 
    'guia-arrendador', 
    'guia-comprador'
  )
);