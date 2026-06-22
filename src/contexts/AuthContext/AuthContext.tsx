"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthContextType, AuthProviderProps } from "./types";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/auth-js";

/** Map a Supabase user to the app's User type, providing defaults for optional fields. */
const mapSupabaseUser = (user: SupabaseUser | null): User | null => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    created_at: user.created_at ?? "",
    updated_at: user.updated_at ?? "",
  };
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        } else {
          setUser(mapSupabaseUser(session?.user ?? null));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(mapSupabaseUser(session?.user ?? null));
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};