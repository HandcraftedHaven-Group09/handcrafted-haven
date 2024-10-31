import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/products/listing', 
    '/products/:id/edit', 
    '/products/create', 
    '/products/', 
    '/products/:id', 
    '/products/cart'
  ],
};

export async function middleware(request: NextRequest) {
  console.log('Middleware initializing');

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;
  const userRole = token?.role;

  // Define exact paths restricted by role using RegExp
  const sellerRestrictedPaths = [/^\/products\/listing$/, /^\/products\/create$/, /^\/products\/\d+\/edit$/];
  const userRestrictedPaths = [/^\/products\/?$/, /^\/products\/\d+$/, /^\/products\/cart$/];;

  const isSellerRestrictedPage = sellerRestrictedPaths.some(path => path.test(request.nextUrl.pathname));
  const isUserRestrictedPage = userRestrictedPaths.some(path => path.test(request.nextUrl.pathname));

  if (!isLoggedIn) {
    // Redirect to the appropriate login page based on requested path
    const loginUrl = new URL(
      isSellerRestrictedPage ? '/sellers/login' : '/users/login',
      request.url
    );
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Ensure sellers can only access seller pages
  if (userRole === 'seller' && !isSellerRestrictedPage) {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // Block seller from user pages
  }

  // Ensure users can only access user pages
  if (userRole === 'user' && !isUserRestrictedPage) {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // Block user from seller pages
  }

  return NextResponse.next(); // Allow access if role is appropriate
}
