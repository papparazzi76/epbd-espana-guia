// src/components/LeadForm.tsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type LeadFormData = {
  nombre: string;
  email: string;
  telefono: string;
  municipio: string;
  certificado_actual: "" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
  certificado_objetivo: "" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
  presupuesto_estimado: string;
  mensaje: string;
};

const initialData: LeadFormData = {
  nombre: "",
  email: "",
  telefono: "",
  municipio: "",
  certificado_actual: "",
  certificado_objetivo: "",
  presupuesto_estimado: "",
  mensaje: "",
};

const TABLE =
  (import.meta.env.VITE_LEADS_TABLE as string | undefined) ?? "leads";

export default function LeadForm() {
  const [form, setForm] = useState<LeadFormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  function onChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function isEmailValid(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setOk(null);

    // Validaciones mínimas
    if (!form.nombre.trim()) return setErrorMsg("El nombre es obligatorio.");
    if (!isEmailValid(form.email)) return setErrorMsg("El email no es válido.");
    if (!form.telefono.trim())
      return setErrorMsg("El teléfono es obligatorio.");

    setLoading(true);
    try {
      const payload = {
        ...form,
        created_at: new Date().toISOString(),
        origen: "web_epbd", // etiqueta útil para futuros filtros
      };

      const { error } = await supabase.from(TABLE).insert([payload]);

      if (error) {
        console.error("[Supabase INSERT error]", error);
        setOk(false);
        setErrorMsg(error.message || "No se pudo enviar el formulario.");
        return;
      }

      setOk(true);
      setForm(initialData);
    } catch (err: any) {
      console.error("[Submit error]", err);
      setOk(false);
      setErrorMsg(err?.message || "Ha ocurrido un error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6 bg-white/5 rounded-2xl border border-white/10 shadow">
      <h2 className="text-2xl font-semibold mb-2">
        Solicitud de Rehabilitación Energética
      </h2>
      <p className="text-sm text-gray-300 mb-6">
        Rellena este formulario y te contactaremos para valorar tu proyecto.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm">Nombre completo *</span>
            <input
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
              placeholder="Tu nombre"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Email *</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
              placeholder="tucorreo@dominio.com"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Teléfono *</span>
            <input
              name="telefono"
              value={form.telefono}
              onChange={onChange}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
              placeholder="+34 600 000 000"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Municipio</span>
            <input
              name="municipio"
              value={form.municipio}
              onChange={onChange}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
              placeholder="Valladolid"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Certificado actual</span>
            <select
              name="certificado_actual"
              value={form.certificado_actual}
              onChange={onChange}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            >
              <option value="">Selecciona…</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">Certificado objetivo</span>
            <select
              name="certificado_objetivo"
              value={form.certificado_objetivo}
              onChange={onChange}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            >
              <option value="">Selecciona…</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
          </label>

          <label className="md:col-span-2 flex flex-col gap-1">
            <span className="text-sm">Presupuesto estimado</span>
            <input
              name="presupuesto_estimado"
              value={form.presupuesto_estimado}
              onChange={onChange}
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
              placeholder="Ej: 18.000 €"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Cuéntanos más</span>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={onChange}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none min-h-[120px]"
            placeholder="Describe la vivienda, plazos, etc."
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-5 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition"
        >
          {loading ? "Enviando…" : "Enviar solicitud"}
        </button>

        {ok === true && (
          <p className="text-green-400 text-sm mt-2">
            ¡Enviado correctamente! Te contactaremos pronto.
          </p>
        )}
        {ok === false && (
          <p className="text-red-400 text-sm mt-2">
            No se pudo enviar. {errorMsg}
          </p>
        )}
        {!!errorMsg && ok === null && (
          <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
