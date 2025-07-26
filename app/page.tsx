import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>TAMED FOX</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>

        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6">
          <div className="text-center space-y-8">
            <div className="text-8xl mb-4">🦊</div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight">TAMED FOX</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Uma plataforma moderna e intuitiva para gerenciar seus projetos
                com eficiência e elegância.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link
                href="/login"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Começar Agora
              </Link>
              <Link
                href="/about"
                className="border border-input hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Saiba Mais
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl">⚡</div>
                <h3 className="font-semibold">Rápido</h3>
                <p className="text-sm text-muted-foreground">
                  Performance otimizada para máxima produtividade
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🔒</div>
                <h3 className="font-semibold">Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Seus dados protegidos com as melhores práticas
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🎨</div>
                <h3 className="font-semibold">Elegante</h3>
                <p className="text-sm text-muted-foreground">
                  Interface limpa e moderna para melhor experiência
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
