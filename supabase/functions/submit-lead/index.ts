import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Asegúrate de que las variables de entorno de Supabase están definidas en tu proyecto
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"); // Usamos la service_role_key para tener permisos de escritura
const adminEmail = Deno.env.get("ADMIN_EMAIL"); // El email a donde llegarán las notificaciones

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase credentials.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const formData = await req.json();

    // 1. Insertar el lead en la base de datos
    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .insert([
        {
          nombre_completo: formData.name,
          email: formData.email,
          telefono: formData.phone,
          tipo_vivienda: formData.propertyType,
          año_construccion: formData.constructionYear,
          provincia: formData.province,
          localidad: formData.city,
          certificado_energetico: formData.energyCertificate,
          interes_principal: formData.mainInterest,
          // Aquí puedes añadir el resto de campos si los tienes en tu tabla 'leads'
        },
      ])
      .select()
      .single();

    if (leadError) {
      throw leadError;
    }

    // 2. Enviar email de confirmación al usuario
    const { error: userEmailError } = await supabase.auth.admin.inviteUserByEmail(
        formData.email,
        {
            data: {
                subject: "Hemos recibido tu solicitud de diagnóstico energético",
                html: `
                    <h1>¡Hola ${formData.name}!</h1>
                    <p>Hemos recibido correctamente tu solicitud de diagnóstico energético para tu vivienda en ${formData.city}.</p>
                    <p>Un técnico de nuestro equipo está revisando la información que nos has proporcionado.</p>
                    <p>En las próximas 24 horas, nos pondremos en contacto contigo para darte un primer análisis y los siguientes pasos.</p>
                    <p>Gracias por confiar en nosotros.</p>
                    <p><strong>El equipo de Guía EPBD 2024</strong></p>
                `
            }
        }
    );


    if (userEmailError) {
        console.error("Error al enviar email al usuario:", userEmailError);
        // No lanzamos un error aquí para que el proceso no falle si el email no se envía
    }
    
    // 3. Enviar email de notificación al administrador
    if (adminEmail) {
        const { error: adminEmailError } = await supabase.auth.admin.inviteUserByEmail(
            adminEmail,
            {
                data: {
                    subject: `Nuevo lead de ${formData.province}: ${formData.name}`,
                    html: `
                        <h1>Nuevo lead recibido</h1>
                        <p><strong>Nombre:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Teléfono:</strong> ${formData.phone}</p>
                        <p><strong>Provincia:</strong> ${formData.province}</p>
                        <p><strong>Interés principal:</strong> ${formData.mainInterest}</p>
                        <p>Puedes ver todos los detalles en el panel de control de Supabase.</p>
                    `
                }
            }
        );

        if (adminEmailError) {
            console.error("Error al enviar email al administrador:", adminEmailError);
        }
    }


    return new Response(JSON.stringify({ success: true, lead: leadData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error en la función submit-lead:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
