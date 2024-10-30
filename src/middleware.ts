import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/products/listing',        
    '/products/:id/edit',    
    '/products/create'
  ],
};

export async function middleware(request: NextRequest) {
  console.log('Middleware initializing');

  const token = await getToken({ req: request });
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    const loginUrl = new URL('/users/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url); // Preservar a URL solicitada para redirecionar após o login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
