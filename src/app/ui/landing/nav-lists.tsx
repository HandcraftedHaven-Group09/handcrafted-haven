'use client';

import Link from 'next/link';

const links = [
  { name: 'Home', href: '../../' },
  { name: 'Products', href: '/products' },
  { name: 'Collections', href: '' },
  { name: 'About', href: '' },
];

export default function NavLists() {
  return (
    <>
      {links.map((link) => {
        return (
          <li key={link.name}>
            <Link key={link.name} href={link.href}>
              <p>{link.name}</p>
            </Link>
          </li>
        );
      })}
    </>
  );
}
