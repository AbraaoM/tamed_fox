import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Buscar dados do usuário
  const { data: displayInfo } = await supabase
    .from("display_info")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header do Dashboard */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content rounded-box">
        <div className="hero-content text-center py-8 sm:py-12">
          <div className="max-w-md sm:max-w-lg">
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2 sm:gap-3">
              🦊 <span>Tamed Fox</span>
            </h1>
            <p className="text-sm sm:text-base py-4 sm:py-6 opacity-90">
              Bem-vindo ao seu painel de controle
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Display Info Twig */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="text-2xl sm:text-3xl">🌿</div>
              <h2 className="card-title text-base sm:text-lg">Display Info</h2>
            </div>
            <p className="text-xs sm:text-sm text-base-content/70 mb-3 sm:mb-4 leading-relaxed">
              Configure Header e Hero para seus Bushes
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className={`badge badge-sm px-2 py-1 ${displayInfo?.display_name ? 'badge-success' : 'badge-ghost'}`}>
                Header
              </div>
              <div className={`badge badge-sm px-2 py-1 ${displayInfo?.headline ? 'badge-success' : 'badge-ghost'}`}>
                Hero
              </div>
            </div>
            <div className="card-actions justify-end">
              <a href="/protected/display-info" className="btn btn-primary btn-sm sm:btn-md">
                Configurar
              </a>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="text-2xl sm:text-3xl">👤</div>
              <h2 className="card-title text-base sm:text-lg">Perfil</h2>
            </div>
            <p className="text-xs sm:text-sm text-base-content/70 mb-3 sm:mb-4 leading-relaxed">
              Suas informações pessoais
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className={`badge badge-sm px-2 py-1 ${profile?.full_name ? 'badge-success' : 'badge-ghost'}`}>
                Nome
              </div>
              <div className={`badge badge-sm px-2 py-1 ${user?.email ? 'badge-success' : 'badge-ghost'}`}>
                Email
              </div>
            </div>
            <div className="card-actions justify-end">
              <a href="/protected/profile" className="btn btn-secondary btn-sm sm:btn-md">
                Editar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-base sm:text-lg mb-4 sm:mb-6">Status dos Componentes</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-base-200 rounded-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-3 h-3 rounded-full ${displayInfo?.display_name ? 'bg-success' : 'bg-error'}`}></div>
                <span className="text-sm sm:text-base font-medium">Header</span>
              </div>
              <div className={`badge badge-sm px-2.5 py-1 ${displayInfo?.display_name ? 'badge-success' : 'badge-error'}`}>
                {displayInfo?.display_name ? 'Configurado' : 'Pendente'}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-base-200 rounded-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-3 h-3 rounded-full ${displayInfo?.headline ? 'bg-success' : 'bg-error'}`}></div>
                <span className="text-sm sm:text-base font-medium">Hero</span>
              </div>
              <div className={`badge badge-sm px-2.5 py-1 ${displayInfo?.headline ? 'badge-success' : 'badge-error'}`}>
                {displayInfo?.headline ? 'Configurado' : 'Pendente'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      {(!displayInfo?.display_name || !displayInfo?.headline) && (
        <div className="alert alert-info">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">
            <div className="text-2xl sm:text-3xl flex-shrink-0">🚀</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm sm:text-base mb-1">Próximos Passos</h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                Configure os componentes pendentes para começar
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
              {!displayInfo?.display_name && (
                <a href="/protected/display-info" className="btn btn-primary btn-sm whitespace-nowrap">
                  Configurar Header
                </a>
              )}
              {!displayInfo?.headline && (
                <a href="/protected/display-info" className="btn btn-secondary btn-sm whitespace-nowrap">
                  Configurar Hero
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
