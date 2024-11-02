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
  const isLoggedIn = !!token
  const userRole = token?.role

  if (!isLoggedIn) {
    // Redirect to the appropriate login page based on requested path
    const loginUrl = new URL(
      request.nextUrl.pathname.includes('/products/listing') ||
      request.nextUrl.pathname.includes('/products/create') ||
      request.nextUrl.pathname.includes('/edit')
        ? '/sellers/login'
        : '/users/login',
      request.url
    )
    loginUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(loginUrl)  // Usando NextResponse em vez de Response
  }

  // Restrict access based on user role
  if (userRole === 'seller' && !(/^\/products\/listing$/.test(request.nextUrl.pathname) || /^\/products\/create$/.test(request.nextUrl.pathname) || /^\/products\/\d+\/edit$/.test(request.nextUrl.pathname))) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))  // Usando NextResponse
  }

  if (userRole === 'user' && !(/^\/products\/?$/.test(request.nextUrl.pathname) || /^\/products\/\d+$/.test(request.nextUrl.pathname) || /^\/products\/cart$/.test(request.nextUrl.pathname))) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))  // Usando NextResponse
  }

  return NextResponse.next()
}