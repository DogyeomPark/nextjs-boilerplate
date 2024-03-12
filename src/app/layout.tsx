import { Nunito } from 'next/font/google';

import { SessionProvider } from 'next-auth/react';

import Navbar from '@/components/navbar/navbar';

import './globals.css';
import styles from './layout.module.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Boilerplate',
  description: 'Memecore boilerplate',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <SessionProvider>
          <Navbar />
          <div className={styles.container}>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
