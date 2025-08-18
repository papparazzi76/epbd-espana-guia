import { supabase } from '@/integrations/supabase/client';

export async function uploadPdf(file: File, userId: string = 'anonymous') {
  if (file.type !== 'application/pdf') {
    throw new Error('El archivo debe ser un PDF');
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const path = `users/${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('guide-pdfs')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'application/pdf'
    });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('guide-pdfs')
    .getPublicUrl(path);

  return {
    ...data,
    publicUrl: urlData.publicUrl
  };
}

export async function getSignedUrl(path: string, expiresIn: number = 3600) {
  const { data, error } = await supabase.storage
    .from('guide-pdfs')
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data;
}