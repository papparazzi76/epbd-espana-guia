# Blueprint integral — Inmobiliaria digital avanzada (España + LATAM)

## 1) Visión de producto y modelo operativo

**Objetivo:** plataforma inmobiliaria full-stack con foco en conversión, automatización (70%+ procesos), escalado franquicia/SaaS y capacidades IA multiagente.

**Líneas de negocio cubiertas:**
- Venta tradicional
- Venta entre particulares (B2C2C)
- Inversión inmobiliaria
- Gestión de reformas
- Nuda propiedad
- Captación y prospección
- Escaparates digitales
- Formación (futuro upsell)

**North Star KPI:** % operaciones asistidas end-to-end por la plataforma con satisfacción NPS > 60.

---

## 2) Arquitectura general (SEO-first, mobile-first, escalable)

### 2.1 Principios técnicos
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Arquitectura modular:** dominio por vertical (listings, leads, legal, inversiones, pagos, automatizaciones).
- **Preparada para app:** API-first + diseño de componentes compartibles (web → React Native/Capacitor).
- **Internacionalizable:** i18n, divisas, fiscalidad por país, catálogo de legislación por jurisdicción.
- **Eventos first:** cada acción relevante emite evento de dominio (webhooks internos + cola).

### 2.2 Stack recomendado
- **Frontend:** Next.js (App Router, SSR/ISR, Server Actions)
- **UI:** Tailwind + design system (tokens + componentes reusables)
- **Backend:** Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Pagos:** Stripe (suscripciones, cobros de reservas, add-ons)
- **Automatización:** n8n (core) + Make (integraciones de negocio)
- **IA:** OpenAI API + embeddings + vector DB (pgvector) para RAG
- **Email/SMS/WhatsApp:** Resend/Sendgrid + WhatsApp Business API
- **Infra:** Vercel + CDN + WAF + observabilidad (Sentry + PostHog + OpenTelemetry)

### 2.3 Capas
1. **Experiencia digital (B2C/B2B):** web pública, área privada, panel profesional.
2. **Servicios de negocio:** AVM, scoring inversión, motor legal documental, agenda, negociación.
3. **Datos y gobierno:** PostgreSQL normalizado + data mart analítico + catálogo de eventos.
4. **IA y automatización:** agentes especializados + workflows n8n/Make + validaciones humanas.

---

## 3) Estructura funcional principal

## 3.1 Home de alta conversión
**Bloques obligatorios:**
- Hero con UVP por segmento (comprador/vendedor/inversor)
- Buscador predictivo con autocompletado barrio/zona/rentabilidad
- CTA dual “Comprar” / “Vender” + microcopy legal
- Carrusel de activos destacados y oportunidades
- Señales de confianza (reseñas verificadas, operaciones cerradas, SLA)
- Módulos de inversión y venta entre particulares
- Blog SEO + lead magnets
- CTA “Valoración gratuita en 60 segundos”
- Chat IA 24/7 omnicanal

## 3.2 Buscador avanzado profesional
**Filtros soportados:**
- Ubicación + mapa dinámico
- Precio min/max
- Rentabilidad mínima
- Operación (venta/alquiler/inversión/nuda)
- Estado del inmueble
- Certificación energética
- m², habitaciones, tipología
- Inversión vs residencial
- Con reforma/sin reforma
- Oportunidad bancaria
- Cashflow positivo
- TIR estimada
- Barrio
- ROI objetivo

**Vistas:** mapa, lista y comparativa.  
**Funcionalidades:** guardar búsqueda, alertas automáticas, exportación PDF/CSV.

## 3.3 Ficha de inmueble “perfecta”
- Galería optimizada, vídeo, tour virtual y plano
- Propuesta de reforma descargable
- PDF de inversión con hipótesis editables
- Certificación energética visual
- Entorno geográfico + POIs + movilidad
- Análisis automático de barrio
- Simuladores (rentabilidad, hipoteca, fiscalidad)
- Reserva online (Stripe)
- Solicitud de visita + oferta digital
- Comparador con inmuebles similares
- Histórico de precio
- CTA WhatsApp/llamada/compartir
- Dossier instantáneo
- Bloque “¿Es buena inversión?” + scoring IA explicable

## 3.4 Sistema IA integrado
**Agentes especializados:**
- Agente comercial (chat 24/7)
- Agente captación (asistencia a vendedores)
- Agente copy (anuncios, emails, landings)
- Agente pricing (AVM + comparables)
- Agente oportunidades (deal finder)
- Agente reformas (estimación coste-tiempo)
- Agente legal básico (RAG Ley Vivienda y guías)
- Agente QA contractual (detección incoherencias)

**Guardrails IA:** trazabilidad, citas de fuente legal, score de confianza, revisión humana en decisiones críticas.

## 3.5 Área privada
### Compradores
- Favoritos, alertas, agenda de visitas, documentos, estado de operación.

### Vendedores
- Alta de inmueble guiada, métricas, pipeline de leads, calendario, contratos, estado jurídico.

### Inversores
- Dashboard ROI, cashflow mensual, simulador fiscal, histórico de rendimiento.

## 3.6 Panel profesional interno (CRM)
- Lead management + scoring
- Embudo comercial
- Automatización email/WhatsApp
- Sincronización Google Calendar
- Firma digital
- Gestión documental
- Control financiero + honorarios
- KPI dashboard (captación, conversión, tiempo medio cierre, CAC/LTV)

