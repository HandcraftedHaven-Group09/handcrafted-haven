'use client';
import { useEffect, useState } from 'react';
import Burger from '../burger-button/burger-button';
import Link from 'next/link';

const links = [
  { name: 'Home', href: '../../' },
  { name: 'Products', href: '/products' },
  { name: 'Collections', href: '' },
  { name: 'About', href: '' },
];

export default function NavLists() {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 450);
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
            <li key={link.name}>
              <Link href={link.href}>
                <p>{link.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Burger
          rightHanded={true}
          menuItems={[
            { text: 'Home', url:'../../'},
            { text: 'Products', url:'/products'},
            { text: 'Collections', url:''},
            { text: 'About', url:''},
          ]}
        />
      )}
    </nav>
  );
}
