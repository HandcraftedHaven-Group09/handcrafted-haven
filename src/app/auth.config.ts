import next from 'next';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        if (nextUrl.pathname.startsWith('/users/login')) {
          // Logged in but at login screen then redirect to root path
          return Response.redirect(
            new URL(nextUrl.searchParams.get('callbackUrl') || '', nextUrl)
          );
        }
      }

      if (isLoggedIn) return true; // If logged in, not at login page, pass through
      return false; // Redirect unauthenticated users to login page
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
