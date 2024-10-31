import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Checks if the user is logged in
      const userRole = auth?.user?.role; // Retrieves the user's role

      if (isLoggedIn) {
        // Define restricted paths for users and sellers
        const sellerRestrictedPaths = ['/products/listing', '/products/create', '/products/:id/edit'];
        const userRestrictedPaths = ['/products/', '/products/:id', '/products/cart'];

        const isSellerRestrictedPage = sellerRestrictedPaths.some(path => nextUrl.pathname.startsWith(path));
        const isUserRestrictedPage = userRestrictedPaths.some(path => nextUrl.pathname.startsWith(path));

        // Block access if trying to access restricted pages based on user role
        if ((userRole === 'seller' && isUserRestrictedPage) || (userRole === 'user' && isSellerRestrictedPage)) {
          return false; // Block access
        }

        return true; // Allow access
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
