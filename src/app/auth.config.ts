import type { NextAuthConfig } from 'next-auth';
import prisma from './lib/prisma';
import { getUserByEmail, createUser, updateUserById } from './lib/data';

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/users/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SIGN IN BEING USED');
      console.log('USER: ', user);
      console.log('ACCOUNT', account);
      console.log('PROFILE', profile);
      if (account?.provider == 'github') {
        console.log('LOGIN WITH GITHUB');
        // Check if user email exist in db.
        const dbUser = await getUserByEmail(user.email || '');

        // If so, remap id.
        if (dbUser) {
          user.id = dbUser.id.toString();
          // Might need to adjust things here.
          return true;
        }
        // If not, create new user..Reroute to finishing page?
        else {
          if (user.email && user.name) {
            const result = await createUser({
              email: user.email,
              displayName: user.name,
              firstName: user.name,
              lastName: 'of GitHub',
              password: 'GITHUB',
            });
            if (result) {
              const updateResult = await updateUserById(result.id, {
                displayName: undefined,
                firstName: undefined,
                lastName: undefined,
                bio: (profile?.bio as string) || '',
                profilePictureFile: undefined,
              });
              user.id = result?.id.toString();
              console.log('ADDED GITHUB USER');
              return true;
            } else {
              return false;
            }
          } else {
            // Not enough info
            console.log('GITHUB LOGING FAILED: Not enough info');
            return false;
          }
        }
      }
      return false;
    },

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
