// supabase/functions/submit-lead/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// === CONFIG (se leen de Edge Functions → Secrets) ===
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const TABLE = Deno.env.get("LEADS_TABLE") ?? "diagnostics";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? ""; // opcional
const EMAIL_FROM =
  Deno.env.get("EMAIL_FROM") ?? "CasasMásEficientes <no-reply@casasmaseficientes.com>";
const ADMIN_EMAIL =
  Deno.env.get("ADMIN_EMAIL") ?? "diagnostico@casasmaseficientes.com";

// === CORS ===
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// --- Lista blanca de columnas PERMITIDAS (todas en minúsculas) ---
const ALLOWED: string[] = [
  // 1. Vivienda
  "propertytype","constructionyear","surfacearea","floors","rooms","bathrooms","occupancy",
  // 2. Envolvente
  "facadetype","insulationstate","roofinsulation","windowtype","thermalbridge","glasstype",
  // 3. Climatización/ACS
  "heatingsystem","coolingsystem","hotwatersystem",
  // 4. Energía
  "solarpanels","solarpower","battery","solarthermal","heatpump","ventilationsystem",
  // 5. Consumos
  "electricconsumption","gasoilconsumption","monthlybill","energycertificate",
  // 6. Reforma
  "maininterest","plannedworks","budget",
  // 7. Financiación
  "interestsubsidies","interestfinancing",
  // 8. Localización
  "province","city","climatezone","environment",
  // Contacto
  "name","email","phone",
  // Meta
  "source","submitted_at","created_at"
];

// Convierte todas las claves del body a minúsculas (constructionYear -> constructionyear)
function lowerKeys(o: Record<string, unknown> = {}) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) out[k.toLowerCase()] = v;
  return out;
}

// Se queda solo con claves permitidas
function pickAllowed(o: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const k of ALLOWED) if (k in o) out[k] = o[k];
  return out;
}

// Email via Resend (si no hay API Key, simplemente no envía)
async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return { skipped: true, reason: "No RESEND_API_KEY" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend error ${res.status}: ${text}`);
  }
  return await res.json().catch(() => ({}));
}

// Plantillas simples
function userHtml(name: string) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5">
    <h2>¡Gracias, ${name || "cliente"}!</h2>
    <p>Hemos recibido tu solicitud de <b>Diagnóstico Técnico Gratuito</b>.
    En breve un experto de CasasMásEficientes se pondrá en contacto contigo.</p>
    <p>Si necesitas algo, responde a este correo.</p>
    <p>— Equipo CasasMásEficientes</p>
  </div>`;
}
function adminHtml(payload: Record<string, unknown>) {
  const rows = Object.entries(payload)
    .map(([k, v]) => `<tr><td style="padding:4px 8px"><b>${k}</b></td><td style="padding:4px 8px">${String(v ?? "")}</td></tr>`)
    .join("");
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5">
    <h2>Nuevo lead recibido</h2>
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">${rows}</table>
  </div>`;
}

serve(async (req) => {
  // Preflight
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    // 1) Normalizamos y filtramos
    const raw = await req.json();
    const lower = lowerKeys(raw);
    const data = pickAllowed(lower);

    // 2) Validación mínima
    for (const k of ["name","email","phone","province"]) {
      if (!data[k] || String(data[k]).trim() === "") {
        return new Response(JSON.stringify({ error: `Missing field: ${k}` }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // 3) Insert en Supabase
    const payload = {
      ...data,
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      source: data["source"] ?? "web_epbd",
    };

    const { error } = await supabase.from(TABLE).insert([payload]);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 4) Emails (no bloqueantes)
    const name = String(data["name"] ?? "");
    const mail = String(data["email"] ?? "");
    Promise.allSettled([
      sendEmail(mail, "Hemos recibido tu solicitud de diagnóstico", userHtml(name)),
      sendEmail(ADMIN_EMAIL, "Nuevo lead de diagnóstico", adminHtml(payload)),
    ]).catch(() => { /* ignoramos errores de email */ });

    // 5) OK
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
