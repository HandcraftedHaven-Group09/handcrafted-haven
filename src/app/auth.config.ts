import next from 'next';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        if (nextUrl.pathname.startsWith('/login')) {
          // Logged in but at login screen then redirect to root path
          return Response.redirect(
            new URL(nextUrl.searchParams.get('callbackUrl') || '', nextUrl)
          );
        }
      }

      if (isLoggedIn) return true; // If logged in, not at login page, pass through
      return false; // Redirect unauthenticated users to login page
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
