// supabase/functions/submit-lead/index.ts
// Función Edge para recibir el lead del formulario, guardarlo en DB y responder con CORS.
// Usa la clave SERVICE_ROLE para evitar problemas de RLS desde el servidor.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- Config ---
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!; // Añade este secret en Supabase → Project Settings → Functions → Secrets
const TABLE = Deno.env.get("LEADS_TABLE") ?? "diagnostics";      // opcional, por si quieres personalizar

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const body = await req.json();

    // Validaciones mínimas
    const required = ["name", "email", "phone", "province"];
    for (const key of required) {
      if (!body?.[key] || String(body[key]).trim() === "") {
        return new Response(JSON.stringify({ error: `Missing field: ${key}` }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // Inserción
    const payload = {
      ...body,
      created_at: new Date().toISOString(),
      source: body.source ?? "web_epbd",
    };

    const { error } = await supabase.from(TABLE).insert([payload]);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
