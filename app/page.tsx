import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-lg sm:text-xl font-bold">
            🦊 <span className="hidden sm:inline">TAMED FOX</span>
          </Link>
        </div>

        <div className="navbar-end">
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[calc(100vh-4rem)] bg-base-200">
        <div className="hero-content text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Logo */}
            <div className="text-6xl sm:text-7xl lg:text-8xl mb-6 sm:mb-8">🦊</div>

            {/* Title & Description */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                TAMED FOX
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                Uma plataforma moderna e intuitiva para gerenciar seus projetos
                com eficiência e elegância.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16">
              <Link
                href="/auth/login"
                className="btn btn-primary btn-lg w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base"
              >
                Começar Agora
              </Link>
              <Link
                href="#features"
                className="btn btn-outline btn-lg w-full sm:w-auto px-6 sm:px-8 text-sm sm:text-base"
              >
                Saiba Mais
              </Link>
            </div>

            {/* Features Grid */}
            <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
                  <h3 className="card-title text-base sm:text-lg mb-2">Rápido</h3>
                  <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                    Performance otimizada para máxima produtividade
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔒</div>
                  <h3 className="card-title text-base sm:text-lg mb-2">Seguro</h3>
                  <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                    Seus dados protegidos com as melhores práticas
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl md:col-span-1">
                <div className="card-body items-center text-center p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎨</div>
                  <h3 className="card-title text-base sm:text-lg mb-2">Elegante</h3>
                  <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                    Interface limpa e moderna para melhor experiência
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-6 sm:p-8 lg:p-10 bg-base-100 text-base-content border-t">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">🦊 TAMED FOX</span>
          </div>
          <div className="divider divider-horizontal hidden sm:flex"></div>
          <ThemeSwitcher />
        </div>
        <div className="text-xs sm:text-sm text-base-content/60">
          © 2024 Tamed Fox. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
