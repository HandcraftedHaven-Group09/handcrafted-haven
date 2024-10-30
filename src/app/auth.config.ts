import { NextResponse } from 'next/server';
import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user; // Check if user is authenticated
      const { pathname, origin } = request.nextUrl;
      
      // Redirect logged-in users trying to access the login page back to the main page or callback URL
      if (isLoggedIn && pathname === '/users/login') {
        const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/';
        return NextResponse.redirect(new URL(callbackUrl, origin));
      }
      
      // Block unauthenticated users from accessing protected pages
      const protectedPaths = ['/products/listing', '/products/:id/edit', '/products/create'];
      const isProtectedPage = protectedPaths.some((path) => pathname.startsWith(path));

      if (!isLoggedIn && isProtectedPage) {
        return NextResponse.redirect(new URL('/users/login', origin));
      }

      // Allow access if logged in or if the page is not protected
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, id: token.id, role: token.role };
      }
      return session;
    },
  },
  providers: [], // Add your providers here
} satisfies NextAuthConfig;
