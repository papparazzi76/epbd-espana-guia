export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      companies: {
        Row: {
          activo: boolean | null
          created_at: string
          email_contacto: string
          id: string
          nombre_empresa: string
          plan_suscripcion: string | null
          provincias_interes: string[]
          telefono: string | null
          tipo_servicios: string[]
          updated_at: string
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          email_contacto: string
          id?: string
          nombre_empresa: string
          plan_suscripcion?: string | null
          provincias_interes: string[]
          telefono?: string | null
          tipo_servicios: string[]
          updated_at?: string
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          email_contacto?: string
          id?: string
          nombre_empresa?: string
          plan_suscripcion?: string | null
          provincias_interes?: string[]
          telefono?: string | null
          tipo_servicios?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      diagnostics: {
        Row: {
          bathrooms: string | null
          battery: string | null
          budget: string | null
          city: string | null
          climatezone: string | null
          constructionyear: string | null
          coolingsystem: string | null
          created_at: string | null
          electricconsumption: string | null
          email: string | null
          energycertificate: string | null
          environment: string | null
          facadetype: string | null
          floors: string | null
          gasoilconsumption: string | null
          glasstype: string | null
          heatingsystem: string | null
          heatpump: string | null
          hotwatersystem: string | null
          id: string
          insulationstate: string | null
          interestfinancing: string | null
          interestsubsidies: string | null
          maininterest: string | null
          monthlybill: string | null
          name: string | null
          occupancy: string | null
          phone: string | null
          plannedworks: string[] | null
          propertytype: string | null
          province: string | null
          roofinsulation: string | null
          rooms: string | null
          solarpanels: string | null
          solarpower: string | null
          solarthermal: string | null
          source: string | null
          submitted_at: string | null
          surfacearea: string | null
          thermalbridge: string | null
          ventilationsystem: string | null
          windowtype: string | null
        }
        Insert: {
          bathrooms?: string | null
          battery?: string | null
          budget?: string | null
          city?: string | null
          climatezone?: string | null
          constructionyear?: string | null
          coolingsystem?: string | null
          created_at?: string | null
          electricconsumption?: string | null
          email?: string | null
          energycertificate?: string | null
          environment?: string | null
          facadetype?: string | null
          floors?: string | null
          gasoilconsumption?: string | null
          glasstype?: string | null
          heatingsystem?: string | null
          heatpump?: string | null
          hotwatersystem?: string | null
          id?: string
          insulationstate?: string | null
          interestfinancing?: string | null
          interestsubsidies?: string | null
          maininterest?: string | null
          monthlybill?: string | null
          name?: string | null
          occupancy?: string | null
          phone?: string | null
          plannedworks?: string[] | null
          propertytype?: string | null
          province?: string | null
          roofinsulation?: string | null
          rooms?: string | null
          solarpanels?: string | null
          solarpower?: string | null
          solarthermal?: string | null
          source?: string | null
          submitted_at?: string | null
          surfacearea?: string | null
          thermalbridge?: string | null
          ventilationsystem?: string | null
          windowtype?: string | null
        }
        Update: {
          bathrooms?: string | null
          battery?: string | null
          budget?: string | null
          city?: string | null
          climatezone?: string | null
          constructionyear?: string | null
          coolingsystem?: string | null
          created_at?: string | null
          electricconsumption?: string | null
          email?: string | null
          energycertificate?: string | null
          environment?: string | null
          facadetype?: string | null
          floors?: string | null
          gasoilconsumption?: string | null
          glasstype?: string | null
          heatingsystem?: string | null
          heatpump?: string | null
          hotwatersystem?: string | null
          id?: string
          insulationstate?: string | null
          interestfinancing?: string | null
          interestsubsidies?: string | null
          maininterest?: string | null
          monthlybill?: string | null
          name?: string | null
          occupancy?: string | null
          phone?: string | null
          plannedworks?: string[] | null
          propertytype?: string | null
          province?: string | null
          roofinsulation?: string | null
          rooms?: string | null
          solarpanels?: string | null
          solarpower?: string | null
          solarthermal?: string | null
          source?: string | null
          submitted_at?: string | null
          surfacearea?: string | null
          thermalbridge?: string | null
          ventilationsystem?: string | null
          windowtype?: string | null
        }
        Relationships: []
      }
      lead_assignments: {
        Row: {
          asignado_fecha: string
          company_id: string
          estado: string | null
          id: string
          lead_id: string
          notas: string | null
        }
        Insert: {
          asignado_fecha?: string
          company_id: string
          estado?: string | null
          id?: string
          lead_id: string
          notas?: string | null
        }
        Update: {
          asignado_fecha?: string
          company_id?: string
          estado?: string | null
          id?: string
          lead_id?: string
          notas?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_assignments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_assignments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          año_construccion: string
          certificado_energetico: string
          clase_energetica_estimada: string | null
          created_at: string
          email: string
          estado: string | null
          id: string
          interes_principal: string
          lead_score: number | null
          localidad: string
          nombre_completo: string
          provincia: string
          telefono: string | null
          tipo_vivienda: string
          updated_at: string
          urgencia_nivel: number | null
        }
        Insert: {
          año_construccion: string
          certificado_energetico: string
          clase_energetica_estimada?: string | null
          created_at?: string
          email: string
          estado?: string | null
          id?: string
          interes_principal: string
          lead_score?: number | null
          localidad: string
          nombre_completo: string
          provincia: string
          telefono?: string | null
          tipo_vivienda: string
          updated_at?: string
          urgencia_nivel?: number | null
        }
        Update: {
          año_construccion?: string
          certificado_energetico?: string
          clase_energetica_estimada?: string | null
          created_at?: string
          email?: string
          estado?: string | null
          id?: string
          interes_principal?: string
          lead_score?: number | null
          localidad?: string
          nombre_completo?: string
          provincia?: string
          telefono?: string | null
          tipo_vivienda?: string
          updated_at?: string
          urgencia_nivel?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          phone: string | null
          role: string
          updated_at: string
          user_id: string
          vat_id: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
          user_id: string
          vat_id?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
          user_id?: string
          vat_id?: string | null
        }
        Relationships: []
      }
      subscription_alerts: {
        Row: {
          activo: boolean | null
          created_at: string
          email: string
          id: string
          provincia: string
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          email: string
          id?: string
          provincia: string
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          email?: string
          id?: string
          provincia?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_lead_score: {
        Args: {
          año_construccion: string
          certificado_energetico: string
          interes_principal: string
          tipo_vivienda: string
        }
        Returns: number
      }
      get_diagnostic_summary_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          recent_submissions: number
          top_provinces: string[]
          total_submissions: number
        }[]
      }
      get_lead_assignment_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          active_companies: number
          recent_assignments: number
          total_assignments: number
        }[]
      }
      get_matching_companies_for_lead: {
        Args: { lead_provincia: string }
        Returns: {
          company_email: string
          company_id: string
        }[]
      }
      get_subscription_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          active_subscriptions: number
          provinces_with_subscriptions: string[]
          total_subscriptions: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
