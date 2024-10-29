'use client';
import Link from 'next/link';
import './burger-button.css';
import useMedia from 'use-media';
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
  const isWide = useMedia({ minWidth: '450px' });

  return (
    <div className={rightHanded ? 'burger right-handed' : 'burger'}>
      {!isWide ? ( // Show if not wide mode
        <button
          className="burger-button"
          onClick={() => {
            console.log('CLICK!', menuActive);
            setMenuActive(!menuActive);
          }}
        >
          {menuActive ? '^' : '='}
        </button>
      ) : (
        ''
      )}
      <ul
        className={
          !isWide
            ? menuActive
              ? 'burger-menu menu-vertical menu-float'
              : 'burger-menu menu-vertical menu-hidden'
            : 'burger-menu'
        }
      >
        {menuItems.map((item) => {
          return (
            <li key={item.text}>
              <Link href={item.url}>{item.text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
