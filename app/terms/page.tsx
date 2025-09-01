import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">📋</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Termos de Uso do Tamed Fox
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-base-content/70 max-w-2xl mx-auto">
            Estes termos e condições regem o uso da nossa plataforma e serviço, que permite a você criar e gerenciar seu perfil online.
          </p>
          <div className="text-xs sm:text-sm text-base-content/50 mt-4">
            Última atualização: 1 de setembro de 2025
          </div>
        </div>

        {/* Content Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-6 sm:p-8 lg:p-12">
            
            {/* Navegação rápida */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Índice</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <a href="#introducao" className="link link-primary">Introdução</a>
                <a href="#uso-servico" className="link link-primary">1. Uso do Serviço</a>
                <a href="#sua-conta" className="link link-primary">2. Sua Conta</a>
                <a href="#conteudo-usuario" className="link link-primary">3. Conteúdo do Usuário</a>
                <a href="#direitos-autorais" className="link link-primary">4. Direitos Autorais</a>
                <a href="#limitacao-responsabilidade" className="link link-primary">5. Limitação de Responsabilidade</a>
                <a href="#alteracoes-termos" className="link link-primary">6. Alterações nos Termos</a>
                <a href="#rescisao" className="link link-primary">7. Rescisão</a>
                <a href="#contato" className="link link-primary">8. Contato</a>
              </div>
            </div>

            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none space-y-6 sm:space-y-8">
              
              {/* Introdução */}
              <section id="introducao">
                <div className="alert alert-info mb-6">
                  <div className="text-2xl">🦊</div>
                  <div>
                    <h3 className="font-bold">Bem-vindo ao Tamed Fox</h3>
                    <div className="text-sm">
                      Ao acessar ou usar nosso serviço, você concorda em estar vinculado a estes termos.
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção 1 */}
              <section id="uso-servico">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">🛠️</span>
                  1. Uso do Serviço
                </h2>
                <p className="leading-relaxed mb-4">
                  Você pode usar nossa plataforma para criar e personalizar seu perfil online. Você concorda em:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Não utilizar o serviço para qualquer finalidade ilegal ou não autorizada.</li>
                  <li>Cumprir todas as leis, regras e regulamentos aplicáveis à sua jurisdição.</li>
                  <li>Ser o único responsável por toda a atividade que ocorrer em sua conta.</li>
                </ul>
              </section>

              {/* Seção 2 */}
              <section id="sua-conta">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">👤</span>
                  2. Sua Conta
                </h2>
                <p className="leading-relaxed">
                  Você é responsável por manter a confidencialidade de suas informações de login. Você deve nos notificar imediatamente sobre qualquer uso não autorizado de sua conta ou qualquer outra violação de segurança.
                </p>
                <div className="alert alert-warning mt-4">
                  <div className="text-lg">🔐</div>
                  <div>
                    <h3 className="font-bold">Importante</h3>
                    <div className="text-sm">Mantenha suas credenciais seguras e nunca compartilhe suas informações de login com terceiros.</div>
                  </div>
                </div>
              </section>

              {/* Seção 3 */}
              <section id="conteudo-usuario">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">📝</span>
                  3. Conteúdo do Usuário
                </h2>
                <p className="leading-relaxed mb-4">
                  Você é o único responsável pelo conteúdo que publica em seu perfil.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="card bg-base-200 shadow">
                    <div className="card-body p-4">
                      <h4 className="font-bold flex items-center gap-2">
                        <span>✅</span>
                        Seus Direitos
                      </h4>
                      <p className="text-sm">Você detém todos os direitos sobre seu conteúdo.</p>
                    </div>
                  </div>
                  <div className="card bg-base-200 shadow">
                    <div className="card-body p-4">
                      <h4 className="font-bold flex items-center gap-2">
                        <span>📄</span>
                        Nossa Licença
                      </h4>
                      <p className="text-sm">Você nos concede licença para hospedar e distribuir seu conteúdo para operação do serviço.</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-base-content/70 bg-base-200 p-4 rounded-lg">
                  <strong>Licença concedida:</strong> Ao usar nosso serviço, você nos concede uma licença mundial, não exclusiva e livre de royalties para hospedar, usar, modificar, executar, exibir e distribuir seu conteúdo para a operação e promoção do serviço.
                </p>
              </section>

              {/* Seção 4 */}
              <section id="direitos-autorais">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">©️</span>
                  4. Direitos Autorais e Propriedade Intelectual
                </h2>
                <p className="leading-relaxed">
                  Você não deve usar o serviço para publicar conteúdo que viole os direitos de propriedade intelectual de terceiros. Reservamo-nos o direito de remover qualquer conteúdo que, a nosso critério, seja considerado infrator.
                </p>
                <div className="alert alert-error mt-4">
                  <div className="text-lg">⚠️</div>
                  <div>
                    <h3 className="font-bold">Violação de Direitos Autorais</h3>
                    <div className="text-sm">Conteúdo que viole direitos de terceiros será removido sem aviso prévio.</div>
                  </div>
                </div>
              </section>

              {/* Seção 5 */}
              <section id="limitacao-responsabilidade">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚖️</span>
                  5. Limitação de Responsabilidade
                </h2>
                <p className="leading-relaxed">
                  O serviço é fornecido <strong>&quot;no estado em que se encontra&quot;</strong> e <strong>&quot;conforme disponível&quot;</strong>, sem garantias de qualquer tipo. A empresa não se responsabiliza por quaisquer danos diretos, indiretos, incidentais ou consequenciais que resultem do uso ou da incapacidade de usar o serviço.
                </p>
                <div className="stats stats-vertical lg:stats-horizontal shadow my-6">
                  <div className="stat">
                    <div className="stat-figure text-warning">
                      <div className="text-2xl">⚠️</div>
                    </div>
                    <div className="stat-title">Serviço fornecido</div>
                    <div className="stat-value text-warning">&quot;As Is&quot;</div>
                    <div className="stat-desc">Sem garantias</div>
                  </div>
                </div>
              </section>

              {/* Seção 6 */}
              <section id="alteracoes-termos">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">🔄</span>
                  6. Alterações nos Termos
                </h2>
                <p className="leading-relaxed">
                  Reservamo-nos o direito de, a nosso critério exclusivo, modificar ou substituir estes Termos a qualquer momento. Se uma alteração for material, notificaremos você com pelo menos <strong>30 dias de antecedência</strong>.
                </p>
                <div className="timeline mt-6">
                  <div className="timeline-item">
                    <div className="timeline-start">📢</div>
                    <div className="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L8.23 10.66a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="timeline-end timeline-box">Notificação com 30 dias de antecedência</div>
                  </div>
                </div>
              </section>

              {/* Seção 7 */}
              <section id="rescisao">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">🚪</span>
                  7. Rescisão
                </h2>
                <p className="leading-relaxed">
                  Podemos suspender ou encerrar seu acesso ao serviço a qualquer momento, sem aviso prévio, por qualquer motivo, incluindo, sem limitação, a violação destes Termos.
                </p>
                <div className="alert alert-warning mt-4">
                  <div className="text-lg">🚫</div>
                  <div>
                    <h3 className="font-bold">Suspensão de Conta</h3>
                    <div className="text-sm">A violação destes termos pode resultar na suspensão imediata da sua conta.</div>
                  </div>
                </div>
              </section>

              {/* Seção 8 */}
              <section id="contato">
                <h2 className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span className="text-2xl">📞</span>
                  8. Contato
                </h2>
                <p className="leading-relaxed">
                  Para quaisquer dúvidas sobre estes Termos, entre em contato conosco em:
                </p>
                <div className="alert alert-success mt-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h3 className="font-bold">Entre em contato</h3>
                    <div className="text-sm">
                      Email: <a href="mailto:hello@abraaomoreira.dev" className="link link-primary">hello@abraaomoreira.dev</a>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* Footer da página */}
            <div className="divider my-8"></div>
            
            <div className="text-center space-y-4">
              <div className="alert alert-info">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="font-bold">Dúvidas sobre os Termos?</h3>
                  <div className="text-sm">
                    Leia atentamente estes termos. Ao usar nossa plataforma, você concorda com todas as condições descritas acima.
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/privacy" className="btn btn-outline btn-sm">
                  📋 Política de Privacidade
                </Link>
                <Link href="/auth/login" className="btn btn-primary btn-sm">
                  🦊 Voltar ao Login
                </Link>
                <Link href="/" className="btn btn-ghost btn-sm">
                  🏠 Página Inicial
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8 text-xs sm:text-sm text-base-content/60">
          <p>© 2025 Tamed Fox. Todos os direitos reservados.</p>
          <p className="mt-2">
            Documento atualizado em {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}