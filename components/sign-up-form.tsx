"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Senha deve ter pelo menos 8 caracteres";
    if (!/(?=.*[a-z])/.test(password)) return "Senha deve conter pelo menos uma letra minúscula";
    if (!/(?=.*[A-Z])/.test(password)) return "Senha deve conter pelo menos uma letra maiúscula";
    if (!/(?=.*\d)/.test(password)) return "Senha deve conter pelo menos um número";
    return null;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      setSuccess("Conta criada com sucesso! Verifique seu email para confirmar.");
      
      // Redirecionar após alguns segundos
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
      
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center mb-6">
            <div className="text-5xl mb-3">🦊</div>
            <h1 className="text-2xl font-bold text-center tracking-wide">
              TAMED FOX
            </h1>
          </div>
          <CardTitle className="text-xl">Criar Conta</CardTitle>
          <CardDescription>
            Crie uma nova conta para acessar a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full rounded-r-md hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs sm:text-sm text-muted-foreground">Força da senha:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < passwordStrength
                                ? passwordStrength <= 2
                                  ? 'bg-red-500'
                                  : passwordStrength <= 3
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">
                        {passwordStrength <= 2 ? 'Fraca' : passwordStrength <= 3 ? 'Média' : 'Forte'}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        <div className={password.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ 8+ caracteres
                        </div>
                        <div className={/(?=.*[a-z])/.test(password) ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ Letra minúscula
                        </div>
                        <div className={/(?=.*[A-Z])/.test(password) ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ Letra maiúscula
                        </div>
                        <div className={/(?=.*\d)/.test(password) ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ Número
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pr-12 ${
                      confirmPassword && password !== confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full rounded-r-md hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    As senhas não coincidem
                  </p>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <div className="alert alert-error shadow-lg">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base">Erro ao criar conta</h3>
                    <div className="text-xs sm:text-sm">{error}</div>
                  </div>
                </div>
              )}

              {/* Success Alert */}
              {success && (
                <div className="alert alert-success shadow-lg">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base">Sucesso!</h3>
                    <div className="text-xs sm:text-sm">{success}</div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="btn btn-primary w-full h-11 sm:h-12 text-sm sm:text-base font-medium"
                disabled={isLoading || password !== confirmPassword || passwordStrength < 3}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4"
              >
                Fazer login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center mt-6 sm:mt-8">
        <p className="text-xs sm:text-sm text-base-content/50">
          Ao criar uma conta, você concorda com nossos{" "}
          <Link href="/terms" className="link link-primary">
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link href="/privacy" className="link link-primary">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  );
}
