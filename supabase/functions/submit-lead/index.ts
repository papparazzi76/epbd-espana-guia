import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase env vars");
      return new Response(JSON.stringify({ error: "Missing Supabase configuration" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    console.log("submit-lead payload:", body);

    const {
      nombre_completo,
      email,
      telefono,
      tipo_vivienda,
      año_construccion,
      provincia,
      localidad,
      certificado_energetico = "no_se",
      interes_principal,
    } = body || {};

    // Basic validation
    const required = { nombre_completo, email, tipo_vivienda, año_construccion, provincia, localidad, interes_principal };
    const missing = Object.entries(required).filter(([_, v]) => !v);
    if (missing.length) {
      return new Response(
        JSON.stringify({ error: `Faltan campos: ${missing.map(([k]) => k).join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          nombre_completo,
          email,
          telefono: telefono || null,
          tipo_vivienda,
          año_construccion,
          provincia,
          localidad,
          certificado_energetico,
          interes_principal,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error("Error inserting lead:", error);
      return new Response(JSON.stringify({ error: error.message, code: error.code }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, lead: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Unexpected error in submit-lead:", e);
    return new Response(JSON.stringify({ error: e.message || "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
