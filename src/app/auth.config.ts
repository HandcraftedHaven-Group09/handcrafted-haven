import next from 'next'
import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET, // Set the secret key for token generation
  pages: {
    signIn: '/sellers/login', 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user 
      const userRole = auth?.user?.role // Retrieves the user's role
      if (isLoggedIn) {
        // If the user is logged in but trying to access the login page, redirect them
        if (nextUrl.pathname.startsWith('/sellers/login')) {
          const callback = nextUrl.searchParams.get('callbackUrl')
          if (callback) {
            return Response.redirect(
              new URL(nextUrl.searchParams.get('callbackUrl') || '', nextUrl)
            )
          } else {
            return Response.redirect(new URL(nextUrl.origin, nextUrl))
          }
        }

        // Role-based access control for specific pages
        const restrictedPaths = ['/products/listing', '/products/create', '/products/:id/edit']
        const isRestrictedPage = restrictedPaths.some(path => nextUrl.pathname.startsWith(path))

        if (isRestrictedPage && userRole !== 'seller') {
          return Response.redirect(new URL('/unauthorized', nextUrl.origin)) // Redirect unauthorized users
        }
      }

      if (isLoggedIn) return true

      return false
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
