import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Verificar se o usuário está autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Rotas que sempre devem ser permitidas independente do status de login
  const alwaysAllowedRoutes = [
    '/api',
    '/_next',
    '/favicon.ico',
    '/auth/callback'
  ]

  // Verificar se é uma rota sempre permitida
  const isAlwaysAllowed = alwaysAllowedRoutes.some(route => pathname.startsWith(route))
  
  if (isAlwaysAllowed) {
    return supabaseResponse
  }

  // Se o usuário está logado
  if (user) {
    // Se tentar acessar qualquer rota fora de /protected, redirecionar para /protected
    if (!pathname.startsWith('/protected')) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/protected'
      return NextResponse.redirect(redirectUrl)
    }
    
    // Se está em /protected, permitir acesso
    return supabaseResponse
  }

  // Se o usuário não está logado
  if (!user) {
    // Se tentar acessar /protected, redirecionar para login
    if (pathname.startsWith('/protected')) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectedFrom', pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    // Permitir acesso a rotas públicas (home, auth/login, auth/register, etc.)
    return supabaseResponse
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
