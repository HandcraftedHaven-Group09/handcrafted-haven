import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/src/app/auth';
import Image from 'next/image';
import './globals.css';
import NavLists from './ui/landing/nav-lists';

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
      <body>
        <SessionProvider session={session}>
          <header>
            <div className="title-group">
              <Image width={100} height={100} alt="Logo" src="/ui/logo.svg" />
              <h1>Handcrafted Haven</h1>
            </div>
            <NavLists />
          </header>
          <main>{children}</main>
          <footer>
            <div className="footer-top">
              <div className="footer-logo">
                <Image width={100} height={100} alt="Logo" src="/ui/logo.svg" />
                <h1>Handcrafted Haven</h1>
              </div>
              <div className="social-media">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/ui/facebook.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/ui/instagram.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                  />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/ui/x.png" alt="Twitter" width={24} height={24} />
                </a>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
