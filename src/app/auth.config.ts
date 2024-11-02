import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Checks if the user is logged in
      const userRole = auth?.user?.role; // Retrieves the user's role

      if (isLoggedIn) {
        // Define restricted paths for users and sellers
        const sellerRestrictedPaths = [
          '/products/listing',
          '/products/create',
          '/products/:id/edit',
        ];
        const userRestrictedPaths = [
          '/products/',
          '/products/:id',
          '/products/cart',
        ];

        const isSellerRestrictedPage = sellerRestrictedPaths.some((path) =>
          nextUrl.pathname.startsWith(path)
        );
        const isUserRestrictedPage = userRestrictedPaths.some((path) =>
          nextUrl.pathname.startsWith(path)
        );

        // Sellers trying to access user-only pages
        if (userRole === 'seller' && isUserRestrictedPage) {
          return Response.redirect(new URL('/unauthorized', nextUrl.origin));
        }

        // Users trying to access seller-only pages
        if (userRole === 'user' && isSellerRestrictedPage) {
          return Response.redirect(new URL('/unauthorized', nextUrl.origin));
        }

        // If the user is logged in as a seller and tries to access `/users/login`, redirect to `/sellers/login`
        if (
          userRole === 'seller' &&
          nextUrl.pathname.startsWith('/users/login')
        ) {
          return Response.redirect(new URL('/sellers/login', nextUrl.origin));
        }

        // If the user is logged in as a user and tries to access `/sellers/login`, redirect to `/users/login`
        if (
          userRole === 'user' &&
          nextUrl.pathname.startsWith('/sellers/login')
        ) {
          return Response.redirect(new URL('/users/login', nextUrl.origin));
        }

        // Allow access if the user is authorized for the page
        return true;
      }

      return false; // Block access if not logged in
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
  providers: [], // Add providers here
};
