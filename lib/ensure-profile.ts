import { createClient } from "@/lib/supabase/server";
import { Profile, CreateProfileData } from "@/models/profile";
import { EnsureProfileResult } from "@/models/auth";

export async function ensureUserProfile(): Promise<EnsureProfileResult> {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error("Usuário não autenticado");
  }

  // Verificar se o profile existe
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (profileError && profileError.code === 'PGRST116') {
    // Profile não existe, criar um
    const createData: CreateProfileData = {
      user_id: user.id,
      full_name: user.user_metadata?.full_name || '',
      internal_email: user.email || '',
    };

    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([createData])
      .select()
      .single();

    if (createError) {
      console.error("Erro ao criar profile:", createError);
      throw createError;
    }
    
    return { user, profile: newProfile as Profile };
  }

  if (profileError) {
    throw profileError;
  }

  return { user, profile: profile as Profile };
}