import { createClient } from '@/lib/supabase/server';
import { HeaderConfigurator } from '@/components/header-configurator';
import { HeroConfigurator } from '@/components/hero-configurator';
import { redirect } from 'next/navigation';
import { ensureUserProfile } from '@/lib/ensure-profile';

export default async function DisplayInfoPage() {
  const supabase = await createClient();
  
  const { profile } = await ensureUserProfile()

  if (!profile) {
    redirect('/auth/login');
  }

  // Buscar dados do display_info - MANTENDO EXATAMENTE COMO ESTAVA
  const { data: displayInfo } = await supabase
    .from('display_info')
    .select('*')
    .eq('profile_id', profile.id)
    .single();

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
        
        {/* Header Hero */}
        <div className="hero bg-gradient-to-r from-primary to-accent text-primary-content rounded-box shadow-xl">
          <div className="hero-content text-center py-8 sm:py-12">
            <div className="max-w-2xl">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🌿</div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Display Info
              </h1>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed">
                Configure Header e Hero para suas páginas públicas
              </p>
              
              {/* Status badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                <div className={`badge badge-lg gap-2 px-3 py-2 text-xs sm:text-sm ${
                  displayInfo?.display_name ? 'badge-success' : 'badge-warning'
                }`}>
                  📋 Header {displayInfo?.display_name ? 'Configurado' : 'Pendente'}
                </div>
                <div className={`badge badge-lg gap-2 px-3 py-2 text-xs sm:text-sm ${
                  displayInfo?.headline ? 'badge-success' : 'badge-warning'
                }`}>
                  🎯 Hero {displayInfo?.headline ? 'Configurado' : 'Pendente'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-0">
            
            {/* Tabs Navigation */}
            <div className="tabs tabs-lifted tabs-lg w-full bg-base-200 rounded-t-xl overflow-x-auto">
              <input 
                type="radio" 
                name="display_tabs" 
                role="tab"
                className="tab tab-lifted flex-shrink-0 min-w-fit px-4 sm:px-6 lg:px-8 text-sm sm:text-base" 
                aria-label="📋 Header Config" 
                defaultChecked 
              />
              <div className="tab-content bg-base-100 border-base-300 rounded-box p-4 sm:p-6 lg:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="text-2xl sm:text-3xl">📋</div>
                    <div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Configuração do Header</h2>
                      <p className="text-xs sm:text-sm text-base-content/70">
                        Configure o cabeçalho que aparecerá em suas páginas
                      </p>
                    </div>
                  </div>
                  
                  <HeaderConfigurator 
                    profile_id={profile.id}
                    display_name={displayInfo?.display_name || ''}
                    logo_url={displayInfo?.logo_url || ''}
                  />
                </div>
              </div>

              <input 
                type="radio" 
                name="display_tabs" 
                role="tab"
                className="tab tab-lifted flex-shrink-0 min-w-fit px-4 sm:px-6 lg:px-8 text-sm sm:text-base" 
                aria-label="🎯 Hero Config" 
              />
              <div className="tab-content bg-base-100 border-base-300 rounded-box p-4 sm:p-6 lg:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="text-2xl sm:text-3xl">🎯</div>
                    <div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Configuração do Hero</h2>
                      <p className="text-xs sm:text-sm text-base-content/70">
                        Configure a seção principal de destaque das suas páginas
                      </p>
                    </div>
                  </div>
                  
                  <HeroConfigurator 
                    profile_id={profile.id}
                    headline={displayInfo?.headline || ''}
                    subheadline={displayInfo?.subheadline || ''}
                    call_to_action={displayInfo?.call_to_action || ''}
                    call_to_action_url={displayInfo?.call_to_action_url || ''}
                    hero_image_url={displayInfo?.hero_image_url || ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Progress Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Progress Overview */}
          <div className="card bg-base-100 shadow-xl lg:col-span-2">
            <div className="card-body p-4 sm:p-6">
              <h3 className="card-title text-base sm:text-lg mb-4 flex items-center gap-2">
                📊 <span>Progresso da Configuração</span>
              </h3>
              
              <div className="space-y-4">
                {/* Header Progress */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      displayInfo?.display_name ? 'bg-success' : 'bg-warning'
                    }`}></div>
                    <span className="text-sm sm:text-base font-medium">Header Config</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <progress 
                      className={`progress w-24 sm:w-32 h-2 sm:h-3 ${
                        displayInfo?.display_name && displayInfo?.logo_url ? 'progress-success' : 
                        displayInfo?.display_name ? 'progress-info' : 'progress-warning'
                      }`}
                      value={
                        displayInfo?.display_name && displayInfo?.logo_url ? 100 : 
                        displayInfo?.display_name ? 50 : 0
                      } 
                      max="100"
                    ></progress>
                    <span className="text-xs sm:text-sm font-bold min-w-fit">
                      {displayInfo?.display_name && displayInfo?.logo_url ? '100%' : 
                       displayInfo?.display_name ? '50%' : '0%'}
                    </span>
                  </div>
                </div>

                {/* Hero Progress */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      displayInfo?.headline ? 'bg-success' : 'bg-warning'
                    }`}></div>
                    <span className="text-sm sm:text-base font-medium">Hero Config</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <progress 
                      className={`progress w-24 sm:w-32 h-2 sm:h-3 ${
                        (() => {
                          const fields = [
                            displayInfo?.headline, 
                            displayInfo?.subheadline, 
                            displayInfo?.call_to_action, 
                            displayInfo?.call_to_action_url, 
                            displayInfo?.hero_image_url
                          ];
                          const completed = fields.filter(Boolean).length;
                          return completed >= 4 ? 'progress-success' : 
                                 completed >= 2 ? 'progress-info' : 'progress-warning';
                        })()
                      }`}
                      value={(() => {
                        const fields = [
                          displayInfo?.headline, 
                          displayInfo?.subheadline, 
                          displayInfo?.call_to_action, 
                          displayInfo?.call_to_action_url, 
                          displayInfo?.hero_image_url
                        ];
                        const completed = fields.filter(Boolean).length;
                        return Math.round((completed / fields.length) * 100);
                      })()} 
                      max="100"
                    ></progress>
                    <span className="text-xs sm:text-sm font-bold min-w-fit">
                      {(() => {
                        const fields = [
                          displayInfo?.headline, 
                          displayInfo?.subheadline, 
                          displayInfo?.call_to_action, 
                          displayInfo?.call_to_action_url, 
                          displayInfo?.hero_image_url
                        ];
                        const completed = fields.filter(Boolean).length;
                        return Math.round((completed / fields.length) * 100);
                      })()}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <h3 className="card-title text-base sm:text-lg mb-4 flex items-center gap-2">
                ⚡ <span>Status</span>
              </h3>
              
              <div className="stats stats-vertical w-full">
                <div className="stat place-items-center py-3">
                  <div className="stat-figure text-primary">
                    <div className="text-lg sm:text-xl">📋</div>
                  </div>
                  <div className="stat-title text-xs">Header</div>
                  <div className={`stat-value text-lg sm:text-xl ${
                    displayInfo?.display_name ? 'text-success' : 'text-warning'
                  }`}>
                    {displayInfo?.display_name ? 'OK' : 'Pendente'}
                  </div>
                  <div className="stat-desc text-xs">
                    {displayInfo?.display_name ? 'Configurado' : 'Não configurado'}
                  </div>
                </div>
                
                <div className="stat place-items-center py-3">
                  <div className="stat-figure text-secondary">
                    <div className="text-lg sm:text-xl">🎯</div>
                  </div>
                  <div className="stat-title text-xs">Hero</div>
                  <div className={`stat-value text-lg sm:text-xl ${
                    displayInfo?.headline ? 'text-success' : 'text-warning'
                  }`}>
                    {displayInfo?.headline ? 'OK' : 'Pendente'}
                  </div>
                  <div className="stat-desc text-xs">
                    {displayInfo?.headline ? 'Configurado' : 'Não configurado'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="alert alert-info shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 w-full">
            <div className="text-2xl flex-shrink-0">💡</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base mb-2">Sobre as Configurações</h3>
              <div className="text-xs sm:text-sm space-y-1 leading-relaxed">
                <p>
                  • <strong>Header:</strong> Controla o cabeçalho com logo e nome que aparece no topo das páginas
                </p>
                <p>
                  • <strong>Hero:</strong> Define a seção principal com título, subtítulo e call-to-action
                </p>
                <p>
                  • As alterações são <strong>automaticamente sincronizadas</strong> em todas as páginas públicas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
