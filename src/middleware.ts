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
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const userRole = token?.role;

  if (!isLoggedIn) {
    // Redirect to the appropriate login page based on requested path
    const loginUrl = new URL(
      request.nextUrl.pathname.includes('/products/listing') ||
      request.nextUrl.pathname.includes('/products/create') ||
      request.nextUrl.pathname.includes('/edit')
        ? '/sellers/login'
        : '/users/login',
      request.url
    );
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Restrict access based on user role
  if (userRole === 'seller' && request.nextUrl.pathname.startsWith('/products')) {
    const allowedPaths = [
      '/products/listing',
      '/products/create',
      `/products/${request.nextUrl.searchParams.get('id')}/edit`
    ];
    if (!allowedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  if (userRole === 'user' && request.nextUrl.pathname.startsWith('/products')) {
    const allowedPaths = ['/products', '/products/:id', '/products/cart'];
    if (!allowedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}
