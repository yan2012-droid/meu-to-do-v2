export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}