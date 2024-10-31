'use client';

import Burger from '../burger-button/burger-button';
import UserTag from '@/app/ui/user-tag/user-tag';
import { useSession } from 'next-auth/react';
export type MenuItem = {
  text: string;
  url: string;
};

const links: MenuItem[] = [
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Collections', url: '/products' },
  { text: 'About', url: '/about' },
];

export default function NavLists() {
  const session = useSession();
  return (
    <nav>
      <Burger rightHanded={true} menuItems={links} />
      {session.data?.user.id ? (
        <UserTag userId={session.data?.user.id} />
      ) : null}
    </nav>
  );
}
