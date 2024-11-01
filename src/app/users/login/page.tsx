import UserLogin from '@/app/ui/users/user-login';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'User Login',
  description: 'Sign in to a user account to brows products',
};

export default async function Page() {
  const session = await auth();

  if (session?.user.id) {
    if (session) {
      // Session exists
      console.log('user already logged in ', session?.user.id);
      redirect(`/users/${session?.user.id}`);
    }
  }

  return (
    <div className="center-children">
      <UserLogin></UserLogin>
    </div>
  );
}
