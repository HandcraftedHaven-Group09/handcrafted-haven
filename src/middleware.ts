import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/products/:id/edit',
    '/products/create',
    '/products/:id',
    '/products/cart',
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  
  if (!token) {
    // Se não houver token, redireciona para login
    const loginUrl = new URL( 
      request.nextUrl.pathname.includes('/create') || 
      request.nextUrl.pathname.includes('/edit')
        ? '/sellers/login'
        : '/users/login',
      request.url
    );
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Permitir acesso a todos que estão logados
  return NextResponse.next();
}
