-- Recrear las políticas de storage para guide-pdfs bucket
-- Primero eliminamos las políticas existentes si las hay
DROP POLICY IF EXISTS "Anyone can upload PDFs to guide-pdfs bucket" ON storage.objects;
DROP POLICY IF EXISTS "PDFs in guide-pdfs are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete PDFs from guide-pdfs bucket" ON storage.objects;

-- Política para permitir subir archivos (INSERT)
CREATE POLICY "Allow public uploads to guide-pdfs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'guide-pdfs');

-- Política para permitir ver archivos (SELECT)
CREATE POLICY "Allow public access to guide-pdfs"
ON storage.objects FOR SELECT
USING (bucket_id = 'guide-pdfs');

-- Política para permitir actualizar archivos (UPDATE)
CREATE POLICY "Allow public updates to guide-pdfs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'guide-pdfs')
WITH CHECK (bucket_id = 'guide-pdfs');

-- Política para permitir eliminar archivos (DELETE)
CREATE POLICY "Allow public deletes from guide-pdfs"
ON storage.objects FOR DELETE
USING (bucket_id = 'guide-pdfs');