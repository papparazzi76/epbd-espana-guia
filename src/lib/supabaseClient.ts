// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Cargamos las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Seguridad: avisar si faltan variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ ERROR: Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el .env o en Lovable.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
