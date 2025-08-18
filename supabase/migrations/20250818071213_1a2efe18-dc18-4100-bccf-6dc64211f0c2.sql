
-- Create a storage bucket for the energy efficiency guide PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('guide-pdfs', 'guide-pdfs', true);

-- Create RLS policy to allow public read access to the guide PDFs
CREATE POLICY "Public can view guide PDFs" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'guide-pdfs');

-- Create RLS policy to allow authenticated users to upload guide PDFs (for admin purposes)
CREATE POLICY "Authenticated users can upload guide PDFs" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'guide-pdfs' AND auth.role() = 'authenticated');
