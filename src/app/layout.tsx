import { Nunito } from 'next/font/google';

import { SessionProvider } from 'next-auth/react';

import WalletProvider from '@/providers/walletProvider';

import './globals.css';
import styles from './layout.module.css';
import Web3Provider from '@/providers/wagmiProvider';
import ReactQueryProvider from '@/providers/reactQueryProvider';

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
          <Web3Provider>
            <ReactQueryProvider>
              <WalletProvider>
                <div className={styles.container}>{children}</div>
              </WalletProvider>
            </ReactQueryProvider>
          </Web3Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
