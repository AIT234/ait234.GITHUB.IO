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
      projects: {
        Row: {
          budget: string
          budget_ngn: number
          citizen_image: string | null
          completion_date: string
          contractor: string
          created_at: string | null
          description: string
          id: string
          official_image: string
          sector: string
          start_date: string
          state: string
          status: string
          title: string
          trust_rating: number | null
          updated_at: string | null
          zone: string
        }
        Insert: {
          budget: string
          budget_ngn: number
          citizen_image?: string | null
          completion_date: string
          contractor: string
          created_at?: string | null
          description: string
          id?: string
          official_image: string
          sector: string
          start_date: string
          state?: string
          status?: string
          title: string
          trust_rating?: number | null
          updated_at?: string | null
          zone: string
        }
        Update: {
          budget?: string
          budget_ngn?: number
          citizen_image?: string | null
          completion_date?: string
          contractor?: string
          created_at?: string | null
          description?: string
          id?: string
          official_image?: string
          sector?: string
          start_date?: string
          state?: string
          status?: string
          title?: string
          trust_rating?: number | null
          updated_at?: string | null
          zone?: string
        }
        Relationships: []
      }
      assessments: {
        Row: {
          comment: string
          created_at: string | null
          id: string
          image_url: string | null
          impact: number
          local_status: string
          project_id: string
          quality: number
          speed: number
          transparency: number
          user_id: string
          user_name: string
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          impact?: number
          local_status?: string
          project_id: string
          quality?: number
          speed?: number
          transparency?: number
          user_id: string
          user_name: string
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          impact?: number
          local_status?: string
          project_id?: string
          quality?: number
          speed?: number
          transparency?: number
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      citizen_reports: {
        Row: {
          ai_analysis_json: Json | null
          ai_score: number | null
          citizen_name: string
          citizen_nin: string
          created_at: string
          description: string
          id: string
          image_url: string
          location_gps: string
          project_id: string
          status: string
          title: string
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          ai_analysis_json?: Json | null
          ai_score?: number | null
          citizen_name?: string
          citizen_nin?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          location_gps?: string
          project_id: string
          status?: string
          title?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          ai_analysis_json?: Json | null
          ai_score?: number | null
          citizen_name?: string
          citizen_nin?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          location_gps?: string
          project_id?: string
          status?: string
          title?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citizen_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          nin: string
          nin_verified: boolean | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          nin: string
          nin_verified?: boolean | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          nin?: string
          nin_verified?: boolean | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      project_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          project_id: string
          user_id: string | null
          user_name: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          project_id: string
          user_id?: string | null
          user_name?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}