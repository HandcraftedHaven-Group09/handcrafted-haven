'use client';

import Link from 'next/link';
import './burger-button.css';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export type MenuItem = {
  text: string;
  url: string;
};

export default function Burger({
  rightHanded,
  menuItems,
}: {
  rightHanded: boolean;
  menuItems: MenuItem[];
}) {
  const { data: session } = useSession();
  const [menuActive, setMenuActive] = useState<boolean>(false);

  return (
    <div className={rightHanded ? 'burger right-handed' : 'burger'}>
      <button
        className="burger-button"
        onClick={() => setMenuActive(prev => !prev)}
      >
        {menuActive ? '^' : '='}
      </button>
      <ul
        className={
          menuActive
            ? 'burger-menu menu-vertical menu-float'
            : 'burger-menu menu-vertical menu-hidden'
        }
      >
        {menuItems.map((item) => (
            <li key={item.text}>
              <Link href={item.url}>{item.text}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
