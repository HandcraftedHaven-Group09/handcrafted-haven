'use client';

import Burger from '../burger-button/burger-button';

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
  return (
    <nav>
      <Burger rightHanded={true} menuItems={links} />
    </nav>
  );
}
