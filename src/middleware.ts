import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/products/listing',
    '/products/:id/edit',
    '/products/create',
    '/products',
    '/products/:id',
    '/products/cart',
  ],
};

export async function middleware(request: NextRequest) {
  // Gets the authentication token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  console.log('Token:', token);

  if (!token) {
    // If there is no token, redirects to login
    const requiresSellerLogin = [
      '/products/listing',
      '/products/create',
      '/products/:id/edit',
    ].some((path) => request.nextUrl.pathname.startsWith(path));

    const loginUrl = new URL(
      requiresSellerLogin ? '/sellers/login' : '/users/login',
      request.url
    );

    loginUrl.searchParams.set('callbackUrl', request.url);
    console.log('Redirecionando para login:', loginUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  // Log to check the role of the user
  const userRole = token.role;
  console.log('User Role:', userRole);

  // Allow access if the user is authenticated and has permission
  if (
    userRole === 'seller' &&
    (request.nextUrl.pathname.startsWith('/products') ||
      request.nextUrl.pathname.startsWith('/products/listing'))
  ) {
    console.log(
      'Acesso permitido para seller na rota:',
      request.nextUrl.pathname
    );
    return NextResponse.next();
  }

  if (
    userRole === 'user' &&
    (request.nextUrl.pathname.startsWith('/products') ||
      request.nextUrl.pathname.startsWith('/products/cart'))
  ) {
    console.log(
      'Acesso permitido para user na rota:',
      request.nextUrl.pathname
    );
    return NextResponse.next();
  }

  console.log('Acesso negado para a rota:', request.nextUrl.pathname);
  return NextResponse.redirect(new URL('/unauthorized', request.url));
}
