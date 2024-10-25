import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/src/app/auth';
import Image from 'next/image';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Handcrafted Haven - Home',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <header>
          <Image width={100} height={100} alt="Logo" src="logo.svg"></Image>
          <h1>Handcrafted Haven</h1>
        </header>
        <nav>
          <ul>
            <li>MENU1</li>
            <li>MENU2</li>
            <li>MENU3</li>
            <li>MENU4</li>
          </ul>
        </nav>
        {children}
        <footer>FOOTER</footer>
      </body>
    </html>
  );
}
