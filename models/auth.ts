import { User } from "@supabase/supabase-js";
import { Profile } from "./profile";

export interface EnsureProfileResult {
  user: User;
  profile: Profile;
}

export interface AuthUser extends User {
  // Extensões específicas do projeto se necessário
}

export interface AuthSession {
  user: User;
  profile: Profile;
  accessToken: string;
  refreshToken?: string;
}

// Tipos para resposta de autenticação
export interface AuthResponse {
  data: {
    user: User | null;
    profile: Profile | null;
  };
  error: string | null;
}

// Estados de autenticação
export type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  state: AuthState;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}