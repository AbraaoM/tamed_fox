import { createClient } from '@/lib/supabase/server';
import { ProfileManager } from '@/components/profile-manager';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  // Buscar dados do perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header da página - simplificado */}
      <div className="hero bg-gradient-to-r from-secondary to-accent text-secondary-content rounded-box">
        <div className="hero-content text-center py-6 sm:py-8">
          <div className="max-w-md sm:max-w-lg">
            <div className="avatar mb-4">
              <div className="w-16 sm:w-20 rounded-full bg-base-100 text-secondary flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || '👤'}
                </span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
              👤 <span>Perfil Fox</span>
            </h1>
            <p className="text-sm sm:text-base py-3 opacity-90">
              Gerencie suas informações pessoais
            </p>
          </div>
        </div>
      </div>

      {/* ProfileManager */}
      <ProfileManager 
        userId={user.id}
        initialData={profile}
      />
    </div>
  );
}