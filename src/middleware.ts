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
    '/sellers/login',
    '/users/login',
  ],
};

export async function middleware(request: NextRequest) {
  console.log('Middleware initializing');

  // Retrieve the token to check if the user is logged in
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token; // Check if there is a valid token (user is logged in)
  const userRole = token?.role;

  // Define exact paths restricted by role using RegExp
  const sellerRestrictedPaths = [
    /^\/products\/listing$/,   // Seller-only paths
    /^\/products\/create$/,
    /^\/products\/\d+\/edit$/,
  ];
  const userRestrictedPaths = [
    /^\/products\/?$/,         // User-only paths
    /^\/products\/\d+$/,
    /^\/products\/cart$/,
  ];

  const isSellerRestrictedPage = sellerRestrictedPaths.some((path) =>
    path.test(request.nextUrl.pathname)
  );
  const isUserRestrictedPage = userRestrictedPaths.some((path) =>
    path.test(request.nextUrl.pathname)
  );

  // Logging for debugging purposes
  console.log('Token:', token);
  console.log('User Role:', userRole);
  console.log('Is Seller Restricted Page:', isSellerRestrictedPage);
  console.log('Is User Restricted Page:', isUserRestrictedPage);

  // Handle login pages directly to avoid redirect loops
  if (request.nextUrl.pathname === '/sellers/login' || request.nextUrl.pathname === '/users/login') {
    if (isLoggedIn && userRole === 'seller' && request.nextUrl.pathname === '/sellers/login') {
      console.log('Redirecting seller to /products/listing after successful login');
      return NextResponse.redirect(new URL('/products/listing', request.url));
    }
    return NextResponse.next();
  }

  // If the user is not logged in, redirect them to the appropriate login page
  if (!isLoggedIn) {
    const loginUrl = new URL(
      isSellerRestrictedPage ? '/sellers/login' : '/users/login',
      request.url
    );
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is logged in but tries to access a restricted page for their role
  if (userRole === 'seller' && isUserRestrictedPage) {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // Redirect sellers who try to access user pages
  }

  if (userRole === 'user' && isSellerRestrictedPage) {
    return NextResponse.redirect(new URL('/unauthorized', request.url)); // Redirect users who try to access seller pages
  }

  // Allow the user to proceed if all checks pass
  return NextResponse.next();
}
