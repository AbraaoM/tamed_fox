"use client";

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, User, Home } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { UserResponse } from '@supabase/supabase-js';

interface NavbarProps {
  user?: UserResponse;
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success('Desconectado com sucesso!');
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Erro ao sair:', error);
      toast.error('Erro ao desconectar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href="/protected" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/protected/display-info" className="flex items-center gap-2">
                🌿 Display Info
              </a>
            </li>
            <li>
              <a href="/protected/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Perfil
              </a>
            </li>
          </ul>
        </div>
        
        <a href="/protected" className="btn btn-ghost text-lg sm:text-xl font-bold">
          🦊 <span className="hidden sm:inline">Tamed Fox</span>
        </a>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <a href="/protected" className="btn btn-ghost gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="/protected/display-info" className="btn btn-ghost gap-2">
              🌿 Display Info
            </a>
          </li>
          <li>
            <a href="/protected/profile" className="btn btn-ghost gap-2">
              <User className="h-4 w-4" />
              Perfil
            </a>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-8 sm:w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-sm sm:text-base font-bold">
                  {user.email?.charAt(0)?.toUpperCase() || '👤'}
                </span>
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span className="text-xs text-base-content/70 truncate">
                  {user.email}
                </span>
              </li>
              <div className="divider my-1"></div>
              <li>
                <a href="/protected/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Meu Perfil
                </a>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button 
                  onClick={handleSignOut}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-error hover:bg-error hover:text-error-content"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  {isLoading ? 'Saindo...' : 'Sair'}
                </button>
              </li>
            </ul>
          </div>
        )}
        
        {!user && (
          <a href="/auth/login" className="btn btn-primary btn-sm sm:btn-md">
            Entrar
          </a>
        )}
      </div>
    </div>
  );
}