import type { NextAuthConfig, Session } from 'next-auth'
import { NextRequest } from 'next/server'

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    async authorized({ request, auth }: { request: NextRequest; auth: Session | null }) {
      if (!auth?.user) return false
      const userRole: string = auth.user.role

      // Define restricted paths for each role
      const restrictedPaths: { [key: string]: RegExp[] } = {
        seller: [/^\/products\/?$/, /^\/products\/\d+$/, /^\/products\/cart$/],
        user: [/^\/products\/listing$/, /^\/products\/create$/, /^\/products\/\d+\/edit$/],
      }

      const isRestricted = (role: string, pathname: string): boolean => {
        return restrictedPaths[role]?.some((path: RegExp) => path.test(pathname))
      }

      if (isRestricted(userRole, request.nextUrl.pathname)) {
        return false // Block unauthorized access middleware will handle redirection
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.id
      return session
    },
  },
  providers: [], // Add providers here
}
