'use client';

import { useEffect, useState } from 'react';
import Burger from '../burger-button/burger-button';
import Link from 'next/link';

export type MenuItem = {
  text: string;
  url: string;
};

const links: MenuItem[] = [
  { text: 'Home', url: '../../' },
  { text: 'Products', url: '/products' },
  { text: 'Collections', url: '' },
  { text: 'About', url: '' },
];

export default function NavLists() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 450);

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    const isLarge = currentWidth > 450;
    setIsLargeScreen(prev => isLarge);
    console.log(currentWidth, window.innerWidth, isLarge, isLargeScreen)
  };

  useEffect(() => {
    handleResize(); // Set initial screen size
    window.addEventListener('resize', handleResize); // Event listener for window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav>
      {isLargeScreen ? (
        <ul>
          {links.map((link) => (
            <li key={link.text}>
              <Link href={link.url}>
                <p>{link.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Burger
          rightHanded={true}
          menuItems={links}
        />
      )}
    </nav>
  );
}
