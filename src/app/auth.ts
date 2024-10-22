import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials'; // Email/Password
import GitHub from 'next-auth/providers/github'; // GitHub Oauth
import { z } from 'zod';
import type { User } from '@prisma/client';
import { getUserByEmail } from '@/app/lib/data';
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('Authorizing');
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
          if (passwordsMatch)
            return { id: user.id.toString(), email: user.email };
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
    GitHub,
  ],
});
