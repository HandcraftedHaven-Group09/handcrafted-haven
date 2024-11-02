import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const config = {
  matcher: [
    '/products/listing',
    '/products/:id/edit',
    '/products/create',
    '/products',
    '/products/:id',
    '/products/cart',
  ],
}

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

  if (!token) {
    // Redireciona para a página de login apropriada se o token não for encontrado (não autenticado)
    const loginUrl = new URL(
      request.nextUrl.pathname.includes('/listing') ||
      request.nextUrl.pathname.includes('/create') ||
      request.nextUrl.pathname.includes('/edit')
        ? '/sellers/login'
        : '/users/login',
      request.url
    )
    loginUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(loginUrl)
  }

  const userRole = token.role

  // Lógica de permissão para vendedores e usuários
  if (userRole === 'seller' && (request.nextUrl.pathname.startsWith('/products') || request.nextUrl.pathname.startsWith('/products/listing'))) {
    return NextResponse.next()
  }

  if (userRole === 'user' && (request.nextUrl.pathname.startsWith('/products') || request.nextUrl.pathname.startsWith('/products/cart'))) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/unauthorized', request.url))
}
