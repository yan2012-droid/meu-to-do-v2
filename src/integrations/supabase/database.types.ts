export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          full_name: string
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name: string
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          website?: string | null
        }
      }
      tarefas: {
        Row: {
          id: string
          user_id: string
          titulo: string
          status: string
          created_at: string
          excluida_em: string | null
        }
        Insert: {
          id: string
          user_id: string
          titulo: string
          status: string
          created_at?: string
          excluida_em?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          titulo?: string
          status?: string
          created_at?: string
          excluida_em?: string | null
        }
      }
    }
  }
}