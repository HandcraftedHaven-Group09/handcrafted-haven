import UserSignup from '@/app/ui/users/user-signup';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'User Signup',
  description: 'Signup up for a user account, to view and buy ',
};

export default async function Page() {
  return (
    <div id="content">
      <div className="center-children">
        <h2>Sign Up</h2>
        <UserSignup />
      </div>
    </div>
  );
}
