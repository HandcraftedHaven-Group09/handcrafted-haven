import UserLogin from '@/app/ui/users/user-login';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'User Login',
  description: 'Sign in to a user account to brows products',
};

export default function Page() {
  return (
    <div className="center-children">
      <UserLogin></UserLogin>
    </div>
  );
}
