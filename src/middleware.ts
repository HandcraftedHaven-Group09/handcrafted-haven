import NextAuth from 'next-auth';
import { authConfig } from './app/auth.config';

console.log('Middleware initializing');

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/users/(\\d+)/:path*'],
};
