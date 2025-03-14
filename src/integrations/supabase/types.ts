export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          country: string
          created_at: string
          description: string
          featured: boolean
          id: string
          image_url: string | null
          name: string
          properties_count: number
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          description: string
          featured?: boolean
          id?: string
          image_url?: string | null
          name: string
          properties_count?: number
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          name?: string
          properties_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string
          display_order: number
          id: string
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category: string
          created_at?: string
          display_order: number
          id?: string
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          display_order?: number
          id?: string
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string
          due_date: string
          id: string
          invoice_number: string
          is_paid: boolean
          issued_date: string
          order_id: string | null
          paid_amount: number
          pdf_url: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          due_date: string
          id?: string
          invoice_number: string
          is_paid?: boolean
          issued_date: string
          order_id?: string | null
          paid_amount?: number
          pdf_url?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          due_date?: string
          id?: string
          invoice_number?: string
          is_paid?: boolean
          issued_date?: string
          order_id?: string | null
          paid_amount?: number
          pdf_url?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          direction: string
          is_active: boolean
          name: string
          native_name: string
        }
        Insert: {
          code: string
          direction?: string
          is_active?: boolean
          name: string
          native_name: string
        }
        Update: {
          code?: string
          direction?: string
          is_active?: boolean
          name?: string
          native_name?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: string
          payment_method_id: string | null
          price_per_share: number
          property_id: string | null
          shares: number
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          transaction_reference: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          payment_method_id?: string | null
          price_per_share: number
          property_id?: string | null
          shares: number
          status?: Database["public"]["Enums"]["order_status"]
          total_amount: number
          transaction_reference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          payment_method_id?: string | null
          price_per_share?: number
          property_id?: string | null
          shares?: number
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          transaction_reference?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          available_shares: number
          city: string
          country: string
          created_at: string
          description: string
          expected_return_percentage: number | null
          featured: boolean
          id: string
          latitude: number | null
          longitude: number | null
          minimum_investment: number
          price_per_share: number
          state: string
          status: Database["public"]["Enums"]["property_status"]
          title: string
          total_price: number
          total_shares: number
          updated_at: string
          zip_code: string
        }
        Insert: {
          address: string
          available_shares: number
          city: string
          country: string
          created_at?: string
          description: string
          expected_return_percentage?: number | null
          featured?: boolean
          id?: string
          latitude?: number | null
          longitude?: number | null
          minimum_investment: number
          price_per_share: number
          state: string
          status?: Database["public"]["Enums"]["property_status"]
          title: string
          total_price: number
          total_shares: number
          updated_at?: string
          zip_code: string
        }
        Update: {
          address?: string
          available_shares?: number
          city?: string
          country?: string
          created_at?: string
          description?: string
          expected_return_percentage?: number | null
          featured?: boolean
          id?: string
          latitude?: number | null
          longitude?: number | null
          minimum_investment?: number
          price_per_share?: number
          state?: string
          status?: Database["public"]["Enums"]["property_status"]
          title?: string
          total_price?: number
          total_shares?: number
          updated_at?: string
          zip_code?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image_url: string
          is_primary: boolean
          property_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order: number
          id?: string
          image_url: string
          is_primary?: boolean
          property_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          is_primary?: boolean
          property_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_tag_relations: {
        Row: {
          property_id: string
          tag_id: string
        }
        Insert: {
          property_id: string
          tag_id: string
        }
        Update: {
          property_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_tag_relations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_tag_relations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "property_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      property_tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      property_translations: {
        Row: {
          created_at: string
          description_en: string
          description_es: string
          id: string
          page: string
          property_id: string | null
          title_en: string
          title_es: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string
          description_es?: string
          id?: string
          page?: string
          property_id?: string | null
          title_en?: string
          title_es?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_es?: string
          id?: string
          page?: string
          property_id?: string | null
          title_en?: string
          title_es?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "new_property_translations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          link_url: string
          publish_date: string
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          link_url: string
          publish_date?: string
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          link_url?: string
          publish_date?: string
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string
          created_at: string
          description: string
          duration: string
          id: string
          image_url: string
          is_featured: boolean
          location: string
          price: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          duration: string
          id?: string
          image_url: string
          is_featured?: boolean
          location: string
          price: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          duration?: string
          id?: string
          image_url?: string
          is_featured?: boolean
          location?: string
          price?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          created_at: string
          display_order: number
          id: string
          image_url: string
          linkedin_url: string | null
          name: string
          position: string
          updated_at: string
        }
        Insert: {
          bio: string
          created_at?: string
          display_order: number
          id?: string
          image_url: string
          linkedin_url?: string | null
          name: string
          position: string
          updated_at?: string
        }
        Update: {
          bio?: string
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          linkedin_url?: string | null
          name?: string
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      translations: {
        Row: {
          created_at: string
          en: string
          es: string
          id: string
          key: string
          page: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          en?: string
          es?: string
          id?: string
          key: string
          page?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          en?: string
          es?: string
          id?: string
          key?: string
          page?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          preferred_language: string
          profile_image_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          preferred_language?: string
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          preferred_language?: string
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_auth_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_properties: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: string
          available_shares: number
          city: string
          country: string
          created_at: string
          description: string
          expected_return_percentage: number | null
          featured: boolean
          id: string
          latitude: number | null
          longitude: number | null
          minimum_investment: number
          price_per_share: number
          state: string
          status: Database["public"]["Enums"]["property_status"]
          title: string
          total_price: number
          total_shares: number
          updated_at: string
          zip_code: string
        }[]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      order_status:
        | "pending"
        | "processing"
        | "completed"
        | "cancelled"
        | "refunded"
      property_status: "pending" | "active" | "sold_out" | "closed"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
