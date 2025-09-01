import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🔒</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Política de Privacidade do Tamed Fox
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            Esta Política de Privacidade descreve como o Tamed Fox coleta, usa, armazena e protege as informações de nossos usuários.
          </p>
          <div className="text-xs sm:text-sm text-base-content/60 mt-4">
            Última atualização: 1 de setembro de 2025
          </div>
        </div>

        {/* Content Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-6 sm:p-8 lg:p-12">
            
            {/* Navegação rápida */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl font-bold mb-6 text-base-content">Índice</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <a href="#introducao" className="link link-primary hover:link-hover py-1">Introdução</a>
                <a href="#informacoes-coletamos" className="link link-primary hover:link-hover py-1">1. Informações que Coletamos</a>
                <a href="#como-usamos" className="link link-primary hover:link-hover py-1">2. Como Usamos Suas Informações</a>
                <a href="#compartilhamento" className="link link-primary hover:link-hover py-1">3. Compartilhamento de Informações</a>
                <a href="#seguranca" className="link link-primary hover:link-hover py-1">4. Segurança dos Dados</a>
                <a href="#seus-direitos" className="link link-primary hover:link-hover py-1">5. Seus Direitos de Privacidade</a>
                <a href="#alteracoes-politica" className="link link-primary hover:link-hover py-1">6. Alterações a Esta Política</a>
                <a href="#contato" className="link link-primary hover:link-hover py-1">7. Contato</a>
              </div>
            </div>

            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none space-y-8 sm:space-y-10">
              
              {/* Introdução */}
              <section id="introducao">
                <div className="alert alert-info mb-8 border border-info/20">
                  <div className="text-2xl">🦊</div>
                  <div>
                    <h3 className="font-bold text-info-content">Sobre Esta Política</h3>
                    <div className="text-sm text-info-content/90 leading-relaxed">
                      Descrevemos como o Tamed Fox (&quot;nós&quot;, &quot;nosso&quot;) coleta, usa, armazena e protege as informações de nossos usuários (&quot;você&quot;, &quot;seu&quot;) ao usar nossa plataforma.
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção 1 */}
              <section id="informacoes-coletamos">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                  <span className="text-2xl">📊</span>
                  1. Informações que Coletamos
                </h2>
                <p className="leading-relaxed mb-6 text-base-content/90">
                  Coletamos informações que você nos fornece diretamente ao usar nosso serviço. Isso inclui, mas não se limita a:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="card bg-base-200 border border-base-300 shadow-lg">
                    <div className="card-body p-6">
                      <h4 className="font-bold flex items-center gap-3 text-base-content mb-3">
                        <span className="text-lg">📝</span>
                        Informações de Registro
                      </h4>
                      <p className="text-sm text-base-content/80 leading-relaxed">Seu endereço de e-mail e nome completo.</p>
                    </div>
                  </div>
                  
                  <div className="card bg-base-200 border border-base-300 shadow-lg">
                    <div className="card-body p-6">
                      <h4 className="font-bold flex items-center gap-3 text-base-content mb-3">
                        <span className="text-lg">👤</span>
                        Informações de Perfil
                      </h4>
                      <p className="text-sm text-base-content/80 leading-relaxed">Biografia, links para redes sociais, imagens e informações de contato.</p>
                    </div>
                  </div>
                  
                  <div className="card bg-base-200 border border-base-300 shadow-lg">
                    <div className="card-body p-6">
                      <h4 className="font-bold flex items-center gap-3 text-base-content mb-3">
                        <span className="text-lg">📈</span>
                        Dados de Uso
                      </h4>
                      <p className="text-sm text-base-content/80 leading-relaxed">Como você interage com nossa plataforma, tempo gasto, páginas visitadas.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção 2 */}
              <section id="como-usamos">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎯</span>
                  2. Como Usamos Suas Informações
                </h2>
                <p className="leading-relaxed mb-6 text-base-content/90">
                  Usamos as informações coletadas para as seguintes finalidades:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-6 text-base-content/90">
                  <li>Para fornecer, operar e manter nosso serviço.</li>
                  <li>Para gerenciar sua conta e permitir que você acesse e use a plataforma.</li>
                  <li>Para comunicar com você sobre atualizações, novidades e informações importantes do serviço.</li>
                  <li>Para monitorar e analisar o uso do serviço e melhorar sua funcionalidade.</li>
                  <li>Para fins de segurança e para prevenir atividades fraudulentas.</li>
                </ul>
                
                <div className="stats stats-vertical lg:stats-horizontal shadow-lg my-8 border border-base-300">
                  <div className="stat bg-base-100 p-6">
                    <div className="stat-figure text-primary">
                      <div className="text-3xl">🛠️</div>
                    </div>
                    <div className="stat-title text-base-content/70 font-medium">Operação</div>
                    <div className="stat-value text-primary text-2xl lg:text-3xl">100%</div>
                    <div className="stat-desc text-base-content/60">Manter serviço</div>
                  </div>
                  
                  <div className="stat bg-base-100 p-6">
                    <div className="stat-figure text-secondary">
                      <div className="text-3xl">🔐</div>
                    </div>
                    <div className="stat-title text-base-content/70 font-medium">Segurança</div>
                    <div className="stat-value text-primary text-2xl lg:text-3xl">24/7</div>
                    <div className="stat-desc text-base-content/60">Monitoramento</div>
                  </div>
                  
                  <div className="stat bg-base-100 p-6">
                    <div className="stat-figure text-accent">
                      <div className="text-3xl">📧</div>
                    </div>
                    <div className="stat-title text-base-content/70 font-medium">Comunicação</div>
                    <div className="stat-value text-primary text-2xl lg:text-3xl">Opt-in</div>
                    <div className="stat-desc text-base-content/60">Apenas essencial</div>
                  </div>
                </div>
              </section>

              {/* Seção 3 */}
              <section id="compartilhamento">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                  <span className="text-2xl">🤝</span>
                  3. Compartilhamento de Informações
                </h2>
                <div className="alert alert-success mb-6 border border-success/20">
                  <div className="text-xl">✅</div>
                  <div>
                    <h3 className="font-bold text-success-content">Não Vendemos Seus Dados</h3>
                    <div className="text-sm text-success-content/90">Não vendemos suas informações pessoais.</div>
                  </div>
                </div>
                
                <p className="leading-relaxed mb-6 text-base-content/90">
                  Podemos compartilhar suas informações com terceiros apenas para os fins de operação do serviço, como:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="card bg-base-200 shadow-lg border-l-4 border-l-primary">
                    <div className="card-body p-6">
                      <h4 className="font-bold flex items-center gap-3 text-base-content mb-3">
                        <span className="text-lg">🗄️</span>
                        Supabase
                      </h4>
                      <p className="text-sm text-base-content/80 mb-4 leading-relaxed">Provedor de hospedagem de banco de dados</p>
                      <div className="badge badge-primary badge-md px-3 py-2 text-primary-content font-medium">Banco de Dados</div>
                    </div>
                  </div>
                  
                  <div className="card bg-base-200 shadow-lg border-l-4 border-l-secondary">
                    <div className="card-body p-6">
                      <h4 className="font-bold flex items-center gap-3 text-base-content mb-3">
                        <span className="text-lg">🌐</span>
                        Vercel
                      </h4>
                      <p className="text-sm text-base-content/80 mb-4 leading-relaxed">Provedor de hospedagem de servidores</p>
                      <div className="badge badge-secondary badge-md px-3 py-2 text-secondary-content font-medium">Hosting</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-base-200 p-6 rounded-lg border border-base-300">
                  <p className="text-sm text-base-content/80 leading-relaxed">
                    <strong className="text-base-content">Obrigação dos terceiros:</strong> Esses terceiros estão obrigados a usar suas informações apenas para os fins para os quais foram contratados.
                  </p>
                </div>
              </section>

              {/* Seção 4 */}
              <section id="seguranca">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔒</span>
                  4. Segurança dos Dados
                </h2>
                <p className="leading-relaxed mb-6 text-base-content/90">
                  Empregamos medidas de segurança técnicas e administrativas para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou divulgação.
                </p>
                
                <div className="alert alert-warning border border-warning/20 mb-6">
                  <div className="text-xl">⚠️</div>
                  <div>
                    <h3 className="font-bold text-warning-content">Importante</h3>
                    <div className="text-sm text-warning-content/90">No entanto, nenhum método de transmissão pela internet é 100% seguro.</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="badge badge-outline badge-lg gap-2 px-4 py-3 border-2 border-base-content/20 text-base-content hover:bg-base-200">
                    <span className="text-base">🔐</span>
                    <span className="font-medium">Criptografia</span>
                  </div>
                  <div className="badge badge-outline badge-lg gap-2 px-4 py-3 border-2 border-base-content/20 text-base-content hover:bg-base-200">
                    <span className="text-base">🛡️</span>
                    <span className="font-medium">Firewall</span>
                  </div>
                  <div className="badge badge-outline badge-lg gap-2 px-4 py-3 border-2 border-base-content/20 text-base-content hover:bg-base-200">
                    <span className="text-base">🔍</span>
                    <span className="font-medium">Monitoramento</span>
                  </div>
                  <div className="badge badge-outline badge-lg gap-2 px-4 py-3 border-2 border-base-content/20 text-base-content hover:bg-base-200">
                    <span className="text-base">🔑</span>
                    <span className="font-medium">Acesso Restrito</span>
                  </div>
                </div>
              </section>

              {/* Seção 5 */}
              <section id="seus-direitos">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                  <span className="text-2xl">⚖️</span>
                  5. Seus Direitos de Privacidade
                </h2>
                <p className="leading-relaxed mb-8 text-base-content/90">
                  Você tem o direito de:
                </p>
                
                {/* Cards em vez de timeline para melhor responsividade */}
                <div className="grid grid-cols-1 gap-6 my-8">
                  <div className="card bg-base-200 border border-base-300 shadow-lg">
                    <div className="card-body p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                            <span className="text-xl">📖</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-base-content text-lg mb-2">Acessar Seus Dados</h4>
                          <p className="text-base-content/80 leading-relaxed">
                            Receber uma cópia completa dos seus dados pessoais que mantemos em nossos sistemas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-200 border border-base-300 shadow-lg">
                    <div className="card-body p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center">
                            <span className="text-xl">✏️</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-base-content text-lg mb-2">Corrigir Informações</h4>
                          <p className="text-base-content/80 leading-relaxed">
                            Solicitar a correção de qualquer informação imprecisa ou incompleta sobre você.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-200 border border-base-300 shadow-lg">
                    <div className="card-body p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-error/10 border-2 border-error flex items-center justify-center">
                            <span className="text-xl">🗑️</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-base-content text-lg mb-2">Excluir Dados</h4>
                          <p className="text-base-content/80 leading-relaxed">
                            Solicitar a exclusão permanente dos seus dados pessoais de nossos sistemas.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-info mt-8 border border-info/30 bg-info/5">
                  <div className="text-2xl">💬</div>
                  <div>
                    <h3 className="font-bold text-base-content text-lg">Como Exercer Seus Direitos</h3>
                    <div className="text-sm text-base-content/80 leading-relaxed mt-1">
                      Para exercer qualquer um desses direitos, entre em contato conosco através do email de suporte. 
                      Responderemos sua solicitação em até 30 dias úteis.
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção 6 */}
              <section id="alteracoes-politica">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                  <span className="text-2xl">🔄</span>
                  6. Alterações a Esta Política
                </h2>
                <p className="leading-relaxed text-base-content/90 mb-6">
                  Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. Notificaremos você sobre quaisquer alterações publicando a nova política em nossa plataforma.
                </p>
                
                <div className="mockup-browser bg-base-300 border border-base-content/20 mt-8">
                  <div className="mockup-browser-toolbar">
                    <div className="input bg-base-100 text-base-content">https://tamedfox.abraaomoreira.dev/privacy</div>
                  </div>
                  <div className="flex justify-center px-6 py-10 bg-base-100">
                    <div className="text-center">
                      <div className="text-3xl mb-3">🔔</div>
                      <div className="font-bold text-base-content mb-2">Notificação de Alterações</div>
                      <div className="text-sm text-base-content/70">Alterações serão publicadas nesta página</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção 7 */}
              <section id="contato">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                  <span className="text-2xl">📞</span>
                  7. Contato
                </h2>
                <p className="leading-relaxed text-base-content/90 mb-6">
                  Se você tiver perguntas sobre esta Política de Privacidade, entre em contato conosco em:
                </p>
                <div className="alert alert-success border border-success/20">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-bold text-success-content">Entre em contato</h3>
                    <div className="text-sm text-success-content/90">
                      Email: <a href="mailto:hello@abraaomoreira.dev" className="link link-primary font-medium hover:link-hover">hello@abraaomoreira.dev</a>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* Footer da página */}
            <div className="divider my-10"></div>
            
            <div className="text-center space-y-6">
              <div className="alert alert-info border border-info/20">
                <div className="text-2xl">🛡️</div>
                <div>
                  <h3 className="font-bold text-info-content">Sua Privacidade é Importante</h3>
                  <div className="text-sm text-info-content/90 leading-relaxed">
                    Estamos comprometidos em proteger suas informações pessoais e ser transparentes sobre como as utilizamos.
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/terms" className="btn btn-outline btn-md px-6">
                  📋 Termos de Uso
                </Link>
                <Link href="/auth/login" className="btn btn-primary btn-md px-6">
                  🦊 Voltar ao Login
                </Link>
                <Link href="/" className="btn btn-ghost btn-md px-6">
                  🏠 Página Inicial
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-10 text-xs sm:text-sm text-base-content/60">
          <p>© 2024 Tamed Fox. Todos os direitos reservados.</p>
          <p className="mt-2">
            Política atualizada em {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}