import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/src/app/auth';
import Image from 'next/image';
import './globals.css';

const titleFont = localFont({
  src: './fonts/arizonia/Arizonia-Regular.ttf',
  variable: '--font-title',
  weight: '100 900',
});
const headingFont = localFont({
  src: './fonts/girassol/Girassol-Regular.ttf',
  variable: '--font-heading',
  weight: '100 900',
});
const bodyFont = localFont({
  src: './fonts/open_sans/OpenSans-VariableFont_wdth,wght.ttf',
  variable: '--font-body',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Home | Handcrafted Haven',
  },
  description: 'A site for artisans to showcase their wares. ',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${titleFont.variable} ${headingFont.variable} ${bodyFont.variable}`}
    >
      <SessionProvider session={session}>
        <body>
          <header>
            <div className="title-group">
              <Image
                width={100}
                height={100}
                alt="Logo"
                src="/ui/logo.svg"
              ></Image>
              <h1>Handcrafted Haven</h1>
            </div>
            <nav>
              <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Collections</li>
                <li>About</li>
              </ul>
            </nav>
          </header>
          <main>{children}</main>
          <footer>FOOTER</footer>
        </body>
      </SessionProvider>
    </html>
  );
}
