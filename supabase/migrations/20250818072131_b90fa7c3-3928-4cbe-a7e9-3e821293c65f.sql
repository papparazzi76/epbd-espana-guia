-- Fix RLS policies for guide-pdfs bucket to allow public uploads
DROP POLICY IF EXISTS "Authenticated users can upload guide PDFs" ON storage.objects;

-- Allow anyone to upload PDFs to the guide-pdfs bucket
CREATE POLICY "Anyone can upload guide PDFs" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'guide-pdfs');

-- Allow anyone to update PDFs in the guide-pdfs bucket
CREATE POLICY "Anyone can update guide PDFs" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'guide-pdfs');

-- Allow anyone to delete PDFs in the guide-pdfs bucket (for admin purposes)
CREATE POLICY "Anyone can delete guide PDFs" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'guide-pdfs');