-- Ensure the bucket accepts standard PDF MIME type and remains public
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['application/pdf'],
    public = true
WHERE id = 'guide-pdfs';