## 3.7 Automatización total
**Conectores:** Make, n8n, Stripe, Google Calendar, WhatsApp, firma digital, portales, catastro, tasación, mapas, scoring hipotecario.  
**Patrón:** Trigger → Enriquecimiento → Decisión (regla/IA) → Acción → Notificación → Log.

## 3.8 Módulo legal España
- Contratos: arras, compraventa, encargo, visitas
- RGPD (consentimiento, finalidad, retención, DSR)
- Burofax y trazabilidad
- Impugnación valor de referencia
- Simulación ITP/AJD
- Pack notaría (checklist + documentos)

## 3.9 Monetización
- Suscripción premium (inversores/agencias)
- Destacados de publicación
- Servicios de reforma
- Servicios jurídicos
- Informes premium
- Escaparates digitales
- Formación (academia futura)

## 3.10 SEO y marketing
- Blog IA asistido con revisión editorial
- Landings programáticas por barrio/tipo/estrategia
- Schema (RealEstateListing, FAQ, Breadcrumb, LocalBusiness)
- Metadata automática + enlazado interno
- Pixel Meta + Google Ads + conversion API
- Panel de atribución multicanal

## 3.11 Diseño premium
- Sistema visual limpio, premium y confiable
- Tokens de marca configurables
- Componentes accesibles (WCAG 2.2)
- Animaciones suaves no intrusivas
- Dark mode
- Responsive total

## 3.12 Seguridad y escalabilidad
- Auth robusta + MFA opcional
- RBAC por rol (admin/agente/vendedor/comprador/inversor/legal)
- Cifrado en tránsito y reposo
- Backups automáticos + DRP
- Auditoría y logs inmutables
- Anti-DDoS, WAF, rate limiting
- Secret management y rotación de claves

---

## 4) Diseño de datos (alto nivel)

### Entidades núcleo
- `users`, `profiles`, `roles`
- `properties`, `property_media`, `property_features`, `property_valuations`
- `leads`, `lead_events`, `pipelines`, `deals`
- `visits`, `offers`, `reservations`, `transactions`
- `investor_models`, `cashflows`, `scenarios`
- `legal_documents`, `signatures`, `consents`
- `automation_runs`, `webhook_events`
- `ai_threads`, `ai_outputs`, `ai_feedback`

### Reglas clave
- Multi-tenant opcional (modo franquicia/SaaS)
- Historización de precios y estados
- Versionado de documentos legales
- Event sourcing ligero para auditoría

---

## 5) Roadmap por fases

### Fase 1 (0-12 semanas) — MVP comercial sólido
- Home conversión + buscador + ficha avanzada
- Área privada básica comprador/vendedor
- CRM interno mínimo viable
- Stripe (reserva + suscripción básica)
- Automatizaciones críticas (lead, visita, seguimiento)
- Base SEO técnica + 20 landings prioritarias

### Fase 2 (3-6 meses) — Escala operativa
- Módulo inversión completo
- Módulo legal España v1
- IA pricing + agente captación
- Integraciones portales/catastro/tasación
- Dashboard ejecutivos y SLA

### Fase 3 (6-12 meses) — Plataforma inteligente
- Multiagente IA orquestado
- Motor de oportunidades avanzado
- Franquicia/SaaS multi-tenant
- Expansión LATAM (localización legal/fiscal)
- Academia/formación + marketplace particulares

---

## 6) Automatizaciones críticas (70% de procesos)

1. **Lead inbound** → scoring IA → asignación agente → secuencia omnicanal.
2. **Alta inmueble** → validación datos/media → borrador anuncio + SEO + publicación multicanal.
3. **Visitas** → agenda automática + recordatorios + post-visita + siguiente acción.
4. **Oferta y negociación** → flujos de aprobación + versionado + firma.
5. **Pre-cierre** → checklist legal/fiscal/documental + alertas de bloqueo.
6. **Postventa** → NPS + referidos + upsell servicios reforma/gestión.

---

## 7) Compliance legal y RGPD (España)

- Base jurídica por tratamiento (consentimiento/contrato/interés legítimo)
- Registro de actividades de tratamiento
- DPA con proveedores críticos
- Mecanismos DSR (acceso, rectificación, supresión, oposición)
- Política de retención por tipología documental
- Anonimización/pseudonimización para analítica e IA
- Consent mode para cookies y marketing tags

---

## 8) Arquitectura IA aplicada (segura y rentable)

- **RAG legal:** corpus normativo versionado + citas + fecha de vigencia
- **AVM híbrido:** modelo estadístico + comparables + ajuste experto
- **Explainability:** mostrar factores de precio/rentabilidad
- **Human-in-the-loop:** validación de outputs sensibles
- **MLOps:** evaluación continua de precisión y drift

---

## 9) KPIs de dirección

- Conversión visita→lead, lead→visita, visita→oferta, oferta→cierre
- Tiempo medio de venta
- CAC por canal
- Margen por operación
- % procesos automatizados
- Satisfacción (NPS/CSAT)
- ROI de inversores activos

---

## 10) Resultado esperado

Una plataforma inmobiliaria premium, automatizada y escalable que unifica captación, venta, inversión, legal y operación en un único sistema, preparada para convertirse en estándar de mercado en España y LATAM.
