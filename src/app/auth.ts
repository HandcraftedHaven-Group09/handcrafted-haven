import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials'; // Email/Password
import GitHub from 'next-auth/providers/github'; // GitHub Oauth
import { z } from 'zod';
import type { User, Seller } from '@prisma/client';
import { getUserByEmail, getSellerByEmail } from '@/app/lib/data';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = (await getUserByEmail(email)) as User;
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

async function getSeller(email: string): Promise<Seller | undefined> {
  try {
    const seller = (await getSellerByEmail(email)) as Seller;
    return seller;
  } catch (error) {
    console.error('Failed to fetch seller:', error);
    throw new Error('Failed to fetch seller.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // This section is for USER LOGIN. This happens only when you log in------------------
    Credentials({
      id: 'user-credentials',
      name: 'Users Login',

      async authorize(credentials) {
        console.log('Authorizing');
        console.log('Credentials: ', credentials);
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(
            password,
            user.credential
          );
          console.log('THE ROLE IS: ', credentials.role);
          if (passwordsMatch)
            return {
              id: user.id.toString(),
              name: user.displayName,
              email: user.email,
              role: credentials.role as string, // These values go to???
            };
        }

        console.log('Invalid credentials');
        return null;
      },
    }),

    Credentials({
      id: 'seller-credentials',
      name: 'Sellers Login',

      async authorize(credentials) {
        console.log('Authorizing');
        console.log('Credentials: ', credentials);
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const seller = await getSeller(email);

          if (!seller) return null;
          const passwordsMatch = await bcrypt.compare(
            password,
            seller.password
          );
          console.log('THE ROLE IS: ', credentials.role);
          if (passwordsMatch)
            return {
              id: seller.id.toString(),
              name: seller.displayName,
              email: seller.email,
              role: credentials.role as string, // These values go to???
            };
        }

        console.log('Invalid credentials');
        return null;
      },
    }),

    GitHub, // This makes github work---------------------------
  ],
});
